import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-orange-700 drop-shadow-sm"
        >
          Make a Story That Stars Your Child
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-lg sm:text-xl text-orange-900/80 max-w-2xl"
        >
          Pick from 100 classic, copyright‑free characters, choose an adventure and a lesson, and we’ll craft a personalised, beautifully illustrated tale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex items-center gap-3"
        >
          <button onClick={onStart} className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-semibold shadow-lg shadow-orange-600/20 transition">
            <Sparkles className="w-5 h-5" /> Start your story
          </button>
          <span className="text-orange-900/70 text-sm">Takes ~2 minutes</span>
        </motion.div>
      </div>
    </section>
  )
}
