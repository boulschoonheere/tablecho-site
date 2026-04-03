// Bouton CTA secondaire — fond transparent, bordure
const BoutonContour = ({ children, onClick, href, target, couleur = 'blanc', className = '' }) => {
  const styles = {
    blanc: 'border-white text-white hover:bg-white/10',
    anthracite: 'border-anthracite text-anthracite hover:bg-anthracite/5',
    or: 'border-or text-or hover:bg-or/10',
  }
  const classes = `inline-block border font-inter font-semibold px-8 py-4 rounded
    transition-colors duration-200 cursor-pointer ${styles[couleur]} ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default BoutonContour
