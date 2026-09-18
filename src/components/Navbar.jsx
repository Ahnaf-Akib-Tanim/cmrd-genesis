import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/site'
import { images } from '../data/images'
import { EASE, Arrow } from './ui'

const menu = [
  { label: 'Research', sub: 'Collaborative works', to: '/projects', img: images.microscope },
  { label: 'Training', sub: 'Skill development', to: '/courses', img: images.classroom },
  { label: 'Consultancy', sub: 'One-to-one support', to: '/consultancy', img: images.data },
  { label: 'IRB', sub: 'Ethical review portal', to: '/irb', img: images.notebook },
  { label: 'Insights', sub: 'Blog', to: '/blog', img: images.library },
  { label: 'About', sub: 'Since 2016', to: '/about', img: images.meeting },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { document.documentElement.classList.toggle('lenis-stopped', open); document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] mix-blend-difference text-white">
        <div className={`wrap flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-16' : 'h-24'}`}>
          <Link to="/" className="flex items-baseline gap-4">
            <span className="display text-[22px] tracking-tight">CMRD</span>
            <span className="meta hidden text-white/60 md:inline">Centre for Medical Research & Development</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/join?mode=register" className="ul meta hidden md:inline">Join us</Link>
            <button onClick={() => setOpen((o) => !o)} className="group flex items-center gap-3 meta" aria-label="Menu">
              <span>{open ? 'Close' : 'Menu'}</span>
              <span className="relative h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-all duration-500 ${open ? 'top-1.5 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-3 h-px w-6 bg-current transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : 'group-hover:w-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease: EASE }} className="fixed inset-0 z-50 bg-navy text-white">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute inset-y-0 right-0 hidden w-[42vw] lg:block">
              <AnimatePresence mode="sync">
                <motion.img key={hover} src={menu[hover].img} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 0.55, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: EASE }} className="absolute inset-0 h-full w-full object-cover" style={{ filter: 'contrast(1.1) saturate(.5)' }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
            </div>
            <div className="wrap relative flex h-full flex-col justify-between pb-8 pt-24 lg:pt-28">
              <nav>
                {menu.map((m, i) => (
                  <motion.div key={m.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 + i * 0.06, duration: 0.9, ease: EASE }}>
                    <Link to={m.to} onMouseEnter={() => setHover(i)} className={`group flex items-baseline gap-6 py-2 transition-opacity duration-500 lg:py-1 ${hover === i ? 'opacity-100' : 'lg:opacity-40 lg:hover:opacity-100'}`}>
                      <span className="meta w-8 text-accent">0{i + 1}</span>
                      <span className="display text-[min(5vw,7.5vh)] transition-transform duration-700 group-hover:translate-x-3">{m.label}</span>
                      <span className="meta hidden text-white/50 sm:inline">{m.sub}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="grid gap-6 hairline pt-6 text-sm text-white/60 sm:grid-cols-3">
                <div>{site.address}</div>
                <div>{site.email}<br />{site.helpline}</div>
                <div className="flex gap-6"><Link to="/join" className="ul text-white">Sign in</Link><Link to="/contact" className="ul text-white">Contact</Link><a href={site.facebook} target="_blank" rel="noreferrer" className="ul text-white">Facebook</a></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Arrow }
