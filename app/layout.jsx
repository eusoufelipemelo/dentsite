import './globals.css';

const SITE = 'https://dentsite-lp.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'DentSite — Site Odontológico por Assinatura · R$ 100/mês',
  description:
    'Site totalmente personalizado para sua clínica odontológica por uma assinatura simples. R$ 100 por mês, sem custo de criação. Otimizado para Google e IA. Garantia de 7 dias.',
  icons: {
    icon: '/files/dentsite-favicon.svg',
    shortcut: '/files/dentsite-favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: SITE + '/',
    siteName: 'DentSite',
    title: 'DentSite — Site odontológico por assinatura · R$ 100/mês',
    description:
      'Site exclusivo para sua clínica odontológica por uma assinatura simples de R$ 100/mês. Sem custo de criação. Otimizado para Google + IA. Pronto em 3 dias úteis.',
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
    title: 'DentSite — Site odontológico por assinatura · R$ 100/mês',
    description:
      'Site exclusivo para a sua clínica por uma assinatura simples. R$ 100/mês, sem custo de criação. Pronto em 3 dias úteis.',
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
