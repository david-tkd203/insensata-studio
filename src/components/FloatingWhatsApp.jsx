'use client';

// src/components/FloatingWhatsApp.jsx
import React from 'react';
import { STUDIO_INFO } from '../data/nailData';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
    '✦ Hola Insensata Estudio! Quisiera consultar por disponibilidad de turnos para uñas góticas/esculpidas 🖤'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Contactar a Insensata Estudio por WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
      <div className="floating-whatsapp-tooltip">
        ✦ Consultar Turnos por WhatsApp
      </div>
    </a>
  );
}
