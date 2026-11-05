// app/api/emails/preview/route.js
import { compileTemplate, getMockTemplateVariables } from '@/lib/emailService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const templateQuery = (searchParams.get('template') || '').toLowerCase().trim();

    // Map user-friendly aliases to exact template names
    let templateName = 'bienvenida';
    if (templateQuery.includes('confirm')) {
      templateName = 'confirmacion-turno';
    } else if (templateQuery.includes('record') || templateQuery.includes('remind')) {
      templateName = 'recordatorio-24h';
    } else if (templateQuery.includes('bienv') || templateQuery.includes('welc')) {
      templateName = 'bienvenida';
    } else if (templateQuery) {
      templateName = templateQuery;
    }

    const mockVariables = getMockTemplateVariables(templateName);
    const { html, errors } = await compileTemplate(templateName, mockVariables);

    if (errors && errors.length > 0) {
      console.warn(`[MJML PREVIEW WARNINGS for ${templateName}]:`, errors);
    }

    // Add a floating preview banner bar at the top of the HTML email preview for quick navigation
    const previewNav = `
      <div style="background: #070508; border-bottom: 2px solid #ff007f; padding: 10px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #f5f0f7; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 99999;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #ff007f; font-weight: bold; font-family: serif; letter-spacing: 0.1em;">INSENSATA ATELIER</span>
          <span style="color: #9f94a6;">| Vista Previa:</span>
          <span style="background: rgba(255, 0, 127, 0.2); color: #ff007f; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${templateName}.mjml</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="/api/emails/preview?template=bienvenida" style="background: ${templateName === 'bienvenida' ? '#ff007f' : '#140e1b'}; color: #fff; text-decoration: none; padding: 5px 12px; border-radius: 4px; border: 1px solid #ff007f; font-size: 12px; font-weight: 600;">1. Bienvenida</a>
          <a href="/api/emails/preview?template=confirmacion" style="background: ${templateName === 'confirmacion-turno' ? '#ff007f' : '#140e1b'}; color: #fff; text-decoration: none; padding: 5px 12px; border-radius: 4px; border: 1px solid #ff007f; font-size: 12px; font-weight: 600;">2. Confirmación Turno</a>
          <a href="/api/emails/preview?template=recordatorio" style="background: ${templateName === 'recordatorio-24h' ? '#ff007f' : '#140e1b'}; color: #fff; text-decoration: none; padding: 5px 12px; border-radius: 4px; border: 1px solid #ff007f; font-size: 12px; font-weight: 600;">3. Recordatorio 24h</a>
        </div>
      </div>
    `;

    // Inject preview nav right after <body>
    const modifiedHtml = html.replace(/<body[^>]*>/i, (match) => `${match}\n${previewNav}`);

    return new Response(modifiedHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating email preview:', error);
    return new Response(
      `<!DOCTYPE html><html><body style="background:#070508;color:#ff007f;font-family:sans-serif;padding:40px;">
        <h2>Error al renderizar plantilla MJML</h2>
        <pre style="color:#c9c2cc;background:#140e1b;padding:20px;border-radius:6px;">${error.message}</pre>
        <p><a href="/api/emails/preview?template=bienvenida" style="color:#ff007f;">Volver a Bienvenida</a></p>
      </body></html>`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }
}
