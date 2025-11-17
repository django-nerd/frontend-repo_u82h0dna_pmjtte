import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function CharacterPicker({ value, onChange }) {
  const [characters, setCharacters] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/characters`)
        const data = await res.json()
        setCharacters(data)
      } catch (e) {
        setCharacters([])
      }
    }
    load()
  }, [])

  const filtered = characters.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.tags?.some(t => t.toLowerCase().includes(query.toLowerCase())))

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800">Choose a classic character</label>
      <div className="mt-2 relative">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Cinderella, Little Red, Jack..." className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <Search className="w-4 h-4 text-orange-700 absolute right-3 top-2.5" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 max-h-64 overflow-auto pr-1">
        {filtered.map((c) => (
          <motion.button key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            whileTap={{ scale: 0.98 }}
            className={`text-left rounded-xl border p-3 transition ${value === c.key ? 'border-orange-500 bg-orange-50' : 'border-orange-100 hover:border-orange-300'}`}
          >
            <div className="font-semibold text-orange-800">{c.name}</div>
            {c.tags && <div className="text-xs text-orange-900/70 mt-1">{c.tags.join(', ')}</div>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
