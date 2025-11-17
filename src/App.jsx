import React, { useRef, useState } from 'react'
import Hero from './components/Hero'
import Tiers from './components/Tiers'
import OnboardingForm from './components/OnboardingForm'
import NavBar from './components/NavBar'

function App() {
  const formRef = useRef(null)
  const [selectedTier, setSelectedTier] = useState('Glow')
  const [orderResult, setOrderResult] = useState(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar onStart={scrollToForm} />
      <Hero onStart={scrollToForm} />

      <div id="tiers">
        <Tiers onChoose={(tier) => { setSelectedTier(tier); scrollToForm(); }} />
      </div>

      <div ref={formRef}>
        <OnboardingForm defaultTier={selectedTier} onComplete={setOrderResult} />
      </div>

      <footer className="py-10 text-center text-sm text-orange-900/70">
        {orderResult && (
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-green-50 text-green-800">
            {orderResult.error ? (
              <div>We hit a snag: {orderResult.error}</div>
            ) : (
              <div>
                Thank you! Your order is in. ID: <span className="font-mono">{orderResult.order_id}</span>. We'll email you updates soon.
              </div>
            )}
          </div>
        )}
        © {new Date().getFullYear()} StorySpark — Crafted with imagination.
      </footer>
    </div>
  )
}

export default App
