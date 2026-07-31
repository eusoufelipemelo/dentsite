import './globals.css';
import { Sora, DM_Sans } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const SITE = 'https://dentsite-lp.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'DentSite — Site Odontológico com Desenvolvimento Grátis',
  description:
    'Site totalmente personalizado para sua clínica odontológica com desenvolvimento 100% grátis. Você paga só a hospedagem anual (R$ 1.200 no cartão). Otimizado para Google e IA. Garantia de 7 dias.',
  icons: {
    icon: '/files/dentsite-favicon.svg',
    shortcut: '/files/dentsite-favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: SITE + '/',
    siteName: 'DentSite',
    title: 'DentSite — Site odontológico com desenvolvimento grátis',
    description:
      'Site exclusivo para sua clínica odontológica com desenvolvimento 100% grátis. Você paga só R$ 1.200 no cartão pela hospedagem anual. Otimizado para Google + IA. Pronto em 3 dias úteis.',
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
    title: 'DentSite — Site odontológico com desenvolvimento grátis',
    description:
      'Site exclusivo para sua clínica com desenvolvimento 100% grátis. Você paga só R$ 1.200 no cartão pela hospedagem anual. Pronto em 3 dias úteis.',
    images: ['/files/dentsite-og.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
