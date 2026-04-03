import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BoutonOr from '../components/BoutonOr'
import { CONFIG } from '../config'

const PASSWORD = import.meta.env.VITE_INVESTOR_PASSWORD

const stats = [
  { valeur: '157 000', label: 'restaurants en France', source: 'INSEE 2023' },
  { valeur: '88 %', label: 'des clients lisent les avis avant de choisir', source: 'BrightLocal 2023' },
  { valeur: '123 Mds€', label: 'de marché adressable (restauration FR)', source: 'GNI 2023' },
  { valeur: '49 €/mois', label: 'abonnement cible — SaaS B2B', source: 'Modèle Tablecho' },
]

const milestones = [
  { phase: 'Phase 1', date: 'Automne 2025', titre: 'Bêta privée', desc: '3 à 5 restaurateurs du Golfe de Saint-Tropez. Validation produit, ajustements UX, premiers témoignages.' },
  { phase: 'Phase 2', date: 'Avril 2026', titre: 'Lancement PACA', desc: 'Événement annuel Saint-Tropez — chefs de renom, recrutement premium, crédibilité presse nationale.' },
  { phase: 'Phase 3', date: '2027', titre: 'Expansion nationale', desc: 'Couverture France entière, partenariats distributeurs, outillage multi-établissements.' },
]

const Investisseurs = () => {
  const [mdp, setMdp] = useState('')
  const [acces, setAcces] = useState(false)
  const [erreur, setErreur] = useState(false)

  const verifier = (e) => {
    e.preventDefault()
    if (mdp === PASSWORD) {
      setAcces(true)
      setErreur(false)
    } else {
      setErreur(true)
    }
  }

  if (!acces) {
    return (
      <div className="min-h-screen bg-anthracite flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Link to="/" className="font-inter text-sm text-white/60 hover:text-or">← Retour</Link>
          <p className="font-playfair text-xl text-or font-bold">Tablecho</p>
          <div className="w-20" />
        </header>

        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-10 max-w-md w-full text-center"
          >
            <p className="text-4xl mb-6">🔒</p>
            <h1 className="font-playfair text-3xl text-white mb-3">Espace investisseurs</h1>
            <p className="font-inter text-sm text-white/60 mb-8">
              Accès restreint. Entrez le code d'accès fourni par François.
            </p>
            <form onSubmit={verifier} className="space-y-4">
              <input
                type="password"
                value={mdp}
                onChange={e => setMdp(e.target.value)}
                placeholder="Code d'accès"
                autoFocus
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                  font-inter text-sm text-white placeholder-white/30 focus:outline-none
                  focus:border-or transition-colors text-center tracking-widest"
              />
              {erreur && (
                <p className="font-inter text-xs text-rouge-erreur">
                  Code incorrect. Contactez François pour obtenir l'accès.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-or text-anthracite font-inter font-semibold py-3 rounded hover:bg-or-clair transition-colors"
              >
                Accéder →
              </button>
            </form>
            <p className="font-inter text-xs text-white/40 mt-6">
              Vous n'avez pas de code ?{' '}
              <Link to="/contact" className="text-or hover:underline">
                Contactez-nous
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-anthracite pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="font-inter text-xs text-or/80 uppercase tracking-widest mb-4">Dossier investisseurs — Confidentiel</p>
            <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6">
              Tablecho — La protection de réputation<br className="hidden md:block" /> pour les restaurateurs
            </h1>
            <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              SaaS B2B. Marché de 157 000 établissements. Problème urgent, solution différenciante,
              fondateur avec 35 ans de terrain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BoutonOr href={CONFIG.PITCH_DECK_URL} target="_blank" className="text-base px-8 py-4">
                📊 Voir le pitch deck
              </BoutonOr>
              <a
                href={CONFIG.CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 text-white font-inter font-semibold text-base
                  px-8 py-4 rounded hover:border-or hover:text-or transition-colors"
              >
                Prendre rendez-vous
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl text-anthracite text-center mb-12">Le marché en chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-playfair text-3xl md:text-4xl text-or font-bold mb-2">{s.valeur}</p>
                <p className="font-inter text-sm text-anthracite leading-snug mb-1">{s.label}</p>
                <p className="font-inter text-xs text-gris-texte">{s.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="py-20 px-6 bg-creme">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl text-anthracite mb-8">Le problème que nous résolvons</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
                Un avis Google non répondu coûte en moyenne <strong>70 % de chances</strong> que le client
                suivant choisisse un concurrent. Pourtant, la majorité des restaurateurs indépendants
                n'ont ni le temps ni les outils pour gérer leur réputation en ligne efficacement.
              </p>
              <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
                Le cas réel qui a tout déclenché : une note de <strong>4,8 → 3,9</strong> après un
                unique avis probablement frauduleux. Sans système de réponse rapide, l'établissement
                a perdu sa position dans les résultats locaux Google.
              </p>
              <p className="font-inter text-base text-anthracite/80 leading-relaxed">
                Tablecho propose une réponse automatisée, personnalisée à la voix du restaurateur,
                soumise à validation avant publication. <strong>15 minutes d'installation.
                2 minutes par semaine.</strong>
              </p>
            </div>
            <div className="bg-anthracite rounded-xl p-8 flex flex-col gap-4">
              <p className="font-inter font-semibold text-sm text-white/80 uppercase tracking-wider mb-2">
                Mécanisme de fermeture observé
              </p>
              {[
                'Manque de personnel chronique',
                'Turn-over élevé',
                'Baisse qualité de service',
                'Perte de clientèle',
                'Fermeture',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-playfair text-or font-bold text-lg">{i + 1}</span>
                  <p className="font-inter text-sm text-white/80">{step}</p>
                </div>
              ))}
              <p className="font-inter text-xs text-white/40 mt-2">
                Constaté sur 35 ans de terrain par le fondateur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl text-anthracite mb-12 text-center">Feuille de route</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-24 text-right">
                  <p className="font-inter text-xs text-or font-semibold uppercase tracking-wider">{m.phase}</p>
                  <p className="font-inter text-xs text-gris-texte">{m.date}</p>
                </div>
                <div className="w-px bg-bordure self-stretch" />
                <div className="pb-6">
                  <p className="font-inter font-semibold text-anthracite mb-1">{m.titre}</p>
                  <p className="font-inter text-sm text-anthracite/70 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="py-20 px-6 bg-creme">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-anthracite mb-6">Le fondateur</h2>
          <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
            François — 35 ans dans la restauration, formateur professionnel.
            Il connaît les problèmes qu'il résout pour les avoir observés tout au long de sa carrière.
            Tablecho n'est pas une idée de startup — c'est une réponse à un manque concret
            constaté sur le terrain.
          </p>
          <p className="font-inter text-base text-anthracite/80 leading-relaxed">
            Basé dans le Golfe de Saint-Tropez, zone de lancement choisie pour sa densité
            de restaurateurs indépendants et son réseau terrain direct via le CFA Croix-Valmer.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-anthracite">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">
            Intéressé par le projet ?
          </h2>
          <p className="font-inter text-base text-white/70 mb-10">
            Je suis disponible pour un échange direct — sans intermédiaire, sans deck de 40 slides.
            Juste une conversation honnête sur la vision et les chiffres.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BoutonOr href={CONFIG.CALENDLY_URL} target="_blank" className="text-base px-8 py-4">
              Réserver un échange →
            </BoutonOr>
            <Link
              to="/contact"
              className="border border-white/40 text-white font-inter font-semibold text-base
                px-8 py-4 rounded hover:border-or hover:text-or transition-colors"
            >
              Envoyer un message
            </Link>
          </div>
          <p className="font-inter text-xs text-white/40 mt-8">
            Ce document est confidentiel. Merci de ne pas le diffuser sans accord préalable.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Investisseurs
