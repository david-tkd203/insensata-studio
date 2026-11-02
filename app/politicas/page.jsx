'use client';

// app/politicas/page.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';

export default function PoliticasPage() {
  const [hasAgreed, setHasAgreed] = useState(false);

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative">
      <Navbar />

      <main className="pt-5 pb-5">
        <div className="container pt-5 mt-3">
          {/* Header Banner */}
          <div className="text-center mb-5">
            <span className="badge-gothic px-3 py-1 mb-2">Compromiso & Bioseguridad</span>
            <h1 className="font-crest text-bone fw-bold display-5 mb-2">
              POLÍTICAS DEL <span className="text-magenta">ATELIER</span>
            </h1>
            <div className="gothic-divider">
              <span>✦ ☾ ♰ ☽ ✦</span>
            </div>
            <p className="text-bone-muted mx-auto fs-6" style={{ maxWidth: '720px' }}>
              En INSENSATA ESTUDIO cada cita es un ritual personalizado de 2 a 3+ horas de dedicación exclusiva.
              Para preservar los más altos estándares de alta costura, solicitamos leer atentamente nuestras cláusulas.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">

              {/* Policy 1: Seña y Reserva */}
              <div className="gothic-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '1px solid var(--neon-magenta)',
                    }}
                  >
                    <i className="bi bi-cash-coin fs-5 text-magenta"></i>
                  </div>
                  <div>
                    <span className="text-magenta font-display fw-bold fs-7 text-uppercase">Cláusula 01</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Seña del 50% & Reserva Obligatoria</h2>
                  </div>
                </div>
                <p className="text-silver fs-7 mb-2" style={{ lineHeight: '1.8' }}>
                  Para bloquear definitivamente tu fecha y franja horaria en la agenda del Atelier, se requiere el abono previo de una <strong>seña del 50%</strong> del valor base del servicio solicitado vía transferencia bancaria o Mercado Pago dentro de las <strong>2 horas</strong> de realizada la solicitud online.
                </p>
                <div className="p-3 rounded mt-3" style={{ background: 'rgba(133, 8, 46, 0.2)', border: '1px solid rgba(255, 0, 127, 0.25)' }}>
                  <p className="text-bone fs-8 mb-0">
                    <strong className="text-magenta">IMPORTANTE:</strong> La seña NO es reembolsable bajo ningún concepto en caso de cancelación o inasistencia de la clienta, ya que cubre el bloqueo de 3 horas del atelier y la preparación estéril de instrumentales.
                  </p>
                </div>
              </div>

              {/* Policy 2: Puntualidad */}
              <div className="gothic-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '1px solid var(--neon-magenta)',
                    }}
                  >
                    <i className="bi bi-clock-history fs-5 text-magenta"></i>
                  </div>
                  <div>
                    <span className="text-magenta font-display fw-bold fs-7 text-uppercase">Cláusula 02</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Tolerancia Estricta de 15 Minutos</h2>
                  </div>
                </div>
                <p className="text-silver fs-7 mb-2" style={{ lineHeight: '1.8' }}>
                  Nuestras estructuras (Stilettos XXL, Soft Gel y manicuría rusa micrométrica) requieren tiempos exactos de polimerización y tallado. Disponemos de una tolerancia máxima de <strong>15 minutos</strong>.
                </p>
                <ul className="text-bone-muted fs-7 ps-3 mb-0" style={{ lineHeight: '1.8' }}>
                  <li>Si llegas entre 10 y 15 minutos tarde, el diseño de nail art complejo o 3D charms deberá simplificarse para no perjudicar a la siguiente clienta.</li>
                  <li>Superados los 15 minutos de retraso, el turno se considerará cancelado automáticamente con pérdida total de la seña abonada.</li>
                </ul>
              </div>

              {/* Policy 3: Salud Ungular */}
              <div className="gothic-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '1px solid var(--neon-magenta)',
                    }}
                  >
                    <i className="bi bi-heart-pulse fs-5 text-magenta"></i>
                  </div>
                  <div>
                    <span className="text-magenta font-display fw-bold fs-7 text-uppercase">Cláusula 03</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Bioseguridad & Salud Ungular</h2>
                  </div>
                </div>
                <p className="text-silver fs-7 mb-2" style={{ lineHeight: '1.8' }}>
                  Priorizamos la salud anatómica de tu lecho ungueal por sobre cualquier estética.
                  <strong> No realizamos aplicaciones</strong> sobre uñas con:
                </p>
                <div className="row g-2 my-2">
                  <div className="col-sm-6">
                    <div className="p-2 rounded bg-obsidian-surface border border-secondary text-bone fs-8">
                      <i className="bi bi-x-octagon text-crimson me-2"></i> Onicomicosis (hongos) sospechada o confirmada
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-2 rounded bg-obsidian-surface border border-secondary text-bone fs-8">
                      <i className="bi bi-x-octagon text-crimson me-2"></i> Infección bacteriana activa (Pseudomonas verde)
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-2 rounded bg-obsidian-surface border border-secondary text-bone fs-8">
                      <i className="bi bi-x-octagon text-crimson me-2"></i> Heridas abiertas, dermatitis o quemaduras
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-2 rounded bg-obsidian-surface border border-secondary text-bone fs-8">
                      <i className="bi bi-x-octagon text-crimson me-2"></i> Desprendimiento severo (Onicólisis total)
                    </div>
                  </div>
                </div>
                <p className="text-bone-muted fs-8 mt-2 mb-0">
                  Si al presentarte detectamos alguna de estas afecciones, el servicio se derivará a dermatología o podología sin excepción.
                </p>
              </div>

              {/* Policy 4: Cuidados y Garantía */}
              <div className="gothic-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '1px solid var(--neon-magenta)',
                    }}
                  >
                    <i className="bi bi-shield-check fs-5 text-magenta"></i>
                  </div>
                  <div>
                    <span className="text-magenta font-display fw-bold fs-7 text-uppercase">Cláusula 04</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Cuidados Posteriores & Garantía de 72 hs</h2>
                  </div>
                </div>
                <p className="text-silver fs-7 mb-2" style={{ lineHeight: '1.8' }}>
                  Nuestras estructuras garantizan una retención superior a <strong>4 semanas</strong> si se siguen las pautas fundamentales:
                </p>
                <ul className="text-bone-muted fs-7 ps-3 mb-3" style={{ lineHeight: '1.8' }}>
                  <li>Tus uñas son joyas góticas, no destornilladores ni herramientas. Evita apalancamientos con objetos duros.</li>
                  <li>Aplica aceite botánico para cutículas 1 a 2 veces al día para conservar la hidratación de los surcos periungueales.</li>
                  <li>Utiliza guantes de látex o nitrilo al manipular productos químicos abrasivos (lavandina concentrada, solventes).</li>
                  <li><strong>Nunca arranques las uñas con los dientes o pinzas:</strong> el retiro incorrecto desgasta capas de queratina. Solicita siempre nuestro Service de Retiro Seguro.</li>
                </ul>
                <div className="p-3 rounded" style={{ background: 'rgba(255, 0, 127, 0.1)', border: '1px solid rgba(255, 0, 127, 0.3)' }}>
                  <span className="text-magenta fw-bold fs-8 d-block mb-1">GARANTÍA INSENSATA 72 HORAS:</span>
                  <p className="text-bone fs-8 mb-0">
                    Cualquier desprendimiento prematuro involuntario dentro de las primeras 72 horas posteriores a la sesión se repara completamente gratis en el atelier.
                  </p>
                </div>
              </div>

              {/* Policy 5: Reprogramaciones */}
              <div className="gothic-card p-4 p-md-5 mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 0, 127, 0.15)',
                      border: '1px solid var(--neon-magenta)',
                    }}
                  >
                    <i className="bi bi-arrow-repeat fs-5 text-magenta"></i>
                  </div>
                  <div>
                    <span className="text-magenta font-display fw-bold fs-7 text-uppercase">Cláusula 05</span>
                    <h2 className="font-serif text-bone fs-5 mb-0">Reprogramaciones de Fecha</h2>
                  </div>
                </div>
                <p className="text-silver fs-7 mb-0" style={{ lineHeight: '1.8' }}>
                  Se permite reprogramar la fecha de tu turno por única vez, siempre que el aviso sea enviado vía WhatsApp con un mínimo de <strong>48 horas hábiles de antelación</strong>. De este modo, la seña se trasladará a la nueva fecha convenida (a utilizar dentro de los 30 días posteriores).
                </p>
              </div>

              {/* Agreement Box & Direct Link to Booking */}
              <div
                className="gothic-card p-4 text-center mt-5"
                style={{
                  background: 'linear-gradient(180deg, rgba(35, 18, 44, 0.95) 0%, rgba(14, 10, 18, 0.98) 100%)',
                  border: '1px solid var(--neon-magenta)',
                  boxShadow: '0 0 25px rgba(255, 0, 127, 0.25)',
                }}
              >
                <div className="mb-3">
                  <i className="bi bi-feather text-magenta fs-2"></i>
                </div>
                <h3 className="font-crest text-bone fs-4 mb-2">Consentimiento Informado</h3>
                <p className="text-bone-muted fs-7 mb-4">
                  Al solicitar una cita en Insensata Estudio, confirmas que has leído, comprendido y aceptado en su totalidad las políticas de bioseguridad, seña y puntualidad detalladas precedentemente.
                </p>

                <div className="form-check d-inline-block text-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="consentCheck"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    style={{
                      backgroundColor: hasAgreed ? 'var(--neon-magenta)' : 'transparent',
                      borderColor: 'var(--neon-magenta)',
                      cursor: 'pointer',
                    }}
                  />
                  <label className="form-check-label text-bone fs-7 ms-2" htmlFor="consentCheck" style={{ cursor: 'pointer' }}>
                    He leído y acepto los términos, bioseguridad y políticas de seña del Atelier.
                  </label>
                </div>

                <div>
                  <Link
                    href="/agendar"
                    className={`btn-gothic-primary ${!hasAgreed ? 'opacity-75' : ''}`}
                  >
                    <i className="bi bi-calendar2-heart"></i>
                    Continuar al Portal de Agendamiento ✦
                  </Link>
                </div>
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
