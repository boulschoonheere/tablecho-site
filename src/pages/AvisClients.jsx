import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BoutonOr from '../components/BoutonOr'
import BoutonContour from '../components/BoutonContour'
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

const statsAvis = [
  {
    valeur: '93 %',
    label: 'des clients lisent les avis avant de réserver',
    detail: 'BrightLocal 2023',
    couleur: 'text-or',
  },
  {
    valeur: '-70 %',
    label: 'de chances de convertir un client si vous ne répondez pas',
    detail: 'Harvard Business Review, 2022',
    couleur: 'text-rouge-erreur',
  },
  {
    valeur: '+15 %',
    label: 'de chiffre d\'affaires supplémentaire avec une note ≥ 4,5',
    detail: 'MIT Sloan Management Review, 2021',
    couleur: 'text-vert-succes',
  },
  {
    valeur: '4,8 → 3,9',
    label: 'note réelle détruite par un seul avis probablement frauduleux',
    detail: 'Cas fondateur Tablecho — point de départ du projet',
    couleur: 'text-rouge-erreur',
  },
]

const etapesDecision = [
  { num: '01', titre: 'Le client recherche', desc: 'Il tape "restaurant [ville]" sur Google. Les 3 premiers résultats captent 80 % des clics. Votre note est visible immédiatement.' },
  { num: '02', titre: 'Il lit les avis récents', desc: 'Les avis des 90 derniers jours comptent plus que la note globale. Un avis sans réponse est interprété comme un manque de sérieux.' },
  { num: '03', titre: 'Il compare les réponses', desc: 'Un restaurateur qui répond avec soin à chaque avis — même négatif — inspire confiance. C\'est un signal de professionnalisme fort.' },
  { num: '04', titre: 'Il choisit ou il passe', desc: 'La décision prend moins de 30 secondes. C\'est cette fenêtre que Tablecho protège — en s\'assurant que votre vitrine est toujours irréprochable.' },
]

const piegesInaction = [
  {
    titre: '"Je n\'ai pas le temps"',
    reponse: 'Tablecho vous propose une réponse rédigée à valider en 30 secondes. Le temps de non-réponse, c\'est 70 % de clients perdus.',
    icon: '⏱️',
  },
  {
    titre: '"Mes clients fidèles ne lisent pas les avis"',
    reponse: 'Vos nouveaux clients, eux, lisent. Ce sont eux que vous perdez. 88 % des 18-44 ans font autant confiance aux avis qu\'aux recommandations personnelles.',
    icon: '👥',
  },
  {
    titre: '"Un avis négatif, ça arrive à tout le monde"',
    reponse: 'Un avis négatif sans réponse = vous donnez raison au critique. Une réponse professionnelle transforme un problème en preuve de sérieux.',
    icon: '⭐',
  },
]

const AvisClients = () => (
  <div className="min-h-screen bg-creme flex flex-col">
    <Navbar />

    {/* Hero */}
    <section className="bg-anthracite pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <p className="font-inter text-xs text-or/80 uppercase tracking-widest mb-4">L'enjeu</p>
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6">
            Les avis Google décident à votre place
          </h1>
          <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            93 % de vos futurs clients consultent vos avis avant de vous choisir.
            Chaque réponse manquante est une décision que vous laissez à votre concurrent.
          </p>
        </FadeUp>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite text-center mb-12">
            Ce que disent les données
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statsAvis.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-creme rounded-xl p-8 flex gap-6 items-start">
                <p className={`font-playfair text-4xl font-bold shrink-0 ${s.couleur}`}>{s.valeur}</p>
                <div>
                  <p className="font-inter text-base text-anthracite leading-snug mb-2">{s.label}</p>
                  <p className="font-inter text-xs text-gris-texte">{s.detail}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Mécanisme de décision */}
    <section className="py-20 px-6 bg-creme">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite mb-4">
            Comment un client prend sa décision
          </h2>
          <p className="font-inter text-base text-gris-texte mb-12">
            Le parcours complet prend moins de 2 minutes. Voici ce qui se passe réellement.
          </p>
        </FadeUp>
        <div className="space-y-8">
          {etapesDecision.map((e, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <p className="font-playfair text-4xl text-or/30 font-bold leading-none">{e.num}</p>
                </div>
                <div className="pt-1">
                  <p className="font-inter font-semibold text-anthracite mb-2">{e.titre}</p>
                  <p className="font-inter text-base text-anthracite/70 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Pièges de l'inaction */}
    <section className="py-20 px-6 bg-anthracite">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-white text-center mb-4">
            Les 3 pièges de l'inaction
          </h2>
          <p className="font-inter text-base text-white/60 text-center mb-12 max-w-xl mx-auto">
            Ces croyances coûtent cher. Voici pourquoi.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {piegesInaction.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(201,163,84,0.5)' }}
                className="bg-white/5 border border-white/10 rounded-xl p-8 transition-all duration-300"
              >
                <p className="text-3xl mb-4">{p.icon}</p>
                <p className="font-inter font-semibold text-white mb-4 leading-snug">{p.titre}</p>
                <p className="font-inter text-sm text-white/70 leading-relaxed">{p.reponse}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* Solution Tablecho */}
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl text-anthracite mb-8">
            Ce que Tablecho change concrètement
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              {[
                { avant: 'Avis sans réponse pendant des semaines', apres: 'Réponse soumise à votre validation sous 24h' },
                { avant: 'Temps perdu à chercher quoi écrire', apres: '30 secondes pour valider ou modifier la réponse' },
                { avant: 'Réponses génériques qui n\'engagent pas', apres: 'Réponses dans votre voix, adaptées à chaque avis' },
                { avant: 'Note qui baisse sans que vous le sachiez', apres: 'Alertes et suivi en temps réel de votre réputation' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-0.5">
                    <span className="text-rouge-erreur text-sm">✕</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-inter text-sm text-anthracite/50 line-through mb-1">{item.avant}</p>
                    <div className="flex gap-2 items-start">
                      <span className="text-vert-succes text-sm shrink-0">✓</span>
                      <p className="font-inter text-sm text-anthracite font-semibold">{item.apres}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-creme rounded-xl p-8">
              <p className="font-inter font-semibold text-or text-sm uppercase tracking-wider mb-6">
                En pratique
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-inter font-semibold text-anthracite text-sm">15 minutes</p>
                    <p className="font-inter text-xs text-gris-texte">pour connecter votre compte Google</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-inter font-semibold text-anthracite text-sm">IA entraînée à votre voix</p>
                    <p className="font-inter text-xs text-gris-texte">chaque réponse est personnalisée</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-inter font-semibold text-anthracite text-sm">Vous validez avant publication</p>
                    <p className="font-inter text-xs text-gris-texte">100 % de maîtrise de votre réputation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💶</span>
                  <div>
                    <p className="font-inter font-semibold text-anthracite text-sm">49 € / mois</p>
                    <p className="font-inter text-xs text-gris-texte">moins de 2 € par jour</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* CTA final */}
    <section className="py-20 px-6 bg-anthracite">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">
            Votre réputation mérite mieux que l'improvisation
          </h2>
          <p className="font-inter text-base text-white/70 mb-10">
            Faites le quiz pour connaître votre profil de gestion des avis.
            2 minutes — une réponse personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BoutonOr href="/quiz" className="text-base px-8 py-4">
              Faire le diagnostic →
            </BoutonOr>
            <BoutonContour href={CONFIG.CALENDLY_URL} target="_blank" couleur="blanc" className="text-base px-8 py-4">
              Prendre rendez-vous
            </BoutonContour>
          </div>
        </FadeUp>
      </div>
    </section>

    <Footer />
  </div>
)

export default AvisClients
