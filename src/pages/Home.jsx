import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardMarche from '../components/CardMarche'
import BoutonOr from '../components/BoutonOr'
import BoutonContour from '../components/BoutonContour'
import { CONFIG } from '../config'

// Animation réutilisable scroll
const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
)

// ─── SECTION 2 — Chiffres clés ───────────────────────────────
const stats = [
  { chiffre: '157 000', label: 'restaurants indépendants en France', icone: '🍽️' },
  { chiffre: '88%', label: 'des établissements sans outil de réputation dédié', icone: '📊' },
  { chiffre: '4,8→3,9', label: 'une note peut chuter en 6 semaines suite à des avis non gérés', icone: '⭐' },
  { chiffre: '123 Mds€', label: 'CA total restauration France 2024', icone: '📈' },
]

// ─── SECTION 4 — Étapes ──────────────────────────────────────
const etapes = [
  { num: '01', icone: '🔔', titre: 'Détection', texte: 'Tablecho surveille en temps réel tous vos avis — Google, TripAdvisor, Facebook — et vous alerte dès qu\'un nouveau commentaire est publié.' },
  { num: '02', icone: '✍️', titre: 'Génération IA', texte: 'Une réponse humanisée est rédigée automatiquement, adaptée à votre ton, à la situation et au profil de l\'avis — positif, négatif ou neutre.' },
  { num: '03', icone: '✅', titre: 'Validation', texte: 'Vous recevez la réponse pour validation. Un clic pour approuver, un clic pour modifier. Vous gardez la main. L\'IA gère la veille.' },
]

// ─── SECTION 6 — Tickets cagnotte ────────────────────────────
const tickets = [
  { badge: 'Soutenir', montant: '100€', desc: 'Je crois au projet et je soutiens son lancement', label: 'Contribuer', accent: false },
  { badge: 'Partenaire', montant: '500€', desc: 'Je deviens partenaire de lancement de Tablecho', label: 'Devenir partenaire', accent: true },
  { badge: 'Ambassadeur', montant: '1 500€', desc: 'Je rejoins l\'aventure en tant qu\'ambassadeur fondateur', label: 'Devenir ambassadeur', accent: false },
]

// ─── PAGE HOME ────────────────────────────────────────────────
const Home = () => {
  const sectionProblemeRef = useRef(null)

  const pct = Math.round((CONFIG.GOFUNDME_CURRENT / CONFIG.GOFUNDME_GOAL) * 100 * 10) / 10

  return (
    <>
      <Navbar />

      {/* ── S1 HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Restaurant gastronomique élégant"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite/70 via-anthracite/70 to-anthracite/80" />
        </div>

        {/* Contenu centré */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-or/10 border border-or text-or font-inter font-semibold
              text-[13px] px-4 py-2 rounded-full mb-6 tracking-wide">
              ✦ Premier assistant IA d'e-réputation pour restaurateurs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair font-bold text-white text-4xl md:text-5xl lg:text-[64px]
              leading-[1.1] mb-6">
            Votre réputation mérite mieux<br />que le silence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-lg md:text-xl text-white/85 max-w-[600px] mx-auto mb-10">
            Tablecho automatise vos réponses aux avis clients grâce à l'IA — humanisées, validées par vous, publiées au bon moment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <BoutonOr href="/quiz" className="text-base px-8 py-4">
              Tester Tablecho
            </BoutonOr>
            <BoutonContour
              onClick={() => sectionProblemeRef.current?.scrollIntoView({ behavior: 'smooth' })}
              couleur="blanc" className="text-base px-8 py-4">
              Découvrir le projet
            </BoutonContour>
          </motion.div>
        </div>

        {/* Bandeau défilant */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black/30 py-3">
          <div className="flex whitespace-nowrap animate-scroll-x">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="font-inter text-[13px] text-white/70 mr-0">
                {Array(4).fill('157 000 restaurants indépendants en France  ·  Zéro outil dédié à leur réputation  ·  Jusqu\'à aujourd\'hui  ·  Tablecho change ça  ·  ').join('')}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white/60 text-2xl">
          ↓
        </motion.div>
      </section>

      {/* ── S2 CHIFFRES CLÉS ── */}
      <section className="bg-creme py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <h2 className="font-playfair text-4xl text-anthracite">Le problème en chiffres</h2>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white border border-bordure rounded-lg p-8 md:p-10
                  shadow-[0_2px_20px_rgba(0,0,0,0.08)] text-center">
                  <p className="text-3xl mb-2">{s.icone}</p>
                  <p className="font-playfair text-[42px] md:text-[56px] text-or leading-none mb-3">
                    {s.chiffre}
                  </p>
                  <p className="font-inter text-sm text-gris-texte leading-relaxed">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="font-inter text-[11px] text-gris-texte/70 text-center mt-8">
            Sources : Food Service Vision 2024, INSEE, Gira Conseil 2024
          </p>
        </div>
      </section>

      {/* ── S3 LE PROBLÈME ── */}
      <section ref={sectionProblemeRef} className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="font-inter text-xs text-or uppercase tracking-[2px] mb-4">Le constat terrain</p>
              <h2 className="font-playfair text-4xl md:text-[42px] text-anthracite leading-tight mb-8">
                Un avis sans réponse coûte plus cher qu'une mauvaise critique.
              </h2>
              <div className="space-y-5 font-inter text-base text-anthracite/80 leading-[1.7]">
                <p>En 35 ans de terrain, j'ai vu des dizaines d'établissements excellents perdre leur réputation en quelques semaines. Pas à cause d'un problème de qualité. À cause du silence. Un avis négatif sans réponse est une conversation que vous n'avez pas eue avec votre futur client.</p>
                <p>La réputation se perd en semaines. Elle se construit en années. J'ai suivi un restaurant avec une note Google de 4,8 — méritée, honnête, construite en 3 ans de travail. En six semaines : 3,9. Trois avis suspects, un patron seul face à son téléphone, sans méthode. En six mois, la salle était à moitié vide.</p>
                <p>Les restaurants indépendants n'ont pas les outils des chaînes. Ils répondent tard, mal, sous pression, ou pas du tout. Ce n'est pas un manque de volonté — c'est un manque d'outils adaptés à leur réalité.</p>
              </div>
              <blockquote className="mt-8 border-l-[3px] border-or pl-6">
                <p className="font-playfair italic text-lg text-or">
                  "La réputation ne se délègue pas.<br />Mais elle peut être assistée."
                </p>
              </blockquote>
            </FadeUp>
            <FadeUp delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
                alt="Patron de restaurant préoccupé, téléphone en main"
                className="rounded-lg w-full h-[500px] object-cover shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                loading="lazy"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── S4 COMMENT ÇA MARCHE ── */}
      <section className="bg-creme py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <p className="font-inter text-xs text-or uppercase tracking-[2px] mb-4">La solution</p>
            <h2 className="font-playfair text-4xl md:text-[42px] text-anthracite">
              3 étapes. 30 secondes.<br />Votre réputation protégée.
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {etapes.map((e, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="relative">
                  <p className="font-playfair text-[64px] text-or/20 leading-none mb-2">{e.num}</p>
                  <p className="text-3xl mb-3">{e.icone}</p>
                  <h3 className="font-playfair text-2xl text-anthracite mb-3">{e.titre}</h3>
                  <p className="font-inter text-[15px] text-gris-texte leading-relaxed">{e.texte}</p>
                  {i < etapes.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-5 text-or/30 text-2xl">→</div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center">
            <BoutonOr href="/quiz" className="text-base px-10 py-5">
              Voir si Tablecho est fait pour moi
            </BoutonOr>
          </div>
        </div>
      </section>

      {/* ── S5 ANALYSES MARCHÉ ── */}
      <section className="bg-anthracite py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <p className="font-inter text-xs text-or uppercase tracking-[2px] mb-4">Votre marché</p>
            <h2 className="font-playfair text-4xl text-white">
              Comprendre votre marché<br />pour mieux le défendre.
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            <CardMarche icone="🌊" titre="Golfe de Saint-Tropez"
              texte="Analyse du marché de la restauration dans le Golfe — saisonnalité, clientèle internationale, enjeux réputation premium."
              lienLabel="Voir l'analyse" lienHref="/marche-saint-tropez" delay={0} />
            <CardMarche icone="🌿" titre="Région PACA"
              texte="Panorama complet de la restauration en PACA — chiffres clés, segments, opportunités et défis du marché."
              lienLabel="Voir l'analyse" lienHref="/marche-paca" delay={0.1} />
            <CardMarche icone="⭐" titre="Le poids des avis Google"
              texte="Comment les avis en ligne influencent les décisions de vos clients avant même qu'ils franchissent votre porte."
              lienLabel="Lire l'étude" lienHref="/avis-clients" delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── S6 CAGNOTTE ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #FAF7F2 100%)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <p className="font-inter text-xs text-anthracite uppercase tracking-[2px] mb-4">Financement participatif</p>
            <h2 className="font-playfair text-4xl text-anthracite mb-6">Soutenez le projet.</h2>
            <p className="font-inter text-base text-anthracite/70 max-w-lg mx-auto">
              Tablecho est en cours de financement participatif. Chaque contribution accélère le lancement et permet de protéger les premiers restaurateurs de la région.
            </p>
          </FadeUp>

          {/* Barre de progression */}
          <FadeUp className="mb-12">
            <div className="bg-white rounded-full h-3 max-w-xl mx-auto overflow-hidden">
              <div className="bg-or h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
            <p className="font-inter text-sm text-gris-texte text-center mt-3">
              {CONFIG.GOFUNDME_CURRENT.toLocaleString('fr-FR')}€ collectés sur {CONFIG.GOFUNDME_GOAL.toLocaleString('fr-FR')}€ objectif ({pct}%)
            </p>
          </FadeUp>

          {/* Tickets */}
          <div className="grid md:grid-cols-3 gap-6">
            {tickets.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`bg-white border rounded-lg p-8 hover:border-or
                  shadow-[0_2px_20px_rgba(0,0,0,0.08)] transition-colors duration-200 flex flex-col gap-4
                  ${t.accent ? 'border-or' : 'border-bordure'}`}>
                  <span className={`font-inter font-semibold text-xs px-3 py-1 rounded-full w-fit
                    ${t.accent ? 'bg-anthracite text-or' : 'bg-or/10 text-or'}`}>
                    {t.badge}
                  </span>
                  <p className="font-playfair text-[40px] text-or leading-none">{t.montant}</p>
                  <p className="font-inter text-sm text-gris-texte leading-relaxed flex-1">{t.desc}</p>
                  <a href={CONFIG.GOFUNDME_URL} target="_blank" rel="noopener noreferrer"
                    className={`font-inter font-semibold text-sm px-5 py-3 rounded text-center
                      transition-colors duration-200
                      ${t.accent
                        ? 'bg-anthracite text-white hover:bg-anthracite-moyen'
                        : 'bg-or text-anthracite hover:bg-or-clair'}`}>
                    {t.label}
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7 TÉMOIGNAGES ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-4">
            <p className="font-inter text-xs text-or uppercase tracking-[2px] mb-4">Ils nous font confiance</p>
            <h2 className="font-playfair text-4xl text-anthracite mb-4">Les premiers à y croire.</h2>
            <p className="font-inter text-sm text-gris-texte italic">
              Tablecho est en phase de lancement. Ces témoignages seront mis à jour dès nos premiers bêta-testeurs actifs.
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map(i => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-creme border border-bordure rounded-lg p-8">
                  <p className="font-playfair italic text-lg text-gris-texte mb-6">
                    "En attente de nos premiers bêta-testeurs. Voulez-vous être le premier à témoigner ?"
                  </p>
                  <p className="font-inter text-sm text-gris-texte mb-2">Restaurateur, Golfe de Saint-Tropez</p>
                  <p className="text-or text-lg mb-3">☆☆☆☆☆</p>
                  <span className="font-inter text-xs bg-or/10 text-or px-3 py-1 rounded-full">
                    Bêta-testeur à venir
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="font-inter text-or hover:underline text-sm font-semibold">
              Devenez bêta-testeur →
            </Link>
          </div>
        </div>
      </section>

      {/* ── S8 FONDATEUR ── */}
      <section className="bg-creme py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                  alt="Portrait professionnel fondateur — Remplacer par photo de François"
                  className="rounded-lg w-full h-[480px] object-cover shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                  loading="lazy"
                />
                <p className="font-inter text-xs text-gris-texte mt-2 text-center">
                  📸 Remplacer par photo de François
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2} className="order-1 lg:order-2">
              <p className="font-inter text-xs text-or uppercase tracking-[2px] mb-4">Le fondateur</p>
              <h2 className="font-playfair text-4xl text-anthracite mb-6">Un projet né du terrain.</h2>
              <p className="font-inter text-base text-anthracite/80 leading-[1.7] mb-4">
                35 ans de restauration. Cuisinier, chef de cuisine, directeur, multi-sites. J'ai observé de l'intérieur comment des établissements excellents perdaient leur clientèle faute d'outils pour gérer leur réputation en ligne.
              </p>
              <p className="font-inter text-base text-anthracite/80 leading-[1.7] mb-6">
                J'ai décidé de construire la réponse qui manquait.
              </p>
              <p className="font-playfair italic text-xl text-or mb-8">— François Boul Schoonheere</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Master 2 HCR', 'Formateur certifié Niv.5', 'CFA Croix-Valmer'].map(b => (
                  <span key={b} className="font-inter text-xs bg-anthracite/5 text-anthracite
                    px-4 py-1.5 rounded-full">{b}</span>
                ))}
              </div>
              <BoutonContour href={CONFIG.CALENDLY_URL} target="_blank" couleur="anthracite">
                📅 Prendre rendez-vous
              </BoutonContour>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── S9 PRESSE ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-8">
            <h3 className="font-playfair text-3xl text-anthracite mb-3">Ils parlent de Tablecho.</h3>
            <p className="font-inter text-sm text-gris-texte">Couverture presse à venir.</p>
          </FadeUp>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg h-20 flex items-center justify-center">
                <p className="font-inter text-xs text-gris-texte text-center px-2">Média partenaire</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10 CTA FINAL ── */}
      <section className="bg-anthracite py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="font-playfair text-4xl md:text-[42px] text-white mb-6">
              Prêt à protéger votre réputation ?
            </h2>
            <p className="font-inter text-lg text-white/70 mb-10">
              Rejoignez les premiers restaurateurs à bénéficier de Tablecho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BoutonOr href="/quiz" className="text-base px-8 py-4">
                Faire le quiz — 2 minutes
              </BoutonOr>
              <BoutonContour href={CONFIG.CALENDLY_URL} target="_blank" couleur="blanc" className="text-base px-8 py-4">
                Prendre rendez-vous
              </BoutonContour>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
