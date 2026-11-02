'use client';

// src/components/Testimonials.jsx
import React from 'react';
import { TESTIMONIALS } from '../data/nailData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Comunidad & Confianza</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            ESPEJOS DEL <span className="text-magenta">AQUELARRE</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Quienes pisan nuestro atelier no regresan a la manicuría ordinaria. Echa una mirada a los espejos de nuestras iniciadas.
          </p>
        </div>

        {/* Testimonials Grid - Espejos Obscuros */}
        <div className="row g-4 justify-content-center">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="col-md-6 col-lg-4">
              <div className="gothic-mirror-card h-100 d-flex flex-column justify-content-between position-relative">
                {/* Mirror Keystone Rune */}
                <div className="text-center mb-1">
                  <span className="text-magenta font-serif fs-7 tracking-wider">✦ ESPEJO OBSCURO ✦</span>
                </div>

                <div>
                  {/* Floating Gothic Quote Mark & Rating */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="mirror-quote-icon">“</span>
                    <div className="text-magenta fs-7" style={{ letterSpacing: '0.15em' }}>
                      {'✦ '.repeat(t.stars)}
                    </div>
                  </div>

                  {/* Quote text */}
                  <p className="text-silver fs-7 mb-4 fst-italic" style={{ lineHeight: '1.75' }}>
                    "{t.text}"
                  </p>
                </div>

                <div>
                  {/* Set detail badge */}
                  <div className="mb-3">
                    <span
                      className="badge-silver d-inline-flex align-items-center gap-1"
                      style={{ fontSize: '0.72rem', background: 'rgba(255, 0, 127, 0.08)' }}
                    >
                      <i className="bi bi-tag-fill text-magenta"></i>
                      {t.set}
                    </span>
                  </div>

                  {/* Author Profile */}
                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-dark">
                    <div className="position-relative">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="rounded-circle object-fit-cover"
                        style={{
                          width: '50px',
                          height: '50px',
                          border: '2px solid var(--neon-magenta)',
                          boxShadow: '0 0 15px rgba(255, 0, 127, 0.45)',
                        }}
                      />
                      <span
                        className="position-absolute bottom-0 end-0 bg-dark rounded-circle text-magenta d-flex align-items-center justify-content-center"
                        style={{ width: '16px', height: '16px', fontSize: '0.6rem', border: '1px solid var(--neon-magenta)' }}
                      >
                        ♰
                      </span>
                    </div>
                    <div>
                      <h4 className="font-crest text-bone fs-7 fw-bold mb-0">{t.name}</h4>
                      <small className="text-magenta font-display d-block" style={{ fontSize: '0.74rem' }}>
                        {t.handle}
                      </small>
                      <small className="text-bone-muted" style={{ fontSize: '0.7rem' }}>
                        {t.role}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
