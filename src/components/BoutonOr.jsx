// Bouton CTA principal — fond or, texte anthracite
const BoutonOr = ({ children, onClick, href, target, className = '', type = 'button' }) => {
  const classes = `inline-block bg-or hover:bg-or-clair text-anthracite font-inter font-semibold
    px-8 py-4 rounded transition-colors duration-200 cursor-pointer ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export default BoutonOr
