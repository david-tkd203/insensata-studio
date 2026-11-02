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

        {/* Haute Couture Atelier Services Menu - Editorial Lookbook Rows (No Card Boxes) */}
        <div className="d-flex flex-column">
          {SERVICES_MENU.map((srv, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, '0');
            return (
              <div key={srv.id} className="editorial-service-row">
                {/* Hover Laser Accent Bar */}
                <div className="service-laser-bar"></div>

                <div className="row g-4 align-items-center">
                  {/* Left Column: Number, Category & Title */}
                  <div className="col-lg-5">
                    <div className="d-flex align-items-start gap-3">
                      <span className="ghost-numeral-lg flex-shrink-0">
                        {formattedIndex}
                      </span>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="text-silver font-display fw-bold fs-8 text-uppercase tracking-wider">
                            <span className="text-magenta me-1">♰</span> {srv.category}
                          </span>
                          <span className="badge-gothic">{srv.badge}</span>
                        </div>
                        <h3 className="font-crest text-bone fs-4 fw-bold mb-2">
                          {srv.title}
                        </h3>
                        <p className="text-bone-muted fs-7 mb-0" style={{ lineHeight: '1.65' }}>
                          {srv.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Highlights & Ritual Perks */}
                  <div className="col-lg-4">
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="service-perk-item d-flex align-items-start gap-2 fs-7 text-silver">
                          <span className="perk-bullet text-magenta">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Duration, Investment & Direct Action */}
                  <div className="col-lg-3 text-lg-end">
                    <div className="mb-2">
                      <small className="text-bone-muted d-block font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                        DURACIÓN RITUAL
                      </small>
                      <span className="text-bone fw-semibold fs-7 d-inline-flex align-items-center gap-1 mt-1">
                        <i className="bi bi-clock-history text-magenta"></i>
                        {srv.duration}
                      </span>
                    </div>

                    <div className="mb-3">
                      <small className="text-bone-muted d-block font-display" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                        INVERSIÓN
                      </small>
                      <span className="font-crest text-magenta fw-bold fs-4 glow-magenta-text d-inline-block">
                        {srv.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(srv.title)}
                      className="btn-gothic-primary w-100 w-lg-auto"
                    >
                      <i className="bi bi-calendar-plus text-white"></i>
                      Reservar Ritual ♰
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
