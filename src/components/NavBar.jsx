import React from 'react'
import { BookOpen, ShoppingCart } from 'lucide-react'

export default function NavBar({ onStart }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 grid place-items-center text-white font-bold shadow">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="font-extrabold text-orange-800 tracking-tight">StorySpark</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#tiers" className="text-orange-900/80 hover:text-orange-900">Tiers</a>
          <a href="#how" className="text-orange-900/80 hover:text-orange-900">How it works</a>
          <button onClick={onStart} className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 font-semibold shadow">
            <ShoppingCart className="w-4 h-4" /> Get started
          </button>
        </div>
      </div>
    </header>
  )
}
