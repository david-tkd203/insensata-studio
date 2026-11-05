'use client';

// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { STUDIO_INFO } from '../data/nailData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer
      id="contact"
      className="position-relative pt-5 pb-4"
      style={{
        background: 'linear-gradient(180deg, #0e0a12 0%, #070508 100%)',
        borderTop: '1px solid rgba(255, 0, 127, 0.25)',
      }}
    >
      <div className="container pt-3">
        <div className="row g-4 justify-content-between mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle overflow-hidden"
                style={{
                  width: '52px',
                  height: '52px',
                  border: '2px solid var(--neon-magenta)',
                  boxShadow: '0 0 14px rgba(255, 0, 127, 0.4)',
                }}
              >
                <img
                  src="/insensata_logo.jpeg"
                  alt="INSENSATA ESTUDIO"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div>
                <span className="font-crest text-bone fw-bold fs-5 d-block">
                  INSENSATA ESTUDIO
                </span>
                <span className="text-magenta font-display fs-7 fw-semibold tracking-wider">
                  Santuario de Uñas Obscuras
                </span>
              </div>
            </div>

            <p className="text-bone-muted fs-7 mb-4" style={{ lineHeight: '1.7' }}>
              Haute couture nail artistry, gothic stilettos XXL, 3D chrome piercings, velvet cat eye y brujería estética. Atendido exclusivamente por cita previa en nuestro atelier privado.
            </p>

            <div className="d-flex gap-3">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gothic-outline btn-gothic-sm p-2 text-decoration-none"
                style={{ width: '40px', height: '40px' }}
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp text-magenta"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="btn-gothic-outline btn-gothic-sm p-2 text-decoration-none"
                style={{ width: '40px', height: '40px' }}
                aria-label="Instagram"
              >
                <i className="bi bi-instagram text-magenta"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="btn-gothic-outline btn-gothic-sm p-2 text-decoration-none"
                style={{ width: '40px', height: '40px' }}
                aria-label="TikTok"
              >
                <i className="bi bi-tiktok text-magenta"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="font-serif text-bone fs-6 fw-bold mb-3 tracking-wider text-uppercase">
              Explorar
            </h4>
            <ul className="list-unstyled font-serif fs-7 d-flex flex-column gap-2">
              <li>
                <Link href="/" className="text-bone-muted text-decoration-none hover-magenta">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="text-bone-muted text-decoration-none hover-magenta">
                  Quiénes Somos / Manifiesto
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-bone-muted text-decoration-none hover-magenta">
                  El Manifiesto
                </Link>
              </li>
              <li>
                <a href="#gallery" className="text-bone-muted text-decoration-none hover-magenta">
                  Galería Obscura
                </a>
              </li>
              <li>
                <a href="#services" className="text-bone-muted text-decoration-none hover-magenta">
                  Carta de Servicios
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-magenta text-decoration-none hover-magenta fw-bold">
                  ✦ Cotizador Ritual
                </a>
              </li>
              <li>
                <a href="/politicas" className="text-bone-muted text-decoration-none hover-magenta">
                  Políticas del Atelier
                </a>
              </li>
              <li>
                <a href="/agendar" className="text-magenta text-decoration-none hover-magenta fw-bold">
                  ✦ Agendar Turno Online
                </a>
              </li>
              <li>
                <a href="/login" className="text-bone-muted text-decoration-none hover-magenta">
                  Portal Clientes / Acceso
                </a>
              </li>
              <li>
                <a href="/admin" className="text-bone-muted text-decoration-none hover-magenta">
                  Dashboard Administración ♰
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Details */}
          <div className="col-lg-3 col-md-6 col-6">
            <h4 className="font-serif text-bone fs-6 fw-bold mb-3 tracking-wider text-uppercase">
              Atelier Privado
            </h4>
            <ul className="list-unstyled fs-7 text-bone-muted d-flex flex-column gap-3">
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt text-magenta fs-6 mt-1"></i>
                <span>{STUDIO_INFO.location}</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-clock text-magenta fs-6 mt-1"></i>
                <span>{STUDIO_INFO.hours}</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-shield-check text-magenta fs-6 mt-1"></i>
                <span>{STUDIO_INFO.retentionGuarantee}</span>
              </li>
            </ul>
          </div>

          {/* Direct CTA box */}
          <div className="col-lg-3 col-md-6">
            <div
              className="gothic-card p-4 text-center"
              style={{ background: 'rgba(23, 14, 32, 0.7)' }}
            >
              <span className="text-magenta font-serif fs-6">✦ RITUALES EXCLUSIVOS ✦</span>
              <h5 className="font-crest text-bone fs-6 mt-2 mb-3">
                ¿Lista para tus próximas garras?
              </h5>
              <button onClick={onOpenBooking} className="btn-gothic-primary btn-gothic-sm w-100">
                <i className="bi bi-calendar2-heart"></i>
                Agendar Cita Privada
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-top border-dark pt-4 text-center">
          <p className="font-serif text-silver fs-7 mb-2 tracking-wide">
            "Las uñas son el único accesorio que jamás te quitas. Haz que intimiden."
          </p>
          <small className="text-bone-muted" style={{ fontSize: '0.72rem' }}>
            © {new Date().getFullYear()} INSENSATA ESTUDIO. Todos los derechos reservados. Creación Haute Couture & Dark Aesthetics.
          </small>
        </div>
      </div>
    </footer>
  );
}
