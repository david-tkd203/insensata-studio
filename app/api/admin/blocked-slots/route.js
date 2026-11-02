// app/api/admin/blocked-slots/route.js
import { NextResponse } from 'next/server';
import {
  getAllBlockedSlots,
  createBlockedSlot,
  deleteBlockedSlot,
} from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
    }

    const blocked = getAllBlockedSlots();
    return NextResponse.json({ blocked });
  } catch (error) {
    console.error('Get blocked slots error:', error);
    return NextResponse.json({ error: 'Error al obtener bloqueos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
    }

    const body = await request.json();
    const { block_date, time_slot, reason } = body;

    if (!block_date) {
      return NextResponse.json({ error: 'La fecha de bloqueo es requerida' }, { status: 400 });
    }

    const created = createBlockedSlot({
      block_date,
      time_slot: time_slot || null,
      reason: reason || 'Bloqueo administrativo del Atelier',
    });

    return NextResponse.json({ success: true, blocked: created });
  } catch (error) {
    console.error('Create blocked slot error:', error);
    return NextResponse.json({ error: 'Error al registrar bloqueo' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID de bloqueo requerido' }, { status: 400 });
    }

    deleteBlockedSlot(Number(id));
    return NextResponse.json({ success: true, message: 'Bloqueo liberado con éxito' });
  } catch (error) {
    console.error('Delete blocked slot error:', error);
    return NextResponse.json({ error: 'Error al liberar bloqueo' }, { status: 500 });
  }
}
