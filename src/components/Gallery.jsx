'use client';

// src/components/Gallery.jsx
import React, { useState } from 'react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/nailData';

export default function Gallery({ onSelectDesignForBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Portfolio de Alta Costura</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            GALERÍA <span className="text-magenta">OBSCURA</span>
          </h2>
          <div className="gothic-divider">
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '680px' }}>
            Explora nuestras creaciones más icónicas. Posa el cursor sobre cada obra para revelar sus especificaciones de alta ingeniería o solicítala directamente para tu próxima sesión ritual.
          </p>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 nav-pills-gothic">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`nav-link ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - Lookbook Editorial Gallery (No Boxy Card Containers) */}
        <div className="row g-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="gallery-editorial-card h-100 position-relative">
                {/* Media Container */}
                <div className="editorial-media position-relative rounded-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="editorial-vignette" />

                  {/* Top Badges */}
                  <div className="position-absolute top-0 start-0 m-3 z-3 d-flex flex-column gap-1">
                    <span className="badge-gothic shadow-sm">{item.badge}</span>
                    <span
                      className="badge-silver"
                      style={{ fontSize: '0.66rem', backdropFilter: 'blur(6px)', background: 'rgba(10,7,14,0.7)' }}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Quick Expand Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageModal(item);
                    }}
                    className="position-absolute top-0 end-0 m-3 z-3 border-0 rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: '34px',
                      height: '34px',
                      background: 'rgba(14, 10, 18, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 0, 127, 0.45)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    title="Ampliar obra"
                    aria-label={`Ver zoom de ${item.title}`}
                  >
                    <i className="bi bi-arrows-fullscreen fs-7"></i>
                  </button>

                  {/* Editorial Overlay Content */}
                  <div className="editorial-drawer">
                    <div className="d-flex justify-content-between align-items-baseline mb-1">
                      <span className="text-magenta font-display fw-bold" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                        ✦ {item.technique || 'ARQUITECTURA GÓTICA'}
                      </span>
                      <span className="text-silver" style={{ fontSize: '0.72rem' }}>
                        {item.length}
                      </span>
                    </div>

                    <h3 className="font-crest text-bone fs-6 fw-bold mb-2 text-shadow-sm">
                      {item.title}
                    </h3>

                    {/* Smooth Reveal Actions */}
                    <div className="artifact-actions">
                      <p className="text-bone-muted mb-2" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                        {item.description}
                      </p>

                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge-silver"
                            style={{ fontSize: '0.65rem', background: 'rgba(255, 0, 127, 0.08)' }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectDesignForBooking(item.title)}
                          className="btn-gothic-primary btn-gothic-sm w-100"
                        >
                          <i className="bi bi-droplet-half text-white"></i>
                          Reclamar este Ritual
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedImageModal(item)}
                          className="btn-gothic-outline btn-gothic-sm px-3"
                          title="Detalles y Zoom"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Lightbox / Image Zoom */}
        {selectedImageModal && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(7, 5, 8, 0.94)', backdropFilter: 'blur(12px)', zIndex: 1060 }}
            onClick={() => setSelectedImageModal(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content gothic-modal text-bone p-2">
                <div className="modal-header border-0 pb-2">
                  <div>
                    <span className="badge-gothic mb-1">{selectedImageModal.badge}</span>
                    <h4 className="font-crest text-bone fs-5 mt-1 mb-0">
                      {selectedImageModal.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedImageModal(null)}
                    aria-label="Cerrar modal"
                  ></button>
                </div>

                <div className="modal-body text-center p-3">
                  <div
                    className="rounded-3 overflow-hidden mb-3 mx-auto"
                    style={{
                      maxHeight: '480px',
                      border: '1px solid rgba(255, 0, 127, 0.4)',
                      boxShadow: '0 0 35px rgba(255, 0, 127, 0.25)',
                    }}
                  >
                    <img
                      src={selectedImageModal.image}
                      alt={selectedImageModal.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <div className="text-start p-2">
                    <div className="row g-2 mb-3">
                      <div className="col-sm-6">
                        <div
                          className="p-2 rounded"
                          style={{ background: 'rgba(25, 16, 36, 0.7)', border: '1px solid rgba(255, 0, 127, 0.15)' }}
                        >
                          <small className="text-magenta d-block font-serif fs-8 fw-bold">TÉCNICA DE AUTOR</small>
                          <span className="text-silver fs-7">{selectedImageModal.technique}</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div
                          className="p-2 rounded"
                          style={{ background: 'rgba(25, 16, 36, 0.7)', border: '1px solid rgba(255, 0, 127, 0.15)' }}
                        >
                          <small className="text-magenta d-block font-serif fs-8 fw-bold">LARGO SUGERIDO</small>
                          <span className="text-silver fs-7">{selectedImageModal.length}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-bone-muted mb-3 fs-7" style={{ lineHeight: '1.6' }}>
                      {selectedImageModal.description}
                    </p>

                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {selectedImageModal.tags.map((t, i) => (
                        <span key={i} className="badge-silver" style={{ fontSize: '0.72rem' }}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-end gap-2 pt-2 border-top border-dark">
                      <button
                        className="btn-gothic-outline btn-gothic-sm"
                        onClick={() => setSelectedImageModal(null)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="btn-gothic-primary btn-gothic-sm"
                        onClick={() => {
                          const title = selectedImageModal.title;
                          setSelectedImageModal(null);
                          onSelectDesignForBooking(title);
                        }}
                      >
                        <i className="bi bi-calendar2-check"></i>
                        Agendar con este Diseño
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
