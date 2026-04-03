import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CONFIG } from '../config'

const Contact = () => {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    restaurant: '',
    ville: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  // Données passées depuis le quiz
  const quizProfil = searchParams.get('profil') || ''
  const quizScore = searchParams.get('score') || ''
  const quizSource = searchParams.get('source') || '🌐 Site web'
  const quizVolume = searchParams.get('volume') || ''
  const quizNote = searchParams.get('note') || ''
  const quizTemps = searchParams.get('temps') || ''
  const quizFrein = searchParams.get('frein') || ''

  const fromQuiz = Boolean(quizProfil)

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.email || !form.prenom) {
      setError('Merci de remplir au minimum votre prénom et votre e-mail.')
      return
    }

    setSending(true)

    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone,
          restaurant: form.restaurant,
          ville: form.ville,
          message: form.message,
          source: quizSource || '🌐 Site web',
          profil: quizProfil,
          score: quizScore,
          volume: quizVolume,
          note: quizNote,
          temps: quizTemps,
          frein: quizFrein,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Erreur ${res.status}`)
      }

      setDone(true)
    } catch (e) {
      setError('Une erreur est survenue. Réessayez ou écrivez directement à ' + 'form.action1pro@gmail.com')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-creme flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)] p-12 max-w-lg w-full text-center"
          >
            <p className="text-5xl mb-6">✅</p>
            <h2 className="font-playfair text-3xl text-anthracite mb-4">Message envoyé</h2>
            <p className="font-inter text-base text-anthracite/70 mb-8 leading-relaxed">
              Merci {form.prenom}, je vous réponds personnellement sous 24 heures.
              En attendant, vous pouvez réserver un créneau directement dans mon agenda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONFIG.CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-or text-anthracite font-inter font-semibold px-8 py-4 rounded hover:bg-or-clair transition-colors"
              >
                Prendre rendez-vous
              </a>
              <Link
                to="/"
                className="border border-anthracite/30 text-anthracite font-inter px-8 py-4 rounded hover:border-or transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {fromQuiz && (
              <div className="bg-or/10 border border-or/30 rounded-lg px-5 py-4 mb-8 flex items-start gap-3">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="font-inter font-semibold text-sm text-anthracite mb-1">
                    Résultat quiz : {quizProfil}
                  </p>
                  <p className="font-inter text-xs text-anthracite/70">
                    Score {quizScore}/18 — vos réponses seront transmises avec votre message.
                  </p>
                </div>
              </div>
            )}

            <h1 className="font-playfair text-4xl md:text-5xl text-anthracite mb-4">
              Parlons de votre réputation
            </h1>
            <p className="font-inter text-base text-gris-texte mb-10 leading-relaxed">
              Remplissez ce formulaire ou réservez directement un créneau dans mon agenda.
              Je réponds personnellement sous 24 heures.
            </p>

            <a
              href={CONFIG.CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-or text-or font-inter font-semibold text-sm px-6 py-3 rounded hover:bg-or/10 transition-colors mb-10"
            >
              📅 Prendre rendez-vous directement →
            </a>

            <div className="border-t border-bordure mb-10" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                    Prénom <span className="text-rouge-erreur">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    placeholder="François"
                    className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                      text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                      text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                  E-mail <span className="text-rouge-erreur">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="vous@restaurant.fr"
                  className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                    text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                />
              </div>

              <div>
                <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="06 00 00 00 00"
                  className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                    text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                    Nom de votre restaurant
                  </label>
                  <input
                    type="text"
                    name="restaurant"
                    value={form.restaurant}
                    onChange={handleChange}
                    placeholder="Le Bistrot du Port"
                    className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                      text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={form.ville}
                    onChange={handleChange}
                    placeholder="Saint-Tropez"
                    className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                      text-anthracite bg-white focus:outline-none focus:border-or transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-sm font-semibold text-anthracite block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Décrivez votre situation, vos besoins, vos questions..."
                  className="w-full border border-bordure rounded-lg px-4 py-3 font-inter text-sm
                    text-anthracite bg-white focus:outline-none focus:border-or transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="font-inter text-sm text-rouge-erreur">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className={`w-full font-inter font-semibold text-base px-8 py-4 rounded transition-colors
                  ${sending
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-or text-anthracite hover:bg-or-clair'}`}
              >
                {sending ? 'Envoi en cours…' : 'Envoyer mon message →'}
              </button>

              <p className="font-inter text-xs text-gris-texte text-center">
                Vos données sont transmises à François uniquement. Aucun démarchage, aucune revente.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact
