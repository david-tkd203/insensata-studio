'use client';

// src/components/About.jsx
import React from 'react';

export default function About({ onOpenBooking }) {
  const SECRETS = [
    {
      icon: 'bi-gem',
      sigil: '♰',
      title: 'Ingeniería Estructural del Ápice',
      text: 'Calculamos el centro de gravedad de cada uña según el largo elegido. Ni se sienten pesadas ni se parten ante el menor impacto cotidiano.',
    },
    {
      icon: 'bi-bullseye',
      sigil: '☾',
      title: 'Manicuría Rusa Implacable',
      text: 'Limpieza micrométrica de cutícula bajo lupa de aumento con instrumental autoclave. Esmaltado que brota mágicamente desde tu piel.',
    },
    {
      icon: 'bi-brush',
      sigil: '✦',
      title: 'Nail Art Esculpido & 3D Charms',
      text: 'Relieves de arañas, cruces barrocas, sangre jelly, cromo plateado y cadenas interdigitales soldadas con gel estructural de máxima fijación.',
    },
    {
      icon: 'bi-cup-hot',
      sigil: '☽',
      title: 'Experiencia Atelier Privada',
      text: 'Cita exclusiva individual sin ruidos de salón comercial. Playlist selecta de darkwave, ambient y café especial en un verdadero sanctum de desconexión.',
    },
  ];

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
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Nacimos de la necesidad visceral de trascender los salones convencionales. Donde otros ven un simple servicio de belleza, nosotros consagramos un ritual de arte obscuro y arquitectura estética.
          </p>
        </div>

        {/* Narrative & Atelier Secret Pillars */}
        <div className="row g-4 align-items-stretch mb-5">
          {/* Left Column: Visual Manifest Grand Altar */}
          <div className="col-lg-5">
            <div
              className="gothic-reliquary-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between text-center position-relative overflow-hidden"
              style={{
                border: '1px solid rgba(255, 0, 127, 0.35)',
                boxShadow: '0 16px 45px rgba(0, 0, 0, 0.85), inset 0 0 25px rgba(133, 8, 46, 0.25)',
              }}
            >
              {/* Corner Filigree */}
              <span className="gothic-corner-pin pin-tl">✦</span>
              <span className="gothic-corner-pin pin-tr">♰</span>
              <span className="gothic-corner-pin pin-bl">♰</span>
              <span className="gothic-corner-pin pin-br">✦</span>

              <div>
                <div className="mb-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center p-3"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 0, 127, 0.2) 0%, rgba(14, 10, 18, 0.8) 70%)',
                      border: '1px solid rgba(255, 0, 127, 0.5)',
                      boxShadow: '0 0 25px rgba(255, 0, 127, 0.3)',
                    }}
                  >
                    <i className="bi bi-moon-stars text-magenta fs-2"></i>
                  </div>
                </div>

                <h3 className="font-crest text-bone fs-4 mb-3">
                  "No son solo uñas. Es tu armadura diaria."
                </h3>

                <p className="text-bone-muted fs-6 mb-4" style={{ lineHeight: '1.8' }}>
                  En un mundo saturado de uñas nude genéricas y manicurías apresuradas de 40 minutos, en Insensata dedicamos horas de concentración quirúrgica a cada uña. Cada curva, cada gota de sangre tridimensional y cada piercing de plata se talla a mano alzada para reflejar tu verdadera esencia sin concesiones.
                </p>
              </div>

              <div className="p-3 rounded-3" style={{ background: 'rgba(10, 7, 14, 0.6)', border: '1px solid rgba(201, 194, 204, 0.12)' }}>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <span className="font-serif text-silver text-uppercase fs-8 tracking-wider">
                    ✦ Retención Blindada
                  </span>
                  <span className="text-magenta">•</span>
                  <span className="font-serif text-silver text-uppercase fs-8 tracking-wider">
                    Cero Desprendimientos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Los 4 Secretos del Atelier (Cathedral Lancet Arches) */}
          <div className="col-lg-7">
            <div className="row g-3 h-100">
              {SECRETS.map((secret, idx) => (
                <div key={idx} className="col-sm-6">
                  <div className="gothic-arch-card h-100 d-flex flex-column justify-content-between position-relative">
                    {/* Lancet Apex Keystone */}
                    <span className="arch-keystone">{secret.sigil}</span>

                    <div>
                      <div className="mb-3 pt-2">
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-circle"
                          style={{
                            width: '46px',
                            height: '46px',
                            background: 'rgba(255, 0, 127, 0.12)',
                            border: '1px solid rgba(255, 0, 127, 0.3)',
                          }}
                        >
                          <i className={`bi ${secret.icon} text-magenta fs-5`}></i>
                        </div>
                      </div>

                      <h4 className="font-crest text-bone fs-6 fw-bold mb-2">
                        {secret.title}
                      </h4>

                      <p className="text-bone-muted mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>
                        {secret.text}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-top border-dark d-flex justify-content-between align-items-center">
                      <span className="text-magenta font-serif fs-8">Secreto #{idx + 1}</span>
                      <i className="bi bi-shield-check text-bone-muted fs-7"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner CTA inside About */}
        <div
          className="p-4 p-md-5 rounded-4 text-center position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(133, 8, 46, 0.45) 0%, rgba(255, 0, 127, 0.18) 50%, rgba(14, 10, 18, 0.95) 100%)',
            border: '1px solid rgba(255, 0, 127, 0.4)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 0, 127, 0.2)',
          }}
        >
          <span className="text-magenta font-serif fs-5 d-block mb-1">✦ ☾ ♰ ☽ ✦</span>
          <h3 className="font-crest text-bone fs-4 mb-2">
            ¿Lista para desterrar las uñas aburridas de tu vida?
          </h3>
          <p className="text-silver fs-6 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Reserva tu espacio en nuestro aquelarre privado y vive la experiencia insensata en carne propia.
          </p>
          <button type="button" onClick={onOpenBooking} className="btn-gothic-primary">
            <i className="bi bi-calendar-event text-white"></i>
            Coordinar Turno Exclusivo
          </button>
        </div>
      </div>
    </section>
  );
}
