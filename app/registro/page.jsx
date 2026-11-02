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

      <main className="pt-5 pb-5 flex-grow-1 d-flex align-items-center">
        <div className="container pt-5 mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
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
                  <span className="badge-gothic mb-1">Membresía del Aquelarre</span>
                  <h1 className="font-crest text-bone fs-4 mb-1">CREAR CUENTA</h1>
                  <span className="text-magenta font-serif fs-7">✦ Registro de Clientas Insensata ✦</span>
                </div>

                {error && (
                  <div className="p-3 rounded mb-3 bg-danger-subtle text-danger border border-danger fs-7">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-silver fs-7">Nombre y Apellido *</label>
                    <input
                      type="text"
                      className="form-control form-control-gothic"
                      placeholder="Ej. Valeria Nocturna"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label text-silver fs-7">Correo Electrónico *</label>
                    <input
                      type="email"
                      className="form-control form-control-gothic"
                      placeholder="valeria@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label text-silver fs-7">WhatsApp / Teléfono *</label>
                    <input
                      type="tel"
                      className="form-control form-control-gothic"
                      placeholder="+54 9 11 5555-6666"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-sm-6">
                      <label className="form-label text-silver fs-7">Contraseña *</label>
                      <input
                        type="password"
                        className="form-control form-control-gothic"
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label text-silver fs-7">Repetir Contraseña *</label>
                      <input
                        type="password"
                        className="form-control form-control-gothic"
                        placeholder="Mínimo 6 caracteres"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gothic-primary w-100 py-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creando Cuenta...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-stars"></i>
                        Registrarme en Insensata
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4 pt-3 border-top border-dark">
                  <p className="text-bone-muted fs-7 mb-0">
                    ¿Ya tienes una cuenta creada?{' '}
                    <Link href="/login" className="text-magenta fw-bold text-decoration-none hover-magenta">
                      Inicia sesión aquí
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
