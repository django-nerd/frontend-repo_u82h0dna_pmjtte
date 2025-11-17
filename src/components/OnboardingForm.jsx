import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CharacterPicker from './CharacterPicker'

const wordCounts = [500, 800, 1200, 2000]

export default function OnboardingForm({ defaultTier, onComplete }) {
  const [form, setForm] = useState({
    parent_name: '', parent_email: '', child_name: '', child_age: '',
    tier: defaultTier || 'Spark', character_key: '', adventure_theme: '', lesson_theme: '',
    word_count: 800, illustration_style: 'storybook-classic', color_palette: 'pastel', dedication: '',
    languages: ['en'], include_child_appearance: true, child_traits: [], accessibility: [], delivery_format: 'pdf', notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${base}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, child_age: Number(form.child_age) })
      })
      const data = await res.json()
      onComplete?.(data)
    } catch (e) {
      onComplete?.({ error: e.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Tell us about your little hero</h2>
        <p className="text-gray-600 text-center mt-2">Two minutes to magic—then we craft your personalised story</p>

        <form onSubmit={submit} className="mt-10 grid gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Your name</label>
              <input value={form.parent_name} onChange={e=>update('parent_name', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Email</label>
              <input type="email" value={form.parent_email} onChange={e=>update('parent_email', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-800">Child's name</label>
              <input value={form.child_name} onChange={e=>update('child_name', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Age</label>
              <input type="number" min="0" max="14" value={form.child_age} onChange={e=>update('child_age', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <CharacterPicker value={form.character_key} onChange={(v)=>update('character_key', v)} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Adventure theme</label>
                <input value={form.adventure_theme} onChange={e=>update('adventure_theme', e.target.value)} placeholder="Pirate treasure hunt, space safari, forest rescue..." className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Lesson to learn</label>
                <input value={form.lesson_theme} onChange={e=>update('lesson_theme', e.target.value)} placeholder="Kindness, bravery, patience, sharing..." className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-800">Word count</label>
                  <select value={form.word_count} onChange={e=>update('word_count', Number(e.target.value))} className="w-full rounded-xl border border-orange-200 bg-white/70 px-3 py-2">
                    {wordCounts.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800">Tier</label>
                  <select value={form.tier} onChange={e=>update('tier', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-3 py-2">
                    {['Spark','Glow','Shine','Supernova'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-800">Illustration style</label>
                  <select value={form.illustration_style} onChange={e=>update('illustration_style', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-3 py-2">
                    <option value="storybook-classic">Storybook classic</option>
                    <option value="watercolor">Watercolor</option>
                    <option value="comic">Comic</option>
                    <option value="paper-cut">Paper cut</option>
                    <option value="digital-paint">Digital paint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800">Color palette</label>
                  <select value={form.color_palette} onChange={e=>update('color_palette', e.target.value)} className="w-full rounded-xl border border-orange-200 bg-white/70 px-3 py-2">
                    <option value="pastel">Pastel</option>
                    <option value="vibrant">Vibrant</option>
                    <option value="earthy">Earthy</option>
                    <option value="primary">Primary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Dedication (optional)</label>
              <input value={form.dedication} onChange={e=>update('dedication', e.target.value)} placeholder="To my brightest star..." className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Notes for our writers (optional)</label>
              <input value={form.notes} onChange={e=>update('notes', e.target.value)} placeholder="Any special requests?" className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Languages</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['en','es','fr','de','it'].map(l => (
                  <button type="button" key={l} onClick={()=>{
                    const has = form.languages.includes(l)
                    update('languages', has ? form.languages.filter(x=>x!==l) : [...form.languages, l])
                  }} className={`px-3 py-1 rounded-full border ${form.languages.includes(l) ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-200 text-orange-800 bg-white'}`}>{l.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Accessibility</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['dyslexia-friendly','high-contrast','large-text'].map(a => (
                  <button type="button" key={a} onClick={()=>{
                    const has = form.accessibility.includes(a)
                    update('accessibility', has ? form.accessibility.filter(x=>x!==a) : [...form.accessibility, a])
                  }} className={`px-3 py-1 rounded-full border text-sm ${form.accessibility.includes(a) ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-200 text-orange-800 bg-white'}`}>{a}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Child traits</label>
              <input value={form.child_traits.join(', ')} onChange={e=>update('child_traits', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="curious, gentle, playful" className="w-full rounded-xl border border-orange-200 bg-white/70 px-4 py-2" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input id="include_appearance" type="checkbox" checked={form.include_child_appearance} onChange={e=>update('include_child_appearance', e.target.checked)} className="rounded border-orange-300 text-orange-600 focus:ring-orange-400" />
            <label htmlFor="include_appearance" className="text-sm text-gray-800">Reflect the child's appearance in illustrations</label>
          </div>

          <motion.button whileTap={{ scale: 0.98 }} disabled={submitting} className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-semibold shadow-lg shadow-orange-600/20 disabled:opacity-60">
            {submitting ? 'Creating your story...' : 'Create my story'}
          </motion.button>
        </form>
      </div>
    </section>
  )
}
