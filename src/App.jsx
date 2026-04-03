import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import BandeauRGPD from './components/BandeauRGPD'
import Home from './pages/Home'
import MarcheSaintTropez from './pages/MarcheSaintTropez'
import MarchePaca from './pages/MarchePaca'
import AvisClients from './pages/AvisClients'
import Quiz from './pages/Quiz'
import Contact from './pages/Contact'
import Investisseurs from './pages/Investisseurs'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BandeauRGPD />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marche-saint-tropez" element={<MarcheSaintTropez />} />
        <Route path="/marche-paca" element={<MarchePaca />} />
        <Route path="/avis-clients" element={<AvisClients />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/investisseurs" element={<Investisseurs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
