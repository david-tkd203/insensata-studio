'use client';

// app/agendar/page.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';
import { SERVICES_MENU, CALCULATOR_SHAPES, STUDIO_INFO } from '@/src/data/nailData';

export default function AgendarPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Form states
  const [selectedService, setSelectedService] = useState(SERVICES_MENU[0].id);
  const [selectedShape, setSelectedShape] = useState(CALCULATOR_SHAPES[2].name); // Gothic Stiletto
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);

  // Availability state
  const [availabilityData, setAvailabilityData] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdAppointment, setCreatedAppointment] = useState(null);

  // Set default date to tomorrow in YYYY-MM-DD
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setAppointmentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Fetch current user
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setClientName(data.user.name || '');
          setClientEmail(data.user.email || '');
          setClientPhone(data.user.phone || '');
        }
      } catch (err) {
        console.error('Error fetching auth:', err);
      } finally {
        setLoadingUser(false);
      }
    }
    loadUser();
  }, []);

  // Fetch availability when date changes
  useEffect(() => {
    if (!appointmentDate) return;

    async function fetchAvailability() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/availability?date=${appointmentDate}`);
        const data = await res.json();
        setAvailabilityData(data);

        // Auto select first available slot
        if (data.slots) {
          const firstAvail = data.slots.find((s) => s.available);
          if (firstAvail) {
            setSelectedTimeSlot(firstAvail.slot);
          } else {
            setSelectedTimeSlot('');
          }
        }
      } catch (err) {
        console.error('Error loading slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchAvailability();
  }, [appointmentDate]);

  const activeServiceObj = SERVICES_MENU.find((s) => s.id === selectedService) || SERVICES_MENU[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!selectedTimeSlot) {
      setSubmitError('Por favor seleccione un horario disponible para su cita.');
      return;
    }

    if (!acceptedPolicies) {
      setSubmitError('Debe aceptar las políticas de seña y tolerancia del Atelier.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          service_id: activeServiceObj.id,
          service_name: activeServiceObj.title,
          shape_length: selectedShape,
          appointment_date: appointmentDate,
          time_slot: selectedTimeSlot,
          estimated_price: activeServiceObj.price,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Ocurrió un error al agendar su cita.');
        setIsSubmitting(false);
        return;
      }

      setCreatedAppointment(data.appointment);
    } catch (err) {
      console.error('Booking submit error:', err);
      setSubmitError('Error de red al procesar el turno. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!createdAppointment) return '#';
    const msg = `✦ *CONFIRMACIÓN DE TURNO - INSENSATA ESTUDIO* ✦
    
ID de Reserva: #${createdAppointment.id}
Clienta: ${createdAppointment.client_name}
Servicio: ${createdAppointment.service_name}
Largo/Forma: ${createdAppointment.shape_length}
Fecha: ${createdAppointment.appointment_date}
Horario: ${createdAppointment.time_slot} hs
Presupuesto Base: ${createdAppointment.estimated_price}

¡Hola Insensata! Acabo de reservar mi turno en la web y quiero enviar el comprobante de seña para confirmar mi lugar 🖤`;

    return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative">
      <Navbar />

      <main className="pt-5 pb-5">
        <div className="container pt-5 mt-3">
          {/* Header */}
          <div className="text-center mb-5">
            <span className="badge-gothic px-3 py-1 mb-2">Portal de Agendamiento</span>
            <h1 className="font-crest text-bone fw-bold display-5 mb-2">
              RESERVA TU <span className="text-magenta">RITUAL</span>
            </h1>
            <div className="gothic-divider">
              <span>✦ ☾ ♰ ☽ ✦</span>
            </div>
            <p className="text-bone-muted mx-auto fs-6" style={{ maxWidth: '680px' }}>
              Selecciona tu servicio de alta costura, forma, fecha y franja horaria. Bloquearemos tu lugar de forma instantánea.
            </p>
          </div>

          {/* Success Screen after booking */}
          {createdAppointment ? (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  className="gothic-card p-4 p-md-5 text-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(35, 18, 44, 0.95) 0%, rgba(14, 10, 18, 0.98) 100%)',
                    border: '1px solid var(--neon-magenta)',
                    boxShadow: '0 0 35px rgba(255, 0, 127, 0.35)',
                  }}
                >
                  <div className="mb-3">
                    <i className="bi bi-check-circle-fill text-magenta" style={{ fontSize: '3.5rem' }}></i>
                  </div>
                  <span className="badge-gothic mb-2">Reserva Registrada Exitosamente</span>
                  <h2 className="font-crest text-bone fs-3 mb-3">
                    ¡TURNO REGISTRADO #<span className="text-magenta">{createdAppointment.id}</span>!
                  </h2>
                  <p className="text-silver fs-6 mb-4">
                    Tu solicitud ha sido guardada en estado <span className="badge-status-pendiente px-2 py-1 rounded fw-bold">Pendiente</span>.
                    Para confirmar definitivamente tu lugar en la agenda del Atelier, coordina la seña del 50%.
                  </p>

                  {/* Summary Box */}
                  <div className="p-4 rounded bg-obsidian-surface text-start mb-4 border border-dark">
                    <h5 className="font-serif text-magenta fs-6 mb-3">Detalle de tu Cita:</h5>
                    <div className="row g-2 fs-7">
                      <div className="col-sm-6 text-bone-muted">Servicio:</div>
                      <div className="col-sm-6 text-bone fw-bold">{createdAppointment.service_name}</div>

                      <div className="col-sm-6 text-bone-muted">Forma / Longitud:</div>
                      <div className="col-sm-6 text-bone">{createdAppointment.shape_length}</div>

                      <div className="col-sm-6 text-bone-muted">Fecha y Hora:</div>
                      <div className="col-sm-6 text-magenta fw-bold">
                        {createdAppointment.appointment_date} — {createdAppointment.time_slot} hs
                      </div>

                      <div className="col-sm-6 text-bone-muted">Clienta:</div>
                      <div className="col-sm-6 text-bone">{createdAppointment.client_name} ({createdAppointment.client_phone})</div>

                      <div className="col-sm-6 text-bone-muted">Presupuesto Estimado:</div>
                      <div className="col-sm-6 text-bone fw-bold">{createdAppointment.estimated_price}</div>
                    </div>
                  </div>

                  {/* Seña Payment Info */}
                  <div className="p-3 rounded mb-4 text-start" style={{ background: 'rgba(255, 0, 127, 0.08)', border: '1px solid rgba(255, 0, 127, 0.3)' }}>
                    <h6 className="text-magenta font-serif fs-7 fw-bold mb-2">
                      <i className="bi bi-bank me-2"></i> Datos para Transferencia de la Seña (50%):
                    </h6>
                    <p className="text-bone fs-8 mb-1"><strong>Alias:</strong> INSENSATA.NAILS</p>
                    <p className="text-bone fs-8 mb-1"><strong>CBU:</strong> 0000003100012849320194</p>
                    <p className="text-bone-muted fs-8 mb-0">Envía el comprobante por WhatsApp mencionando tu número de turno #<strong>{createdAppointment.id}</strong>.</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <a
                      href={getWhatsAppConfirmationUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gothic-primary"
                    >
                      <i className="bi bi-whatsapp"></i>
                      Enviar Seña por WhatsApp
                    </a>

                    {currentUser ? (
                      <Link href="/perfil" className="btn-gothic-outline">
                        <i className="bi bi-person-circle"></i>
                        Ver en Mi Cuenta
                      </Link>
                    ) : (
                      <Link href="/registro" className="btn-gothic-outline">
                        <i className="bi bi-person-plus"></i>
                        Crear Cuenta para Guardar Historial
                      </Link>
                    )}

                    <button
                      onClick={() => setCreatedAppointment(null)}
                      className="btn-gothic-outline"
                    >
                      Agendar Otro Turno
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="row g-4 justify-content-center">
              <div className="col-lg-8 col-xl-7">

                {/* Step 1: Select Service */}
                <div className="gothic-card p-4 mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge-gothic">Paso 1</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Selecciona el Servicio</h2>
                  </div>

                  <div className="row g-3">
                    {SERVICES_MENU.map((srv) => {
                      const isSelected = selectedService === srv.id;
                      return (
                        <div key={srv.id} className="col-12">
                          <div
                            onClick={() => setSelectedService(srv.id)}
                            className="p-3 rounded cursor-pointer transition-all"
                            style={{
                              background: isSelected ? 'rgba(255, 0, 127, 0.15)' : 'rgba(14, 10, 18, 0.7)',
                              border: isSelected ? '2px solid var(--neon-magenta)' : '1px solid rgba(201, 194, 204, 0.15)',
                              cursor: 'pointer',
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="font-serif text-bone fw-bold fs-6">{srv.title}</span>
                              <span className="text-magenta fw-bold fs-7">{srv.price}</span>
                            </div>
                            <p className="text-bone-muted fs-8 mb-2">{srv.description}</p>
                            <div className="d-flex align-items-center gap-3">
                              <span className="badge-silver fs-8">
                                <i className="bi bi-clock me-1 text-magenta"></i> {srv.duration}
                              </span>
                              <span className="badge-gothic fs-8">{srv.badge}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Shape & Length */}
                <div className="gothic-card p-4 mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge-gothic">Paso 2</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Forma y Longitud</h2>
                  </div>

                  <div className="row g-2">
                    {CALCULATOR_SHAPES.map((shape) => {
                      const isSelected = selectedShape === shape.name;
                      return (
                        <div key={shape.id} className="col-md-6">
                          <div
                            onClick={() => setSelectedShape(shape.name)}
                            className="p-3 rounded h-100"
                            style={{
                              background: isSelected ? 'rgba(255, 0, 127, 0.15)' : 'rgba(14, 10, 18, 0.7)',
                              border: isSelected ? '2px solid var(--neon-magenta)' : '1px solid rgba(201, 194, 204, 0.15)',
                              cursor: 'pointer',
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-bone fw-semibold fs-7">{shape.name}</span>
                              {isSelected && <i className="bi bi-check-circle-fill text-magenta"></i>}
                            </div>
                            <small className="text-magenta fs-8 d-block mt-1">✦ {shape.tag}</small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date & Slots */}
                <div className="gothic-card p-4 mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge-gothic">Paso 3</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Fecha y Horario Disponible</h2>
                  </div>

                  {/* Date Input */}
                  <div className="mb-4">
                    <label className="form-label text-silver fs-7">Fecha de la Cita Ritual:</label>
                    <input
                      type="date"
                      className="form-control form-control-gothic"
                      value={appointmentDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                    />
                    <small className="text-bone-muted fs-8 mt-1 d-block">
                      Horario de atención: Martes a Sábado de 11:00 a 20:30 hs.
                    </small>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="form-label text-silver fs-7 d-block mb-2">Franja Horaria:</label>

                    {loadingSlots ? (
                      <div className="p-3 text-center text-bone-muted fs-7">
                        <span className="spinner-border spinner-border-sm text-magenta me-2" role="status"></span>
                        Consultando disponibilidad con el Atelier...
                      </div>
                    ) : availabilityData?.isWholeDayBlocked ? (
                      <div className="p-3 rounded bg-danger-subtle text-danger border border-danger fs-7">
                        <i className="bi bi-slash-circle me-2"></i>
                        El atelier se encuentra completamente bloqueado o cerrado para esta fecha. Por favor seleccione otro día.
                      </div>
                    ) : (
                      <div className="row g-2">
                        {availabilityData?.slots.map((slotObj) => {
                          const isSelected = selectedTimeSlot === slotObj.slot;
                          return (
                            <div key={slotObj.slot} className="col-6 col-sm-3">
                              <button
                                type="button"
                                disabled={!slotObj.available}
                                onClick={() => setSelectedTimeSlot(slotObj.slot)}
                                className={`w-100 p-3 rounded text-center border font-serif fs-6 transition-all ${
                                  !slotObj.available
                                    ? 'opacity-40 bg-dark text-secondary border-dark'
                                    : isSelected
                                    ? 'bg-magenta text-white border-magenta shadow'
                                    : 'bg-obsidian-surface text-bone border-secondary'
                                }`}
                                style={{
                                  backgroundColor: isSelected ? 'var(--neon-magenta)' : undefined,
                                  borderColor: isSelected ? 'var(--neon-magenta)' : undefined,
                                  boxShadow: isSelected ? '0 0 15px rgba(255, 0, 127, 0.4)' : undefined,
                                  cursor: slotObj.available ? 'pointer' : 'not-allowed',
                                }}
                              >
                                <span className="d-block fw-bold">{slotObj.slot} hs</span>
                                <small style={{ fontSize: '0.68rem' }}>
                                  {slotObj.available ? 'Disponible ✦' : slotObj.reason || 'Ocupado'}
                                </small>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 4: Client Contact Info */}
                <div className="gothic-card p-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-gothic">Paso 4</span>
                      <h2 className="font-serif text-bone fs-5 mb-0">Tus Datos de Contacto</h2>
                    </div>
                    {currentUser && (
                      <span className="badge-silver fs-8">
                        <i className="bi bi-person-check text-magenta me-1"></i> Sesión Iniciada
                      </span>
                    )}
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-silver fs-7">Nombre y Apellido *</label>
                      <input
                        type="text"
                        className="form-control form-control-gothic"
                        placeholder="Ej. Valeria Nocturna"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-silver fs-7">WhatsApp / Teléfono *</label>
                      <input
                        type="tel"
                        className="form-control form-control-gothic"
                        placeholder="Ej. +54 9 11 5555-6666"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-silver fs-7">Correo Electrónico *</label>
                      <input
                        type="email"
                        className="form-control form-control-gothic"
                        placeholder="valeria@ejemplo.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-silver fs-7">Notas / Referencias de Nail Art o Moodboard</label>
                      <textarea
                        className="form-control form-control-gothic"
                        rows="3"
                        placeholder="Descríbenos tus ideas: charms deseados, piercing de cruz, colores, si traes material previo para retirar, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Step 5: Acceptance & Confirmation */}
                <div className="gothic-card p-4 mb-4">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="policyAgree"
                      checked={acceptedPolicies}
                      onChange={(e) => setAcceptedPolicies(e.target.checked)}
                      style={{
                        backgroundColor: acceptedPolicies ? 'var(--neon-magenta)' : 'transparent',
                        borderColor: 'var(--neon-magenta)',
                        cursor: 'pointer',
                      }}
                      required
                    />
                    <label className="form-check-label text-silver fs-7 ms-2" htmlFor="policyAgree" style={{ cursor: 'pointer' }}>
                      He leído y acepto la <strong>seña del 50%</strong> para reserva y la tolerancia estricta de <strong>15 minutos</strong> según las{' '}
                      <Link href="/politicas" target="_blank" className="text-magenta text-decoration-underline">
                        Políticas del Atelier
                      </Link>.
                    </label>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded mb-3 bg-danger-subtle text-danger border border-danger fs-7">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedTimeSlot}
                    className="btn-gothic-primary w-100 py-3 fs-6"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Registrando Cita en el Atelier...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-calendar2-heart"></i>
                        Confirmar y Agendar Cita Privada ✦
                      </>
                    )}
                  </button>
                </div>

              </div>
            </form>
          )}

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
