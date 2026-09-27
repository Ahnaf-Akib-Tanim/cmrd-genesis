import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const EASE = [0.16, 1, 0.3, 1]

/* Gentle fade-up on scroll */
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[1em] w-[1em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h17M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Action({ to, href, cls, children, ...rest }) {
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}

/* Primary: solid accent */
export function Solid({ children, className = '', ...rest }) {
  return (
    <Action cls={`group inline-flex items-center justify-center gap-3 bg-accent px-6 py-3.5 meta text-black transition-colors duration-300 hover:bg-black hover:text-white ${className}`} {...rest}>
      {children}<Arrow className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
    </Action>
  )
}

/* Secondary: circle-arrow text link. `onDark` for navy/black sections. */
export function Btn({ children, className = '', onDark = false, dark, ...rest }) {
  return (
    <Action cls={`group inline-flex items-center gap-3 meta ${onDark ? 'text-white' : 'text-black'} ${className}`} {...rest}>
      <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black ${onDark ? 'border-white/30' : 'border-black/25'}`}>
        <Arrow className="text-sm" />
      </span>
      <span className="ul">{children}</span>
    </Action>
  )
}

/* Section heading used on every page */
export function SectionHead({ sub, title, desc, action, onDark = false, center = false }) {
  return (
    <div className={`flex flex-wrap items-end gap-6 ${center ? 'justify-center text-center' : 'justify-between'}`}>
      <Reveal className={`max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {sub && <p className="meta text-accent">{sub}</p>}
        <h2 className="headline mt-3 text-3xl sm:text-4xl">{title}</h2>
        {desc && <p className={`mt-4 text-lg ${onDark ? 'text-gray' : 'text-gray-2'}`}>{desc}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  )
}

/* Light page header with breadcrumb — same feel as the home hero */
export function PageHeader({ crumb, sub, title, desc, image, children }) {
  return (
    <section className="light pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="wrap">
        <Reveal>
          <nav className="meta flex items-center gap-2 text-gray-2" aria-label="Breadcrumb">
            <Link to="/" className="ul">Home</Link><span>/</span><span className="text-black">{crumb}</span>
          </nav>
        </Reveal>
        <div className={`mt-10 grid gap-12 ${image ? 'lg:grid-cols-12 lg:items-center' : ''}`}>
          <div className={image ? 'lg:col-span-6' : 'max-w-3xl'}>
            {sub && <Reveal><p className="meta text-accent">{sub}</p></Reveal>}
            <Reveal delay={0.05}><h1 className="headline mt-4 text-4xl sm:text-5xl">{title}</h1></Reveal>
            {desc && <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-2">{desc}</p></Reveal>}
            {children && <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-6">{children}</Reveal>}
          </div>
          {image && (
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="img grade" style={{ aspectRatio: '16/10' }}><img src={image} alt="" /></div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/* Section wrapper that alternates backgrounds */
export function Section({ tone = 'light', id, className = '', children }) {
  const tones = { light: 'light', alt: 'bg-white-2 text-black', dark: 'bg-navy text-white' }
  return <section id={id} className={`${tones[tone]} py-20 sm:py-24 ${className}`}><div className="wrap">{children}</div></section>
}

/* Numbered steps row */
export function Steps({ items, onDark = false }) {
  return (
    <div className={`grid gap-px sm:grid-cols-2 ${items.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} ${onDark ? 'bg-white/10' : 'bg-black/10'}`}>
      {items.map(([t, d], i) => (
        <Reveal key={t} delay={i * 0.06} className={`h-full p-6 ${onDark ? 'bg-navy' : 'bg-white'}`}>
          <span className="meta text-accent">Step {i + 1}</span>
          <h3 className="mt-4 text-lg font-medium">{t}</h3>
          <p className={`mt-2 text-sm ${onDark ? 'text-gray' : 'text-gray-2'}`}>{d}</p>
        </Reveal>
      ))}
    </div>
  )
}

/* Form field (light) */
export function Field({ label, as = 'input', children, ...rest }) {
  const cls = 'mt-2 w-full border border-black/15 bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-gray-2/60 focus:border-black'
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {as === 'select' ? <select className={cls} {...rest}>{children}</select> : as === 'textarea' ? <textarea className={cls} {...rest} /> : <input className={cls} {...rest} />}
    </label>
  )
}
