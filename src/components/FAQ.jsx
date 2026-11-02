'use client';

// src/components/FAQ.jsx
import React, { useState } from 'react';
import { FAQS } from '../data/nailData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-5 position-relative">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-gothic px-3 py-1 mb-2">Resolución de Dudas</span>
          <h2 className="font-crest text-bone fw-bold display-6 mb-2">
            PREGUNTAS <span className="text-magenta">FRECUENTES</span>
          </h2>
          <div className="gothic-divider">
            <span>✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Todo lo que necesitas saber antes de entregarte a la experiencia Insensata.
          </p>
        </div>

        {/* Accordion */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion-gothic">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="accordion-item mb-3">
                    <button
                      className={`accordion-button w-100 text-start d-flex justify-content-between align-items-center ${
                        isOpen ? '' : 'collapsed'
                      }`}
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      <span className="pe-3">{faq.q}</span>
                      <i
                        className={`bi ${
                          isOpen ? 'bi-dash-circle text-magenta' : 'bi-plus-circle text-silver'
                        } fs-6`}
                      ></i>
                    </button>
                    {isOpen && (
                      <div className="accordion-body">
                        <p className="mb-0">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
