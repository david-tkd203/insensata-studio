'use client';

// src/components/HygieneProtocol.jsx
import React from 'react';
import { HYGIENE_PILLARS } from '../data/nailData';

export default function HygieneProtocol() {
  return (
    <section id="hygiene" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Bioseguridad & Pureza</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            PROTOCOLO <span className="text-magenta">HOSPITALARIO</span>
          </h2>
          <div className="gothic-divider">
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            La verdadera alta costura exige una asepsia intachable. En Insensata Estudio tratamos la bioseguridad con rigor médico para que disfrutes tu sesión con total serenidad.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="row g-4">
          {HYGIENE_PILLARS.map((pillar, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="gothic-card p-4 h-100 text-center text-md-start">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '54px',
                    height: '54px',
                    background: 'rgba(255, 0, 127, 0.1)',
                    border: '1px solid rgba(255, 0, 127, 0.35)',
                  }}
                >
                  <i className={`bi ${pillar.icon} fs-4 text-magenta`}></i>
                </div>
                <h3 className="font-serif text-bone fs-6 fw-bold mb-2">{pillar.title}</h3>
                <p className="text-bone-muted fs-7 mb-0" style={{ lineHeight: '1.6' }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div
          className="mt-5 p-3 rounded d-flex flex-wrap align-items-center justify-content-between gap-3"
          style={{ background: 'rgba(25, 16, 35, 0.8)', border: '1px solid rgba(201, 194, 204, 0.15)' }}
        >
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-patch-check-fill text-magenta fs-3"></i>
            <div>
              <span className="font-serif text-bone fw-bold fs-7 d-block">
                Apertura de Instrumental en Vivo
              </span>
              <small className="text-bone-muted" style={{ fontSize: '0.75rem' }}>
                El sobre estéril con testigo de autoclave se desempaqueta en tu propia mesa antes de iniciar la manicuría.
              </small>
            </div>
          </div>
          <span className="badge-gothic">Certificación Grado B</span>
        </div>
      </div>
    </section>
  );
}
