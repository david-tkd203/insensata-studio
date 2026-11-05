'use client';

// app/login/page.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFillAdmin = () => {
    setEmail('admin@insensata.com');
    setPassword('InsensataAdmin2026!');
    setError('');
  };

  const handleFillClient = () => {
    setEmail('valeria.vamp@example.com');
    setPassword('Valeria123!');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Credenciales inválidas');
        setLoading(false);
        return;
      }

      // Check role
      if (data.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/perfil');
      }
      router.refresh();
    } catch (err) {
      console.error('Login submit error:', err);
      setError('Error de conexión con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative d-flex flex-column justify-content-between">
      <Navbar />

      <main className="pt-5 pb-5 flex-grow-1 d-flex align-items-center position-relative">
        {/* Ambient occult glow behind the canvas */}
        <div
          className="position-absolute top-50 start-50 translate-middle pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 0, 127, 0.08) 0%, rgba(133, 8, 46, 0.04) 45%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 0,
          }}
        />

        <div className="container pt-5 mt-4 position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-5">
              {/* Seamless Editorial Canvas Container (NO boxy card) */}
              <div className="editorial-auth-canvas py-4 px-3 px-sm-4">
                {/* Brand Header */}
                <div className="text-center mb-4">
                  <div className="logo-glow-wrapper mb-3">
                    <div
                      className="rounded-circle mx-auto overflow-hidden"
                      style={{
                        width: '74px',
                        height: '74px',
                        border: '2px solid var(--neon-magenta)',
                        boxShadow: '0 0 25px rgba(255, 0, 127, 0.45)',
                      }}
                    >
                      <img
                        src="/insensata_logo.jpeg"
                        alt="INSENSATA ESTUDIO"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>

                  <span className="badge-gothic mb-2 d-inline-block">Acceso al Atelier Privado</span>
                  <h1 className="font-crest text-bone fs-3 tracking-wider mb-1">
                    INICIAR <span className="text-magenta">SESIÓN</span>
                  </h1>
                  <p className="text-bone-muted font-serif fs-7 mb-0">
                    Ingresa a tu portal exclusivo de clienta o administración
                  </p>
                </div>

                <div className="editorial-hairline mb-4" />

                {/* Quick Credentials Demo Pill Bar */}
                <div
                  className="p-3 mb-4 rounded-1"
                  style={{
                    background: 'rgba(20, 14, 27, 0.55)',
                    border: '1px solid rgba(201, 194, 204, 0.14)',
                    borderLeft: '3px solid var(--neon-magenta)',
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-magenta font-serif fs-8 text-uppercase tracking-wider fw-semibold">
                      <i className="bi bi-key me-1"></i> Credenciales de Prueba Rápidas
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleFillAdmin}
                      className="btn btn-sm btn-gothic-outline fs-8 py-1 px-3 d-inline-flex align-items-center gap-1"
                      title="admin@insensata.com"
                    >
                      <i className="bi bi-shield-lock text-magenta"></i>
                      <span>Acceso Admin</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFillClient}
                      className="btn btn-sm btn-gothic-outline fs-8 py-1 px-3 d-inline-flex align-items-center gap-1"
                      title="valeria.vamp@example.com"
                    >
                      <i className="bi bi-person-check text-magenta"></i>
                      <span>Acceso Clienta</span>
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    className="p-3 mb-4 rounded-1 fs-7 d-flex align-items-start gap-2"
                    style={{
                      background: 'rgba(133, 8, 46, 0.25)',
                      border: '1px solid rgba(255, 0, 127, 0.4)',
                      borderLeft: '3px solid var(--neon-magenta)',
                      color: '#fce4ec',
                    }}
                  >
                    <i className="bi bi-exclamation-octagon-fill text-magenta fs-6 mt-0"></i>
                    <div>{error}</div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control form-control-gothic ps-5"
                        placeholder="tu-correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                      <i
                        className="bi bi-envelope text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                        style={{ left: '16px', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-0">
                        Contraseña
                      </label>
                    </div>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control form-control-gothic ps-5"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <i
                        className="bi bi-lock text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                        style={{ left: '16px', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gothic-primary w-100 py-3 mt-2 font-crest fs-7 tracking-wider"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Validando Entrada...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        INGRESAR AL SANTUARIO
                      </>
                    )}
                  </button>
                </form>

                <div className="editorial-hairline mt-4 mb-4" />

                <div className="text-center font-serif fs-7">
                  <span className="text-bone-muted">¿Primera vez en el aquelarre de Insensata? </span>
                  <Link
                    href="/registro"
                    className="text-magenta fw-bold text-decoration-none hover-magenta d-inline-block ms-1"
                  >
                    Crear mi cuenta ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
