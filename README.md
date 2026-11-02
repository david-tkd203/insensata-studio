# ✦ INSENSATA ESTUDIO ✦ — Gothic Haute Couture Nails

> **Santuario de Arte & Haute Couture en Uñas Obscuras.**  
> Plataforma web integral y sistema de reservas para salón de autor de estética gótica, alt-chic y dark luxury.

---

## 🎨 Identidad Visual & Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router) con soporte de compilación ultra-rápida vía **Turbopack**.
- **Frontend**: React 19, Bootstrap 5, Bootstrap Icons y CSS personalizado de alta costura gótica.
- **Tipografías**: Google Fonts (*Cinzel Decorative*, *Cinzel*, *UnifrakturMaguntia*, *Syne*, *Montserrat*).
- **Backend & API**: Next.js Server Routes y Route Handlers (`app/api/*`).
- **Autenticación**: JWT (`jose`) almacenado en cookies seguras HTTP-only y contraseñas hasheadas con `bcryptjs`.
- **Persistencia de Datos**: SQLite nativo (`node:sqlite`) con inicialización automática y migraciones de esquema embebidas.

---

## 🏛️ Estructura de la Aplicación

- **`/` (Landing Page)**:
  - Hero con halo de neón sobre el logotipo oficial de Insensata.
  - *El Manifiesto Insensato* & pilares de retención de 4+ semanas.
  - Galería Obscura interactiva con filtros por estilo (*Gothic Stilettos*, *Dark Velvet*, *3D Charms*, *Cyber Sigilism*, *Blood Drip*).
  - Carta de servicios completa con tiempos y precios en ARS.
  - **Cotizador Ritual Interactivo**: Cálculo en tiempo real de presupuestos según estructura base, forma y nivel de nail art.
  - Protocolo de asepsia médica y autoclave hospitalario.
  - Preguntas frecuentes y botón flotante de WhatsApp.
- **`/agendar` (Portal de Citas)**:
  - Flujo de reserva en 5 pasos interactivos con validación de horarios en tiempo real.
  - Generación de código de cita y datos bancarios para transferencia de seña.
- **`/admin` (Panel de Coordinación)**:
  - Métricas en vivo (citas pendientes, ingresos estimados, total de clientas).
  - Aprobación, cancelación o finalización de turnos con un clic.
  - Bloqueador de horarios y días para mantenimiento de autoclave o francos.
- **`/politicas` (Políticas de Turnos & Consentimiento)**:
  - Reglas de seña del 50% no reembolsable, tolerancia de 15 minutos, salud ungular y garantía.
- **`/login` & `/registro`**:
  - Formularios de autenticación con accesos rápidos demo.
- **`/perfil`**:
  - Panel privado de la clienta con historial y estado de sus citas.

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js v20+ o v24+
- npm o yarn / pnpm

### Instalación & Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo con Turbopack
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilación para Producción

```bash
# Compilar proyecto optimizado
npm run build

# Iniciar servidor de producción
npm start
```

---

## 🔑 Credenciales Demo de Prueba

Para probar el sistema completo al instante, en la pantalla de `/login` puedes ingresar con:

- **Administradora**:
  - **Email**: `admin@insensata.com`
  - **Contraseña**: `InsensataAdmin2026!`
- **Clienta Demo**:
  - **Email**: `valeria.vamp@example.com`
  - **Contraseña**: `Valeria123!`

---

## 📜 Licencia

Desarrollado para **Insensata Estudio**. Todos los derechos reservados.
