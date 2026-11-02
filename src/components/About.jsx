'use client';

// src/components/About.jsx
import React from 'react';

export default function About({ onOpenBooking }) {
  const SECRETS = [
    {
      num: '01',
      icon: 'bi-gem',
      sigil: '♰',
      tag: 'INGENIERÍA ESTRUCTURAL',
      title: 'Ingeniería Estructural del Ápice',
      text: 'Calculamos el centro de gravedad de cada uña según el largo elegido. Ni se sienten pesadas ni se parten ante el menor impacto cotidiano.',
    },
    {
      num: '02',
      icon: 'bi-bullseye',
      sigil: '☾',
      tag: 'ASEPSIA & PRECISIÓN',
      title: 'Manicuría Rusa Implacable',
      text: 'Limpieza micrométrica de cutícula bajo lupa de aumento con instrumental autoclave. Esmaltado que brota mágicamente desde tu piel.',
    },
    {
      num: '03',
      icon: 'bi-brush',
      sigil: '✦',
      tag: 'ARTE TRIDIMENSIONAL',
      title: 'Nail Art Esculpido & 3D Charms',
      text: 'Relieves de arañas, cruces barrocas, sangre jelly, cromo plateado y cadenas interdigitales soldadas con gel estructural de máxima fijación.',
    },
    {
      num: '04',
      icon: 'bi-cup-hot',
      sigil: '☽',
      tag: 'EXPERIENCIA PRIVADA',
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

        {/* Narrative & Atelier Secret Pillars - Editorial 2-Column Canvas Layout */}
        <div className="row g-5 align-items-start mb-5">
          {/* Left Column: Sticky Editorial Manifesto (No Card Container) */}
          <div className="col-lg-5">
            <div className="sticky-lg-top" style={{ top: '110px', zIndex: 2 }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="text-magenta font-serif fs-4">♰</span>
                <span className="text-silver font-display fs-8 text-uppercase tracking-wider">
                  DECLARACIÓN DE AUTOR
                </span>
              </div>

              <h3 className="font-crest text-bone display-6 fw-bold mb-4" style={{ lineHeight: '1.25' }}>
                "No son solo uñas. Es tu armadura diaria."
              </h3>

              <p className="text-bone-muted fs-6 mb-4" style={{ lineHeight: '1.85' }}>
                En un mundo saturado de uñas nude genéricas y manicurías apresuradas de 40 minutos, en Insensata dedicamos horas de concentración quirúrgica a cada uña. Cada curva, cada gota de sangre tridimensional y cada piercing de plata se talla a mano alzada para reflejar tu verdadera esencia sin concesiones.
              </p>

              {/* Minimal Integrated Hallmark Line */}
              <div className="py-3 border-top border-bottom border-dark d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-magenta">✦</span>
                  <span className="font-serif text-silver fs-8 text-uppercase tracking-wider">
                    Retención Blindada
                  </span>
                </div>
                <span className="text-bone-muted opacity-50">•</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-magenta">☽</span>
                  <span className="font-serif text-silver fs-8 text-uppercase tracking-wider">
                    Cero Desprendimientos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Numbered Thesis Statements (Etched directly onto Canvas) */}
          <div className="col-lg-7">
            <div className="d-flex flex-column">
              {SECRETS.map((secret) => (
                <div key={secret.num} className="editorial-thesis-row">
                  <div className="thesis-laser"></div>
                  <div className="d-flex align-items-start gap-4">
                    {/* Ghost Watermark Numeral */}
                    <span className="ghost-numeral flex-shrink-0">
                      {secret.num}
                    </span>

                    {/* Content */}
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="text-magenta fs-7">{secret.sigil}</span>
                        <span className="text-magenta font-display fs-8 text-uppercase tracking-wider">
                          {secret.tag}
                        </span>
                      </div>

                      <h4 className="font-crest text-bone fs-5 fw-bold mb-2">
                        {secret.title}
                      </h4>

                      <p className="text-bone-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: '1.7' }}>
                        {secret.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Callout Band (Seamless width, no rounded box card) */}
        <div className="editorial-callout-band text-center my-4">
          <span className="text-magenta font-serif fs-5 d-block mb-2">✦ ☾ ♰ ☽ ✦</span>
          <h3 className="font-crest text-bone fs-4 mb-2">
            ¿Lista para desterrar las uñas aburridas de tu vida?
          </h3>
          <p className="text-silver fs-6 mb-4 mx-auto" style={{ maxWidth: '620px' }}>
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
