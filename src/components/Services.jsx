'use client';

// src/components/Services.jsx
import React from 'react';
import { SERVICES_MENU } from '../data/nailData';

export default function Services({ onSelectServiceForBooking }) {
  return (
    <section id="services" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Carta de Ritualidad</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            SERVICIOS <span className="text-magenta">& ARQUITECTURA</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Cada servicio incluye diagnóstico personalizado de tu lecho ungueal, manicuría rusa en seco con fresas diamantadas y aceites nutritivos orgánicos.
          </p>
        </div>

        {/* Services Cards - Relicarios del Atelier */}
        <div className="row g-4 justify-content-center">
          {SERVICES_MENU.map((srv) => (
            <div key={srv.id} className="col-lg-6 col-xl-4">
              <div className="gothic-reliquary-card p-4 h-100 d-flex flex-column justify-content-between position-relative">
                {/* 4 Corner Sigils */}
                <span className="gothic-corner-pin pin-tl">✦</span>
                <span className="gothic-corner-pin pin-tr">♰</span>
                <span className="gothic-corner-pin pin-bl">♰</span>
                <span className="gothic-corner-pin pin-br">✦</span>

                <div>
                  {/* Category & Badge */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-silver font-display fw-bold fs-8 text-uppercase tracking-wider">
                      <span className="text-magenta me-1">♰</span> {srv.category}
                    </span>
                    <span className="badge-gothic">{srv.badge}</span>
                  </div>

                  {/* Title with occult crest mark */}
                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <h3 className="font-crest text-bone fs-5 fw-bold mb-0">
                      {srv.title}
                    </h3>
                  </div>

                  {/* Meta: Duration & Price Reliquary Box */}
                  <div
                    className="service-price-badge p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center"
                    style={{
                      background: 'rgba(28, 17, 38, 0.7)',
                      border: '1px solid rgba(255, 0, 127, 0.2)',
                    }}
                  >
                    <div>
                      <small className="text-bone-muted d-block font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                        DURACIÓN RITUAL
                      </small>
                      <span className="text-bone fw-semibold fs-7 d-flex align-items-center gap-1 mt-1">
                        <i className="bi bi-clock-history text-magenta"></i>
                        {srv.duration}
                      </span>
                    </div>
                    <div className="text-end">
                      <small className="text-bone-muted d-block font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                        INVERSIÓN
                      </small>
                      <span className="text-magenta fw-bold fs-6 price-text d-inline-block transition-transform">
                        {srv.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-bone-muted fs-7 mb-3" style={{ lineHeight: '1.65' }}>
                    {srv.description}
                  </p>

                  {/* Highlights with Cascade Hover Illumination */}
                  <ul className="list-unstyled mb-4">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="service-perk-item d-flex align-items-start gap-2 mb-2 fs-7 text-silver">
                        <span className="perk-bullet text-magenta">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button */}
                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(srv.title)}
                  className="btn-gothic-primary w-100"
                >
                  <i className="bi bi-calendar-plus text-white"></i>
                  Reservar este Ritual
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
