'use client';

// src/components/NailCalculator.jsx
import React, { useState, useMemo } from 'react';
import {
  CALCULATOR_BASES,
  CALCULATOR_SHAPES,
  CALCULATOR_ART_LEVELS,
  CALCULATOR_CHARMS,
  STUDIO_INFO,
} from '../data/nailData';

export default function NailCalculator({ onOpenBookingWithCustomSet }) {
  const [selectedBase, setSelectedBase] = useState(CALCULATOR_BASES[0]);
  const [selectedShape, setSelectedShape] = useState(CALCULATOR_SHAPES[2]); // Stiletto default
  const [selectedArt, setSelectedArt] = useState(CALCULATOR_ART_LEVELS[2]); // Haute couture default
  const [selectedCharms, setSelectedCharms] = useState([CALCULATOR_CHARMS[0].id]); // Piercing default

  // Toggle charms
  const handleToggleCharm = (charmId) => {
    setSelectedCharms((prev) =>
      prev.includes(charmId) ? prev.filter((id) => id !== charmId) : [...prev, charmId]
    );
  };

  // Calculate live total
  const calculatedTotal = useMemo(() => {
    let total = selectedBase.basePrice + selectedShape.price + selectedArt.price;
    selectedCharms.forEach((cId) => {
      const charmObj = CALCULATOR_CHARMS.find((c) => c.id === cId);
      if (charmObj) total += charmObj.price;
    });
    return total;
  }, [selectedBase, selectedShape, selectedArt, selectedCharms]);

  // Selected charm objects
  const activeCharmObjects = useMemo(() => {
    return CALCULATOR_CHARMS.filter((c) => selectedCharms.includes(c.id));
  }, [selectedCharms]);

  // Generate WhatsApp Message
  const handleSendToWhatsApp = () => {
    const charmsText =
      activeCharmObjects.length > 0
        ? activeCharmObjects.map((c) => `• ${c.name}`).join('\n')
        : '• Ninguno (Solo diseño base)';

    const message = `✦ *SOLICITUD DE SET RITUAL - INSENSATA ESTUDIO* ✦
    
Hola Insensata! Estuve cotizando mi set personalizado en la web y quiero agendar mi cita:

🩸 *Estructura Base:* ${selectedBase.name}
🗡️ *Forma y Longitud:* ${selectedShape.name}
🔮 *Nivel de Nail Art:* ${selectedArt.name}
⛓️ *Charms y Piercings:*
${charmsText}

✨ *Presupuesto Estimado:* $${calculatedTotal.toLocaleString('es-AR')} ARS

¿Tienen turnos disponibles en las próximas semanas para coordinar? 🖤`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="calculator" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Atelier Configurator</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            COTIZA TU <span className="text-magenta">SET RITUAL</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '680px' }}>
            Forja la arquitectura de tus garras. Selecciona estructura, longitud, complejidad artística y joyería tridimensional. Cotización en tiempo real integrada al lienzo del atelier.
          </p>
        </div>

        <div className="row g-4 g-xl-5">
          {/* Atelier Interactive Configurator (Canvas-Integrated, No Boxy Cards) */}
          <div className="col-lg-8">
            {/* STEP 1: ESTRUCTURA BASE - Integrated Horizontal Rail / Hairline Segmented Selector */}
            <div className="mb-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge-gothic">Paso 01</span>
                  <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                    Estructura Base
                  </h4>
                </div>
                <span className="text-silver fs-8 font-display d-none d-sm-inline">
                  {selectedBase.name.split('/')[0].trim()}
                </span>
              </div>

              <div className="calc-base-rail row g-0">
                {CALCULATOR_BASES.map((b) => {
                  const isSelected = selectedBase.id === b.id;
                  return (
                    <div
                      key={b.id}
                      className={`col-md-4 calc-base-segment ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedBase(b)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedBase(b);
                        }
                      }}
                    >
                      <div className="segment-laser-bar"></div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="font-crest text-bone fw-bold fs-7">{b.name.split('/')[0].trim()}</span>
                        {isSelected ? (
                          <span className="text-magenta font-serif fs-7">✦</span>
                        ) : (
                          <span className="text-bone-muted fs-8">♰</span>
                        )}
                      </div>
                      <p className="text-bone-muted mb-2 fs-8" style={{ lineHeight: '1.45' }}>
                        {b.desc}
                      </p>
                      <span className="text-magenta fw-bold fs-7 d-block mt-auto">
                        ${b.basePrice.toLocaleString('es-AR')} ARS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: FORMA & LONGITUD - Elegant Horizontal Pill / Rune Selector */}
            <div className="mb-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge-gothic">Paso 02</span>
                  <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                    Forma & Longitud de la Garra
                  </h4>
                </div>
                <span className="text-silver fs-8 font-display d-none d-sm-inline">
                  {selectedShape.name}
                </span>
              </div>

              <div className="calc-shapes-track">
                {CALCULATOR_SHAPES.map((s) => {
                  const isSelected = selectedShape.id === s.id;
                  return (
                    <div
                      key={s.id}
                      className={`calc-shape-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedShape(s)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedShape(s);
                        }
                      }}
                    >
                      <span className="text-magenta fs-7">{isSelected ? '✦' : '✧'}</span>
                      <span className="font-serif fs-7">{s.name}</span>
                      <span className="pill-tag">
                        {s.price === 0 ? 'Sin recargo' : `+ $${s.price.toLocaleString('es-AR')}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: NIVEL DE COMPLEJIDAD - Editorial Vertical Hairline Rows */}
            <div className="mb-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge-gothic">Paso 03</span>
                  <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                    Nivel de Complejidad de Nail Art
                  </h4>
                </div>
                <span className="text-silver fs-8 font-display d-none d-sm-inline">
                  {selectedArt.name}
                </span>
              </div>

              <div className="calc-art-list">
                {CALCULATOR_ART_LEVELS.map((a, idx) => {
                  const isSelected = selectedArt.id === a.id;
                  const formattedIndex = String(idx + 1).padStart(2, '0');
                  return (
                    <div
                      key={a.id}
                      className={`calc-art-row ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedArt(a)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedArt(a);
                        }
                      }}
                    >
                      <div className="art-laser-bar"></div>
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div className="d-flex align-items-start gap-3">
                          <span className="ghost-numeral flex-shrink-0">
                            {formattedIndex}
                          </span>
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <span className="font-crest text-bone fw-bold fs-6">
                                {a.name}
                              </span>
                              {isSelected && (
                                <span className="badge-gothic" style={{ fontSize: '0.65rem' }}>
                                  Seleccionado
                                </span>
                              )}
                            </div>
                            <p className="text-bone-muted mb-0 fs-7" style={{ lineHeight: '1.5' }}>
                              {a.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-end flex-shrink-0">
                          <span className="text-magenta fw-bold fs-6 d-block">
                            {a.price === 0 ? 'Incluido' : `+ $${a.price.toLocaleString('es-AR')}`}
                          </span>
                          <span className="text-silver fs-8">
                            {isSelected ? '✦ ACTIVO' : '♰'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: JOYERÍA & CHARMS - Minimalist 2-Column Checklist Integrated directly on Canvas */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge-gothic">Paso 04</span>
                  <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                    Charms, Piercings & Joyería 3D (Opcionales)
                  </h4>
                </div>
                <span className="text-silver fs-8 font-display">
                  {activeCharmObjects.length} de {CALCULATOR_CHARMS.length} agregados
                </span>
              </div>

              <div className="row g-2">
                {CALCULATOR_CHARMS.map((c) => {
                  const isChecked = selectedCharms.includes(c.id);
                  return (
                    <div key={c.id} className="col-md-6">
                      <div
                        className={`calc-charm-item ${isChecked ? 'active' : ''}`}
                        onClick={() => handleToggleCharm(c.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleToggleCharm(c.id);
                          }
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span className="calc-charm-rune">
                            {isChecked ? '✦' : '✧'}
                          </span>
                          <span className="text-silver fs-7">
                            {c.name}
                          </span>
                        </div>
                        <span className="text-magenta fw-bold fs-7 flex-shrink-0 ms-2">
                          +${c.price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Live Total Summary Column - Architectural Haute Couture Ledger (No Heavy Box Border) */}
          <div className="col-lg-4">
            <div className="calc-atelier-ledger">
              <div className="text-center mb-3">
                <span className="text-magenta font-serif fs-8 text-uppercase tracking-wider">
                  ✦ RESUMEN DE COTIZACIÓN ✦
                </span>
                <h3 className="font-crest text-bone fs-5 mt-1">Presupuesto Ritual</h3>
              </div>

              {/* Price Display */}
              <div className="text-center my-3 py-3 border-top border-bottom border-dark border-opacity-75">
                <span className="text-bone-muted d-block fs-8 tracking-wider mb-1">TOTAL ESTIMADO EN ARS</span>
                <div className="font-crest text-bone fw-bold display-6 glow-magenta-text">
                  ${calculatedTotal.toLocaleString('es-AR')}
                </div>
                <small className="text-bone-muted d-block mt-1" style={{ fontSize: '0.72rem' }}>
                  *Precio final exacto según técnica y gemas elegidas en mesa
                </small>
              </div>

              {/* Itemized breakdown */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2 fs-7 text-silver">
                  <span>Base:</span>
                  <span className="text-bone fw-semibold">{selectedBase.name.split('/')[0].trim()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-7 text-silver">
                  <span>Forma & Largo:</span>
                  <span className="text-bone fw-semibold">{selectedShape.name}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-7 text-silver">
                  <span>Nail Art:</span>
                  <span className="text-bone fw-semibold">{selectedArt.name}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-7 text-silver">
                  <span>Joyería 3D:</span>
                  <span className="text-magenta fw-semibold">
                    {activeCharmObjects.length > 0
                      ? `${activeCharmObjects.length} agregados`
                      : 'Ninguno'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="btn-gothic-primary w-100"
                >
                  <i className="bi bi-whatsapp text-white"></i>
                  Pedir este Set por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenBookingWithCustomSet({
                      base: selectedBase.name,
                      shape: selectedShape.name,
                      art: selectedArt.name,
                      total: calculatedTotal,
                      charms: activeCharmObjects.map((c) => c.name),
                    })
                  }
                  className="btn-gothic-outline btn-gothic-sm w-100"
                >
                  <i className="bi bi-calendar2-check text-magenta"></i>
                  Agendar en la Web con estos Datos
                </button>
              </div>

              <div className="mt-3 text-center">
                <small className="text-bone-muted" style={{ fontSize: '0.72rem' }}>
                  <i className="bi bi-shield-check text-magenta me-1"></i>
                  Seña del 30% requerida para congelar fecha y hora
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
