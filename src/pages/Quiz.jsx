import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BoutonOr from '../components/BoutonOr'
import BoutonContour from '../components/BoutonContour'
import { CONFIG } from '../config'

// ─── Données quiz ──────────────────────────────────────────────
const questions = [
  {
    id: 1,
    question: 'Combien d\'avis Google recevez-vous par mois en moyenne ?',
    options: [
      { label: 'Moins de 5 avis', points: 1, notion: '📉 Moins de 5' },
      { label: 'Entre 5 et 20 avis', points: 3, notion: '📊 Entre 5 et 20' },
      { label: 'Entre 20 et 50 avis', points: 4, notion: '📈 Entre 20 et 50' },
      { label: 'Plus de 50 avis', points: 5, notion: '🚀 Plus de 50' },
    ],
  },
  {
    id: 2,
    question: 'Quelle est votre note Google actuelle ?',
    options: [
      { label: 'Moins de 3,5 / 5', points: 5, notion: '⭐ Moins de 3.5' },
      { label: 'Entre 3,5 et 4,0', points: 4, notion: '⭐⭐ Entre 3.5 et 4.0' },
      { label: 'Entre 4,0 et 4,5', points: 3, notion: '⭐⭐⭐ Entre 4.0 et 4.5' },
      { label: 'Plus de 4,5', points: 1, notion: '⭐⭐⭐⭐ Plus de 4.5' },
    ],
  },
  {
    id: 3,
    question: 'Combien de temps consacrez-vous à répondre aux avis par semaine ?',
    options: [
      { label: 'Je ne réponds pas', points: 5, notion: '❌ Ne répond pas' },
      { label: 'Moins de 30 minutes', points: 3, notion: '⏱️ Moins de 30 min/semaine' },
      { label: 'Entre 30 min et 2 heures', points: 2, notion: '🕐 30 min à 2h/semaine' },
      { label: 'Plus de 2 heures', points: 1, notion: '🕑 Plus de 2h/semaine' },
    ],
  },
  {
    id: 4,
    question: 'Avez-vous déjà perdu des clients suite à un avis négatif non géré ?',
    options: [
      { label: 'Oui, clairement', points: 5 },
      { label: 'Probablement, sans en être certain(e)', points: 3 },
      { label: 'Je ne sais pas', points: 2 },
      { label: 'Non, pas à ma connaissance', points: 1 },
    ],
  },
  {
    id: 5,
    question: 'Qu\'est-ce qui vous freinerait le plus à adopter un outil comme Tablecho ?',
    options: [
      { label: 'Le prix', points: 0, frein: 'prix', notion: '💶 Prix' },
      { label: 'La confiance dans l\'IA pour reproduire ma voix', points: 0, frein: 'ia', notion: '🤖 Confiance dans l\'IA' },
      { label: 'Le temps d\'apprentissage', points: 0, frein: 'temps', notion: '📚 Temps d\'apprentissage' },
      { label: 'Rien — je cherche exactement ça', points: 3, frein: 'aucun', notion: '✅ Aucun frein' },
    ],
  },
]

// ─── Profils résultat ──────────────────────────────────────────
const getProfile = (score) => {
  if (score <= 8) return {
    badge: '🔴', label: 'Profil Exposé', couleur: 'text-red-500',
    titre: 'Votre établissement est exposé.',
    texte: 'Votre réputation en ligne est vulnérable. Tablecho peut stabiliser et améliorer la situation rapidement — c\'est exactement pour vous qu\'il a été conçu.',
    cta: 'Rejoindre la liste d\'attente', notion: '🔴 Exposé — urgent',
  }
  if (score <= 15) return {
    badge: '🟠', label: 'Profil En progression', couleur: 'text-orange-500',
    titre: 'Vous gérez, mais vous pouvez faire beaucoup mieux.',
    texte: 'Vous avez conscience de l\'enjeu et vous y consacrez du temps. Tablecho peut vous faire gagner ce temps tout en améliorant significativement vos résultats.',
    cta: 'Demander une démo', notion: '🟠 En progression',
  }
  return {
    badge: '🟢', label: 'Profil Prêt', couleur: 'text-green-500',
    titre: 'Vous êtes prêt. Tablecho est fait pour vous.',
    texte: 'Votre profil correspond exactement à nos premiers bêta-testeurs. Vous comprenez l\'enjeu, vous êtes exposé et vous cherchez une solution. Parlons-en.',
    cta: 'Je veux être bêta-testeur', notion: '🟢 Prêt à adopter',
  }
}

const freinMessages = {
  prix: 'À propos du tarif : 49€/mois, c\'est moins de 2€ par jour pour protéger une réputation construite en années de travail. On peut en discuter ensemble.',
  ia: 'Tablecho vous soumet toujours la réponse avant publication. Vous gardez 100% de la maîtrise de votre voix.',
  temps: 'L\'installation prend 15 minutes. La prise en main : 2 minutes par semaine.',
}

// ─── PAGE QUIZ ─────────────────────────────────────────────────
const Quiz = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  const choisir = (opt, idx) => setSelected({ opt, idx })

  const suivant = () => {
    if (!selected) return
    const newAnswers = [...answers, selected.opt]
    if (current < questions.length - 1) {
      setDirection(1)
      setAnswers(newAnswers)
      setSelected(null)
      setCurrent(c => c + 1)
    } else {
      setAnswers(newAnswers)
      setDone(true)
    }
  }

  const precedent = () => {
    if (current === 0) return
    setDirection(-1)
    setAnswers(a => a.slice(0, -1))
    setSelected(null)
    setCurrent(c => c - 1)
  }

  // Calcul résultat
  const score = answers.reduce((s, a) => s + a.points, 0)
  const frein = answers.find(a => a.frein)?.frein
  const profile = getProfile(score)

  // Données pour pré-remplissage contact
  const goToContact = () => {
    const params = new URLSearchParams({
      profil: profile.notion,
      score: String(score),
      source: '🎯 Quiz site web',
      volume: answers[0]?.notion || '',
      note: answers[1]?.notion || '',
      temps: answers[2]?.notion || '',
      frein: answers[4]?.notion || '',
    })
    navigate(`/contact?${params.toString()}`)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-creme flex flex-col">
        {/* Header simplifié */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-bordure">
          <Link to="/" className="font-inter text-sm text-gris-texte hover:text-or">← Retour</Link>
          <p className="font-playfair text-xl text-or font-bold">Tablecho</p>
          <div className="w-20" />
        </header>

        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)] p-10 md:p-14
              max-w-2xl w-full text-center"
          >
            <p className="text-5xl mb-4">{profile.badge}</p>
            <p className={`font-inter font-semibold text-sm mb-2 ${profile.couleur}`}>
              {profile.label}
            </p>
            <p className="font-inter text-xs text-gris-texte mb-6">Score : {score} / 18</p>
            <h2 className="font-playfair text-3xl text-anthracite mb-6">{profile.titre}</h2>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-8">{profile.texte}</p>

            {/* Frein */}
            {frein && frein !== 'aucun' && freinMessages[frein] && (
              <div className="bg-or/10 border border-or/30 rounded-lg p-5 mb-8 text-left">
                <p className="font-inter text-sm text-anthracite/80 leading-relaxed">
                  💡 {freinMessages[frein]}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BoutonOr onClick={goToContact} className="text-base px-8 py-4">
                {profile.cta}
              </BoutonOr>
              <BoutonContour href={CONFIG.CALENDLY_URL} target="_blank" couleur="anthracite" className="text-base px-8 py-4">
                Prendre rendez-vous
              </BoutonContour>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      {/* Header simplifié */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-bordure">
        <Link to="/" className="font-inter text-sm text-gris-texte hover:text-or">← Retour</Link>
        <p className="font-playfair text-xl text-or font-bold">Tablecho</p>
        <div className="w-20" />
      </header>

      {/* Hero */}
      <div className="text-center px-6 pt-12 pb-6">
        <h1 className="font-playfair text-3xl md:text-4xl text-anthracite mb-2">
          Tablecho est-il fait pour vous ?
        </h1>
        <p className="font-inter text-base text-gris-texte">5 questions · 2 minutes · Une réponse personnalisée</p>
      </div>

      {/* Barre de progression */}
      <div className="px-6 max-w-2xl mx-auto w-full mb-8">
        <div className="bg-gray-200 rounded-full h-1">
          <motion.div
            className="bg-or h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="font-inter text-xs text-gris-texte mt-2">Question {current + 1} sur {questions.length}</p>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)]
              p-10 md:p-12 max-w-2xl w-full"
          >
            <h2 className="font-playfair text-2xl text-anthracite mb-8 leading-snug">
              {q.question}
            </h2>
            <div className="space-y-3 mb-10">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => choisir(opt, idx)}
                  className={`w-full text-left font-inter text-sm px-5 py-4 rounded-lg border
                    transition-all duration-150
                    ${selected?.idx === idx
                      ? 'border-or bg-or/10 text-anthracite font-semibold'
                      : 'border-gray-200 bg-white hover:border-or text-anthracite/80'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              {current > 0
                ? <button onClick={precedent}
                    className="font-inter text-sm text-gris-texte hover:text-anthracite">
                    ← Précédent
                  </button>
                : <div />}
              <button
                onClick={suivant}
                disabled={!selected}
                className={`font-inter font-semibold text-sm px-8 py-3 rounded transition-colors
                  ${selected
                    ? 'bg-or text-anthracite hover:bg-or-clair'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {current < questions.length - 1 ? 'Suivant →' : 'Voir mon résultat →'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Quiz
