// app/api/availability/route.js
import { NextResponse } from 'next/server';
import { getAvailabilityForDate } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Parámetro de fecha (date=YYYY-MM-DD) requerido' },
        { status: 400 }
      );
    }

    const availability = getAvailabilityForDate(date);
    return NextResponse.json(availability);
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Error al consultar disponibilidad' },
      { status: 500 }
    );
  }
}
