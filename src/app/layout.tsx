import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'US Tariff Calculator (Free, 2026) – Import Duty & Tax Calculator',
  description: 'Calculate US import tariffs instantly. Free 2026 tariff calculator with Section 301, 232, and reciprocal duties. See how much tariffs cost you — calculate now.',
  keywords: ['tariff calculator', 'import duty calculator', 'Trump tariff calculator 2026', 'US customs duty', 'trade war calculator', 'tariff by country', 'import tax calculator'],
  metadataBase: new URL('https://tariff-calculator-app.vercel.app'),
  openGraph: {
    title: 'US Tariff Calculator (Free, 2026) – Import Duty & Tax Calculator',
    description: 'Calculate US import tariffs instantly. Free 2026 tariff calculator with Section 301, 232, and reciprocal duties. See how much tariffs cost you — calculate now.',
    type: 'website',
    siteName: 'Tariff Calculator',
  },
    twitter: {
    card: 'summary_large_image',
    title: 'Tariff Calculator — US Import Tax Calculator',
    description: 'US Import Tax Calculator',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="hsjncRi9cl3tz3Otd6SJKurSt_V1bZ0AKO-bdWIGeHM" />
        <meta name="google-site-verification" content="ETO59LUETFhBHTx7GMun0GscvJgzLq2iGWdeAmh3e10" />
        <meta name="google-adsense-account" content="ca-pub-4361110443201092" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361110443201092" crossOrigin="anonymous" strategy="afterInteractive" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P04TH8XJJ9" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P04TH8XJJ9');`}
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
          
            <div className="flex flex-wrap justify-center gap-4 mb-3">
              <span className="text-xs text-gray-400 font-semibold">Related Free Tools:</span>
                <a href="https://currency-exchange-calculator-wheat.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Currency Exchange Converter</a>
                <a href="https://bitcoin-profit-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Crypto Profit Calculator</a>
                <a href="https://gold-price-today-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Gold Price Calculator</a>
                <a href="https://inflation-rate-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Inflation Rate Calculator</a>
                <a href="https://utilicalc.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">UtiliCalc All-in-One Tools</a>
            </div>
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
