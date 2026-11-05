'use client';

// app/quienes-somos/page.jsx
import React from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';
import { STUDIO_INFO } from '@/src/data/nailData';

export default function QuienesSomosPage() {
  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative selection-magenta">
      <Navbar />

      <main className="pt-5 pb-5 position-relative overflow-hidden">
        {/* Ambient atmospheric radial vignettes */}
        <div
          className="position-absolute pointer-events-none"
          style={{
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '700px',
            background: 'radial-gradient(ellipse at center, rgba(255, 0, 127, 0.07) 0%, rgba(133, 8, 46, 0.04) 40%, transparent 75%)',
            filter: 'blur(70px)',
            zIndex: 0,
          }}
        />

        {/* =========================================================================
            1. HERO: GÉNESIS DEL SANTUARIO OBSCURO
           ========================================================================= */}
        <section className="pt-5 mt-4 pb-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container pt-4">
            <div className="text-center mx-auto" style={{ maxWidth: '900px' }}>
              <span className="badge-gothic px-3 py-1 mb-3 d-inline-block">
                ✦ MANIFIESTO & FILOSOFÍA DE ALTA COSTURA ✦
              </span>

              <h1 className="font-crest text-bone fw-bold display-4 mb-3 tracking-wider lh-sm">
                GÉNESIS DEL <br />
                <span className="text-magenta shimmer-text">SANTUARIO OBSCURO</span>
              </h1>

              <div className="gothic-divider my-4">
                <span>✦ ☾ ♰ ☽ ✦</span>
              </div>

              <p className="font-serif fs-5 text-silver text-uppercase tracking-wider mb-4 fw-light">
                "No esculpimos uñas convencionales. Forjamos armaduras de seducción y rebeldía para quienes desafían lo ordinario."
              </p>

              <p className="text-bone-muted fs-6 lh-lg mb-0 mx-auto" style={{ maxWidth: '780px' }}>
                Insensata Estudio no nació como un salón de belleza; fue fundado como un acto de resistencia estética. En un mundo saturado de manicurías impersonales, colores pasteles uniformes y técnicas apresuradas que dañan la matriz natural, erigimos un templo privado en Palermo Hollywood dedicado exclusivamente al arte de uñas de alta costura, la precisión quirúrgica y el romanticismo obscuro.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="editorial-hairline my-4" />
        </div>

        {/* =========================================================================
            2. LA DIRECTRICE & MASTER SCULPTOR (Editorial Split)
           ========================================================================= */}
        <section className="py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container">
            <div className="row g-5 align-items-center">
              {/* Master Artist Portrait & Atelier Vibe */}
              <div className="col-lg-5">
                <div className="position-relative">
                  <div
                    className="gallery-img-wrapper rounded-1 overflow-hidden"
                    style={{
                      border: '1px solid rgba(255, 0, 127, 0.35)',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 0, 127, 0.2)',
                      aspectRatio: '3/4',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                      alt="Directrice & Master Artist • Insensata Estudio"
                      className="w-100 h-100 object-fit-cover"
                    />
                    <div className="gallery-overlay p-4 d-flex flex-column justify-content-end">
                      <span className="badge-gothic mb-1 align-self-start">Directrice & Master Artist</span>
                      <h3 className="font-crest text-bone fs-5 mb-0">Atelier Haute Couture</h3>
                      <small className="text-silver fs-8">Especialista en Hardware E-File & Escultura 3D</small>
                    </div>
                  </div>

                  {/* Laser Accent Line */}
                  <div
                    className="position-absolute"
                    style={{
                      top: '-10px',
                      left: '-10px',
                      width: '60px',
                      height: '60px',
                      borderTop: '2px solid var(--neon-magenta)',
                      borderLeft: '2px solid var(--neon-magenta)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    className="position-absolute"
                    style={{
                      bottom: '-10px',
                      right: '-10px',
                      width: '60px',
                      height: '60px',
                      borderBottom: '2px solid var(--neon-magenta)',
                      borderRight: '2px solid var(--neon-magenta)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Master Narrative */}
              <div className="col-lg-7">
                <span className="text-magenta font-display fw-bold fs-7 text-uppercase tracking-wider mb-2 d-block">
                  ✦ ALQUIMIA TÉCNICA & TRAYECTORIA
                </span>
                <h2 className="font-crest text-bone display-6 mb-4">
                  EL RIGOR DE LA <span className="text-magenta">MANICURÍA RUSA</span> & EL ARTE ESCULTURAL
                </h2>

                <div className="d-flex flex-column gap-3 text-bone-muted fs-6 lh-lg">
                  <p className="mb-0">
                    Detrás de cada set de Insensata reside una formación obsesiva en las técnicas más avanzadas del circuito internacional. Nuestra Directrice se perfeccionó en la escuela de <strong>Hardware Manicure Rusa (Аппаратный маникюр)</strong>, un protocolo de microfresas de diamante que despeja milimétricamente la cutícula sin tijeras agresivas ni abrasión del lecho ungueal.
                  </p>
                  <p className="mb-0">
                    Esta base técnica de precisión médica permite una aplicación tan pegada a la piel que el crecimiento se percibe invisible durante las primeras dos semanas, alcanzando una <strong>retención garantizada de 4+ semanas</strong> sin desprendimientos.
                  </p>
                  <p className="mb-0">
                    A ello se suma el dominio de la escultura arquitectónica en acrílico, poligel y soft gel estructurado: desde los afilados <em>Gothic Stilettos XXL</em> de filo navaja y ápice estructural balanceado, hasta el <em>Cyber Sigilism</em> en cromo líquido plateado, encapsulados de sangre de toro con tintas de alcohol y piercings reales de acero quirúrgico.
                  </p>
                </div>

                <div
                  className="mt-4 p-4 rounded-1 position-relative"
                  style={{
                    background: 'rgba(20, 14, 27, 0.65)',
                    borderLeft: '3px solid var(--neon-magenta)',
                    borderTop: '1px solid rgba(201, 194, 204, 0.1)',
                    borderRight: '1px solid rgba(201, 194, 204, 0.1)',
                    borderBottom: '1px solid rgba(201, 194, 204, 0.1)',
                  }}
                >
                  <i className="bi bi-quote text-magenta fs-2 position-absolute" style={{ top: '8px', right: '16px', opacity: 0.3 }} />
                  <p className="font-serif text-silver fs-6 fst-italic mb-2" style={{ lineHeight: '1.7' }}>
                    "Tus manos son tu tarjeta de presentación energética. Cuando llevas garras esculpidas a medida, tu lenguaje corporal cambia por completo: te mueves con autoridad, seguridad y misterio."
                  </p>
                  <span className="text-magenta font-display fs-8 fw-semibold tracking-wider text-uppercase">
                    — Directrice del Atelier Insensata
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="editorial-hairline my-4" />
        </div>

        {/* =========================================================================
            3. EL SANTUARIO ATELIER: EXPERIENCIA INMERSIVA 1-A-1
           ========================================================================= */}
        <section className="py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: '780px' }}>
              <span className="text-magenta font-display fw-bold fs-7 text-uppercase tracking-wider">
                ✦ PALERMO HOLLYWOOD ATELIER PRIVADO
              </span>
              <h2 className="font-crest text-bone display-6 mt-1 mb-3">
                UN ESPACIO DE <span className="text-magenta">DESCONEXIÓN TOTAL</span>
              </h2>
              <p className="text-bone-muted fs-6">
                En Insensata las citas son estrictamente <strong>individuales y a puerta cerrada</strong>. Aquí no hay salones ruidosos, teléfonos sonando ni estaciones de trabajo abarrotadas. Tu sesión es un oasis sensorial pensado para relajarte y reconectar.
              </p>
            </div>

            {/* 3 Pillars of the Sanctuary Atmosphere */}
            <div className="row g-4 mb-4">
              {/* Pillar 1 */}
              <div className="col-md-4">
                <div
                  className="p-4 h-100 rounded-1 position-relative transition-all"
                  style={{
                    background: 'rgba(20, 14, 27, 0.5)',
                    border: '1px solid rgba(201, 194, 204, 0.14)',
                  }}
                >
                  <div className="ghost-numeral mb-2">01</div>
                  <h3 className="font-serif text-bone fs-5 mb-2">
                    <i className="bi bi-disc text-magenta me-2"></i>
                    Darkwave & Ambient
                  </h3>
                  <p className="text-bone-muted fs-7 lh-lg mb-0">
                    Banda sonora curada en vinilo y streaming de alta fidelidad: darkwave, post-punk, ethereal wave y dark ambient (Lebanon Hanover, Boy Harsher, Cocteau Twins, Depeche Mode).
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="col-md-4">
                <div
                  className="p-4 h-100 rounded-1 position-relative transition-all"
                  style={{
                    background: 'rgba(20, 14, 27, 0.5)',
                    border: '1px solid rgba(201, 194, 204, 0.14)',
                  }}
                >
                  <div className="ghost-numeral mb-2">02</div>
                  <h3 className="font-serif text-bone fs-5 mb-2">
                    <i className="bi bi-cup-hot text-magenta me-2"></i>
                    Cafetería de Especialidad
                  </h3>
                  <p className="text-bone-muted fs-7 lh-lg mb-0">
                    Café negro de grano tostado de origen único, infusiones florales nocturnas y agua fresca servida en cristalería de época como cortesía en cada sesión de 2 a 3+ horas.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="col-md-4">
                <div
                  className="p-4 h-100 rounded-1 position-relative transition-all"
                  style={{
                    background: 'rgba(20, 14, 27, 0.5)',
                    border: '1px solid rgba(201, 194, 204, 0.14)',
                  }}
                >
                  <div className="ghost-numeral mb-2">03</div>
                  <h3 className="font-serif text-bone fs-5 mb-2">
                    <i className="bi bi-shield-lock text-magenta me-2"></i>
                    Privacidad Absoluta
                  </h3>
                  <p className="text-bone-muted fs-7 lh-lg mb-0">
                    Sin acompañantes ni miradas ajenas. El atelier queda reservado en su totalidad para ti y la Directrice, garantizando confidencialidad y una charla libre o silencio absoluto, según tu preferencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="editorial-hairline my-4" />
        </div>

        {/* =========================================================================
            4. EL ETHOS: BIOSEGURIDAD HOSPITALARIA & CRUELTY-FREE
           ========================================================================= */}
        <section className="py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <span className="text-magenta font-display fw-bold fs-7 text-uppercase tracking-wider mb-2 d-block">
                  ✦ COMPROMISO SIN CONCESIONES
                </span>
                <h2 className="font-crest text-bone display-6 mb-4">
                  EL ETHOS DE <span className="text-magenta">BIOSEGURIDAD & ÉTICA</span>
                </h2>
                <p className="text-bone-muted fs-6 lh-lg mb-4">
                  Nuestra estética puede ser oscura y rebelde, pero nuestros estándares higiénicos son médicos e implacables. Creemos que el verdadero lujo solo existe cuando la salud y la integridad física están 100% protegidas.
                </p>

                {/* 4 Protocol Points */}
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--neon-magenta)' }}
                    >
                      <i className="bi bi-hospital text-magenta fs-6"></i>
                    </div>
                    <div>
                      <h4 className="font-serif text-bone fs-6 fw-bold mb-1">Autoclave Médico Clase B</h4>
                      <p className="text-bone-muted fs-7 mb-0">
                        Todo el instrumental metálico pasa por baño ultrasónico de desinfección y ciclo de calor húmedo presurizado a 134°C en autoclave hospitalario Clase B.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--neon-magenta)' }}
                    >
                      <i className="bi bi-envelope-paper-heart text-magenta fs-6"></i>
                    </div>
                    <div>
                      <h4 className="font-serif text-bone fs-6 fw-bold mb-1">Apertura de Sobre Estéril en Vivo</h4>
                      <p className="text-bone-muted fs-7 mb-0">
                        Cada juego de fresas y repujadores se desprecinta delante de ti, exhibiendo el viraje químico del testigo que certifica la esterilidad total.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--neon-magenta)' }}
                    >
                      <i className="bi bi-heart text-magenta fs-6"></i>
                    </div>
                    <div>
                      <h4 className="font-serif text-bone fs-6 fw-bold mb-1">100% Cruelty-Free & Fórmulas 9-Free</h4>
                      <p className="text-bone-muted fs-7 mb-0">
                        Trabajamos exclusivamente con geles hipoalergénicos libres de tolueno, DBP, formaldehído y resinas agresivas, nunca testeados en animales.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--neon-magenta)' }}
                    >
                      <i className="bi bi-trash3 text-magenta fs-6"></i>
                    </div>
                    <div>
                      <h4 className="font-serif text-bone fs-6 fw-bold mb-1">Insumos 100% Descartables</h4>
                      <p className="text-bone-muted fs-7 mb-0">
                        Limas, buffers, palitos de naranjo y toallas descartables se utilizan una sola vez y se desechan al culminar tu cita.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Autoclave & Precision Visual Card */}
              <div className="col-lg-6">
                <div
                  className="gallery-img-wrapper rounded-1 overflow-hidden"
                  style={{
                    border: '1px solid rgba(201, 194, 204, 0.2)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
                    aspectRatio: '4/3',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519014816548-bf7851dd4f3c?auto=format&fit=crop&w=1200&q=85"
                    alt="Bioseguridad y Precisión • Insensata Estudio"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="gallery-overlay p-4 d-flex flex-column justify-content-end">
                    <span className="badge-gothic mb-1 align-self-start">Garantía Quirúrgica</span>
                    <h4 className="font-crest text-bone fs-6 mb-0">Autoclave Clase B & Testigo Químico</h4>
                    <small className="text-silver fs-8">Esterilización hospitalaria certificada en cada sesión</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="editorial-hairline my-4" />
        </div>

        {/* =========================================================================
            5. DETRÁS DE ESCENA: GALERÍA EDITORIAL
           ========================================================================= */}
        <section className="py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container">
            <div className="text-center mb-5 mx-auto" style={{ maxWidth: '780px' }}>
              <span className="text-magenta font-display fw-bold fs-7 text-uppercase tracking-wider">
                ✦ EL UNIVERSO VISUAL
              </span>
              <h2 className="font-crest text-bone display-6 mt-1 mb-3">
                DETRÁS DE ESCENA & <span className="text-magenta">OBRAS DE LA CASA</span>
              </h2>
              <p className="text-bone-muted fs-6">
                Un vistazo íntimo a la mesa de trabajo, las texturas en gel 3D, el cromo espejo y las creaciones consagradas en el atelier.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className="gallery-img-wrapper rounded-1 overflow-hidden"
                  style={{
                    border: '1px solid rgba(255, 0, 127, 0.25)',
                    aspectRatio: '1/1',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
                    alt="Gothic Stilettos XXL Negro Mate"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="gallery-overlay p-3">
                    <span className="badge-gothic mb-1 align-self-start">Stiletto Claws</span>
                    <h5 className="font-serif text-bone fs-7 mb-0">Cruces Barrocas & Negro Mate</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="gallery-img-wrapper rounded-1 overflow-hidden"
                  style={{
                    border: '1px solid rgba(255, 0, 127, 0.25)',
                    aspectRatio: '1/1',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
                    alt="Vampire Blood Drip & Chains"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="gallery-overlay p-3">
                    <span className="badge-gothic mb-1 align-self-start">Blood Drip 3D</span>
                    <h5 className="font-serif text-bone fs-7 mb-0">Sangre Jelly & Cadenas</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="gallery-img-wrapper rounded-1 overflow-hidden"
                  style={{
                    border: '1px solid rgba(255, 0, 127, 0.25)',
                    aspectRatio: '1/1',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
                    alt="Velvet Cat Eye Amethyst"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="gallery-overlay p-3">
                    <span className="badge-gothic mb-1 align-self-start">Dark Velvet 9D</span>
                    <h5 className="font-serif text-bone fs-7 mb-0">Amatista Cat Eye Magnético</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CTA FINAL INTEGRADO
           ========================================================================= */}
        <section className="py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container">
            <div
              className="p-5 text-center rounded-1 position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(35, 18, 44, 0.6) 0%, rgba(14, 10, 18, 0.9) 100%)',
                border: '1px solid rgba(255, 0, 127, 0.35)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
              }}
            >
              <div
                className="position-absolute top-50 start-50 translate-middle pointer-events-none"
                style={{
                  width: '500px',
                  height: '500px',
                  background: 'radial-gradient(circle, rgba(255, 0, 127, 0.12) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: 0,
                }}
              />

              <div className="position-relative" style={{ zIndex: 1 }}>
                <span className="badge-gothic px-3 py-1 mb-3 d-inline-block">
                  ✦ TU LUGAR EN EL AQUELARRE TE ESPERA ✦
                </span>
                <h2 className="font-crest text-bone display-5 mb-3">
                  ¿LISTA PARA TUS PRÓXIMAS <span className="text-magenta">GARRAS</span>?
                </h2>
                <p className="text-silver fs-6 mx-auto mb-4" style={{ maxWidth: '640px', lineHeight: '1.7' }}>
                  Los cupos mensuales son estrictamente limitados para garantizar 3 horas de dedicación absoluta a cada obra. Reserva tu cita privada con seña online.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link href="/agendar" className="btn-gothic-primary py-3 px-4 font-crest fs-7 tracking-wider">
                    <i className="bi bi-calendar2-heart me-2"></i>
                    AGENDAR CITA PRIVADA
                  </Link>

                  <Link href="/#services" className="btn-gothic-outline py-3 px-4 font-crest fs-7 tracking-wider">
                    <i className="bi bi-gem me-2 text-magenta"></i>
                    VER CARTA DE SERVICIOS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
