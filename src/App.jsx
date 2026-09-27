import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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

const titles = { '/': 'Home', '/consultancy': 'Research Consultancy', '/courses': 'Skill Development', '/projects': 'Collaborative Works', '/blog': 'Blog', '/about': 'About Us', '/irb': 'IRB Portal', '/join': 'Join Us', '/contact': 'Contact' }

/* Scroll to top on page change, or to #section when a link targets one */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = `${titles[pathname] || 'CMRD'} — CMRD`
    const t = setTimeout(() => {
      const el = hash && document.querySelector(hash)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
      else window.scrollTo(0, 0)
    }, 260)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

const routes = [['/', Home], ['/consultancy', Consultancy], ['/courses', Courses], ['/projects', Projects], ['/blog', Blog], ['/about', About], ['/irb', IRB], ['/join', Join], ['/contact', Contact]]

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
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
