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
            VOCES DEL <span className="text-magenta">AQUELARRE</span>
          </h2>
          <div className="gothic-divider">
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Quienes pisan nuestro atelier no regresan a la manicuría ordinaria. Lee los testimonios de nuestras clientas más exigentes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="col-md-4">
              <div className="gothic-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Rating Stars */}
                  <div className="text-magenta mb-3 fs-6">
                    {'✦ '.repeat(t.stars)}
                  </div>

                  {/* Quote text */}
                  <p className="text-silver fs-7 mb-4 fst-italic" style={{ lineHeight: '1.7' }}>
                    "{t.text}"
                  </p>
                </div>

                <div>
                  {/* Set detail badge */}
                  <div className="mb-3">
                    <span className="badge-silver" style={{ fontSize: '0.7rem' }}>
                      <i className="bi bi-tag-fill me-1 text-magenta"></i>
                      {t.set}
                    </span>
                  </div>

                  {/* Author Profile */}
                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-dark">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="rounded-circle object-fit-cover"
                      style={{
                        width: '48px',
                        height: '48px',
                        border: '1px solid var(--neon-magenta)',
                      }}
                    />
                    <div>
                      <h4 className="font-serif text-bone fs-7 fw-bold mb-0">{t.name}</h4>
                      <small className="text-magenta font-display d-block" style={{ fontSize: '0.72rem' }}>
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
