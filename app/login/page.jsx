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

      <main className="pt-5 pb-5 flex-grow-1 d-flex align-items-center">
        <div className="container pt-5 mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-5">
              <div
                className="gothic-card p-4 p-md-5"
                style={{
                  background: 'linear-gradient(180deg, rgba(35, 18, 44, 0.95) 0%, rgba(14, 10, 18, 0.98) 100%)',
                  border: '1px solid rgba(255, 0, 127, 0.3)',
                  boxShadow: '0 0 35px rgba(255, 0, 127, 0.25)',
                }}
              >
                {/* Brand header */}
                <div className="text-center mb-4">
                  <div
                    className="rounded-circle mx-auto mb-3 overflow-hidden"
                    style={{
                      width: '65px',
                      height: '65px',
                      border: '2px solid var(--neon-magenta)',
                      boxShadow: '0 0 15px rgba(255, 0, 127, 0.5)',
                    }}
                  >
                    <img
                      src="/insensata_logo.jpeg"
                      alt="INSENSATA ESTUDIO"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <span className="badge-gothic mb-1">Acceso Exclusivo</span>
                  <h1 className="font-crest text-bone fs-4 mb-1">INICIAR SESIÓN</h1>
                  <span className="text-magenta font-serif fs-7">✦ Atelier Privado Insensata ✦</span>
                </div>

                {/* Quick Credentials Demo Box */}
                <div
                  className="p-3 rounded mb-4 text-start border"
                  style={{
                    background: 'rgba(255, 0, 127, 0.08)',
                    borderColor: 'rgba(255, 0, 127, 0.25)',
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-magenta fw-bold fs-8 text-uppercase">
                      <i className="bi bi-key-fill me-1"></i> Accesos Demo Pre-configurados:
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleFillAdmin}
                      className="btn-gothic-outline btn-gothic-sm fs-8 py-1 px-2"
                      title="admin@insensata.com"
                    >
                      <i className="bi bi-shield-lock-fill text-magenta me-1"></i> Cargar Admin
                    </button>
                    <button
                      type="button"
                      onClick={handleFillClient}
                      className="btn-gothic-outline btn-gothic-sm fs-8 py-1 px-2"
                      title="valeria.vamp@example.com"
                    >
                      <i className="bi bi-person-fill text-magenta me-1"></i> Cargar Clienta
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded mb-3 bg-danger-subtle text-danger border border-danger fs-7">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-silver fs-7">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control form-control-gothic"
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label text-silver fs-7 mb-0">Contraseña</label>
                    </div>
                    <input
                      type="password"
                      className="form-control form-control-gothic"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gothic-primary w-100 py-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Validando Credenciales...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right"></i>
                        Ingresar al Atelier
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4 pt-3 border-top border-dark">
                  <p className="text-bone-muted fs-7 mb-0">
                    ¿Primera vez en Insensata?{' '}
                    <Link href="/registro" className="text-magenta fw-bold text-decoration-none hover-magenta">
                      Regístrate aquí
                    </Link>
                  </p>
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
