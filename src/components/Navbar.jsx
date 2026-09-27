import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { nav, site } from '../data/site'
import { EASE } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed inset-x-0 top-0 z-[60] text-black transition-colors duration-300 ${scrolled || open ? 'border-b border-black/10 bg-white/95 backdrop-blur-md' : ''}`}>
      <div className={`wrap flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <Link to="/" className="flex items-baseline gap-3">
          <span className="display text-[22px] tracking-tight">CMRD</span>
          <span className="meta hidden opacity-60 md:inline xl:hidden 2xl:inline">Centre for Medical Research & Development</span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `text-[14px] ${isActive ? 'ul-on text-black' : 'ul text-black/70 hover:text-black'}`}>{n.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/join" className="ul meta hidden md:inline">Sign in</Link>
          <Link to="/join?mode=register" className="meta hidden bg-accent px-4 py-2.5 text-black transition-colors hover:bg-black hover:text-white md:inline">Join us</Link>
          <button onClick={() => setOpen((o) => !o)} className="meta flex items-center gap-3 xl:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? 'Close' : 'Menu'}
            <span className="relative h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden xl:hidden">
            <div className="wrap pb-8">
              <NavLink to="/" end className={({ isActive }) => `block border-b border-black/10 py-4 text-lg ${isActive ? 'text-accent' : ''}`}>Home</NavLink>
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => `block border-b border-black/10 py-4 text-lg ${isActive ? 'text-accent' : ''}`}>{n.label}</NavLink>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/join" className="meta border border-black/20 py-3.5 text-center">Sign in</Link>
                <Link to="/join?mode=register" className="meta bg-accent py-3.5 text-center">Join us</Link>
              </div>
              <p className="mt-6 text-sm text-gray-2">Helpline {site.helpline} · {site.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
