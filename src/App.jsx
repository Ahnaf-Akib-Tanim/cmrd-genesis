import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Consultancy from './pages/Consultancy'
import Courses from './pages/Courses'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import About from './pages/About'
import IRB from './pages/IRB'
import Join from './pages/Join'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'

const EASE = [0.76, 0, 0.24, 1]
const names = { '/': 'CMRD', '/consultancy': 'Consultancy', '/courses': 'Training', '/projects': 'Research', '/blog': 'Insights', '/about': 'About', '/irb': 'IRB', '/join': 'Join', '/contact': 'Contact' }

function useLenis() {
  const ref = useRef(null)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    ref.current = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
  return ref
}

function ScrollManager({ lenis }) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const l = lenis.current
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { setTimeout(() => (l ? l.scrollTo(el, { offset: -80 }) : el.scrollIntoView()), 700); return }
    }
    setTimeout(() => (l ? l.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)), 350)
  }, [pathname, hash, lenis])
  return null
}

/* Transition: black curtain with the destination name */
function Curtain({ trigger }) {
  const first = useRef(true)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    setShow(true)
    const t = setTimeout(() => setShow(false), 1100)
    return () => clearTimeout(t)
  }, [trigger])
  const name = names[trigger] || 'CMRD'
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-black" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0 0 100% 0)'] }} transition={{ duration: 1.1, times: [0, 0.35, 0.6, 1], ease: EASE }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }} transition={{ duration: 1.1, times: [0, 0.4, 0.6, 0.85] }} className="display text-[clamp(2.2rem,7.2vw,7.2rem)] text-white">{name}</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const routes = [['/', Home], ['/consultancy', Consultancy], ['/courses', Courses], ['/projects', Projects], ['/blog', Blog], ['/about', About], ['/irb', IRB], ['/join', Join], ['/contact', Contact]]

export default function App() {
  const location = useLocation()
  const lenis = useLenis()
  return (
    <>
      <Cursor />
      <ScrollManager lenis={lenis} />
      <Curtain trigger={location.pathname} />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.35 } }}>
          <Routes location={location}>
            {routes.map(([p, C]) => <Route key={p} path={p} element={<C />} />)}
            <Route path="/refund-policy" element={<Policy kind="refund" />} />
            <Route path="/privacy-policy" element={<Policy kind="privacy" />} />
            <Route path="/terms" element={<Policy kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
