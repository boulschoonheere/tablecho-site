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

const statsPaca = [
  { valeur: '~18 000', label: 'restaurants en région PACA', detail: 'INSEE 2023' },
  { valeur: '31 M', label: 'de touristes en PACA par an', detail: 'CRT PACA 2023' },
  { valeur: '2e', label: 'région touristique française', detail: 'après l\'Île-de-France' },
  { valeur: '72 %', label: 'des établissements sont indépendants', detail: 'GNI PACA 2023' },
]

const cardsMarche = [
  {
    titre: 'Densité et diversité unique',
    texte: 'Marseille, Nice, Cannes, Aix-en-Provence, Toulon — la PACA concentre des métropoles à forte activité touristique et une restauration indépendante très développée. Chaque ville représente un bassin autonome d\'adoption.',
    icon: '🗺️',
  },
  {
    titre: 'Tourisme international = pression avis multilingue',
    texte: 'La clientèle internationale (UK, Allemagne, Italie, Benelux) laisse des avis en plusieurs langues. Les restaurateurs PACA font face à un volume d\'avis hors norme sans les outils pour y répondre efficacement.',
    icon: '🌍',
  },
  {
    titre: 'Marché test idéal avant expansion nationale',
    texte: 'Après la validation golfe de Saint-Tropez, la PACA est l\'étape naturelle. Le maillage géographique, la diversité des établissements et la concentration touristique en font le laboratoire parfait avant le déploiement national.',
    icon: '🧪',
  },
]

const MarchePaca = () => (
  <div className="min-h-screen bg-creme flex flex-col">
    <Navbar />

    {/* Hero */}
    <section
      className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1400&q=80)' }}
    >
      <div className="absolute inset-0 bg-anthracite/70" />
      <div className="relative z-10 text-center px-6 py-24">
        <FadeUp>
          <p className="font-inter text-xs text-or uppercase tracking-widest mb-4">Phase 2 — Expansion régionale</p>
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6">
            Marché PACA
          </h1>
          <p className="font-inter text-lg text-white/80 max-w-2xl mx-auto">
            18 000 restaurants indépendants. 31 millions de touristes par an.
            La deuxième région touristique de France — un marché naturel pour Tablecho.
          </p>
        </FadeUp>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite text-center mb-12">
            La région en chiffres
          </h2>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsPaca.map((s, i) => (
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

    {/* Contexte expansion */}
    <section className="py-20 px-6 bg-creme">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite mb-8">De Saint-Tropez à toute la PACA</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-10">
          <FadeUp delay={0.1}>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
              La stratégie de Tablecho suit une logique de cercles concentriques.
              Partir d'un territoire maîtrisé — le Golfe de Saint-Tropez — pour valider
              le produit, les témoignages et les processus, avant d'étendre à toute la région.
            </p>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed mb-6">
              La PACA présente un avantage structurel : une forte densité d'établissements
              indépendants (72 %), une clientèle internationale génératrice d'avis multilingues
              et une culture entrepreneuriale propice à l'adoption des outils numériques.
            </p>
            <p className="font-inter text-base text-anthracite/80 leading-relaxed">
              L'objectif Phase 2 (avril 2026) est de capitaliser sur les bêta-testeurs
              Saint-Tropez pour recruter les premiers clients PACA en mode ambassadeurs.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-anthracite rounded-xl p-8">
              <p className="font-inter font-semibold text-or text-sm uppercase tracking-wider mb-6">
                Villes prioritaires PACA
              </p>
              <div className="space-y-3">
                {[
                  { ville: 'Saint-Tropez & Golfe', statut: '✅ Phase 1 — actif', couleur: 'text-vert-succes' },
                  { ville: 'Marseille', statut: '🟡 Phase 2 — ciblé', couleur: 'text-or' },
                  { ville: 'Nice', statut: '🟡 Phase 2 — ciblé', couleur: 'text-or' },
                  { ville: 'Cannes', statut: '🟡 Phase 2 — ciblé', couleur: 'text-or' },
                  { ville: 'Aix-en-Provence', statut: '🔵 Phase 3', couleur: 'text-white/50' },
                  { ville: 'Toulon & Var', statut: '🔵 Phase 3', couleur: 'text-white/50' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center gap-4 py-2 border-b border-white/10 last:border-0">
                    <p className="font-inter text-sm text-white">{item.ville}</p>
                    <p className={`font-inter text-xs ${item.couleur}`}>{item.statut}</p>
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
            Pourquoi la PACA est un marché idéal
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {cardsMarche.map((c, i) => (
            <CardMarche key={i} titre={c.titre} texte={c.texte} icon={c.icon} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* Potentiel financier */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite mb-10 text-center">
            Potentiel de revenus PACA
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { scenario: 'Conservateur', pct: '1 %', nb: '180 clients', mrr: '8 820 €/mois' },
              { scenario: 'Base', pct: '3 %', nb: '540 clients', mrr: '26 460 €/mois' },
              { scenario: 'Optimiste', pct: '5 %', nb: '900 clients', mrr: '44 100 €/mois' },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl p-6 text-center ${i === 1 ? 'bg-or/10 border-2 border-or' : 'bg-creme border border-bordure'}`}>
                <p className="font-inter text-xs text-gris-texte uppercase tracking-wider mb-2">{s.scenario}</p>
                <p className="font-playfair text-4xl text-or font-bold mb-1">{s.pct}</p>
                <p className="font-inter text-sm text-anthracite mb-3">de pénétration marché</p>
                <p className="font-inter text-sm font-semibold text-anthracite">{s.nb}</p>
                <p className="font-inter text-xs text-gris-texte">à 49 €/mois = {s.mrr}</p>
              </div>
            ))}
          </div>
          <p className="font-inter text-xs text-gris-texte text-center">
            Basé sur ~18 000 restaurants indépendants PACA (INSEE 2023) à 49 €/mois HT.
            Projections indicatives non garanties.
          </p>
        </FadeUp>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-6 bg-anthracite">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-white mb-6">
            Vous êtes restaurateur en PACA ?
          </h2>
          <p className="font-inter text-base text-white/70 mb-10">
            Rejoignez la liste d'attente et soyez parmi les premiers à accéder à Tablecho
            lors du lancement Phase 2.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BoutonOr href="/contact">Rejoindre la liste d'attente</BoutonOr>
            <Link
              to="/marche-saint-tropez"
              className="border border-white/40 text-white font-inter font-semibold
                text-sm px-6 py-3 rounded hover:border-or hover:text-or transition-colors"
            >
              ← Voir le marché Saint-Tropez
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>

    <Footer />
  </div>
)

export default MarchePaca
