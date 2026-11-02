'use client';

// src/components/BookingModal.jsx
import React, { useState, useEffect } from 'react';
import { STUDIO_INFO, SERVICES_MENU } from '../data/nailData';

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService,
  customSetDetails,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    timeSlot: 'Tarde (16:00 - 18:00 hs)',
    length: 'Largo 3-4 (Gothic Stiletto / Coffin)',
    notes: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    } else if (customSetDetails) {
      setFormData((prev) => ({
        ...prev,
        service: `Set Cotizado: ${customSetDetails.base} + ${customSetDetails.shape}`,
        notes: `Nail Art: ${customSetDetails.art}. Charms: ${customSetDetails.charms?.join(', ') || 'Sin charms'}. Total est: $${customSetDetails.total} ARS`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        service: SERVICES_MENU[0].title,
      }));
    }
  }, [preselectedService, customSetDetails, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `✦ *SOLICITUD DE CITA PRIVADA - INSENSATA ESTUDIO* ✦

🖤 *Clienta:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}
🔮 *Servicio / Diseño:* ${formData.service}
🗓️ *Fecha deseada:* ${formData.date || 'A coordinar según disponibilidad'}
⏰ *Franja Horaria:* ${formData.timeSlot}
🗡️ *Largo Preferido:* ${formData.length}
${formData.notes ? `📝 *Detalles / Referencias:* ${formData.notes}\n` : ''}
¡Hola! Me encantaría confirmar la disponibilidad y coordinar la seña para asegurar mi turno. Muchas gracias ✦`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{
        backgroundColor: 'rgba(7, 5, 8, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 1055,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content gothic-modal text-bone">
          {/* Header */}
          <div className="modal-header border-bottom border-dark px-4 pt-4 pb-3">
            <div>
              <span className="badge-gothic mb-1">Cita Privada Exclusiva</span>
              <h3 className="font-crest text-bone fs-4 mb-0">
                AGENDAR RITUAL EN <span className="text-magenta">INSENSATA</span>
              </h3>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre o alias"
                  className="form-control form-control-gothic"
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: +54 9 11 1234-5678"
                  className="form-control form-control-gothic"
                />
              </div>

              {/* Service Selection */}
              <div className="col-md-12">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Servicio o Diseño Solicitado *
                </label>
                <input
                  type="text"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Ej: Esculpidas XXL, Soft Gel, o nombre de diseño de la galería"
                  className="form-control form-control-gothic"
                />
              </div>

              {/* Preferred Date */}
              <div className="col-md-6">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Fecha Tentativa Deseada
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control form-control-gothic"
                />
              </div>

              {/* Time Slot */}
              <div className="col-md-6">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Preferencia de Horario
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="form-select form-select-gothic"
                >
                  <option value="Mañana (11:00 - 13:30 hs)">Mañana (11:00 - 13:30 hs)</option>
                  <option value="Mediodía (13:30 - 16:00 hs)">Mediodía (13:30 - 16:00 hs)</option>
                  <option value="Tarde (16:00 - 18:30 hs)">Tarde (16:00 - 18:30 hs)</option>
                  <option value="Nocturno (18:30 - 20:30 hs)">Nocturno (18:30 - 20:30 hs)</option>
                </select>
              </div>

              {/* Length Preference */}
              <div className="col-md-6">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Largo de la Garra
                </label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="form-select form-select-gothic"
                >
                  <option value="Largo Natural / Cortas (Kapping)">Largo Natural / Cortas (Kapping)</option>
                  <option value="Largo 1-2 (Almond / Coffin Corto)">Largo 1-2 (Almond / Coffin Corto)</option>
                  <option value="Largo 3-4 (Gothic Stiletto / Coffin)">Largo 3-4 (Gothic Stiletto / Coffin)</option>
                  <option value="Largo 5+ (XXL Claws Extremo)">Largo 5+ (XXL Claws Extremo)</option>
                </select>
              </div>

              {/* Deposit notification info */}
              <div className="col-md-6 d-flex align-items-center">
                <div
                  className="p-2 rounded w-100"
                  style={{ background: 'rgba(255, 0, 127, 0.08)', border: '1px solid rgba(255, 0, 127, 0.25)' }}
                >
                  <small className="text-magenta d-block fw-bold fs-7 mb-1">
                    <i className="bi bi-info-circle-fill me-1"></i>
                    Política de Seña (30%)
                  </small>
                  <small className="text-bone-muted" style={{ fontSize: '0.72rem' }}>
                    Al enviar este formulario te redirigiremos a WhatsApp para congelar tu lugar en la agenda.
                  </small>
                </div>
              </div>

              {/* Notes */}
              <div className="col-12">
                <label className="form-label text-silver font-serif fs-7 fw-semibold">
                  Notas Adicionales o Enlace a Foto de Referencia (Opcional)
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Pega aquí enlaces de Pinterest/Instagram o cuéntanos detalles que quieras sumar..."
                  className="form-control form-control-gothic"
                ></textarea>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top border-dark">
              <button
                type="button"
                className="btn-gothic-outline btn-gothic-sm"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-gothic-primary">
                <i className="bi bi-whatsapp"></i>
                Enviar Solicitud por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
