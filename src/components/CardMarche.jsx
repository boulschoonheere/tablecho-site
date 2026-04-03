import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Card analyse marché — utilisée dans la section 5 de Home et pages marché
const CardMarche = ({ icone, titre, texte, lienLabel, lienHref, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-anthracite-moyen border border-or/20 hover:border-or rounded-lg p-8
      transition-colors duration-300 flex flex-col gap-4"
  >
    <span className="text-or text-3xl">{icone}</span>
    <h3 className="font-playfair text-xl text-white">{titre}</h3>
    <p className="font-inter text-sm text-white/70 leading-relaxed flex-1">{texte}</p>
    <Link to={lienHref} className="text-or font-inter text-sm hover:underline">
      {lienLabel} →
    </Link>
  </motion.div>
)

export default CardMarche
