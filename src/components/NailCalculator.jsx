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
          <span className="badge-gothic px-3 py-1 mb-2">Diseñador Interactivo de Autor</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            COTIZA TU <span className="text-magenta">SET RITUAL</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '680px' }}>
            Personaliza cada aspecto de tus futuras garras. Selecciona la estructura, largo, nivel de complejidad artística y joyería tridimensional para obtener un presupuesto exacto en vivo.
          </p>
        </div>

        <div className="row g-4">
          {/* Controls Column */}
          <div className="col-lg-8">
            {/* Step 1: Base Structure */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gothic">Paso 1</span>
                <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                  Selecciona la Estructura Base
                </h4>
              </div>
              <div className="row g-3">
                {CALCULATOR_BASES.map((b) => {
                  const isSelected = selectedBase.id === b.id;
                  return (
                    <div key={b.id} className="col-md-4">
                      <div
                        className={`calc-option-box ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedBase(b)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="font-crest text-bone fw-bold fs-7">{b.name}</span>
                            {isSelected ? (
                              <i className="bi bi-check-circle-fill text-magenta fs-6"></i>
                            ) : (
                              <span className="text-bone-muted fs-8">♰</span>
                            )}
                          </div>
                          <p className="text-bone-muted mb-2" style={{ fontSize: '0.75rem', lineHeight: '1.45' }}>
                            {b.desc}
                          </p>
                        </div>
                        <span className="text-magenta fw-bold fs-7 mt-2">
                          ${b.basePrice.toLocaleString('es-AR')} ARS
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Shape & Length */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gothic">Paso 2</span>
                <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                  Forma & Longitud de la Garra
                </h4>
              </div>
              <div className="row g-3">
                {CALCULATOR_SHAPES.map((s) => {
                  const isSelected = selectedShape.id === s.id;
                  return (
                    <div key={s.id} className="col-md-4 col-sm-6">
                      <div
                        className={`calc-option-box ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedShape(s)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="font-crest text-bone fw-bold fs-7">{s.name}</span>
                            {isSelected ? (
                              <i className="bi bi-check-circle-fill text-magenta fs-6"></i>
                            ) : (
                              <span className="text-bone-muted fs-8">🗡️</span>
                            )}
                          </div>
                          <span className="badge-silver d-inline-block mb-2" style={{ fontSize: '0.68rem' }}>
                            {s.tag}
                          </span>
                        </div>
                        <span className="text-silver fw-semibold fs-7 mt-2">
                          {s.price === 0 ? 'Sin recargo' : `+ $${s.price.toLocaleString('es-AR')} ARS`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Nail Art Complexity */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gothic">Paso 3</span>
                <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                  Nivel de Complejidad de Nail Art
                </h4>
              </div>
              <div className="row g-3">
                {CALCULATOR_ART_LEVELS.map((a) => {
                  const isSelected = selectedArt.id === a.id;
                  return (
                    <div key={a.id} className="col-md-6">
                      <div
                        className={`calc-option-box ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedArt(a)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="font-crest text-bone fw-bold fs-7">{a.name}</span>
                            {isSelected ? (
                              <i className="bi bi-check-circle-fill text-magenta fs-6"></i>
                            ) : (
                              <span className="text-bone-muted fs-8">✦</span>
                            )}
                          </div>
                          <p className="text-bone-muted mb-2" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                            {a.desc}
                          </p>
                        </div>
                        <span className="text-magenta fw-bold fs-7 mt-2">
                          {a.price === 0 ? 'Incluido en base' : `+ $${a.price.toLocaleString('es-AR')} ARS`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Charms & Piercings */}
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-gothic">Paso 4</span>
                <h4 className="font-crest text-bone fs-6 fw-bold mb-0">
                  Charms, Piercings & Joyería 3D (Opcionales)
                </h4>
              </div>
              <div className="row g-2">
                {CALCULATOR_CHARMS.map((c) => {
                  const isChecked = selectedCharms.includes(c.id);
                  return (
                    <div key={c.id} className="col-md-6">
                      <div
                        className={`calc-charm-box ${isChecked ? 'active' : ''}`}
                        onClick={() => handleToggleCharm(c.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`bi ${
                              isChecked ? 'bi-check-square-fill text-magenta' : 'bi-square text-bone-muted'
                            } fs-6`}
                          ></i>
                          <span className="text-silver fs-7">{c.name}</span>
                        </div>
                        <span className="text-magenta fw-bold fs-7">
                          +${c.price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Live Total Summary Column - Grimorio de Cotización */}
          <div className="col-lg-4">
            <div
              className="gothic-reliquary-card p-4 position-sticky"
              style={{
                top: '100px',
                border: '1px solid rgba(255, 0, 127, 0.45)',
                boxShadow: '0 15px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255, 0, 127, 0.22)',
              }}
            >
              {/* Corner Filigree Pins */}
              <span className="gothic-corner-pin pin-tl">✦</span>
              <span className="gothic-corner-pin pin-tr">♰</span>
              <span className="gothic-corner-pin pin-bl">♰</span>
              <span className="gothic-corner-pin pin-br">✦</span>

              <div className="text-center mb-3">
                <span className="text-magenta font-serif fs-7 tracking-wider">✦ GRIMORIO DE COTIZACIÓN ✦</span>
                <h3 className="font-crest text-bone fs-5 mt-1">Presupuesto Estimado</h3>
              </div>

              {/* Price Display */}
              <div className="text-center my-3 py-3 border-top border-bottom border-dark">
                <span className="text-bone-muted d-block fs-8 tracking-wider mb-1">TOTAL ESTIMADO EN ARS</span>
                <div className="font-crest text-magenta fw-bold display-6 glow-magenta-text">
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
                  <span className="text-bone fw-semibold">{selectedBase.name}</span>
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
                  className="btn-gothic-primary"
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
                  className="btn-gothic-outline btn-gothic-sm"
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
