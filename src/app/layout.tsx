import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'US Tariff Calculator 2026 - Free Import Duty & Tax Estimator',
  description: 'Calculate US import tariffs and duties for 2026. Covers Trump tariffs, Section 301, Section 232, and reciprocal tariffs by country. Free, instant, no signup.',
  keywords: ['tariff calculator', 'import duty calculator', 'Trump tariff calculator 2026', 'US customs duty', 'trade war calculator', 'tariff by country', 'import tax calculator'],
  metadataBase: new URL('https://tariff-calculator-app.vercel.app'),
  openGraph: {
    title: 'US Tariff Calculator 2026 - Free Import Duty Estimator',
    description: 'Calculate how much tariffs add to your imports. Updated for 2026 Trump tariffs, Iran war impact, and Section 122 global tariff.',
    type: 'website',
    siteName: 'Tariff Calculator',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="hsjncRi9cl3tz3Otd6SJKurSt_V1bZ0AKO-bdWIGeHM" />
        <meta name="google-adsense-account" content="ca-pub-4361110443201092" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361110443201092" crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P08T3SZDQH" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P08T3SZDQH');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
              TariffCalc
            </a>
            <span className="text-xs text-gray-400">Updated March 2026</span>
          </div>
        </header>
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
            <a href="/terms" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>
          </div>
          <p>Estimates only. Not legal or financial advice. Actual duties may vary.</p>
          <p className="mt-1">&copy; 2026 TariffCalc</p>
        </footer>
      </body>
    </html>
  )
}
