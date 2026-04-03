import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardMarche from '../components/CardMarche'
import BoutonOr from '../components/BoutonOr'
import { CONFIG } from '../config'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

const statsZone = [
  { valeur: '~400', label: 'restaurants et tables de la zone', detail: 'Golfe de Saint-Tropez' },
  { valeur: '4-5 M', label: 'touristes par saison estivale', detail: 'Source : Mairie de Saint-Tropez' },
  { valeur: '6 mois', label: 'de haute saison — pression maximale', detail: 'Avril → Octobre' },
  { valeur: '100 %', label: 'des prospects consultent Google avant réservation', detail: 'BrightLocal 2023' },
]

const cardsMarche = [
  {
    titre: 'Zone premium, concurrence intense',
    texte: 'Le Golfe de Saint-Tropez concentre une densité exceptionnelle de restaurateurs haut de gamme. La réputation en ligne y est un facteur de différenciation critique — une note 4,0 vs 4,8 peut représenter des dizaines de couverts perdus par semaine.',
    icon: '📍',
  },
  {
    titre: 'Saison courte = tolérance zéro à l\'erreur',
    texte: 'Avec 6 mois de haute saison, chaque avis non géré pèse doublement. Un bad buzz en juillet peut annuler les réservations d\'août. La fenêtre de récupération est quasi-nulle sans outil de réponse rapide.',
    icon: '⏳',
  },
  {
    titre: 'Réseau terrain direct — canal prioritaire',
    texte: 'François dispose d\'un accès direct aux restaurateurs via le réseau CFA Croix-Valmer. Les patrons de stage et contacts terrain constituent le vivier de bêta-testeurs Phase 1 — sans campagne froide.',
    icon: '🤝',
  },
]

const MarcheSaintTropez = () => (
  <div className="min-h-screen bg-creme flex flex-col">
    <Navbar />

    {/* Hero */}
    <section
      className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504551954005-02d9c8f28da0?w=1400&q=80)' }}
    >
      <div className="absolute inset-0 bg-anthracite/70" />
      <div className="relative z-10 text-center px-6 py-24">
        <FadeUp>
          <p className="font-inter text-xs text-or uppercase tracking-widest mb-4">Zone de lancement</p>
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6">
            Golfe de Saint-Tropez
          </h1>
          <p className="font-inter text-lg text-white/80 max-w-2xl mx-auto">
            Le territoire prioritaire de Tablecho — 400 restaurants, 4 à 5 millions de touristes,
            et un réseau terrain unique pour valider le produit.
          </p>
        </FadeUp>
      </div>
    </section>

    {/* Stats zone */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite text-center mb-12">
            La zone en chiffres
          </h2>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsZone.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-playfair text-3xl md:text-4xl text-or font-bold mb-2">{s.valeur}</p>
                <p className="font-inter text-sm text-anthracite leading-snug mb-1">{s.label}</p>
                <p className="font-inter text-xs text-gris-texte">{s.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Contexte */}
    <section className="py-20 px-6 bg-creme">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite mb-8">Pourquoi commencer ici ?</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-10">
          <FadeUp delay={0.1}>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
              Le Golfe de Saint-Tropez n'est pas choisi par hasard. C'est le territoire
              que François connaît le mieux, avec des connexions directes via le CFA Croix-Valmer —
              une porte d'entrée terrain sans équivalent dans n'importe quelle autre zone.
            </p>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
              La haute saison compressée (avril-octobre) crée une pression maximale sur la réputation.
              Les restaurateurs de la zone sont à la fois les plus exposés et les plus réceptifs
              à une solution qui protège leur activité.
            </p>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed">
              Un témoignage d'un restaurateur de Saint-Tropez a une portée nationale naturelle —
              la zone est une vitrine médiatique par excellence.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-anthracite rounded-xl p-8">
              <p className="font-inter font-semibold text-or text-sm uppercase tracking-wider mb-6">
                Stratégie Phase 1 — Automne 2025
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Source', val: 'Réseau CFA Croix-Valmer' },
                  { label: 'Profil cible', val: 'Indépendants, haute saison terminée' },
                  { label: 'Canal', val: 'Patrons de stage — contacts directs' },
                  { label: 'Objectif', val: '3 à 5 bêta-testeurs' },
                  { label: 'Scope', val: 'Google uniquement — validation manuelle' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <p className="font-inter text-xs text-white/40 w-28 shrink-0">{item.label}</p>
                    <p className="font-inter text-sm text-white/80">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* Cards marché */}
    <section className="py-20 px-6 bg-anthracite">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-white text-center mb-12">
            L'opportunité Tablecho sur cette zone
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {cardsMarche.map((c, i) => (
            <CardMarche key={i} titre={c.titre} texte={c.texte} icon={c.icon} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* Événement avril 2026 */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="bg-or/10 border border-or/30 rounded-xl p-10">
            <p className="font-inter text-xs text-or uppercase tracking-widest mb-4">Phase 2 — Avril 2026</p>
            <h2 className="font-playfair text-3xl text-anthracite mb-6">
              L'événement annuel Saint-Tropez
            </h2>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
              Chaque année, Saint-Tropez accueille un événement réunissant les grands chefs
              et restaurateurs de référence. L'édition 2025 a réuni notamment P. Etchebest,
              M. Veyrat, S. Le Quellec, G. Viel, N. Tarayre et de nombreux autres.
            </p>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-8">
              C'est le levier de crédibilité nationale que Tablecho vise pour la Phase 2 :
              des témoignages de chefs reconnus qui valent davantage que n'importe quelle
              campagne publicitaire. Un témoignage Etchebest ou Veyrat se répercute à l'échelle nationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BoutonOr href="/contact">Je veux être bêta-testeur</BoutonOr>
              <Link
                to="/marche-paca"
                className="border border-anthracite/30 text-anthracite font-inter font-semibold
                  text-sm px-6 py-3 rounded hover:border-or transition-colors"
              >
                Voir le marché PACA →
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>

    <Footer />
  </div>
)

export default MarcheSaintTropez
