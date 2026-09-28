import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Reveal, Arrow, Solid, Btn, EASE } from './ui'
import { site, specialties, partners } from '../data/site'

export const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
const wa = `https://wa.me/${site.whatsapp.replace('+', '')}`

/* ---------- Course ---------- */
export function CourseCard({ c, detailed = false }) {
  const status = { upcoming: 'Upcoming', ongoing: 'Ongoing', free: 'Free' }[c.status]
  return (
    <Link to="/join?mode=register" className="group flex h-full flex-col border border-black/10 bg-white p-6 transition-colors hover:border-black/30">
      <div className="flex items-center justify-between">
        <span className={`meta ${c.status === 'free' ? 'text-accent' : ''}`}>{status} · {c.level}</span>
        <span className="font-medium">{c.fee === 0 ? 'Free' : `৳${c.fee.toLocaleString()}`}</span>
      </div>
      <h3 className="mt-4 text-lg font-medium leading-snug">{c.title}</h3>
      <p className="mt-1 text-sm text-gray-2">{c.subtitle}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-black/10 pt-4 text-sm">
        <div><dt className="text-gray-2">Starts</dt><dd className="mt-0.5">{fmtDate(c.start)}</dd></div>
        <div><dt className="text-gray-2">Duration</dt><dd className="mt-0.5">{c.duration}</dd></div>
        <div><dt className="text-gray-2">Mode</dt><dd className="mt-0.5">{c.mode}</dd></div>
      </dl>
      {detailed && <p className="mt-4 flex-1 text-sm text-gray-2">Covers: {c.tags.join(', ')}.</p>}
      <span className="meta mt-6 flex items-center gap-2 text-black">Enrol <Arrow className="transition-transform group-hover:translate-x-1" /></span>
    </Link>
  )
}

/* ---------- Blog post ---------- */
export function PostCard({ p }) {
  return (
    <a href="#" className="group flex h-full flex-col border border-black/10 bg-white p-6 transition-colors hover:border-black/30">
      <p className="meta">{p.category}</p>
      <h3 className="mt-4 text-lg font-medium leading-snug">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-2">{p.excerpt}</p>
      <div className="mt-6 flex items-center justify-between text-sm text-gray-2">
        <span>{fmtDate(p.date)} · {p.read} min</span>
        <span className="meta flex items-center gap-2 text-black">Read <Arrow className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </a>
  )
}

/* ---------- Project (expandable) ---------- */
export function ProjectCard({ p, image }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="border border-black/10 bg-white">
      <div className="grid gap-6 p-6 md:grid-cols-12">
        {image && <div className="img grade md:col-span-4" style={{ aspectRatio: '4/3' }}><img src={image} alt="" /></div>}
        <div className={image ? 'md:col-span-8' : 'md:col-span-12'}>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-2">
            <span className="meta text-accent">{p.status}</span><span>{p.type}</span><span>{p.date}</span>
          </div>
          <h3 className="mt-3 text-xl font-medium leading-snug">{p.title}</h3>
          <p className="mt-2 text-sm text-gray-2">{p.partner}</p>
          <button onClick={() => setOpen((o) => !o)} className="meta mt-5 flex items-center gap-2" aria-expanded={open}>
            {open ? 'Hide summary' : 'Read summary'} <span className="text-base leading-none">{open ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                <p className="pt-4 text-[15px] leading-relaxed">{p.summary}</p>
                <p className="mt-3 text-sm"><span className="font-medium">Key finding:</span> {p.highlight}</p>
                <p className="mt-2 text-sm text-gray-2">Keywords: {p.tags.join(', ')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}

/* ---------- Specialties grid ---------- */
export function SpecialtiesGrid({ cols = 5 }) {
  return (
    <div className={`grid gap-px bg-black/10 sm:grid-cols-2 ${cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
      {specialties.map((s, i) => (
        <Reveal key={s.title} delay={(i % cols) * 0.04} className="h-full bg-white p-6">
          <span className="meta text-gray-2">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 text-[17px] font-medium leading-snug">{s.title}</h3>
          <p className="mt-2 text-sm text-gray-2">{s.desc}</p>
        </Reveal>
      ))}
    </div>
  )
}

/* ---------- Partners grid ---------- */
export function PartnersGrid() {
  return (
    <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
      {partners.map((p, i) => (
        <Reveal key={p} delay={(i % 4) * 0.04} className="flex min-h-24 items-center bg-white p-6 text-[15px] leading-snug">{p}</Reveal>
      ))}
    </div>
  )
}

/* ---------- "Where to go next" — connects every page to the rest of the site ---------- */
const destinations = {
  courses: { k: 'Skill Development', t: 'Learn research step by step', to: '/courses' },
  consultancy: { k: 'Research Consultancy', t: 'Get one-to-one expert help', to: '/consultancy' },
  irb: { k: 'IRB Portal', t: 'Get ethical approval for your study', to: '/irb' },
  projects: { k: 'Collaborative Works', t: 'See research we have published', to: '/projects' },
  blog: { k: 'Blog', t: 'Read free articles on research', to: '/blog' },
  about: { k: 'About Us', t: 'Who we are and how we work', to: '/about' },
  contact: { k: 'Contact', t: 'Talk to our team', to: '/contact' },
}
export function NextSteps({ items, title = 'Where to go next' }) {
  return (
    <section className="bg-white-2 py-16 text-black sm:py-20">
      <div className="wrap">
        <Reveal><h2 className="headline text-2xl sm:text-3xl">{title}</h2></Reveal>
        <div className={`mt-8 grid gap-4 sm:grid-cols-2 ${items.length > 2 ? 'lg:grid-cols-3' : ''}`}>
          {items.map((key, i) => {
            const d = destinations[key]
            return (
              <Reveal key={key} delay={i * 0.06}>
                <Link to={d.to} className="group flex items-center justify-between gap-6 border border-black/10 bg-white p-6 transition-colors hover:border-black/30">
                  <div><p className="meta">{d.k}</p><p className="mt-2 text-lg font-medium">{d.t}</p></div>
                  <Arrow className="shrink-0 text-xl transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Help strip — same call to action at the end of every page ---------- */
export function HelpStrip({ title = 'Not sure where to start?', desc = 'Tell us about your research and we will point you to the right course or consultant.' }) {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <h2 className="headline text-2xl sm:text-3xl">{title}</h2>
          <p className="mt-3 text-gray">{desc}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center gap-6 lg:col-span-6 lg:justify-end">
          <Solid href={wa} target="_blank" rel="noreferrer">WhatsApp us</Solid>
          <Btn onDark href={`tel:${site.helpline}`}>Helpline {site.helpline}</Btn>
        </Reveal>
      </div>
    </section>
  )
}
