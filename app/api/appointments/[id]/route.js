// app/api/appointments/[id]/route.js
import { NextResponse } from 'next/server';
import {
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const appointmentId = Number(id);
    const existing = getAppointmentById(appointmentId);

    if (!existing) {
      return NextResponse.json({ error: 'Turno no encontrado' }, { status: 404 });
    }

    const body = await request.json();
    const { status, deposit_paid, reminder_sent } = body;

    // Admin can update anything
    if (user.role === 'admin') {
      const updated = updateAppointmentStatus(
        appointmentId,
        status !== undefined ? status : existing.status,
        deposit_paid !== undefined ? deposit_paid : existing.deposit_paid,
        reminder_sent !== undefined ? reminder_sent : existing.reminder_sent
      );
      return NextResponse.json({ success: true, appointment: updated });
    }

    // Client can only cancel their own pending appointment
    if (existing.user_id === user.id) {
      if (status === 'Cancelado' && existing.status === 'Pendiente') {
        const updated = updateAppointmentStatus(appointmentId, 'Cancelado');
        return NextResponse.json({ success: true, appointment: updated });
      }
      return NextResponse.json(
        { error: 'Solo puedes cancelar turnos que aún se encuentren en estado Pendiente' },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: 'No tienes permiso para modificar este turno' }, { status: 403 });
  } catch (error) {
    console.error('Update appointment error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el turno' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso reservado a administración' }, { status: 403 });
    }

    const { id } = await params;
    deleteAppointment(Number(id));
    return NextResponse.json({ success: true, message: 'Turno eliminado del sistema' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el turno' },
      { status: 500 }
    );
  }
}
