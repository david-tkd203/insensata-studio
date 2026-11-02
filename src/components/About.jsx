'use client';

// src/components/About.jsx
import React from 'react';

export default function About({ onOpenBooking }) {
  return (
    <section id="about" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Filosofía & Atelier</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            EL MANIFIESTO <span className="text-magenta">INSENSATO</span>
          </h2>
          <div className="gothic-divider">
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Nacimos de la necesidad visceral de trascender los salones convencionales. Donde otros ven un simple servicio de belleza, nosotros consagramos un ritual de arte obscuro y arquitectura estética.
          </p>
        </div>

        {/* Narrative & Atelier Pillars */}
        <div className="row g-4 align-items-center mb-5">
          {/* Left Column: Visual Manifest Card */}
          <div className="col-lg-5">
            <div
              className="gothic-card p-4 p-md-5 position-relative text-center overflow-hidden"
              style={{
                border: '1px solid rgba(255, 0, 127, 0.3)',
                background: 'linear-gradient(180deg, rgba(35, 18, 44, 0.9) 0%, rgba(14, 10, 18, 0.95) 100%)',
              }}
            >
              <div className="mb-4">
                <i className="bi bi-moon-stars text-magenta fs-1"></i>
              </div>
              <h3 className="font-crest text-bone fs-4 mb-3">
                "No son solo uñas. Es tu armadura diaria."
              </h3>
              <p className="text-bone-muted fs-6 mb-4" style={{ lineHeight: '1.8' }}>
                En un mundo saturado de uñas nude genéricas y manicurías apresuradas de 40 minutos, en Insensata dedicamos horas de concentración quirúrgica a cada uña. Cada curva, cada gota de sangre tridimensional y cada piercing de plata se talla a mano alzada para reflejar tu verdadera esencia sin concesiones.
              </p>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <span className="font-serif text-silver text-uppercase fs-7 tracking-wider">
                  ✦ Retención Extrema
                </span>
                <span className="text-magenta">•</span>
                <span className="font-serif text-silver text-uppercase fs-7 tracking-wider">
                  Cero Desprendimientos
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Pillars */}
          <div className="col-lg-7">
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="gothic-card p-4 h-100">
                  <div className="text-magenta fs-3 mb-2">
                    <i className="bi bi-gem"></i>
                  </div>
                  <h4 className="font-serif text-bone fs-6 fw-bold mb-2">
                    Ingeniería Estructural del Ápice
                  </h4>
                  <p className="text-bone-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    Calculamos el centro de gravedad de cada uña según el largo elegido. Ni se sienten pesadas ni se parten ante el menor impacto cotidiano.
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="gothic-card p-4 h-100">
                  <div className="text-magenta fs-3 mb-2">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h4 className="font-serif text-bone fs-6 fw-bold mb-2">
                    Manicuría Rusa Implacable
                  </h4>
                  <p className="text-bone-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    Limpieza micrométrica de cutícula bajo lupa de aumento. Sin cortes, sin ardor y logrando un esmaltado que parece brotar mágicamente desde tu piel.
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="gothic-card p-4 h-100">
                  <div className="text-magenta fs-3 mb-2">
                    <i className="bi bi-brush"></i>
                  </div>
                  <h4 className="font-serif text-bone fs-6 fw-bold mb-2">
                    Nail Art Esculpido & 3D Charms
                  </h4>
                  <p className="text-bone-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    Relieves de arañas, cruces de catedral, sangre jelly, cadenas interdigitales y cromo líquido plateado que no se desgasta con los días.
                  </p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="gothic-card p-4 h-100">
                  <div className="text-magenta fs-3 mb-2">
                    <i className="bi bi-cup-hot"></i>
                  </div>
                  <h4 className="font-serif text-bone fs-6 fw-bold mb-2">
                    Experiencia Atelier Privada
                  </h4>
                  <p className="text-bone-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    Sesión personalizada individual sin ruidos de salón comercial. Playlist de darkwave, ambient y café especial para que tu cita sea un verdadero ritual de desconexión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner CTA inside About */}
        <div
          className="p-4 p-md-5 rounded-3 text-center position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(133, 8, 46, 0.4) 0%, rgba(255, 0, 127, 0.2) 50%, rgba(14, 10, 18, 0.8) 100%)',
            border: '1px solid rgba(255, 0, 127, 0.35)',
          }}
        >
          <h3 className="font-crest text-bone fs-4 mb-2">
            ¿Lista para desterrar las uñas aburridas de tu vida?
          </h3>
          <p className="text-silver fs-6 mb-4">
            Reserva tu espacio en nuestro aquelarre privado y vive la experiencia Insensata.
          </p>
          <button onClick={onOpenBooking} className="btn-gothic-primary">
            <i className="bi bi-calendar-event"></i>
            Coordinar Turno Exclusivo
          </button>
        </div>
      </div>
    </section>
  );
}
