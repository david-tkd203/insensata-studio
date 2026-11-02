'use client';

// src/components/Hero.jsx
import React from 'react';
import { STUDIO_INFO } from '../data/nailData';

export default function Hero({ onOpenBooking }) {
  return (
    <section
      id="hero"
      className="position-relative min-vh-100 d-flex align-items-center pt-5 pb-5 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(42, 18, 54, 0.75) 0%, rgba(14, 10, 18, 0.96) 60%, #070508 100%)',
      }}
    >
      {/* Decorative background grid and ambient lighting */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 0, 127, 0.1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.7,
        }}
      ></div>

      {/* Radial Occult Halo Behind Logo */}
      <div
        className="position-absolute top-25 start-50 translate-middle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 0, 127, 0.18) 0%, rgba(133, 8, 46, 0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      ></div>

      <div className="container position-relative py-5 mt-4" style={{ zIndex: 1 }}>
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-lg-10 col-xl-9">
            
            {/* Top Occult Crest with Floating Runes */}
            <div className="mb-3 d-flex align-items-center justify-content-center gap-3">
              <span className="runes-pulse text-magenta font-serif fs-5">✦ ☾</span>
              <span className="badge-gothic px-3 py-1 shadow-sm">Atelier Privado de Alta Retención</span>
              <span className="runes-pulse text-magenta font-serif fs-5">☽ ✦</span>
            </div>

            {/* Studio Logo with Glowing Aura */}
            <div className="logo-glow-wrapper mb-4">
              <div
                className="rounded-circle p-1 mx-auto"
                style={{
                  width: '155px',
                  height: '155px',
                  background: 'linear-gradient(135deg, #ff007f 0%, #85082e 50%, #070508 100%)',
                  boxShadow: '0 0 40px rgba(255, 0, 127, 0.55), 0 0 80px rgba(133, 8, 46, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <img
                  src="/insensata_logo.jpeg"
                  alt="INSENSATA ESTUDIO Brand Crest"
                  className="rounded-circle w-100 h-100 object-fit-cover"
                />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-crest text-bone fw-bold display-4 mb-2 tracking-wide text-shadow">
              INSENSATA <span className="shimmer-text">ESTUDIO</span>
            </h1>

            {/* Sub-headline / Slogan */}
            <h2
              className="font-serif text-silver text-uppercase fs-5 fw-bold mb-3"
              style={{ letterSpacing: '0.18em' }}
            >
              Santuario de Arte & Haute Couture en Uñas Obscuras
            </h2>

            {/* Atmospheric Manifest Copy */}
            <p className="text-bone-muted fs-6 mx-auto mb-4" style={{ maxWidth: '720px', lineHeight: '1.8' }}>
              Rebelión estética contra la mediocridad de las uñas nude convencionales.
              Esculpimos garras góticas de alta ingeniería: <strong className="text-bone">Stilettos XXL</strong>,
              destellos aterciopelados de <strong className="text-magenta">Cat Eye 9D</strong>, texturas de sangre jelly 3D y piercings de plata con una fijación blindada de <strong className="text-bone">4+ semanas</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
              <a href="#calculator" className="btn-gothic-primary">
                <i className="bi bi-magic text-white"></i>
                Diseñar Set Ritual & Cotizar
              </a>
              <button type="button" onClick={onOpenBooking} className="btn-gothic-outline">
                <i className="bi bi-calendar-check text-magenta"></i>
                Agendar Cita Privada
              </button>
              <a href="#gallery" className="btn-gothic-outline">
                <i className="bi bi-images text-silver"></i>
                Ver Obras de Arte
              </a>
            </div>

            {/* 4 Talismanes de Autor (Assurance Badges) */}
            <div className="row g-3 justify-content-center text-start mt-2">
              <div className="col-6 col-md-3">
                <div className="gothic-talisman-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="talisman-sigil">♰</span>
                      <span className="font-serif text-bone fw-bold" style={{ fontSize: '0.85rem' }}>
                        Stilettos XXL
                      </span>
                    </div>
                    <p className="text-bone-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                      Curvatura C y ápice reforzado anti-quiebre para largos extremos.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-top border-dark d-flex justify-content-between align-items-center">
                    <small className="text-magenta font-display fs-8">Arquitectura</small>
                    <i className="bi bi-arrow-right-short text-bone-muted"></i>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="gothic-talisman-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="talisman-sigil">☾</span>
                      <span className="font-serif text-bone fw-bold" style={{ fontSize: '0.85rem' }}>
                        3D Charms & Piercings
                      </span>
                    </div>
                    <p className="text-bone-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                      Perforaciones de plata, cruces barrocas y cadenas interdigitales.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-top border-dark d-flex justify-content-between align-items-center">
                    <small className="text-magenta font-display fs-8">Joyería</small>
                    <i className="bi bi-arrow-right-short text-bone-muted"></i>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="gothic-talisman-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="talisman-sigil">✦</span>
                      <span className="font-serif text-bone fw-bold" style={{ fontSize: '0.85rem' }}>
                        Vegano & 9-Free
                      </span>
                    </div>
                    <p className="text-bone-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                      Fórmulas libres de toxinas que cuidan tu queratina natural.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-top border-dark d-flex justify-content-between align-items-center">
                    <small className="text-magenta font-display fs-8">Pureza</small>
                    <i className="bi bi-arrow-right-short text-bone-muted"></i>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="gothic-talisman-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="talisman-sigil">☽</span>
                      <span className="font-serif text-bone fw-bold" style={{ fontSize: '0.85rem' }}>
                        4+ Semanas
                      </span>
                    </div>
                    <p className="text-bone-muted mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                      Retención blindada sin levantamientos ni desprendimientos.
                    </p>
                  </div>
                  <div className="mt-2 pt-1 border-top border-dark d-flex justify-content-between align-items-center">
                    <small className="text-magenta font-display fs-8">Garantía</small>
                    <i className="bi bi-arrow-right-short text-bone-muted"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
