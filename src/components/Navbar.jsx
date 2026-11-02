'use client';

// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STUDIO_INFO } from '../data/nailData';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error fetching user auth status:', err);
      } finally {
        setLoadingUser(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const closeNav = () => setNavOpen(false);

  return (
    <nav
      className={`navbar navbar-expand-xl fixed-top transition-all duration-300 ${
        scrolled ? 'bg-glassmorphism shadow-lg py-2' : 'bg-transparent py-3'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(255, 0, 127, 0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        zIndex: 1030,
      }}
    >
      <div className="container-fluid px-lg-5">
        {/* Brand Logo & Name */}
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/" onClick={closeNav}>
          <div
            className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
            style={{
              width: '44px',
              height: '44px',
              border: '2px solid var(--neon-magenta)',
              boxShadow: '0 0 10px rgba(255, 0, 127, 0.5)',
              background: '#070508',
            }}
          >
            <img
              src="/insensata_logo.jpeg"
              alt="INSENSATA ESTUDIO"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="d-flex flex-column">
            <span className="font-crest text-bone fw-bold fs-5 tracking-wider lh-1">
              INSENSATA
            </span>
            <span
              className="text-magenta font-display fw-bold"
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
            >
              ESTUDIO ✦ ATELIER
            </span>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none text-bone p-2"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-expanded={navOpen}
          aria-label="Alternar navegación"
          style={{ background: 'rgba(255, 0, 127, 0.15)', borderRadius: '4px' }}
        >
          <i className={`bi ${navOpen ? 'bi-x-lg' : 'bi-list'} fs-4 text-magenta`}></i>
        </button>

        {/* Links Menu */}
        <div className={`collapse navbar-collapse ${navOpen ? 'show bg-obsidian-surface p-3 mt-3 rounded shadow-lg' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-xl-0 text-uppercase font-serif fs-7 gap-xl-2">
            <li className="nav-item">
              <Link className="nav-link text-bone hover-magenta px-2" href="/#about" onClick={closeNav}>
                Atelier
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-bone hover-magenta px-2" href="/#gallery" onClick={closeNav}>
                Galería
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-bone hover-magenta px-2" href="/#services" onClick={closeNav}>
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-magenta fw-bold px-2" href="/#calculator" onClick={closeNav}>
                ✦ Cotizador
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-bone hover-magenta px-2" href="/#hygiene" onClick={closeNav}>
                Protocolo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-bone hover-magenta px-2" href="/politicas" onClick={closeNav}>
                Políticas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-magenta px-2 fw-semibold" href="/agendar" onClick={closeNav}>
                <i className="bi bi-calendar-heart me-1"></i>
                Agendar Turno
              </Link>
            </li>
          </ul>

          {/* Action CTA & Auth Buttons */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 mt-xl-0">
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <Link
                    href="/admin"
                    onClick={closeNav}
                    className="btn-gothic-outline btn-gothic-sm text-magenta border-magenta"
                    style={{ borderColor: 'var(--neon-magenta)' }}
                  >
                    <i className="bi bi-shield-lock-fill text-magenta"></i>
                    Admin ♰
                  </Link>
                ) : (
                  <Link
                    href="/perfil"
                    onClick={closeNav}
                    className="btn-gothic-outline btn-gothic-sm"
                  >
                    <i className="bi bi-person-circle text-magenta"></i>
                    Mi Cuenta
                  </Link>
                )}

                <button
                  onClick={() => {
                    closeNav();
                    handleLogout();
                  }}
                  className="btn-gothic-outline btn-gothic-sm text-silver"
                  title="Cerrar Sesión"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="d-none d-md-inline ms-1">Salir</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  href="/login"
                  onClick={closeNav}
                  className="btn-gothic-outline btn-gothic-sm"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Iniciar Sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={closeNav}
                  className="btn-gothic-outline btn-gothic-sm text-magenta border-magenta d-none d-md-inline-flex"
                >
                  <i className="bi bi-stars"></i>
                  Registrarse
                </Link>
              </div>
            )}

            {/* Quick Agendar Button */}
            <Link
              href="/agendar"
              onClick={closeNav}
              className="btn-gothic-primary btn-gothic-sm"
            >
              <i className="bi bi-calendar2-heart"></i>
              <span>Agendar</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
