import '../config/globals.css'

// app/layout.tsx (ou layout.js)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Albert_Sans, Poppins, Sora } from 'next/font/google'
import { Metadata } from 'next'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const albertSans = Albert_Sans({
  variable: '--font-albert-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const sora = Sora({
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Massapê Fascinante',
    template: '%s | Massapê Fascinante',
  },
  description:
    'Explore os encantos turísticos de Massapê-CE com o sistema Massapê Fascinante. Descubra restaurantes, eventos, atrações e muito mais de forma intuitiva e acessível.',
  keywords: [
    'Massapê',
    'Turismo',
    'Pontos turísticos',
    'Ceará',
    'Sistema de turismo',
    'Massapê Fascinante',
    'Gestão turística',
  ],
  authors: [{ name: 'Prefeitura de Massapê', url: 'https://www.massapefascinante.com.br' }],
  creator: 'Time de Desenvolvimento - Felipe Lima',
  openGraph: {
    title: 'Massapê Fascinante',
    description:
      'Descubra o que há de melhor em Massapê-CE com nosso sistema de turismo inteligente.',
    url: 'https://www.massapefascinante.com.br',
    siteName: 'Massapê Fascinante',
    images: [
      {
        url: '/opengraph-image.png', // Você pode trocar por sua imagem de destaque
        width: 1200,
        height: 630,
        alt: 'Imagem promocional de Massapê Fascinante',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Massapê Fascinante',
    description: 'Explore Massapê-CE com nosso sistema de turismo digital e responsivo.',
    images: ['/opengraph-image.png'],
    creator: '@prefeituramassape', 
  },
  icons: {
    icon: '/logo-brasao-massape.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#194a99',
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="./logo-brasao-massape" />
      <body className={`${sora.variable} ${albertSans.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
