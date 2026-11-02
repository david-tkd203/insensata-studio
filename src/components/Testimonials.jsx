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
            Quienes pisan nuestro atelier no regresan a la manicuría ordinaria. Echa una mirada a los testimonios de nuestras iniciadas.
          </p>
        </div>

        {/* Editorial Testimonial Wall - Seamless Quote Stream (No Mirror Box Cards) */}
        <div className="hairline-border-top hairline-border-bottom">
          <div className="row g-0 justify-content-center">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="col-lg-4 editorial-quote-col d-flex flex-column justify-content-between">
                <div>
                  {/* Floating Rating & Quote Sigil */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-magenta fs-7" style={{ letterSpacing: '0.2em' }}>
                      {'✦ '.repeat(t.stars)}
                    </span>
                    <span className="text-magenta opacity-25 font-crest fs-3">“</span>
                  </div>

                  {/* Quote text */}
                  <p className="text-bone fs-6 mb-4 fst-italic" style={{ lineHeight: '1.8' }}>
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
                          width: '48px',
                          height: '48px',
                          border: '2px solid var(--neon-magenta)',
                          boxShadow: '0 0 12px rgba(255, 0, 127, 0.4)',
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
