// lib/db.js
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'insensata.db');

function getDbInstance() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!globalThis.__insensata_db) {
    const db = new DatabaseSync(DB_FILE);
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA foreign_keys = ON;');
    globalThis.__insensata_db = db;
    initTables(db);
  }
  return globalThis.__insensata_db;
}

function initTables(db) {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'client',
      created_at TEXT NOT NULL
    );
  `);

  // Appointments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT NOT NULL,
      service_id TEXT NOT NULL,
      service_name TEXT NOT NULL,
      shape_length TEXT,
      appointment_date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      estimated_price TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'Pendiente',
      deposit_paid INTEGER NOT NULL DEFAULT 0,
      reminder_sent INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  // Safely ensure reminder_sent column exists if table was created previously
  try {
    db.exec('ALTER TABLE appointments ADD COLUMN reminder_sent INTEGER DEFAULT 0;');
  } catch {
    // Column already exists, ignore
  }

  // Blocked slots table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blocked_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      block_date TEXT NOT NULL,
      time_slot TEXT,
      reason TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default admin if missing
  const adminCheck = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@insensata.com');
  if (!adminCheck) {
    const adminHash = bcrypt.hashSync('InsensataAdmin2026!', 10);
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO users (email, password_hash, name, phone, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('admin@insensata.com', adminHash, 'Atelier Directrice (Admin)', '+54 9 11 3840-2918', 'admin', now);
  }

  // Seed test client if missing
  const clientCheck = db.prepare('SELECT id FROM users WHERE email = ?').get('valeria.vamp@example.com');
  if (!clientCheck) {
    const clientHash = bcrypt.hashSync('Valeria123!', 10);
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO users (email, password_hash, name, phone, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('valeria.vamp@example.com', clientHash, 'Valeria Nocturna', '+54 9 11 5555-6666', 'client', now);
  }

  // Seed initial appointments if empty
  const apptCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get();
  if (apptCount.count === 0) {
    const now = new Date().toISOString();
    const seeds = [
      {
        user_id: 2,
        client_name: 'Valeria Nocturna',
        client_email: 'valeria.vamp@example.com',
        client_phone: '+54 9 11 5555-6666',
        service_id: 'esculpidas-xxl',
        service_name: 'Esculpidas Extremas XXL & Claws',
        shape_length: 'Gothic Stiletto (Largo 4)',
        appointment_date: '2026-11-04',
        time_slot: '16:00',
        estimated_price: '$38.000 ARS',
        notes: 'Esmaltado negro mate con cruces 3D barrocas y piercings en meñiques.',
        status: 'Pendiente',
        deposit_paid: 0,
      },
      {
        user_id: null,
        client_name: 'Morgana LeFay',
        client_email: 'morgana.dark@example.com',
        client_phone: '+54 9 11 4444-3333',
        service_id: 'soft-gel',
        service_name: 'Soft Gel / Gel-X Haute Couture',
        shape_length: 'Coffin Afilado (Largo 3)',
        appointment_date: '2026-11-03',
        time_slot: '11:00',
        estimated_price: '$29.000 ARS',
        notes: 'Efecto terciopelo Cat Eye 9D amatista y sangre coagulada traslúcida.',
        status: 'Confirmado',
        deposit_paid: 1,
      },
      {
        user_id: null,
        client_name: 'Lilith Blackwood',
        client_email: 'lilith.goth@example.com',
        client_phone: '+54 9 11 7777-8888',
        service_id: 'nail-art-3d',
        service_name: 'Nail Art Ritual 3D & Charms Góticos',
        shape_length: 'XXL Claws Extremo (Largo 5+)',
        appointment_date: '2026-11-05',
        time_slot: '18:30',
        estimated_price: '$44.000 ARS',
        notes: 'Dije de araña con circonias negras, cadenas colgantes y cyber sigilism plateado.',
        status: 'Confirmado',
        deposit_paid: 1,
      },
      {
        user_id: null,
        client_name: 'Carmilla Karnstein',
        client_email: 'carmilla.blood@example.com',
        client_phone: '+54 9 11 9999-0000',
        service_id: 'kapping-ruso',
        service_name: 'Kapping Ruso & Esmaltado Semipermanente',
        shape_length: 'Almond Mística (Largo 2)',
        appointment_date: '2026-11-01',
        time_slot: '13:30',
        estimated_price: '$24.000 ARS',
        notes: 'Sangre de toro profundo con aura negra y baño de queratina.',
        status: 'Completado',
        deposit_paid: 1,
      },
      {
        user_id: null,
        client_name: 'Sabrina Raven',
        client_email: 'sabrina.r@example.com',
        client_phone: '+54 9 11 2222-1111',
        service_id: 'esculpidas-xxl',
        service_name: 'Esculpidas Extremas XXL & Claws',
        shape_length: 'Square Gothic C-Curve (Largo 3)',
        appointment_date: '2026-11-06',
        time_slot: '13:30',
        estimated_price: '$35.000 ARS',
        notes: 'Cromo líquido espejado y marcos de camafeo gótico.',
        status: 'Pendiente',
        deposit_paid: 0,
      },
    ];

    const insertAppt = db.prepare(`
      INSERT INTO appointments (
        user_id, client_name, client_email, client_phone,
        service_id, service_name, shape_length, appointment_date,
        time_slot, estimated_price, notes, status, deposit_paid,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of seeds) {
      insertAppt.run(
        item.user_id,
        item.client_name,
        item.client_email,
        item.client_phone,
        item.service_id,
        item.service_name,
        item.shape_length,
        item.appointment_date,
        item.time_slot,
        item.estimated_price,
        item.notes,
        item.status,
        item.deposit_paid,
        now,
        now
      );
    }
  }

  // Seed blocked slot if empty
  const blockCount = db.prepare('SELECT COUNT(*) as count FROM blocked_slots').get();
  if (blockCount.count === 0) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO blocked_slots (block_date, time_slot, reason, created_at)
      VALUES (?, ?, ?, ?)
    `).run('2026-11-02', '18:30', 'Desinfección autoclave & reabastecimiento atelier', now);
  }
}

// User operations
export function getUserByEmail(email) {
  const db = getDbInstance();
  return db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email) || null;
}

export function getUserById(id) {
  const db = getDbInstance();
  return db.prepare('SELECT id, email, name, phone, role, created_at FROM users WHERE id = ?').get(id) || null;
}

export function createUser({ email, passwordHash, name, phone = '', role = 'client' }) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const info = db.prepare(`
    INSERT INTO users (email, password_hash, name, phone, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(email.toLowerCase().trim(), passwordHash, name.trim(), phone.trim(), role, now);
  return getUserById(Number(info.lastInsertRowid));
}

export function getAllUsers() {
  const db = getDbInstance();
  return db.prepare('SELECT id, email, name, phone, role, created_at FROM users ORDER BY id DESC').all();
}

// Appointment operations
export function createAppointment(data) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const info = db.prepare(`
    INSERT INTO appointments (
      user_id, client_name, client_email, client_phone,
      service_id, service_name, shape_length, appointment_date,
      time_slot, estimated_price, notes, status, deposit_paid,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.user_id || null,
    data.client_name,
    data.client_email,
    data.client_phone,
    data.service_id,
    data.service_name,
    data.shape_length || '',
    data.appointment_date,
    data.time_slot,
    data.estimated_price || '',
    data.notes || '',
    data.status || 'Pendiente',
    data.deposit_paid ? 1 : 0,
    now,
    now
  );
  return getAppointmentById(Number(info.lastInsertRowid));
}

export function getAppointmentById(id) {
  const db = getDbInstance();
  return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id) || null;
}

export function getAllAppointments({ status = 'all', search = '', date = '' } = {}) {
  const db = getDbInstance();
  let query = 'SELECT * FROM appointments WHERE 1=1';
  const params = [];

  if (status && status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (date) {
    query += ' AND appointment_date = ?';
    params.push(date);
  }

  if (search) {
    query += ` AND (
      client_name LIKE ? OR
      client_email LIKE ? OR
      client_phone LIKE ? OR
      service_name LIKE ?
    )`;
    const wildcard = `%${search}%`;
    params.push(wildcard, wildcard, wildcard, wildcard);
  }

  query += ' ORDER BY appointment_date DESC, time_slot DESC';
  return db.prepare(query).all(...params);
}

export function getAppointmentsByUserId(userId) {
  const db = getDbInstance();
  return db.prepare('SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC, time_slot DESC').all(userId);
}

export function updateAppointmentStatus(id, status, depositPaid = undefined, reminderSent = undefined) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const current = getAppointmentById(id);
  if (!current) return null;

  const newStatus = status !== undefined ? status : current.status;
  const newDeposit = depositPaid !== undefined ? (depositPaid ? 1 : 0) : current.deposit_paid;
  const newReminder = reminderSent !== undefined ? (reminderSent ? 1 : 0) : current.reminder_sent;

  db.prepare(`
    UPDATE appointments
    SET status = ?, deposit_paid = ?, reminder_sent = ?, updated_at = ?
    WHERE id = ?
  `).run(newStatus, newDeposit, newReminder, now, id);

  return getAppointmentById(id);
}

export function markReminderSent(id, sent = 1) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE appointments
    SET reminder_sent = ?, updated_at = ?
    WHERE id = ?
  `).run(sent ? 1 : 0, now, id);
  return getAppointmentById(id);
}

export function getAppointmentsDueForReminder(targetDate) {
  const db = getDbInstance();
  return db.prepare(`
    SELECT * FROM appointments
    WHERE appointment_date = ?
      AND status = 'Confirmado'
      AND (reminder_sent IS NULL OR reminder_sent = 0)
    ORDER BY time_slot ASC
  `).all(targetDate);
}

export function deleteAppointment(id) {
  const db = getDbInstance();
  return db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
}

// Blocked Slots operations
export function getAllBlockedSlots() {
  const db = getDbInstance();
  return db.prepare('SELECT * FROM blocked_slots ORDER BY block_date DESC, time_slot ASC').all();
}

export function getBlockedSlotsForDate(date) {
  const db = getDbInstance();
  return db.prepare('SELECT * FROM blocked_slots WHERE block_date = ?').all(date);
}

export function createBlockedSlot({ block_date, time_slot = null, reason = '' }) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const info = db.prepare(`
    INSERT INTO blocked_slots (block_date, time_slot, reason, created_at)
    VALUES (?, ?, ?, ?)
  `).run(block_date, time_slot || null, reason, now);
  return db.prepare('SELECT * FROM blocked_slots WHERE id = ?').get(info.lastInsertRowid);
}

export function deleteBlockedSlot(id) {
  const db = getDbInstance();
  return db.prepare('DELETE FROM blocked_slots WHERE id = ?').run(id);
}

// Availability Check
export function getAvailabilityForDate(date) {
  const db = getDbInstance();
  const STANDARD_SLOTS = ['11:00', '13:30', '16:00', '18:30'];

  // Active bookings (not cancelled)
  const bookings = db.prepare(`
    SELECT time_slot, status FROM appointments
    WHERE appointment_date = ? AND status != 'Cancelado'
  `).all(date);

  // Blocked slots for this date
  const blocked = db.prepare(`
    SELECT time_slot, reason FROM blocked_slots
    WHERE block_date = ?
  `).all(date);

  const isWholeDayBlocked = blocked.some((b) => !b.time_slot || b.time_slot === 'TODO_EL_DIA');

  const bookedSlots = bookings.map((b) => b.time_slot);
  const blockedSlots = blocked.filter((b) => b.time_slot && b.time_slot !== 'TODO_EL_DIA').map((b) => b.time_slot);

  const slots = STANDARD_SLOTS.map((slot) => {
    let available = true;
    let reason = '';

    if (isWholeDayBlocked) {
      available = false;
      reason = 'Día bloqueado por el Atelier';
    } else if (bookedSlots.includes(slot)) {
      available = false;
      reason = 'Turno reservado';
    } else if (blockedSlots.includes(slot)) {
      available = false;
      const bObj = blocked.find((b) => b.time_slot === slot);
      reason = bObj?.reason || 'Horario reservado por Atelier';
    }

    return {
      slot,
      available,
      reason,
    };
  });

  return {
    date,
    isWholeDayBlocked,
    slots,
  };
}

// Stats for dashboard
export function getDashboardStats() {
  const db = getDbInstance();
  const total = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
  const pending = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Pendiente'").get().count;
  const confirmed = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Confirmado'").get().count;
  const completed = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Completado'").get().count;
  const cancelled = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Cancelado'").get().count;
  const registeredUsers = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'client'").get().count;

  // Approximate revenue from completed or confirmed appointments
  const appts = db.prepare("SELECT estimated_price FROM appointments WHERE status IN ('Confirmado', 'Completado')").all();
  let estimatedRevenue = 0;
  for (const a of appts) {
    if (a.estimated_price) {
      const num = parseInt(a.estimated_price.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) estimatedRevenue += num;
    }
  }

  return {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    registeredUsers,
    estimatedRevenue,
  };
}
