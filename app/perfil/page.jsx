'use client';

// app/perfil/page.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';
import { STUDIO_INFO } from '@/src/data/nailData';

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const router = useRouter();

  const loadData = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();

      if (!meData.authenticated || !meData.user) {
        router.push('/login');
        return;
      }

      setUser(meData.user);

      // Fetch user appointments
      const apptRes = await fetch('/api/appointments');
      const apptData = await apptRes.json();
      if (apptData.appointments) {
        setAppointments(apptData.appointments);
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancelAppointment = async (id) => {
    if (!confirm('¿Estás segura de que deseas cancelar este turno pendiente?')) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelado' }),
      });

      if (res.ok) {
        await loadData();
      } else {
        const err = await res.json();
        alert(err.error || 'No se pudo cancelar el turno.');
      }
    } catch (err) {
      console.error('Cancel appointment error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendiente':
        return <span className="badge-status-pendiente px-2 py-1 rounded fw-bold fs-8">Pendiente de Seña</span>;
      case 'Confirmado':
        return <span className="badge-status-confirmado px-2 py-1 rounded fw-bold fs-8">Confirmado ✦ Asegurado</span>;
      case 'Completado':
        return <span className="badge-status-completado px-2 py-1 rounded fw-bold fs-8">Completado</span>;
      case 'Cancelado':
        return <span className="badge-status-cancelado px-2 py-1 rounded fw-bold fs-8">Cancelado</span>;
      default:
        return <span className="badge-silver fs-8">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-obsidian-void text-bone min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <span className="spinner-border text-magenta mb-3" role="status"></span>
          <p className="font-serif text-silver">Cargando tu santuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative">
      <Navbar />

      <main className="pt-5 pb-5">
        <div className="container pt-5 mt-3">
          {/* Header */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5 border-bottom border-dark pb-4">
            <div>
              <span className="badge-gothic mb-1">Portal Privado</span>
              <h1 className="font-crest text-bone fw-bold display-6 mb-1">
                MI CUENTA & <span className="text-magenta">HISTORIAL</span>
              </h1>
              <p className="text-bone-muted fs-7 mb-0">
                Bienvenida de regreso, <strong className="text-bone">{user.name}</strong> ✦
              </p>
            </div>

            <div className="d-flex gap-2">
              {user.role === 'admin' && (
                <Link href="/admin" className="btn-gothic-outline text-magenta border-magenta">
                  <i className="bi bi-shield-lock-fill text-magenta"></i>
                  Panel de Administración
                </Link>
              )}
              <Link href="/agendar" className="btn-gothic-primary">
                <i className="bi bi-calendar2-heart"></i>
                Agendar Nuevo Ritual
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {/* User Profile Card */}
            <div className="col-lg-4">
              <div className="gothic-card p-4 mb-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '2px solid var(--neon-magenta)',
                      boxShadow: '0 0 15px rgba(255, 0, 127, 0.3)',
                    }}
                  >
                    <i className="bi bi-person-heart text-magenta fs-3"></i>
                  </div>
                  <div>
                    <h5 className="font-serif text-bone fw-bold mb-0">{user.name}</h5>
                    <span className="text-magenta font-display fs-8 text-uppercase">
                      {user.role === 'admin' ? 'Atelier Directrice ♰' : 'Miembro Insensata'}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3 fs-7 text-bone-muted border-top border-dark pt-3">
                  <div>
                    <span className="d-block text-silver fw-semibold fs-8">CORREO:</span>
                    <span className="text-bone">{user.email}</span>
                  </div>
                  <div>
                    <span className="d-block text-silver fw-semibold fs-8">WHATSAPP:</span>
                    <span className="text-bone">{user.phone || 'No registrado'}</span>
                  </div>
                  <div>
                    <span className="d-block text-silver fw-semibold fs-8">MIEMBRO DESDE:</span>
                    <span className="text-bone">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('es-AR') : '2026'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seña info box */}
              <div
                className="gothic-card p-4"
                style={{ background: 'rgba(23, 14, 32, 0.6)', border: '1px solid rgba(255, 0, 127, 0.2)' }}
              >
                <h6 className="font-serif text-magenta fs-7 fw-bold mb-2">
                  <i className="bi bi-info-circle me-1"></i> Estado de tus Turnos:
                </h6>
                <p className="text-bone-muted fs-8 mb-2">
                  Los turnos en estado <strong>Pendiente</strong> requieren el comprobante de la seña del 50% dentro de las 2 horas para su confirmación definitiva.
                </p>
                <Link href="/politicas" className="text-magenta fs-8 text-decoration-underline">
                  Consultar políticas completas del Atelier →
                </Link>
              </div>
            </div>

            {/* Appointments List */}
            <div className="col-lg-8">
              <div className="gothic-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="font-serif text-bone fs-5 fw-bold mb-0">
                    <i className="bi bi-calendar-week text-magenta me-2"></i>
                    Tus Citas & Reservas ({appointments.length})
                  </h3>
                </div>

                {appointments.length === 0 ? (
                  <div className="p-5 text-center text-bone-muted">
                    <i className="bi bi-calendar-x fs-1 text-silver opacity-50 mb-3 d-block"></i>
                    <h5 className="font-serif text-silver fs-6">Aún no tienes turnos registrados</h5>
                    <p className="fs-7 mb-4">Tu armadura estética te espera. Elige el diseño de tus sueños.</p>
                    <Link href="/agendar" className="btn-gothic-primary btn-gothic-sm">
                      <i className="bi bi-calendar-plus"></i> Agendar mi Primer Turno
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {appointments.map((appt) => (
                      <div
                        key={appt.id}
                        className="p-4 rounded border transition-all"
                        style={{
                          background: 'rgba(14, 10, 18, 0.8)',
                          borderColor:
                            appt.status === 'Confirmado'
                              ? 'rgba(40, 167, 69, 0.4)'
                              : appt.status === 'Pendiente'
                              ? 'rgba(255, 193, 7, 0.4)'
                              : 'rgba(201, 194, 204, 0.15)',
                        }}
                      >
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                          <div>
                            <span className="text-magenta font-display fs-8 fw-bold">TURNO #{appt.id}</span>
                            <h4 className="font-serif text-bone fs-6 fw-bold mb-1">{appt.service_name}</h4>
                            <span className="text-silver fs-7">
                              <i className="bi bi-palette text-magenta me-1"></i> {appt.shape_length}
                            </span>
                          </div>
                          <div>{getStatusBadge(appt.status)}</div>
                        </div>

                        <div className="row g-2 fs-7 p-3 rounded mb-3 bg-obsidian-surface border border-dark">
                          <div className="col-sm-6">
                            <span className="text-bone-muted d-block fs-8">FECHA Y HORARIO:</span>
                            <span className="text-bone fw-bold">
                              <i className="bi bi-calendar-event text-magenta me-1"></i>
                              {appt.appointment_date} — {appt.time_slot} hs
                            </span>
                          </div>
                          <div className="col-sm-6">
                            <span className="text-bone-muted d-block fs-8">PRESUPUESTO ESTIMADO:</span>
                            <span className="text-magenta fw-bold">{appt.estimated_price}</span>
                          </div>
                          {appt.notes && (
                            <div className="col-12 mt-2 pt-2 border-top border-dark">
                              <span className="text-bone-muted d-block fs-8">NOTAS / REFERENCIA:</span>
                              <span className="text-bone fs-8 fst-italic">{appt.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions for this appointment */}
                        <div className="d-flex flex-wrap justify-content-end align-items-center gap-2">
                          {appt.status === 'Pendiente' && (
                            <>
                              <a
                                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                                  `Hola Insensata! Quisiera enviar el comprobante de seña para mi turno #${appt.id} del día ${appt.appointment_date} a las ${appt.time_slot} hs 🖤`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-gothic-outline btn-gothic-sm text-magenta"
                              >
                                <i className="bi bi-whatsapp"></i> Coordinar Seña
                              </a>

                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                disabled={actionLoading === appt.id}
                                className="btn-gothic-outline btn-gothic-sm text-danger border-danger"
                              >
                                {actionLoading === appt.id ? (
                                  <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                  <>
                                    <i className="bi bi-x-circle"></i> Cancelar
                                  </>
                                )}
                              </button>
                            </>
                          )}

                          {appt.status === 'Confirmado' && (
                            <span className="text-success fs-8 fw-semibold">
                              <i className="bi bi-check-all me-1"></i> Seña recibida. ¡Te esperamos en el Atelier!
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
