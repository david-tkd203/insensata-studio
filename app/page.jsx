'use client';

// app/page.jsx
import React, { useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import About from '@/src/components/About';
import Gallery from '@/src/components/Gallery';
import Services from '@/src/components/Services';
import NailCalculator from '@/src/components/NailCalculator';
import Testimonials from '@/src/components/Testimonials';
import HygieneProtocol from '@/src/components/HygieneProtocol';
import FAQ from '@/src/components/FAQ';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';
import BookingModal from '@/src/components/BookingModal';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [customSetDetails, setCustomSetDetails] = useState(null);

  // Open booking modal generic
  const handleOpenBooking = () => {
    setPreselectedService('');
    setCustomSetDetails(null);
    setIsBookingOpen(true);
  };

  // Open booking with specific service
  const handleSelectServiceForBooking = (serviceTitle) => {
    setCustomSetDetails(null);
    setPreselectedService(serviceTitle);
    setIsBookingOpen(true);
  };

  // Open booking with specific gallery design
  const handleSelectDesignForBooking = (designTitle) => {
    setCustomSetDetails(null);
    setPreselectedService(`Diseño de Galería: ${designTitle}`);
    setIsBookingOpen(true);
  };

  // Open booking with custom set from calculator
  const handleOpenBookingWithCustomSet = (setDetails) => {
    setPreselectedService('');
    setCustomSetDetails(setDetails);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <About onOpenBooking={handleOpenBooking} />
        <Gallery onSelectDesignForBooking={handleSelectDesignForBooking} />
        <Services onSelectServiceForBooking={handleSelectServiceForBooking} />
        <NailCalculator onOpenBookingWithCustomSet={handleOpenBookingWithCustomSet} />
        <Testimonials />
        <HygieneProtocol />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={preselectedService}
        customSetDetails={customSetDetails}
      />
    </div>
  );
}
