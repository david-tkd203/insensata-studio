// app/layout.jsx
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://insensata.com'),
  title: 'INSENSATA ESTUDIO ✦ Santuario de Arte & Gothic Haute Couture Nails',
  description: 'INSENSATA ESTUDIO: Haute couture nail artistry, gothic stilettos, 3D chrome piercings, velvet cat eye & brujería estética. Diseños extremos de alta retención.',
  keywords: 'uñas goticas, stiletto nails, 3D nail art, nail charms, chrome piercings, dark luxury, soft gel, gel x, kapping, insensata estudio, palermo nails',
  icons: {
    icon: '/insensata_logo.jpeg',
    apple: '/insensata_logo.jpeg',
  },
  openGraph: {
    title: 'INSENSATA ESTUDIO ✦ Gothic Haute Couture Nails',
    description: 'Santuario de arte en uñas obscuras, góticas, stiletto XXL y alta retención.',
    images: ['/insensata_logo.jpeg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-bs-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Syne:wght@500;700;800&family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian-void text-bone min-vh-100">
        {children}
      </body>
    </html>
  );
}
