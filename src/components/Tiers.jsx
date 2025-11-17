import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Crown, Sparkles, Rocket } from 'lucide-react'

const icons = {
  Spark: Star,
  Glow: Sparkles,
  Shine: Crown,
  Supernova: Rocket,
}

export default function Tiers({ onChoose }) {
  const [tiers, setTiers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/tiers`)
        const data = await res.json()
        setTiers(data)
      } catch (e) {
        setTiers([
          { name: 'Spark', price: 19, features: ['1 character', '500 words', 'PDF'], delivery_days: 3 },
          { name: 'Glow', price: 39, features: ['2 characters', '800 words', '3 illustrations', 'PDF'], delivery_days: 5 },
          { name: 'Shine', price: 69, features: ['Up to 3 characters', '1200 words', '5 illustrations', 'PDF + ePub'], delivery_days: 7 },
          { name: 'Supernova', price: 129, features: ['Up to 4 characters', '2000 words', '8 illustrations', 'PDF + ePub + Web'], delivery_days: 10 },
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">Choose your magic level</h2>
        <p className="text-gray-600 text-center mt-2">Four tiers to fit every adventure and budget</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {tiers.map((t, idx) => {
            const Icon = icons[t.name] || Star
            return (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => onChoose(t.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white shadow">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-800">{t.name}</h3>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-orange-700">${t.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-orange-900/80">
                  {t.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-orange-900/60">Delivery in ~{t.delivery_days} days</p>
                <button className="mt-4 w-full rounded-full bg-orange-600 hover:bg-orange-700 text-white py-2 font-semibold">Select {t.name}</button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
