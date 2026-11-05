'use client';

// app/registro/page.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe contener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error al registrarse.');
        setLoading(false);
        return;
      }

      router.push('/perfil');
      router.refresh();
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error al conectar con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative d-flex flex-column justify-content-between">
      <Navbar />

      <main className="pt-5 pb-5 flex-grow-1 d-flex align-items-center position-relative">
        {/* Ambient occult glow */}
        <div
          className="position-absolute top-50 start-50 translate-middle pointer-events-none"
          style={{
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(255, 0, 127, 0.08) 0%, rgba(133, 8, 46, 0.04) 45%, transparent 70%)',
            filter: 'blur(55px)',
            zIndex: 0,
          }}
        />

        <div className="container pt-5 mt-4 position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-7 col-xl-6">
              {/* Seamless Editorial Registration Canvas (NO boxy card) */}
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

                  <span className="badge-gothic mb-2 d-inline-block">Membresía del Aquelarre</span>
                  <h1 className="font-crest text-bone fs-3 tracking-wider mb-1">
                    CREAR <span className="text-magenta">CUENTA</span>
                  </h1>
                  <p className="text-bone-muted font-serif fs-7 mb-0">
                    Regístrate para reservar citas exclusivas y acceder al historial de tus sets
                  </p>
                </div>

                <div className="editorial-hairline mb-4" />

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

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                      Nombre y Apellido *
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-gothic ps-5"
                        placeholder="Ej. Valeria Nocturna"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                      />
                      <i
                        className="bi bi-person text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                        style={{ left: '16px', pointerEvents: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                        Correo Electrónico *
                      </label>
                      <div className="position-relative">
                        <input
                          type="email"
                          className="form-control form-control-gothic ps-5"
                          placeholder="valeria@ejemplo.com"
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

                    <div className="col-md-6">
                      <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                        WhatsApp / Celular *
                      </label>
                      <div className="position-relative">
                        <input
                          type="tel"
                          className="form-control form-control-gothic ps-5"
                          placeholder="+54 9 11 5555-6666"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          autoComplete="tel"
                        />
                        <i
                          className="bi bi-whatsapp text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                          style={{ left: '16px', pointerEvents: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                        Contraseña *
                      </label>
                      <div className="position-relative">
                        <input
                          type="password"
                          className="form-control form-control-gothic ps-5"
                          placeholder="Mínimo 6 caracteres"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                        <i
                          className="bi bi-lock text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                          style={{ left: '16px', pointerEvents: 'none' }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-silver font-serif fs-7 text-uppercase tracking-wider mb-1">
                        Repetir Contraseña *
                      </label>
                      <div className="position-relative">
                        <input
                          type="password"
                          className="form-control form-control-gothic ps-5"
                          placeholder="Confirmar contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                        <i
                          className="bi bi-shield-check text-bone-muted position-absolute top-50 translate-middle-y fs-6"
                          style={{ left: '16px', pointerEvents: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privilege note */}
                  <div
                    className="p-3 my-2 rounded-1"
                    style={{
                      background: 'rgba(20, 14, 27, 0.45)',
                      border: '1px solid rgba(201, 194, 204, 0.1)',
                    }}
                  >
                    <p className="text-bone-muted fs-8 mb-0" style={{ lineHeight: '1.6' }}>
                      <i className="bi bi-stars text-magenta me-1"></i>
                      Al registrarte recibirás acceso preferencial al calendario mensual, confirmación inmediata con instrucciones de seña por correo y resguardo de tus preferencias en el atelier.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gothic-primary w-100 py-3 mt-1 font-crest fs-7 tracking-wider"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Iniciando en el Aquelarre...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-stars me-2"></i>
                        REGISTRARSE EN INSENSATA
                      </>
                    )}
                  </button>
                </form>

                <div className="editorial-hairline mt-4 mb-4" />

                <div className="text-center font-serif fs-7">
                  <span className="text-bone-muted">¿Ya eres parte de nuestra comunidad? </span>
                  <Link
                    href="/login"
                    className="text-magenta fw-bold text-decoration-none hover-magenta d-inline-block ms-1"
                  >
                    Iniciar sesión aquí ↗
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
