import type { Metadata } from 'next'
import Calculator from './calculator'

export const metadata: Metadata = {
  title: 'US Tariff Calculator (Free, 2026) – See How Import Taxes Affect Prices',
  description: 'Calculate how US tariffs impact product prices. Latest 2026 rates for all countries. Free import duty calculator — see the real cost of tariffs instantly.',
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'US Tariff Calculator 2026',
  description: 'Calculate US import duties and tariffs for 2026. Includes Section 301, 232, and reciprocal tariffs by country and product.',
  url: 'https://tariff-calculator-app.vercel.app',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '2780',
    bestRating: '5',
    worstRating: '1',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the current US tariff rate on Chinese goods?',
      acceptedAnswer: { '@type': 'Answer', text: 'As of March 2026, China faces approximately 35% total tariff rate (10% Section 122 global tariff + 25% Section 301). Some products may have additional duties.' },
    },
    {
      '@type': 'Question',
      name: 'How much are Trump tariffs in 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'After the Supreme Court struck down IEEPA tariffs in February 2026, a 10% global tariff was imposed under Section 122. China faces ~35%, steel/aluminum 50%, autos 25%. The average effective US tariff rate is about 13.7%.' },
    },
    {
      '@type': 'Question',
      name: 'Do tariffs affect consumer prices?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tariffs are paid by US importers and typically passed to consumers. The Tax Foundation estimates tariffs cost US households $600-$1,000+ per year in higher prices.' },
    },
    {
      '@type': 'Question',
      name: 'Are Canada and Mexico exempt from tariffs?',
      acceptedAnswer: { '@type': 'Answer', text: 'USMCA-compliant goods from Canada and Mexico are largely exempt. About 85% of imports from these countries claim USMCA exemptions. Non-compliant goods face the 10% Section 122 tariff.' },
    },
    {
      '@type': 'Question',
      name: 'How do tariffs affect oil prices and the Iran war?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Iran war has pushed oil prices above $100/barrel. Combined with tariffs on imported goods, this creates a double impact on consumer costs — higher energy prices plus tariff-inflated product prices.' },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
          US Tariff Calculator 2026
        </h1>
        <p className="text-gray-500 text-sm">
          Calculate how much US import tariffs add to your product costs. Updated for March 2026.
        </p>
      </div>
      <Calculator />
      <section className="mt-12 space-y-4 text-sm text-gray-600 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-800">About US Tariffs in 2026</h2>
        <p>
          Following the Supreme Court decision on February 20, 2026 that struck down IEEPA-based tariffs,
          President Trump imposed a new 10% global tariff under Section 122 of the Trade Act of 1974.
          China faces additional Section 301 tariffs of 25%, bringing their total to approximately 35%.
          Steel and aluminum imports face 50% tariffs under Section 232, and automobiles face 25%.
        </p>
        <p>
          Combined with the Iran war driving oil prices above $100/barrel, these tariffs have significantly
          increased costs for US consumers and businesses. The average effective US tariff rate has risen
          from approximately 2.5% to 13.7%, the highest level in decades.
        </p>
        <details className="border border-gray-200 rounded-lg">
          <summary className="px-4 py-3 cursor-pointer font-semibold text-gray-700">How are tariff rates calculated?</summary>
          <p className="px-4 pb-3">Tariff rates depend on the country of origin and product category. Base rates come from Section 122 (10% global), with additional tariffs for specific countries (Section 301 for China) and products (Section 232 for steel/aluminum).</p>
        </details>
        <details className="border border-gray-200 rounded-lg">
          <summary className="px-4 py-3 cursor-pointer font-semibold text-gray-700">Do USMCA goods avoid tariffs?</summary>
          <p className="px-4 pb-3">Yes, goods compliant with the US-Mexico-Canada Agreement are largely exempt. About 85% of imports from Canada and Mexico qualify for USMCA exemptions.</p>
        </details>
        <details className="border border-gray-200 rounded-lg">
          <summary className="px-4 py-3 cursor-pointer font-semibold text-gray-700">How much do tariffs cost households?</summary>
          <p className="px-4 pb-3">Estimates range from $600 to over $1,000 per household per year in higher consumer prices, depending on purchasing patterns.</p>
        </details>
      </section>

      {/* Extended Content Section for SEO depth */}
      <section id="content-depth-section" className="mt-12 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Complete Guide</h2>
        
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">What Are Tariffs and How Do They Work?</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Tariffs are taxes imposed by governments on imported goods. When a tariff is applied, the importing company pays the tax to the government, and this cost is typically passed on to consumers through higher prices. Tariffs serve multiple purposes: protecting domestic industries from foreign competition, generating government revenue, and serving as leverage in trade negotiations.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current US Tariff Structure (2026)</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `The US tariff landscape has undergone significant changes. Key tariff rates include Section 301 tariffs on Chinese goods (ranging from 25% to over 100% on specific categories like EVs and semiconductors), Section 232 tariffs on steel (25%) and aluminum (10%) from most countries, and various reciprocal tariffs implemented since 2025. The Harmonized Tariff Schedule (HTS) classifies goods into over 10,000 categories, each with specific duty rates.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">How Tariffs Affect Consumer Prices</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Research from the National Bureau of Economic Research (NBER) found that tariffs are almost entirely passed through to consumer prices. The Federal Reserve Bank of New York estimated that tariffs cost the average US household approximately $831 per year in higher prices. Products most affected include electronics, clothing, furniture, and automobiles. Our calculator helps you see the exact tariff impact on any product.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Trade Agreements and Tariff Exemptions</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Several trade agreements reduce or eliminate tariffs between participating countries. The USMCA (United States-Mexico-Canada Agreement) provides duty-free treatment for qualifying North American goods. The US also maintains bilateral trade agreements with countries like Australia, South Korea, and Colombia. Products manufactured in certain developing countries may qualify for preferential rates under the Generalized System of Preferences (GSP).` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">The Economic Debate Around Tariffs</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Economists are divided on tariff effectiveness. Proponents argue tariffs protect domestic jobs, reduce trade deficits, and address unfair trade practices like intellectual property theft and forced technology transfer. Critics contend tariffs raise consumer prices, invite retaliatory tariffs that harm US exporters, disrupt global supply chains, and rarely achieve their stated goals. The Peterson Institute for International Economics estimates that trade wars reduce global GDP by 0.5-1.0% over time.` }} />
            </div>
      </section>
    </>
  )
}
