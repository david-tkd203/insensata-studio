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
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '680px' }}>
            Explora nuestras creaciones más icónicas. Haz clic en cualquier diseño para ampliar los detalles o solicítalo directamente para tu próxima sesión ritual.
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

        {/* Gallery Grid */}
        <div className="row g-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="gothic-card h-100 d-flex flex-column">
                {/* Image Container with Zoom Trigger */}
                <div
                  className="position-relative overflow-hidden cursor-pointer"
                  style={{ height: '260px', background: '#0a070e' }}
                  onClick={() => setSelectedImageModal(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver zoom de ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100 h-100 object-fit-cover transition-transform duration-500"
                    style={{
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Badge */}
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge-gothic">{item.badge}</span>
                  </div>

                  {/* Quick Expand Icon */}
                  <div
                    className="position-absolute bottom-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(14, 10, 18, 0.75)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 0, 127, 0.4)',
                    }}
                  >
                    <i className="bi bi-arrows-fullscreen fs-7"></i>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <span
                      className="text-magenta font-display fw-bold"
                      style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}
                    >
                      {item.categoryLabel}
                    </span>
                    <span className="text-bone-muted" style={{ fontSize: '0.72rem' }}>
                      {item.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-bone fs-6 fw-bold mb-2">{item.title}</h3>

                  <p className="text-bone-muted mb-3 flex-grow-1" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="badge-silver" style={{ fontSize: '0.68rem' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onSelectDesignForBooking(item.title)}
                    className="btn-gothic-outline btn-gothic-sm w-100"
                  >
                    <i className="bi bi-droplet-half text-magenta"></i>
                    Quiero este Diseño
                  </button>
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
            style={{ backgroundColor: 'rgba(7, 5, 8, 0.92)', backdropFilter: 'blur(8px)', zIndex: 1060 }}
            onClick={() => setSelectedImageModal(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content gothic-modal text-bone">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <span className="badge-gothic">{selectedImageModal.badge}</span>
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
                    className="rounded overflow-hidden mb-3 mx-auto"
                    style={{
                      maxHeight: '480px',
                      border: '1px solid rgba(255, 0, 127, 0.3)',
                      boxShadow: '0 0 25px rgba(255, 0, 127, 0.2)',
                    }}
                  >
                    <img
                      src={selectedImageModal.image}
                      alt={selectedImageModal.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <div className="text-start p-2">
                    <p className="text-silver mb-2">
                      <strong className="text-magenta">Técnica: </strong>
                      {selectedImageModal.technique}
                    </p>
                    <p className="text-silver mb-2">
                      <strong className="text-magenta">Largo sugerido: </strong>
                      {selectedImageModal.length}
                    </p>
                    <p className="text-bone-muted mb-3">{selectedImageModal.description}</p>
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {selectedImageModal.tags.map((t, i) => (
                        <span key={i} className="badge-silver">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-end gap-2">
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
                        Agendar con este diseño
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
