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
            <span className="runes-pulse">✦ ☾ ♰ ☽ ✦</span>
          </div>
          <p className="text-bone-muted mx-auto" style={{ maxWidth: '650px' }}>
            Todo lo que necesitas saber antes de entregarte a la experiencia Insensata.
          </p>
        </div>

        {/* Minimal Editorial Accordion - Hairline Rows, No Box Containers */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion-editorial">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const formattedNum = String(idx + 1).padStart(2, '0');
                return (
                  <div key={idx} className="accordion-item mb-2">
                    <button
                      className={`accordion-button w-100 text-start d-flex justify-content-between align-items-center ${
                        isOpen ? '' : 'collapsed'
                      }`}
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3 pe-3">
                        <span className="text-magenta font-serif fs-8 fw-bold opacity-75">
                          {formattedNum}
                        </span>
                        <span className="font-crest fs-6">{faq.q}</span>
                      </div>
                      <i
                        className={`bi ${
                          isOpen ? 'bi-dash-lg text-magenta' : 'bi-plus-lg text-silver'
                        } fs-6`}
                      ></i>
                    </button>
                    {isOpen && (
                      <div className="accordion-body">
                        <p className="mb-0 text-bone-muted ps-4" style={{ fontSize: '0.88rem', lineHeight: '1.7' }}>
                          {faq.a}
                        </p>
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
