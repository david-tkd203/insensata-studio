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

        {/* Pillars Grid - Sanctum Medical-Grade Bio Cards */}
        <div className="row g-4">
          {HYGIENE_PILLARS.map((pillar, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="gothic-sanctum-card h-100 text-center text-md-start position-relative d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="sanctum-orb">
                      <i className={`bi ${pillar.icon} fs-4 text-magenta`}></i>
                    </div>
                    <span className="badge-silver font-display fs-8">Fase 0{idx + 1}</span>
                  </div>

                  <h3 className="font-crest text-bone fs-6 fw-bold mb-2">{pillar.title}</h3>
                  <p className="text-bone-muted fs-7 mb-0" style={{ lineHeight: '1.65' }}>
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-top border-dark d-flex align-items-center justify-content-between">
                  <span className="text-magenta font-display fs-8">100% Aséptico</span>
                  <i className="bi bi-shield-check text-magenta fs-6"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip - Autoclave Live Verification */}
        <div
          className="mt-5 p-4 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(28, 17, 38, 0.95) 0%, rgba(13, 9, 18, 0.98) 100%)',
            border: '1px solid rgba(255, 0, 127, 0.35)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(255, 0, 127, 0.15)',
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center p-2"
              style={{ background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--neon-magenta)' }}
            >
              <i className="bi bi-patch-check-fill text-magenta fs-3"></i>
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
    </section>
  );
}
