// src/data/nailData.js
// Catálogo de servicios, galería, opciones de cotización y testimonios para INSENSATA ESTUDIO

export const STUDIO_INFO = {
  name: "INSENSATA ESTUDIO",
  crest: "✦ ☾ ♰ ☽ ✦",
  tagline: "Santuario de Alta Costura en Uñas Obscuras",
  description: "No hacemos uñas convencionales. Esculpimos armas de seducción y elegancia gótica para quienes desafían lo ordinario. Especialistas en Stilettos XXL, 3D Chrome, Cat Eye aterciopelado y joyería incrustada con retención extrema de 4+ semanas.",
  phone: "+54 9 11 3840-2918",
  whatsappNumber: "5491138402918",
  instagram: "@insensata.estudio",
  location: "Palermo Hollywood (Atelier Privado, CABA)",
  hours: "Martes a Sábado: 11:00 a 20:30 hs",
  retentionGuarantee: "4+ Semanas de Retención Impecable",
};

export const GALLERY_CATEGORIES = [
  { id: "all", label: "Todas las Obras" },
  { id: "stilettos", label: "Gothic Stilettos XXL" },
  { id: "velvet", label: "Dark Velvet & Cat Eye" },
  { id: "charms", label: "3D Charms & Piercings" },
  { id: "chrome", label: "Cyber Sigilism & Chrome" },
  { id: "blood", label: "Vampire Blood Drip" },
];

export const GALLERY_ITEMS = [
  {
    id: "goth-1",
    title: "Nocturnal Stiletto Claws",
    category: "stilettos",
    categoryLabel: "Gothic Stilettos XXL",
    length: "Largo 4 / Stiletto Filoso",
    technique: "Acrílico Escultural + Jet Black Mate + Cruces Góticas en Relieve",
    badge: "Firma de la Casa",
    description: "Estructura stiletto de filo impecable con ápice reforzado para resistencia extrema. Acabado negro mate profundo con detalles barrocos en cera de gel 3D.",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    tags: ["Stiletto", "Black Matte", "Cruces 3D", "Largo 4"],
  },
  {
    id: "goth-2",
    title: "Vampiric Crimson Drip & Chains",
    category: "blood",
    categoryLabel: "Vampire Blood Drip",
    length: "Largo 3 / Coffin Afilado",
    technique: "Soft Gel + Gota de Sangre 3D Jelly + Cadenas Metálicas",
    badge: "Más Solicitado",
    description: "Efecto gelificante de sangre coagulada tridimensional que se desliza sobre una base nude lechoso y cadenas de acero quirúrgico uniendo los dedos anular y meñique.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    tags: ["Blood Drip", "Cadenas", "Coffin", "Vampy Chic"],
  },
  {
    id: "goth-3",
    title: "Amethyst Cat Eye & Poison Drop",
    category: "velvet",
    categoryLabel: "Dark Velvet & Cat Eye",
    length: "Largo 2 / Almond Elegante",
    technique: "Kapping Ruso + Esmalte Cat Eye Magnético 9D + Aura Obscura",
    badge: "Hipoalergénico",
    description: "Destellos magnéticos púrpura y magenta profundo que bailan bajo la luz como terciopelo vivo. Fondo negro obsidian con cápsula de gel transparente.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    tags: ["Cat Eye 9D", "Terciopelo", "Almond", "Violeta Obsidian"],
  },
  {
    id: "goth-4",
    title: "Cyber Sigilism & Liquid Silver",
    category: "chrome",
    categoryLabel: "Cyber Sigilism & Chrome",
    length: "Largo 3 / Square Gothic",
    technique: "Esculpidas en Poligel + Cromo Líquido Espejado + Trazos Cyber",
    badge: "Vanguardia 2026",
    description: "Fusión de estética tribal futurista con herrajes góticos. Trazos vectoriales en cromo plateado líquido sobre base ahumada traslúcida estilo smoke quartz.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    tags: ["Chrome Líquido", "Cyber Sigilism", "Silver Mirror", "Square"],
  },
  {
    id: "goth-5",
    title: "Black Widow & Pierced Claws",
    category: "charms",
    categoryLabel: "3D Charms & Piercings",
    length: "Largo 5 / XXL Stiletto Extremo",
    technique: "Esculpidas XXL + Piercing de Acero Colgante + Araña 3D con Circonias",
    badge: "Extremo XXL",
    description: "Perforación auténtica en borde libre con aro de plata y dije de cruz colgante. Microescultura de araña en relieve con cuerpo de cristal negro azabache.",
    image: "https://images.unsplash.com/photo-1519014816548-bf7851dd4f3c?auto=format&fit=crop&w=800&q=80",
    tags: ["Piercing Uña", "Dije Araña", "XXL Claws", "Swarovski"],
  },
  {
    id: "goth-6",
    title: "Smoky Quartz & Obsidian Aura",
    category: "velvet",
    categoryLabel: "Dark Velvet & Cat Eye",
    length: "Largo 2 / Coffin Corto",
    technique: "Soft Gel + Técnica de Humo con Alcohol Inks + Encapsulado Místico",
    badge: "Arte Manual",
    description: "Difuminado etéreo que simula humo de incienso negro atrapado en cristal de cuarzo. Acentos en hoja de plata y estrellas de 4 puntas pintadas a mano.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    tags: ["Efecto Humo", "Aura Gótica", "Estrellas ✦", "Coffin"],
  },
  {
    id: "goth-7",
    title: "Baroque Cathedral Crosses",
    category: "charms",
    categoryLabel: "3D Charms & Piercings",
    length: "Largo 4 / Stiletto Claws",
    technique: "Acrílico + Marcos de Camafeo Antiguo + Perlas Negras de Agua Dulce",
    badge: "Colección Real",
    description: "Inspirado en la orfebrería de las catedrales góticas medievales. Filigrana en relieve plateado oxidado con microperlas negras engarzadas con gel de construcción.",
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
    tags: ["Barroco", "Cruces Catedral", "Perlas Negras", "Stiletto"],
  },
  {
    id: "goth-8",
    title: "Bleeding Heart & Chrome Thorns",
    category: "blood",
    categoryLabel: "Vampire Blood Drip",
    length: "Largo 3 / Almond Afilado",
    technique: "Soft Gel + Esculpido 3D Espinas de Alambre + Corazón Sangrante",
    badge: "Edición San Valentín Obscuro",
    description: "Alambre de espinas modelado a mano en gel 3D con acabado metálico de cromo negro, rodeando un corazón anatómico que destila gotas de rubí translúcido.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    tags: ["Espinas 3D", "Sangre Rubí", "Almond", "Chrome"],
  },
];

export const SERVICES_MENU = [
  {
    id: "esculpidas-xxl",
    title: "Esculpidas Extremas XXL & Claws",
    category: "Estructura Escultural",
    badge: "Especialidad Insensata",
    duration: "2h 45m - 3h 15m",
    price: "$38.000 ARS",
    description: "Construcción escultural milimétrica en acrílico o poligel con moldes de competencia. Curvatura C perfecta, peralte balanceado y refuerzo anti-quiebre para largos del 3 al 6+.",
    highlights: [
      "Largo extremo: Stiletto, Coffin, Ballerina o Duck",
      "Estructura blindada de alta resistencia al impacto",
      "Manicuría rusa de preparación profunda de cutícula",
      "Garantía de retención de 4 semanas sin desprendimientos",
      "Incluye esmaltado liso o mate de fondo",
    ],
  },
  {
    id: "soft-gel",
    title: "Soft Gel / Gel-X Haute Couture",
    category: "Extensiones Rápidas",
    badge: "Cero Daño a la Uña",
    duration: "1h 45m - 2h 15m",
    price: "$29.000 ARS",
    description: "Sistema de tips 100% gel de alta resistencia curados con luz LED. Livianas como una pluma, ultra flexibles y con una superficie lisa perfecta para nail art complejo.",
    highlights: [
      "Aplicación sin vapores ni limado agresivo de la placa",
      "Formas pre-moldeadas perfectas (Almond, Coffin, Stiletto)",
      "Retiro express con vapor sin maltratar tu uña natural",
      "Ideal para eventos, producciones de fotos o primer set gótico",
      "Durabilidad promedio de 3 a 4 semanas",
    ],
  },
  {
    id: "kapping-ruso",
    title: "Kapping Ruso & Esmaltado Semipermanente",
    category: "Cuidado & Refuerzo Natural",
    badge: "Para Uñas Naturales",
    duration: "1h 30m - 1h 45m",
    price: "$24.000 ARS",
    description: "Blindaje de goma o gel nivelador sobre el largo de tu propia uña natural. Corrige estrías, aporta grosor imperceptible y previene quiebres por debilidad.",
    highlights: [
      "Técnica rusa con torno y tijerilla de precisión micrométrica",
      "Nivelación con gota perfecta para reflejo de luz impecable",
      "Esmaltado bajo cutícula que retrasa el crecimiento visible",
      "Colores profundos: Obsidian, Sangre de Toro, Ciruela y Carbón",
      "Ideal para quienes buscan elegancia obscura sin alargar",
    ],
  },
  {
    id: "nail-art-3d",
    title: "Nail Art Ritual 3D & Charms Góticos",
    category: "Alta Costura & Escultura",
    badge: "Personalización Total",
    duration: "+30m a +1h s/diseño",
    price: "Desde $8.000 ARS",
    description: "El alma de Insensata Estudio. Transformamos tus uñas en artefactos místicos. Alambre de espinas, cromo líquido, piedras Swarovski, piercings, calaveras y sangre de gel 3D.",
    highlights: [
      "Diseños 100% personalizados según tu referencia o moodboard",
      "Joyería encapsulada con resinas de grado joyero (no se caen)",
      "Piercings perforados indoloros en borde libre",
      "Cat eye magnético multicapa y efecto terciopelo",
      "Degradados y cyber sigilism vectorizado a mano alzada",
    ],
  },
  {
    id: "service-retiro",
    title: "Service de Mantenimiento & Retiro Seguro",
    category: "Mantenimiento Saludable",
    badge: "Salud Ungular Prioritaria",
    duration: "1h 15m - 2h",
    price: "Desde $12.000 ARS",
    description: "Nunca arranques tus uñas. Realizamos balances de ápice cada 21-28 días para mantener el centro de gravedad óptimo y retiros controlados que dejan tu uña virgen intacta.",
    highlights: [
      "Balance de peso para evitar dolores o apalancamiento",
      "Revisión de sellado periférico contra filtraciones",
      "Retiro por disolución controlada y nutrición con aceites botánicos",
      "Tratamiento intensivo con queratina y suero fortificante",
    ],
  },
];

export const CALCULATOR_SHAPES = [
  { id: "almond-short", name: "Almond Mística (Largo 1-2)", price: 0, tag: "Sutil & Cómoda" },
  { id: "coffin-mid", name: "Coffin Afilado (Largo 2-3)", price: 3000, tag: "Elegancia Vampírica" },
  { id: "stiletto-long", name: "Gothic Stiletto (Largo 3-4)", price: 6000, tag: "Arma Letal" },
  { id: "stiletto-xxl", name: "XXL Claws Extremo (Largo 5+)", price: 10000, tag: "Solo para Insensatas" },
  { id: "square-cyber", name: "Square Gothic C-Curve (Largo 2-3)", price: 4000, tag: "Cyber Sigilism" },
];

export const CALCULATOR_BASES = [
  {
    id: "soft-gel",
    name: "Soft Gel / Gel-X Extension System",
    basePrice: 28000,
    desc: "Cápsulas 100% gel de alta flexibilidad, livianas y cero daño a la uña.",
  },
  {
    id: "esculpidas",
    name: "Esculpidas Acrílicas / Poligel Escultural",
    basePrice: 35000,
    desc: "Construcción artesanal con molde para máxima resistencia en largos XXL.",
  },
  {
    id: "kapping",
    name: "Kapping Ruso Refuerzo (Uña Natural)",
    basePrice: 23000,
    desc: "Blindaje estructural nivelador sobre tu propio largo natural.",
  },
];

export const CALCULATOR_ART_LEVELS = [
  {
    id: "art-none",
    name: "Dark Minimalist",
    price: 0,
    desc: "Color pleno mate o ultra gloss (Negro Obsidian, Sangre, Ciruela) + 2 acentos sutiles.",
  },
  {
    id: "art-elegance",
    name: "Gothic Elegance",
    price: 6000,
    desc: "Cat Eye 9D aterciopelado, francesitas góticas en punta o degradé ahumado en 4-6 uñas.",
  },
  {
    id: "art-couture",
    name: "Dark Haute Couture (Recomendado)",
    price: 11000,
    desc: "Blood drip 3D, cromo líquido plateado, cyber sigils y textura de relieve en todas las uñas.",
  },
  {
    id: "art-masterpiece",
    name: "Witchcraft Masterpiece XXL",
    price: 18000,
    desc: "Microescultura 3D profunda, texturas de piel de serpiente, marcos barrocos y aura obscura completa.",
  },
];

export const CALCULATOR_CHARMS = [
  { id: "piercing", name: "Piercing de Uña Colgante (Aro/Cruz de Plata)", price: 3500, icon: "bi-gem" },
  { id: "dije-3d", name: "Dije Metálico 3D (Araña, Calavera o Corazón Sangrante)", price: 4000, icon: "bi-shield-shaded" },
  { id: "chains", name: "Cadena Gótica Conectora entre dedos", price: 4500, icon: "bi-link-45deg" },
  { id: "swarovski", name: "Constelación Cristales Swarovski Jet Black & Aurora", price: 5000, icon: "bi-stars" },
  { id: "chrome-mirror", name: "Efecto Cromo Espejo Líquido (Plata / Sangre)", price: 3000, icon: "bi-droplet-half" },
  { id: "snake-texture", name: "Textura Ósea / Piel de Serpiente en Relieve", price: 3500, icon: "bi-fingerprint" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Valeria Vane",
    handle: "@valeria.nocturna",
    role: "Modelo Gótica & DJ",
    text: "Jamás nadie en Buenos Aires me había logrado hacer unos Stilettos XXL con esta curvatura y filo perfecto. Ya pasaron 5 semanas y no tengo ni un levantamiento. Las cadenas y piercings resistieron toques en vivo. Son diosas absolutas.",
    set: "XXL Claws + Cadenas + Blood Drip",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Micaela Rostand",
    handle: "@mikarostand",
    role: "Tatuadora Blackwork",
    text: "Como tatuadora uso guantes de nitrilo y desinfectantes todo el santo día. Mis uñas antes se despegaban a los 10 días. En Insensata la manicuría rusa es milimétrica, no me dolió nada y las esculpidas parecen titanio. El ambiente del estudio es puro misticismo.",
    set: "Gothic Stiletto + Cyber Sigilism Chrome",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Luna Morgendorffer",
    handle: "@luna.obsidian",
    role: "Diseñadora de Indumentaria Dark",
    text: "El Cat Eye 9D violeta y las cruces en relieve son una obra de arte digna de pasarela. Me cansé de ir a salones que te miran raro si pedís negro o formas puntiagudas. Acá te reciben con café negro, buena música y te leen la mente.",
    set: "Amethyst Cat Eye + Marcos Barrocos 3D",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
];

export const HYGIENE_PILLARS = [
  {
    icon: "bi-shield-check",
    title: "Esterilización Grado Quirúrgico",
    description: "Instrumental metálico procesado en autoclave y embolsado individual sellado con testigo químico que se abre frente a tus ojos.",
  },
  {
    icon: "bi-trash3",
    title: "Kits 100% Descartables",
    description: "Limas, bloques pulidores, palitos de naranjo y toallas son de un solo uso por cliente. Cero contaminación cruzada.",
  },
  {
    icon: "bi-heart-pulse",
    title: "Geles Veganos Cruelty-Free 9-Free",
    description: "Formulaciones libres de tolueno, formaldehído y DBP. Cuidan la salud de tu matriz ungueal sin vapores tóxicos.",
  },
  {
    icon: "bi-wind",
    title: "Aspiradores de Polvo Ciclónicos HEPA",
    description: "Mesas de trabajo equipadas con extractores de alta potencia que atrapan el 99.9% de micropartículas para respirar aire puro.",
  },
];

export const FAQS = [
  {
    q: "¿Cuánto dura realmente un set de INSENSATA?",
    a: "Nuestros sets tienen una retención garantizada de 4 semanas. Gracias a la preparación micrométrica de la placa ungueal con fresas de diamante rusas y la aplicación de deshidratadores y primers libres de ácido de nivel profesional, no experimentarás embolsamientos ni desprendimientos prematuros.",
  },
  {
    q: "¿Puedo hacerme Stilettos XXL si mis uñas naturales son muy cortas o me las como?",
    a: "¡Absolutamente! Más del 40% de nuestras clientas llegan con uñas cortas o debilitadas. Podemos esculpir extensiones desde cero con moldes o aplicar tips de Soft Gel completos que protegen tu lecho ungueal permitiendo que tu uña natural crezca protegida por debajo.",
  },
  {
    q: "¿Qué diferencia hay entre Soft Gel (Gel-X) y Esculpidas de Acrílico/Poligel?",
    a: "Soft Gel son cápsulas pre-moldeadas de gel puro que se adhieren con base rubber. Es un sistema más liviano, rápido y flexible, ideal para largos 1 a 3. Las Esculpidas tradicionales se crean a mano alzada con molde milimétrico, ofreciendo un ápice más grueso y resistente para largos extremos 4 a 6+.",
  },
  {
    q: "¿Cómo se retiran los diseños sin dañar mis uñas?",
    a: "Bajo ninguna circunstancia debes arrancar, morder o apalancar las uñas artificiales, ya que desprenderías las capas dorsales de queratina de tu uña natural. En el atelier realizamos retiros con fresas de carburo de tungsteno dejando una capa de seguridad imperceptible, o por disolución suave con envolturas tibias nutritivas.",
  },
  {
    q: "¿Cómo reservo mi turno y cómo funciona el pago?",
    a: "Los turnos se coordinan de manera personalizada vía WhatsApp luego de enviar tu idea o cotización. Para congelar tu cita en nuestra agenda se solicita una seña del 30% mediante transferencia bancaria o Mercado Pago. El saldo se cancela el día de la cita (efectivo, transferencia o tarjeta).",
  },
  {
    q: "¿Puedo llevar una referencia de diseño propia de Pinterest o Instagram?",
    a: "¡Sí, nos fascina! Podés enviarnos tu referencia por WhatsApp. Si bien no hacemos copias idénticas porque respetamos el trabajo ajeno, reinterpretamos el diseño bajo el sello distintivo y la técnica gótica insensata para que tengas una pieza única.",
  },
];
