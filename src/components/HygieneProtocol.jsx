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
          <span className="badge-gothic px-3 py-1 mb-2">Bioseguridad & Pureza Hospitalaria</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            SANCTUM DE <span className="text-magenta">ESTERILIZACIÓN</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            La verdadera alta costura exige una asepsia intachable. En Insensata Estudio tratamos la bioseguridad con rigor médico para que disfrutes tu sesión con total serenidad.
          </p>
        </div>

        {/* Surgical Ritual Pipeline - Continuous Etched Timeline (No Sanctum Box Cards) */}
        <div className="ritual-pipeline mb-5">
          {/* Laser Timeline Track (visible on lg screens) */}
          <div className="pipeline-track d-none d-lg-block"></div>

          <div className="row g-4 justify-content-center text-center">
            {HYGIENE_PILLARS.map((pillar, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="pipeline-step h-100 d-flex flex-column align-items-center">
                  {/* Glowing Node */}
                  <div className="pipeline-node position-relative">
                    <i className={`bi ${pillar.icon} fs-4 text-magenta`}></i>
                    <span
                      className="position-absolute top-0 end-0 badge-silver rounded-circle d-flex align-items-center justify-content-center font-display"
                      style={{ width: '22px', height: '22px', fontSize: '0.62rem', transform: 'translate(25%, -25%)' }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-silver font-display fs-8 text-uppercase tracking-wider mb-1">
                    FASE 0{idx + 1}
                  </span>

                  <h3 className="font-crest text-bone fs-6 fw-bold mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-bone-muted fs-7 mb-3" style={{ lineHeight: '1.65' }}>
                    {pillar.description}
                  </p>

                  <div className="mt-auto pt-2 border-top border-dark w-100 d-flex align-items-center justify-content-center gap-1">
                    <i className="bi bi-shield-check text-magenta fs-7"></i>
                    <span className="text-magenta font-display fs-8">100% Aséptico</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Editorial Verification Ribbon (No Boxy Card Container) */}
        <div className="editorial-callout-band">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center p-2 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 0, 127, 0.12)',
                  border: '1px solid var(--neon-magenta)',
                }}
              >
                <i className="bi bi-patch-check-fill text-magenta fs-4"></i>
              </div>
              <div>
                <span className="font-crest text-bone fw-bold fs-6 d-block">
                  Apertura de Instrumental en Vivo & Testigo Químico
                </span>
                <small className="text-bone-muted" style={{ fontSize: '0.8rem' }}>
                  El sobre estéril con testigo de autoclave clase médica se desempaqueta frente a tus ojos antes de comenzar la sesión ritual.
                </small>
              </div>
            </div>
            <span className="badge-gothic px-3 py-2">Certificación Grado Hospitalario</span>
          </div>
        </div>
      </div>
    </section>
  );
}
