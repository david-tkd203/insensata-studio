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
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Cada servicio incluye diagnóstico personalizado de tu lecho ungueal, manicuría rusa en seco con fresas diamantadas y aceites nutritivos orgánicos.
          </p>
        </div>

        {/* Services Cards */}
        <div className="row g-4 justify-content-center">
          {SERVICES_MENU.map((srv) => (
            <div key={srv.id} className="col-lg-6 col-xl-4">
              <div className="gothic-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Category & Badge */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-silver font-display fw-bold fs-7 text-uppercase tracking-wider">
                      {srv.category}
                    </span>
                    <span className="badge-gothic">{srv.badge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-bone fs-5 fw-bold mb-3">{srv.title}</h3>

                  {/* Meta: Duration & Price */}
                  <div
                    className="p-3 rounded mb-3 d-flex justify-content-between align-items-center"
                    style={{ background: 'rgba(32, 21, 44, 0.6)', border: '1px solid rgba(255, 0, 127, 0.15)' }}
                  >
                    <div>
                      <small className="text-bone-muted d-block" style={{ fontSize: '0.72rem' }}>
                        DURACIÓN
                      </small>
                      <span className="text-bone fw-semibold fs-7">
                        <i className="bi bi-clock me-1 text-magenta"></i>
                        {srv.duration}
                      </span>
                    </div>
                    <div className="text-end">
                      <small className="text-bone-muted d-block" style={{ fontSize: '0.72rem' }}>
                        INVERSIÓN
                      </small>
                      <span className="text-magenta fw-bold fs-6">{srv.price}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-bone-muted fs-7 mb-3" style={{ lineHeight: '1.6' }}>
                    {srv.description}
                  </p>

                  {/* Highlights */}
                  <ul className="list-unstyled mb-4">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="d-flex align-items-start gap-2 mb-2 fs-7 text-silver">
                        <span className="text-magenta">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onSelectServiceForBooking(srv.title)}
                  className="btn-gothic-primary w-100"
                >
                  <i className="bi bi-calendar-plus"></i>
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
