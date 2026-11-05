// lib/emailService.js
import fs from 'node:fs';
import path from 'node:path';
import mjml from 'mjml';

const STUDIO_WHATSAPP = '+54 9 11 3840-2918';
const STUDIO_WHATSAPP_CLEAN = '5491138402918';

/**
 * Reads an MJML template file, interpolates {{variables}}, and compiles to HTML.
 * @param {string} templateName - Name of the template (e.g. 'bienvenida', 'confirmacion-turno', 'recordatorio-24h')
 * @param {Record<string, any>} variables - Key-value map of variables to replace
 * @returns {Promise<{ html: string, errors: any[] }>}
 */
export async function compileTemplate(templateName, variables = {}) {
  // Normalize template name
  const cleanName = templateName.replace(/\.mjml$/, '');
  const templatePath = path.join(process.cwd(), 'emails', `${cleanName}.mjml`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Plantilla MJML no encontrada: ${templatePath}`);
  }

  let rawMjml = fs.readFileSync(templatePath, 'utf-8');

  // Interpolate variables {{variable_name}}
  for (const [key, val] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    rawMjml = rawMjml.replace(regex, val !== undefined && val !== null ? String(val) : '');
  }

  // Compile with MJML
  const result = await mjml(rawMjml, {
    validationLevel: 'soft',
    minify: false,
  });

  return {
    html: result.html,
    errors: result.errors,
  };
}

/**
 * Sends an email using Resend API if RESEND_API_KEY is configured,
 * or safely logs to the console as mock transport.
 */
export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Insensata Estudio <turnos@insensata.com>';

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error enviando email vía Resend:', data);
        return { success: false, error: data.message || 'Error de proveedor Resend' };
      }

      console.log(`[EMAIL DISPATCH - RESEND] To: ${to} | ID: ${data.id}`);
      return { success: true, mocked: false, id: data.id };
    } catch (err) {
      console.error('Error de red al conectar con Resend:', err);
      return { success: false, error: err.message };
    }
  }

  // Mock / Console transport for development & testing
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🕯️ [INSENSATA ATELIER EMAIL DISPATCH - MOCK TRANSPORT]');
  console.log(`✉️ Para: ${to}`);
  console.log(`♰ Asunto: ${subject}`);
  console.log(`✦ Longitud HTML: ${html?.length || 0} caracteres`);
  console.log(`✦ Timestamp: ${new Date().toISOString()}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return {
    success: true,
    mocked: true,
    messageId: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  };
}

/**
 * Sends welcome email to new Aquelarre members.
 */
export async function sendWelcomeEmail({ email, name }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const { html } = await compileTemplate('bienvenida', {
      client_name: name || 'Iniciada',
      booking_url: `${baseUrl}/agendar`,
      whatsapp_number: STUDIO_WHATSAPP,
      whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
    });

    return await sendEmail({
      to: email,
      subject: '♰ Bienvenida al Aquelarre • Insensata Estudio',
      html,
    });
  } catch (error) {
    console.error('Error en sendWelcomeEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends appointment booking confirmation email with deposit instructions.
 */
export async function sendAppointmentConfirmationEmail(appointment) {
  try {
    const depositWaMsg = `Hola! Envío comprobante de transferencia de la seña para mi turno #${appointment.id} a nombre de ${appointment.client_name}.`;
    const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_CLEAN}?text=${encodeURIComponent(depositWaMsg)}`;

    const { html } = await compileTemplate('confirmacion-turno', {
      appointment_id: appointment.id,
      client_name: appointment.client_name,
      appointment_date: appointment.appointment_date,
      time_slot: appointment.time_slot,
      service_name: appointment.service_name,
      shape_length: appointment.shape_length || 'Largo estándar',
      estimated_price: appointment.estimated_price || '$28.000 ARS',
      whatsapp_number: STUDIO_WHATSAPP,
      whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
      whatsapp_url: whatsappUrl,
    });

    return await sendEmail({
      to: appointment.client_email,
      subject: `✦ Confirmación de Reserva #${appointment.id} • Insensata Estudio`,
      html,
    });
  } catch (error) {
    console.error('Error en sendAppointmentConfirmationEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends 24-hour reminder email before the scheduled appointment.
 */
export async function sendReminderEmail(appointment) {
  try {
    const reminderWaMsg = `Hola! Tengo mi turno #${appointment.id} mañana a las ${appointment.time_slot} hs. Te confirmo mi asistencia 🖤`;
    const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_CLEAN}?text=${encodeURIComponent(reminderWaMsg)}`;

    const { html } = await compileTemplate('recordatorio-24h', {
      appointment_id: appointment.id,
      client_name: appointment.client_name,
      appointment_date: appointment.appointment_date,
      time_slot: appointment.time_slot,
      service_name: appointment.service_name,
      shape_length: appointment.shape_length || 'Largo estándar',
      whatsapp_number: STUDIO_WHATSAPP,
      whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
      whatsapp_url: whatsappUrl,
    });

    return await sendEmail({
      to: appointment.client_email,
      subject: `🕯️ Recordatorio de Cita (24hs) • Turno #${appointment.id} Insensata`,
      html,
    });
  } catch (error) {
    console.error('Error en sendReminderEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Returns mock preview data for templates
 */
export function getMockTemplateVariables(templateName) {
  const cleanName = templateName.replace(/\.mjml$/, '');

  if (cleanName === 'bienvenida') {
    return {
      client_name: 'Valeria Nocturna',
      booking_url: 'http://localhost:3000/agendar',
      whatsapp_number: STUDIO_WHATSAPP,
      whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
    };
  }

  if (cleanName === 'confirmacion-turno' || cleanName === 'confirmacion') {
    return {
      appointment_id: '666',
      client_name: 'Lilith Blackwood',
      appointment_date: '2026-11-15',
      time_slot: '16:00',
      service_name: 'Esculpidas Extremas XXL & Claws',
      shape_length: 'Gothic Stiletto (Largo 4)',
      estimated_price: '$38.000 ARS',
      whatsapp_number: STUDIO_WHATSAPP,
      whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
      whatsapp_url: `https://wa.me/${STUDIO_WHATSAPP_CLEAN}?text=${encodeURIComponent('Comprobante de seña Turno #666')}`,
    };
  }

  // recordatorio-24h
  return {
    appointment_id: '777',
    client_name: 'Morgana LeFay',
    appointment_date: '2026-11-06',
    time_slot: '13:30',
    service_name: 'Soft Gel / Gel-X Haute Couture',
    shape_length: 'Coffin Afilado (Largo 3)',
    whatsapp_number: STUDIO_WHATSAPP,
    whatsapp_clean: STUDIO_WHATSAPP_CLEAN,
    whatsapp_url: `https://wa.me/${STUDIO_WHATSAPP_CLEAN}?text=${encodeURIComponent('Confirmo asistencia Turno #777')}`,
  };
}
