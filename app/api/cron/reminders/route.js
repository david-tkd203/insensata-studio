// app/api/cron/reminders/route.js
import { NextResponse } from 'next/server';
import { getAppointmentsDueForReminder, markReminderSent } from '@/lib/db';
import { sendReminderEmail } from '@/lib/emailService';

export async function GET(request) {
  return handleCronReminders(request);
}

export async function POST(request) {
  return handleCronReminders(request);
}

async function handleCronReminders(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryDate = searchParams.get('date');
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Optional secret check if CRON_SECRET is configured in environment
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const apiKeyParam = searchParams.get('key');
      if (apiKeyParam !== cronSecret) {
        return NextResponse.json({ error: 'No autorizado para ejecutar cron' }, { status: 401 });
      }
    }

    // Determine target date: default to tomorrow (YYYY-MM-DD)
    let targetDate = queryDate;
    if (!targetDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Format as YYYY-MM-DD
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      targetDate = `${year}-${month}-${day}`;
    }

    // Retrieve confirmed appointments for targetDate that have not received reminders yet
    const appointmentsDue = getAppointmentsDueForReminder(targetDate);

    console.log(`[CRON REMINDERS] Target Date: ${targetDate} | Found: ${appointmentsDue.length} appointments due.`);

    const results = [];
    let sentCount = 0;
    let failedCount = 0;

    for (const appt of appointmentsDue) {
      try {
        const emailResult = await sendReminderEmail(appt);
        if (emailResult.success) {
          markReminderSent(appt.id, 1);
          sentCount++;
          results.push({
            id: appt.id,
            client_name: appt.client_name,
            client_email: appt.client_email,
            time_slot: appt.time_slot,
            status: 'sent',
            mocked: emailResult.mocked,
          });
        } else {
          failedCount++;
          results.push({
            id: appt.id,
            client_name: appt.client_name,
            status: 'failed',
            error: emailResult.error,
          });
        }
      } catch (sendErr) {
        failedCount++;
        console.error(`Error sending reminder for appointment #${appt.id}:`, sendErr);
        results.push({
          id: appt.id,
          client_name: appt.client_name,
          status: 'error',
          error: sendErr.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      execution_timestamp: new Date().toISOString(),
      target_date: targetDate,
      total_found: appointmentsDue.length,
      reminders_sent: sentCount,
      reminders_failed: failedCount,
      results,
    });
  } catch (error) {
    console.error('Critical cron reminders handler error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno en cron de recordatorios' },
      { status: 500 }
    );
  }
}
