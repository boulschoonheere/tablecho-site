import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Navbar fixe — transparente sur hero, anthracite au scroll >80px
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu mobile à chaque changement de route
  useEffect(() => { setMenuOuvert(false) }, [pathname])

  const liens = [
    { label: 'Accueil', href: '/' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Marché', href: '/marche-saint-tropez' },
    { label: 'Avis Google', href: '/avis-clients' },
    { label: 'Contact', href: '/contact' },
    { label: 'Investisseurs', href: '/investisseurs' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
        ${scrolled ? 'bg-anthracite shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="font-playfair text-2xl text-or font-bold tracking-wide">
            Tablecho
          </Link>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {liens.map(l => (
              <Link key={l.href} to={l.href}
                className="font-inter text-sm text-white/80 hover:text-or transition-colors duration-200">
                {l.label}
              </Link>
            ))}
            <Link to="/quiz"
              className="bg-or hover:bg-or-clair text-anthracite font-inter font-semibold
                text-sm px-5 py-2 rounded transition-colors duration-200">
              Tester Tablecho
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button onClick={() => setMenuOuvert(!menuOuvert)}
            className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200
              ${menuOuvert ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200
              ${menuOuvert ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200
              ${menuOuvert ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menu mobile plein écran */}
      {menuOuvert && (
        <div className="fixed inset-0 z-[99] bg-anthracite flex flex-col items-center
          justify-center gap-8" onClick={() => setMenuOuvert(false)}>
          {liens.map(l => (
            <Link key={l.href} to={l.href}
              className="font-inter text-2xl text-white hover:text-or transition-colors">
              {l.label}
            </Link>
          ))}
          <Link to="/quiz"
            className="mt-4 bg-or text-anthracite font-inter font-semibold
              text-lg px-8 py-4 rounded">
            Tester Tablecho
          </Link>
        </div>
      )}
    </>
  )
}

export default Navbar
