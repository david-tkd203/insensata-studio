// app/api/appointments/route.js
import { NextResponse } from 'next/server';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentsByUserId,
  getAvailabilityForDate,
} from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';
    const date = searchParams.get('date') || '';

    if (user.role === 'admin') {
      const appointments = getAllAppointments({ status, search, date });
      return NextResponse.json({ appointments });
    }

    // Regular client: only see their own appointments
    const appointments = getAppointmentsByUserId(user.id);
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { error: 'Error al obtener los turnos' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    const data = await request.json();

    const {
      client_name,
      client_email,
      client_phone,
      service_id,
      service_name,
      shape_length,
      appointment_date,
      time_slot,
      estimated_price,
      notes,
    } = data;

    if (!client_name || !client_email || !client_phone || !service_id || !appointment_date || !time_slot) {
      return NextResponse.json(
        { error: 'Por favor complete todos los datos requeridos para la reserva' },
        { status: 400 }
      );
    }

    // Check slot availability
    const avail = getAvailabilityForDate(appointment_date);
    if (avail.isWholeDayBlocked) {
      return NextResponse.json(
        { error: 'El Atelier se encuentra cerrado o bloqueado para la fecha seleccionada.' },
        { status: 409 }
      );
    }

    const targetSlot = avail.slots.find((s) => s.slot === time_slot);
    if (!targetSlot || !targetSlot.available) {
      return NextResponse.json(
        { error: `El horario de las ${time_slot} ya no se encuentra disponible para el ${appointment_date}. Por favor elija otro turno.` },
        { status: 409 }
      );
    }

    const appointment = createAppointment({
      user_id: user ? user.id : null,
      client_name,
      client_email,
      client_phone,
      service_id,
      service_name,
      shape_length: shape_length || '',
      appointment_date,
      time_slot,
      estimated_price: estimated_price || '',
      notes: notes || '',
      status: 'Pendiente',
      deposit_paid: 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Turno solicitado exitosamente. Estado: Pendiente de confirmación y seña.',
      appointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la reserva del turno' },
      { status: 500 }
    );
  }
}
