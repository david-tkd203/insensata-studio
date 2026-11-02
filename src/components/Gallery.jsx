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
            Explora nuestras creaciones más icónicas. Obras escultóricas forjadas para desafiar lo convencional. Posa el cursor sobre cada fotografía para ampliarla o reclamar el diseño directamente.
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

        {/* Gallery Grid - Pure Photography Hero with Integrated Canvas Caption (No Boxy Card Containers) */}
        <div className="row g-4 g-xl-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="atelier-gallery-item h-100 d-flex flex-column justify-content-between">
                {/* 1. Unblocked Hero Photography Frame */}
                <div
                  className="atelier-image-frame position-relative"
                  onClick={() => setSelectedImageModal(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalles de ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedImageModal(item);
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="atelier-gallery-img"
                  />

                  {/* Single Discreet Corner Hallmark Badge */}
                  <span className="atelier-badge-corner">
                    {item.badge}
                  </span>

                  {/* Clean Hover Overlay with Elegant Centered Actions */}
                  <div className="atelier-image-hover-overlay d-flex flex-column align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageModal(item);
                      }}
                      className="atelier-hover-action-circle"
                      title="Ampliar obra"
                      aria-label={`Ver zoom de ${item.title}`}
                    >
                      <i className="bi bi-arrows-fullscreen"></i>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDesignForBooking(item.title);
                      }}
                      className="atelier-hover-action-pill"
                    >
                      <i className="bi bi-droplet-half text-magenta"></i>
                      <span>Reclamar Ritual</span>
                    </button>
                  </div>
                </div>

                {/* 2. Integrated Caption BELOW the Image (Canvas-integrated, zero box background) */}
                <div className="atelier-caption pt-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="atelier-category-tag">
                      <span className="text-magenta me-1">✦</span>
                      {item.categoryLabel}
                    </span>
                    <span className="atelier-length-tag">
                      {item.length ? item.length.split('/')[0].trim() : ''}
                    </span>
                  </div>

                  <h3
                    className="atelier-caption-title font-crest text-bone fs-6 fw-bold mb-1"
                    onClick={() => setSelectedImageModal(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedImageModal(item);
                      }
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="atelier-caption-spec text-bone-muted mb-2">
                    {item.technique ? item.technique.split('+').slice(0, 2).join(' • ') : 'Técnica de Autor'}
                  </p>

                  {/* Subtle Bottom Action Line */}
                  <div className="atelier-caption-action d-flex align-items-center justify-content-between pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectDesignForBooking(item.title)}
                      className="atelier-action-link"
                    >
                      <span>Agendar este diseño</span>
                      <i className="bi bi-arrow-right text-magenta"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedImageModal(item)}
                      className="atelier-zoom-btn"
                      title="Detalles y Zoom"
                      aria-label="Ver detalles"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
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
            style={{ backgroundColor: 'rgba(7, 5, 8, 0.94)', backdropFilter: 'blur(16px)', zIndex: 1060 }}
            onClick={() => setSelectedImageModal(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content gothic-modal text-bone p-3">
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

                <div className="modal-body p-3">
                  <div
                    className="rounded-2 overflow-hidden mb-3 mx-auto"
                    style={{
                      maxHeight: '480px',
                      border: '1px solid rgba(255, 0, 127, 0.35)',
                      boxShadow: '0 0 35px rgba(255, 0, 127, 0.2)',
                    }}
                  >
                    <img
                      src={selectedImageModal.image}
                      alt={selectedImageModal.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <div className="text-start pt-2">
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
