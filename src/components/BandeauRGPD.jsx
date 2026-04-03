import { useState, useEffect } from 'react'

// Bandeau RGPD — fixed en bas, disparaît après choix (localStorage)
const BandeauRGPD = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choix = localStorage.getItem('tablecho-rgpd')
    if (!choix) setVisible(true)
  }, [])

  const accepter = () => { localStorage.setItem('tablecho-rgpd', 'accepte'); setVisible(false) }
  const refuser = () => { localStorage.setItem('tablecho-rgpd', 'refuse'); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-anthracite border-t border-or/20
      px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
      <p className="font-inter text-sm text-white/80 flex-1">
        Ce site utilise des cookies pour analyser le trafic de façon anonyme
        (Plausible Analytics — sans données personnelles).
      </p>
      <div className="flex gap-3 shrink-0">
        <button onClick={accepter}
          className="bg-or text-anthracite font-inter font-semibold text-sm px-5 py-2 rounded">
          Accepter
        </button>
        <button onClick={refuser}
          className="border border-white/40 text-white font-inter text-sm px-5 py-2 rounded">
          Refuser
        </button>
      </div>
    </div>
  )
}

export default BandeauRGPD
