'use client'
import { useState, useMemo, useEffect } from 'react'

/* ─── Tariff data (March 2026) ─── */
interface CountryTariff {
  name: string
  flag: string
  baseTariff: number  // Section 122 or deal rate
  notes: string
}

const countries: CountryTariff[] = [
  { name: 'China', flag: '🇨🇳', baseTariff: 35, notes: '10% Sec.122 + 25% Sec.301' },
  { name: 'European Union', flag: '🇪🇺', baseTariff: 15, notes: 'EU trade deal rate' },
  { name: 'Japan', flag: '🇯🇵', baseTariff: 15, notes: 'Negotiated rate' },
  { name: 'South Korea', flag: '🇰🇷', baseTariff: 15, notes: 'Negotiated rate' },
  { name: 'Taiwan', flag: '🇹🇼', baseTariff: 15, notes: 'Negotiated rate' },
  { name: 'India', flag: '🇮🇳', baseTariff: 18, notes: 'Higher reciprocal rate' },
  { name: 'Vietnam', flag: '🇻🇳', baseTariff: 15, notes: 'Adjusted rate' },
  { name: 'United Kingdom', flag: '🇬🇧', baseTariff: 10, notes: 'Sec.122 base rate' },
  { name: 'Canada (USMCA)', flag: '🇨🇦', baseTariff: 0, notes: 'USMCA-exempt (~85% of goods)' },
  { name: 'Canada (non-USMCA)', flag: '🇨🇦', baseTariff: 10, notes: 'Sec.122 for non-compliant goods' },
  { name: 'Mexico (USMCA)', flag: '🇲🇽', baseTariff: 0, notes: 'USMCA-exempt (~85% of goods)' },
  { name: 'Mexico (non-USMCA)', flag: '🇲🇽', baseTariff: 10, notes: 'Sec.122 for non-compliant goods' },
  { name: 'Brazil', flag: '🇧🇷', baseTariff: 10, notes: 'Sec.122 base rate' },
  { name: 'Thailand', flag: '🇹🇭', baseTariff: 15, notes: 'Adjusted rate' },
  { name: 'Indonesia', flag: '🇮🇩', baseTariff: 15, notes: 'Adjusted rate' },
  { name: 'Bangladesh', flag: '🇧🇩', baseTariff: 15, notes: 'Adjusted rate' },
  { name: 'Other Countries', flag: '🌍', baseTariff: 10, notes: 'Default Sec.122 global tariff' },
]

interface ProductCategory {
  name: string
  icon: string
  additionalTariff: number
  notes: string
}

const productCategories: ProductCategory[] = [
  { name: 'General Consumer Goods', icon: '📦', additionalTariff: 0, notes: 'No additional sector tariff' },
  { name: 'Electronics & Phones', icon: '📱', additionalTariff: 0, notes: 'Base country tariff applies' },
  { name: 'Clothing & Textiles', icon: '👕', additionalTariff: 0, notes: 'Base country tariff applies' },
  { name: 'Steel & Steel Products', icon: '🔩', additionalTariff: 50, notes: 'Section 232 — 50% on all steel imports' },
  { name: 'Aluminum & Products', icon: '🪙', additionalTariff: 50, notes: 'Section 232 — 50% on all aluminum imports' },
  { name: 'Automobiles & Parts', icon: '🚗', additionalTariff: 25, notes: 'Section 232 — 25% auto tariff' },
  { name: 'Solar Panels', icon: '☀️', additionalTariff: 50, notes: 'Section 201 safeguard + Sec.301' },
  { name: 'Semiconductors', icon: '💾', additionalTariff: 0, notes: 'Country tariff only (exemptions vary)' },
  { name: 'Agricultural Products', icon: '🌾', additionalTariff: 0, notes: 'Base country tariff applies' },
  { name: 'Furniture', icon: '🪑', additionalTariff: 0, notes: 'Country tariff applies' },
  { name: 'Toys & Games', icon: '🧸', additionalTariff: 0, notes: 'Country tariff applies' },
  { name: 'Machinery & Equipment', icon: '⚙️', additionalTariff: 0, notes: 'Country tariff applies' },
]

export default function Calculator() {
  const [productValue, setProductValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [shippingCost, setShippingCost] = useState('')
  const [quantity, setQuantity] = useState('1')

  // localStorage persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tariff-calc')
      if (saved) {
        const d = JSON.parse(saved)
        if (d.productValue) setProductValue(d.productValue)
        if (d.selectedCountry !== undefined) setSelectedCountry(d.selectedCountry)
        if (d.selectedProduct !== undefined) setSelectedProduct(d.selectedProduct)
        if (d.shippingCost) setShippingCost(d.shippingCost)
        if (d.quantity) setQuantity(d.quantity)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('tariff-calc', JSON.stringify({
        productValue, selectedCountry, selectedProduct, shippingCost, quantity
      }))
    } catch {}
  }, [productValue, selectedCountry, selectedProduct, shippingCost, quantity])

  const result = useMemo(() => {
    const value = parseFloat(productValue) || 0
    const shipping = parseFloat(shippingCost) || 0
    const qty = parseInt(quantity) || 1
    const country = countries[selectedCountry]
    const product = productCategories[selectedProduct]

    const unitCost = value + shipping
    const totalBase = unitCost * qty

    // For steel/aluminum/auto — the sector tariff replaces base tariff if higher
    const countryRate = country.baseTariff
    const sectorRate = product.additionalTariff

    // Use the HIGHER of country tariff or sector tariff (they don't stack for most goods)
    // Exception: China + sector = both apply
    const isChina = country.name === 'China'
    let effectiveRate: number
    if (isChina && sectorRate > 0) {
      effectiveRate = countryRate + sectorRate
    } else {
      effectiveRate = Math.max(countryRate, sectorRate)
    }

    const tariffAmount = totalBase * (effectiveRate / 100)
    const totalWithTariff = totalBase + tariffAmount
    const perUnitWithTariff = qty > 0 ? totalWithTariff / qty : 0
    const priceIncrease = totalBase > 0 ? (tariffAmount / totalBase) * 100 : 0

    return {
      totalBase,
      countryRate,
      sectorRate,
      effectiveRate,
      tariffAmount,
      totalWithTariff,
      perUnitWithTariff,
      priceIncrease,
      countryName: country.name,
      countryNotes: country.notes,
      productName: product.name,
      productNotes: product.notes,
      isChina,
    }
  }, [productValue, selectedCountry, selectedProduct, shippingCost, quantity])

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Value */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Value (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={productValue}
                onChange={e => setProductValue(e.target.value)}
                placeholder="1,000"
                className="tool-input pl-8"
                min="0"
              />
            </div>
          </div>

          {/* Shipping */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Shipping Cost (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={shippingCost}
                onChange={e => setShippingCost(e.target.value)}
                placeholder="50"
                className="tool-input pl-8"
                min="0"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Country of Origin</label>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(Number(e.target.value))}
              className="tool-input"
            >
              {countries.map((c, i) => (
                <option key={i} value={i}>{c.flag} {c.name} ({c.baseTariff}%)</option>
              ))}
            </select>
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Category</label>
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(Number(e.target.value))}
              className="tool-input"
            >
              {productCategories.map((p, i) => (
                <option key={i} value={i}>
                  {p.icon} {p.name} {p.additionalTariff > 0 ? `(+${p.additionalTariff}%)` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="tool-input"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {parseFloat(productValue) > 0 && (
        <div className="card space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Tariff Breakdown</h2>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Product + Shipping ({quantity}x)</span>
              <span className="font-semibold">${result.totalBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Country Tariff ({countries[selectedCountry].flag} {result.countryName})</span>
              <span className="font-semibold text-orange-600">{result.countryRate}%</span>
            </div>
            <div className="text-xs text-gray-400 -mt-1">{result.countryNotes}</div>

            {result.sectorRate > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sector Tariff ({result.productName})</span>
                  <span className="font-semibold text-orange-600">+{result.sectorRate}%</span>
                </div>
                <div className="text-xs text-gray-400 -mt-1">{result.productNotes}</div>
              </>
            )}

            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
              <span className="text-gray-600 font-bold">Effective Tariff Rate</span>
              <span className="font-extrabold text-red-600 text-lg">{result.effectiveRate}%</span>
            </div>
          </div>

          {/* Big numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-xs text-red-400 font-semibold uppercase">Tariff Cost</div>
              <div className="text-2xl font-extrabold text-red-600">
                ${result.tariffAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: '#f3eefb' }}>
              <div className="text-xs font-semibold uppercase" style={{ color: 'var(--accent)' }}>Total with Tariff</div>
              <div className="text-2xl font-extrabold" style={{ color: 'var(--accent)' }}>
                ${result.totalWithTariff.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-xs text-orange-400 font-semibold uppercase">Price Increase</div>
              <div className="text-2xl font-extrabold text-orange-600">
                +{result.priceIncrease.toFixed(1)}%
              </div>
            </div>
          </div>

          {parseInt(quantity) > 1 && (
            <div className="text-center text-sm text-gray-500">
              Per unit with tariff: <span className="font-bold">${result.perUnitWithTariff.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}

          {/* Visual bar */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Cost breakdown</div>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div
                className="bg-blue-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(result.totalBase / result.totalWithTariff) * 100}%` }}
              >
                Product
              </div>
              <div
                className="bg-red-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(result.tariffAmount / result.totalWithTariff) * 100}%` }}
              >
                Tariff
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">2026 Tariff Rates by Country</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 font-semibold text-gray-600">Country</th>
                <th className="text-right py-2 pr-4 font-semibold text-gray-600">Rate</th>
                <th className="text-left py-2 font-semibold text-gray-600">Authority</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 pr-4">{c.flag} {c.name}</td>
                  <td className="py-2 pr-4 text-right font-bold" style={{ color: c.baseTariff >= 25 ? '#dc2626' : c.baseTariff > 0 ? '#ea580c' : '#16a34a' }}>
                    {c.baseTariff}%
                  </td>
                  <td className="py-2 text-gray-500 text-xs">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Tariffs */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Additional Sector Tariffs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {productCategories.filter(p => p.additionalTariff > 0).map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-xs text-gray-500">{p.notes}</div>
              </div>
              <span className="ml-auto text-lg font-extrabold text-red-600">{p.additionalTariff}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Iran War Context */}
      <div className="card bg-amber-50" style={{ borderColor: '#fbbf24' }}>
        <h2 className="text-lg font-bold text-amber-800 mb-2">⚠️ Iran War Economic Impact</h2>
        <p className="text-sm text-amber-700">
          The ongoing US-Iran conflict has pushed oil prices above $100/barrel (Brent: $120+).
          Combined with tariffs, this creates compounding cost increases for consumers.
          Energy-intensive imports face both higher shipping costs and tariff duties.
          The estimated household impact is $600-$1,000+ per year from tariffs alone,
          plus additional energy cost increases.
        </p>
      </div>
    </div>
  )
}
