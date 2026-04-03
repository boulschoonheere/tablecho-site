import { Link } from 'react-router-dom'
import { CONFIG } from '../config'

// Footer global — 4 colonnes desktop / 2 colonnes mobile
const Footer = () => (
  <footer className="bg-[#111111] pt-16 pb-8">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Col 1 — Marque */}
        <div className="col-span-2 lg:col-span-1">
          <p className="font-playfair text-2xl text-or font-bold mb-3">Tablecho</p>
          <p className="font-inter text-sm text-white/60 italic leading-relaxed mb-4">
            Notre mission : préserver votre réputation.
          </p>
          <a href={CONFIG.FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-or transition-colors text-sm font-inter">
            📘 Page Facebook
          </a>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <p className="font-inter font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">
            Navigation
          </p>
          <div className="flex flex-col gap-2">
            {[
              ['Accueil', '/'],
              ['Quiz', '/quiz'],
              ['Marché STropez', '/marche-saint-tropez'],
              ['Marché PACA', '/marche-paca'],
              ['Avis Google', '/avis-clients'],
              ['Contact', '/contact'],
              ['Investisseurs', '/investisseurs'],
            ].map(([label, href]) => (
              <Link key={href} to={href}
                className="font-inter text-sm text-white/60 hover:text-or transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <p className="font-inter font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">
            Contact
          </p>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${CONFIG.EMAIL}`}
              className="font-inter text-sm text-white/60 hover:text-or transition-colors">
              {CONFIG.EMAIL}
            </a>
            <a href={CONFIG.CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-white/60 hover:text-or transition-colors">
              Prendre RDV
            </a>
            <a href={CONFIG.GOFUNDME_URL} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-white/60 hover:text-or transition-colors">
              Soutenir le projet
            </a>
          </div>
        </div>

        {/* Col 4 — Légal */}
        <div>
          <p className="font-inter font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">
            Informations
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/mentions-legales"
              className="font-inter text-sm text-white/60 hover:text-or transition-colors">
              Mentions légales
            </Link>
            <Link to="/confidentialite"
              className="font-inter text-sm text-white/60 hover:text-or transition-colors">
              Politique de confidentialité
            </Link>
            <p className="font-inter text-sm text-white/60">RGPD</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="font-inter text-xs text-white/40">
          © 2026 Tablecho. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
