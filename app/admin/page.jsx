'use client';

// app/admin/page.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STUDIO_INFO } from '@/src/data/nailData';

export default function AdminDashboardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Data states
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Active view tab: 'turnos' | 'bloqueos' | 'stats'
  const [activeTab, setActiveTab] = useState('turnos');

  // Filter states for appointments
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Block slot form state
  const [blockDate, setBlockDate] = useState('');
  const [blockSlot, setBlockSlot] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [blockSubmitting, setBlockSubmitting] = useState(false);

  // Selected appointment for detail modal
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const router = useRouter();

  // Check auth
  useEffect(() => {
    async function verifyAdmin() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.authenticated || data.user?.role !== 'admin') {
          router.push('/login');
          return;
        }
        setCurrentUser(data.user);
        loadAllAdminData();
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/login');
      } finally {
        setLoadingAuth(false);
      }
    }
    verifyAdmin();
  }, []);

  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      // Load stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Load appointments
      await loadAppointments();

      // Load blocked slots
      const blockRes = await fetch('/api/admin/blocked-slots');
      if (blockRes.ok) {
        const blockData = await blockRes.json();
        setBlockedSlots(blockData.blocked || []);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const loadAppointments = async (status = statusFilter, search = searchFilter, date = dateFilter) => {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.set('status', status);
      if (search) params.set('search', search);
      if (date) params.set('date', date);

      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
    }
  };

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    loadAppointments(newStatus, searchFilter, dateFilter);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadAppointments(statusFilter, searchFilter, dateFilter);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSearchFilter('');
    setDateFilter('');
    loadAppointments('all', '', '');
  };

  // Update appointment status
  const handleUpdateStatus = async (id, newStatus, depositPaid) => {
    setActionLoading(id);
    try {
      const body = { status: newStatus };
      if (depositPaid !== undefined) body.deposit_paid = depositPaid;

      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await loadAllAdminData();
        if (selectedAppt?.id === id) {
          const updated = await res.json();
          setSelectedAppt(updated.appointment);
        }
      } else {
        const err = await res.json();
        alert(err.error || 'No se pudo actualizar el estado.');
      }
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    if (!confirm(`¿Eliminar definitivamente el turno #${id} de la base de datos?`)) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedAppt?.id === id) setSelectedAppt(null);
        await loadAllAdminData();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Create blocked slot
  const handleCreateBlock = async (e) => {
    e.preventDefault();
    if (!blockDate) return;

    setBlockSubmitting(true);
    try {
      const res = await fetch('/api/admin/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          block_date: blockDate,
          time_slot: blockSlot || null,
          reason: blockReason || 'Bloqueo administrativo del Atelier',
        }),
      });

      if (res.ok) {
        setBlockDate('');
        setBlockSlot('');
        setBlockReason('');
        await loadAllAdminData();
        alert('Bloqueo registrado exitosamente en la agenda.');
      } else {
        const err = await res.json();
        alert(err.error || 'Error al registrar bloqueo.');
      }
    } catch (err) {
      console.error('Block create error:', err);
    } finally {
      setBlockSubmitting(false);
    }
  };

  // Delete blocked slot
  const handleDeleteBlock = async (id) => {
    if (!confirm('¿Liberar este horario bloqueado para permitir reservas?')) return;
    try {
      const res = await fetch(`/api/admin/blocked-slots?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadAllAdminData();
      }
    } catch (err) {
      console.error('Delete block error:', err);
    }
  };

  // Generate WhatsApp Direct Link for Client
  const getClientWhatsAppLink = (appt) => {
    let message = '';
    if (appt.status === 'Pendiente') {
      message = `Hola ${appt.client_name}! Te escribimos desde Insensata Estudio respecto a tu solicitud de turno #${appt.id} para ${appt.service_name} el día ${appt.appointment_date} a las ${appt.time_slot} hs. Te recordamos que dispones de 2 horas para transferir la seña del 50% al alias INSENSATA.NAILS para asegurar tu lugar. ¡Muchas gracias! 🖤`;
    } else if (appt.status === 'Confirmado') {
      message = `Hola ${appt.client_name}! Desde Insensata Estudio te confirmamos que tu turno #${appt.id} para el ${appt.appointment_date} a las ${appt.time_slot} hs se encuentra 100% asegurado. Te esperamos en nuestro atelier privado en Palermo. Recuerda la tolerancia estricta de 15 minutos ✦`;
    } else {
      message = `Hola ${appt.client_name}! Te escribimos desde Insensata Estudio respecto a tu turno #${appt.id}.`;
    }

    const cleanPhone = appt.client_phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  if (loadingAuth) {
    return (
      <div className="bg-obsidian-void text-bone min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <span className="spinner-border text-magenta mb-3" role="status"></span>
          <p className="font-serif text-silver">Autenticando credenciales de Administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian-void text-bone min-vh-100 position-relative pb-5">
      {/* Top Admin Bar */}
      <header
        className="bg-obsidian-dark border-bottom border-magenta sticky-top py-3"
        style={{ borderColor: 'rgba(255, 0, 127, 0.35)', zIndex: 1020 }}
      >
        <div className="container-fluid px-lg-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            {/* Title & Brand */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '2px solid var(--neon-magenta)',
                  boxShadow: '0 0 10px rgba(255, 0, 127, 0.5)',
                }}
              >
                <img
                  src="/insensata_logo.jpeg"
                  alt="INSENSATA ESTUDIO"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div>
                <span className="font-crest text-bone fw-bold fs-5 tracking-wider d-block lh-1">
                  INSENSATA ♰ COORDINACIÓN
                </span>
                <span className="text-magenta font-display fs-8 fw-semibold text-uppercase tracking-wider">
                  Admin Dashboard Oficial • Atelier Privado
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="d-flex align-items-center gap-2">
              <Link href="/" className="btn-gothic-outline btn-gothic-sm">
                <i className="bi bi-globe"></i> Ver Web
              </Link>
              <Link href="/agendar" className="btn-gothic-outline btn-gothic-sm">
                <i className="bi bi-calendar-plus"></i> Agendar
              </Link>
              <Link href="/politicas" className="btn-gothic-outline btn-gothic-sm">
                <i className="bi bi-file-text"></i> Políticas
              </Link>

              <button
                onClick={handleLogout}
                className="btn-gothic-outline btn-gothic-sm text-silver"
                title="Cerrar Sesión Admin"
              >
                <i className="bi bi-box-arrow-right"></i> Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-fluid px-lg-5 pt-4">
        {/* KPI Stats Cards */}
        {stats && (
          <div className="row g-3 mb-4">
            {/* Total */}
            <div className="col-6 col-md-4 col-xl-2">
              <div className="gothic-card p-3 h-100 text-center">
                <span className="text-bone-muted fs-8 font-serif text-uppercase d-block mb-1">
                  Total Citas
                </span>
                <span className="font-crest text-bone fs-2 fw-bold">{stats.total}</span>
              </div>
            </div>

            {/* Pendientes */}
            <div className="col-6 col-md-4 col-xl-2">
              <div
                className="gothic-card p-3 h-100 text-center"
                style={{
                  border: '1px solid var(--neon-magenta)',
                  boxShadow: '0 0 15px rgba(255, 0, 127, 0.25)',
                }}
              >
                <span className="text-magenta fs-8 font-serif text-uppercase fw-bold d-block mb-1">
                  ✦ Pendientes Seña
                </span>
                <span className="font-crest text-magenta fs-2 fw-bold">{stats.pending}</span>
              </div>
            </div>

            {/* Confirmados */}
            <div className="col-6 col-md-4 col-xl-2">
              <div className="gothic-card p-3 h-100 text-center">
                <span className="text-success fs-8 font-serif text-uppercase fw-bold d-block mb-1">
                  Confirmadas
                </span>
                <span className="font-crest text-success fs-2 fw-bold">{stats.confirmed}</span>
              </div>
            </div>

            {/* Completados */}
            <div className="col-6 col-md-4 col-xl-2">
              <div className="gothic-card p-3 h-100 text-center">
                <span className="text-info fs-8 font-serif text-uppercase fw-bold d-block mb-1">
                  Completadas
                </span>
                <span className="font-crest text-info fs-2 fw-bold">{stats.completed}</span>
              </div>
            </div>

            {/* Facturación */}
            <div className="col-6 col-md-4 col-xl-2">
              <div className="gothic-card p-3 h-100 text-center">
                <span className="text-silver fs-8 font-serif text-uppercase d-block mb-1">
                  Ingreso Estimado
                </span>
                <span className="font-serif text-magenta fs-5 fw-bold">
                  ${stats.estimatedRevenue.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {/* Clientas Registradas */}
            <div className="col-6 col-md-4 col-xl-2">
              <div className="gothic-card p-3 h-100 text-center">
                <span className="text-bone-muted fs-8 font-serif text-uppercase d-block mb-1">
                  Clientas Registradas
                </span>
                <span className="font-crest text-bone fs-2 fw-bold">{stats.registeredUsers}</span>
              </div>
            </div>
          </div>
        )}

        {/* View Selection Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4 border-bottom border-dark pb-3 nav-pills-gothic">
          <button
            onClick={() => setActiveTab('turnos')}
            className={`nav-link ${activeTab === 'turnos' ? 'active' : ''}`}
          >
            <i className="bi bi-calendar-check me-2"></i>
            Coordinación de Turnos ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('bloqueos')}
            className={`nav-link ${activeTab === 'bloqueos' ? 'active' : ''}`}
          >
            <i className="bi bi-slash-circle me-2"></i>
            Bloqueo de Horas & Días ({blockedSlots.length})
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'turnos' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="gothic-card p-3 mb-4">
              <div className="row g-3 align-items-center">
                {/* Status Pills */}
                <div className="col-xl-6">
                  <div className="d-flex flex-wrap gap-1">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'Pendiente', label: 'Pendientes' },
                      { id: 'Confirmado', label: 'Confirmados' },
                      { id: 'Completado', label: 'Completados' },
                      { id: 'Cancelado', label: 'Cancelados' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleStatusFilterChange(btn.id)}
                        className={`btn btn-sm ${
                          statusFilter === btn.id
                            ? 'btn-gothic-primary'
                            : 'btn-gothic-outline'
                        }`}
                        style={{ fontSize: '0.78rem' }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search and Date filter */}
                <div className="col-xl-6">
                  <form onSubmit={handleSearchSubmit} className="row g-2">
                    <div className="col-sm-6">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control form-control-gothic"
                          placeholder="Buscar por clienta, teléfono o servicio..."
                          value={searchFilter}
                          onChange={(e) => setSearchFilter(e.target.value)}
                        />
                        <button type="submit" className="btn btn-gothic-outline">
                          <i className="bi bi-search"></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <input
                        type="date"
                        className="form-control form-control-gothic form-control-sm"
                        value={dateFilter}
                        onChange={(e) => {
                          setDateFilter(e.target.value);
                          loadAppointments(statusFilter, searchFilter, e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-sm-2">
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="btn btn-gothic-outline btn-sm w-100"
                        title="Limpiar filtros"
                      >
                        <i className="bi bi-x-circle"></i> Limpiar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Appointments Table / Cards */}
            <div className="gothic-card p-0 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 align-middle font-serif fs-7">
                  <thead style={{ background: '#0e0a12', borderBottom: '2px solid rgba(255, 0, 127, 0.3)' }}>
                    <tr>
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3">Clienta & Contacto</th>
                      <th className="py-3">Servicio & Estilo</th>
                      <th className="py-3">Fecha & Hora</th>
                      <th className="py-3">Presupuesto</th>
                      <th className="py-3">Estado</th>
                      <th className="py-3 text-end px-3">Acciones de Coordinación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5 text-bone-muted">
                          <i className="bi bi-calendar-x fs-2 text-silver opacity-50 mb-2 d-block"></i>
                          No se encontraron turnos con los filtros seleccionados.
                        </td>
                      </tr>
                    ) : (
                      appointments.map((appt) => (
                        <tr key={appt.id} style={{ borderBottom: '1px solid rgba(201, 194, 204, 0.1)' }}>
                          {/* ID */}
                          <td className="px-3 fw-bold text-magenta">#{appt.id}</td>

                          {/* Client */}
                          <td>
                            <strong className="text-bone d-block">{appt.client_name}</strong>
                            <small className="text-bone-muted d-block">{appt.client_email}</small>
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <span className="text-silver fs-8">{appt.client_phone}</span>
                              <a
                                href={getClientWhatsAppLink(appt)}
                                target="_blank"
                                rel="noreferrer"
                                className="badge bg-success text-white text-decoration-none px-2 py-1 ms-1"
                                title="Enviar mensaje de WhatsApp"
                              >
                                <i className="bi bi-whatsapp"></i> Chat
                              </a>
                            </div>
                          </td>

                          {/* Service */}
                          <td>
                            <span className="text-bone fw-semibold d-block">{appt.service_name}</span>
                            <small className="text-magenta fs-8 d-block">✦ {appt.shape_length || 'Largo estándar'}</small>
                            {appt.notes && (
                              <small className="text-bone-muted fs-8 fst-italic d-block text-truncate" style={{ maxWidth: '240px' }} title={appt.notes}>
                                "{appt.notes}"
                              </small>
                            )}
                          </td>

                          {/* Date and Time */}
                          <td>
                            <span className="text-bone fw-bold d-block">
                              <i className="bi bi-calendar3 me-1 text-magenta"></i>
                              {appt.appointment_date}
                            </span>
                            <span className="badge-gothic fs-8 mt-1 d-inline-block">
                              <i className="bi bi-clock me-1"></i> {appt.time_slot} hs
                            </span>
                          </td>

                          {/* Price and Deposit */}
                          <td>
                            <span className="text-bone fw-bold d-block">{appt.estimated_price}</span>
                            {appt.deposit_paid === 1 ? (
                              <span className="badge bg-success-subtle text-success border border-success fs-8">
                                <i className="bi bi-check-circle me-1"></i> Seña Abonada
                              </span>
                            ) : (
                              <span className="badge bg-warning-subtle text-warning border border-warning fs-8">
                                <i className="bi bi-hourglass-split me-1"></i> Sin Seña
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td>
                            {appt.status === 'Pendiente' && (
                              <span className="badge-status-pendiente px-2 py-1 rounded fw-bold fs-8">
                                Pendiente
                              </span>
                            )}
                            {appt.status === 'Confirmado' && (
                              <span className="badge-status-confirmado px-2 py-1 rounded fw-bold fs-8">
                                Confirmado
                              </span>
                            )}
                            {appt.status === 'Completado' && (
                              <span className="badge-status-completado px-2 py-1 rounded fw-bold fs-8">
                                Completado
                              </span>
                            )}
                            {appt.status === 'Cancelado' && (
                              <span className="badge-status-cancelado px-2 py-1 rounded fw-bold fs-8">
                                Cancelado
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="text-end px-3">
                            <div className="d-flex justify-content-end gap-1 flex-wrap">
                              {/* If Pendiente: Approve button */}
                              {appt.status === 'Pendiente' && (
                                <button
                                  onClick={() => handleUpdateStatus(appt.id, 'Confirmado', 1)}
                                  disabled={actionLoading === appt.id}
                                  className="btn btn-sm btn-outline-success"
                                  title="Aprobar y marcar seña como recibida"
                                >
                                  <i className="bi bi-check-lg"></i> Aprobar
                                </button>
                              )}

                              {/* If Confirmado: Complete button */}
                              {appt.status === 'Confirmado' && (
                                <button
                                  onClick={() => handleUpdateStatus(appt.id, 'Completado')}
                                  disabled={actionLoading === appt.id}
                                  className="btn btn-sm btn-outline-info"
                                  title="Marcar como finalizado / completado"
                                >
                                  <i className="bi bi-check2-all"></i> Finalizar
                                </button>
                              )}

                              {/* Cancel button */}
                              {appt.status !== 'Cancelado' && appt.status !== 'Completado' && (
                                <button
                                  onClick={() => handleUpdateStatus(appt.id, 'Cancelado')}
                                  disabled={actionLoading === appt.id}
                                  className="btn btn-sm btn-outline-warning"
                                  title="Cancelar turno"
                                >
                                  <i className="bi bi-slash-circle"></i> Cancelar
                                </button>
                              )}

                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteAppointment(appt.id)}
                                disabled={actionLoading === appt.id}
                                className="btn btn-sm btn-outline-danger"
                                title="Eliminar registro"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEDULE BLACKOUT / BLOCKED SLOTS */}
        {activeTab === 'bloqueos' && (
          <div className="row g-4">
            {/* Create Block Form */}
            <div className="col-lg-5">
              <div className="gothic-card p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-lock-fill text-magenta fs-5"></i>
                  <h3 className="font-serif text-bone fs-5 mb-0">Bloquear Fecha u Horario</h3>
                </div>
                <p className="text-bone-muted fs-7 mb-4">
                  Bloquea días u horas específicas de la agenda para feriados, desinfecciones autoclave, producciones de fotos o descanso.
                </p>

                <form onSubmit={handleCreateBlock} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-silver fs-7">Fecha a Bloquear *</label>
                    <input
                      type="date"
                      className="form-control form-control-gothic"
                      value={blockDate}
                      onChange={(e) => setBlockDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label text-silver fs-7">Franja Horaria Específica</label>
                    <select
                      className="form-select form-select-gothic"
                      value={blockSlot}
                      onChange={(e) => setBlockSlot(e.target.value)}
                    >
                      <option value="">Todo el día (Cerrado completo)</option>
                      <option value="11:00">11:00 hs</option>
                      <option value="13:30">13:30 hs</option>
                      <option value="16:00">16:00 hs</option>
                      <option value="18:30">18:30 hs</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label text-silver fs-7">Motivo del Bloqueo</label>
                    <input
                      type="text"
                      className="form-control form-control-gothic"
                      placeholder="Ej. Desinfección instrumental autoclave, Fotos de campaña"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={blockSubmitting || !blockDate}
                    className="btn-gothic-primary mt-2"
                  >
                    {blockSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Bloqueando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-shield-x"></i>
                        Bloquear en la Agenda
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Blocked Slots List */}
            <div className="col-lg-7">
              <div className="gothic-card p-4">
                <h3 className="font-serif text-bone fs-5 mb-4">
                  <i className="bi bi-calendar-x text-magenta me-2"></i>
                  Bloqueos Activos en el Sistema ({blockedSlots.length})
                </h3>

                {blockedSlots.length === 0 ? (
                  <div className="p-4 text-center text-bone-muted fs-7">
                    No hay bloqueos registrados. Todos los horarios habituales están disponibles para reserva.
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {blockedSlots.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded border border-dark d-flex justify-content-between align-items-center"
                        style={{ background: 'rgba(14, 10, 18, 0.7)' }}
                      >
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-magenta fw-bold font-serif">{b.block_date}</span>
                            <span className="badge-gothic fs-8">
                              {b.time_slot ? `${b.time_slot} hs` : 'TODO EL DÍA'}
                            </span>
                          </div>
                          <small className="text-bone-muted d-block mt-1">
                            Motivo: <em>{b.reason || 'Sin motivo especificado'}</em>
                          </small>
                        </div>

                        <button
                          onClick={() => handleDeleteBlock(b.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Desbloquear horario"
                        >
                          <i className="bi bi-unlock-fill me-1"></i> Desbloquear
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
