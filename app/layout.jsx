import './globals.css';

const SITE = 'https://dentsite-lp.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'DentSite — Site Profissional para Dentistas em 3 Dias Úteis',
  description:
    'Site profissional para sua clínica odontológica em 3 dias úteis. Sem taxa de criação. Otimizado para Google e IA. Garantia de 7 dias.',
  icons: {
    icon: '/files/dentsite-favicon.svg',
    shortcut: '/files/dentsite-favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: SITE + '/',
    siteName: 'DentSite',
    title: 'DentSite — Seu site profissional no ar em 3 dias úteis',
    description:
      'Criamos o site da sua clínica odontológica sem taxa de criação. Otimizado para Google + IA. Pronto em 3 dias úteis. Garantia de 7 dias.',
    images: [
      {
        url: '/files/dentsite-og.png',
        width: 1200,
        height: 630,
        alt: 'DentSite — Seu site no ar em 3 dias úteis',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentSite — Seu site profissional no ar em 3 dias úteis',
    description:
      'Criamos o site da sua clínica sem taxa de criação. Pronto em 3 dias úteis. Garantia de 7 dias.',
    images: ['/files/dentsite-og.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
