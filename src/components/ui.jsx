import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export const EASE = [0.16, 1, 0.3, 1]

/* ---------- reveals ---------- */
export function Reveal({ children, delay = 0, y = 30, className = '', once = true, amount = 0.2 }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, amount }} transition={{ duration: 1, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  )
}

/* Line-by-line display type. `lines` = array of strings; accent word wrapped in *stars*. */
export function Lines({ lines, className = '', delay = 0, stagger = 0.1, inView = true, as = 'h1' }) {
  const Tag = motion[as] || motion.h1
  const anim = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.3 } } : { animate: 'show' }
  return (
    <Tag className={className} initial="hidden" {...anim} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span className="block" variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1.1, ease: EASE } } }}>
            {l.split(/(\*[^*]+\*)/).map((p, j) => p.startsWith('*') ? <em key={j} className="not-italic text-accent">{p.slice(1, -1)}</em> : p)}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 2200, bounce: 0 })
  const [d, setD] = useState(0)
  useEffect(() => { if (inView) mv.set(value) }, [inView, value, mv])
  useEffect(() => spring.on('change', (v) => setD(Math.round(v))), [spring])
  return <span ref={ref} className={className}>{d.toLocaleString()}{suffix}</span>
}

/* Words brighten as you scroll through */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <W key={i} p={scrollYProgress} r={[i / words.length, (i + 1) / words.length]} accent={w.startsWith('*')}>{w.replace(/\*/g, '')}</W>)}
    </p>
  )
}
function W({ children, p, r, accent }) {
  const opacity = useTransform(p, r, [0.15, 1])
  return <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? 'text-accent' : ''}`}>{children}</motion.span>
}

/* ---------- parallax image ---------- */
export function ParallaxImg({ src, alt = '', className = '', speed = 0.15, scale = 1.15, ratio, grade = true, cursor = 'view' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])
  return (
    <div ref={ref} data-cursor={cursor} className={`img ${grade ? 'grade' : ''} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <motion.img src={src} alt={alt} style={{ y, scale }} className="absolute inset-0" />
    </div>
  )
}

/* Image reveals via clip + scale */
export function RevealImg({ src, alt = '', className = '', ratio = '4/5', grade = true, from = 'bottom', cursor = 'view' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const clips = { bottom: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'], left: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'], top: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] }
  return (
    <div ref={ref} data-cursor={cursor} className={className}>
      <motion.div initial={false} animate={{ clipPath: inView ? clips[from][1] : clips[from][0] }} transition={{ duration: 1.4, ease: EASE }} className={`img ${grade ? 'grade' : ''}`} style={{ aspectRatio: ratio }}>
        <motion.img src={src} alt={alt} initial={false} animate={{ scale: inView ? 1 : 1.25 }} transition={{ duration: 1.6, ease: EASE }} />
      </motion.div>
    </div>
  )
}

/* ---------- controls ---------- */
export function Arrow({ className = '', dir = 'right' }) {
  const rot = { right: 0, down: 90, up: -90, upright: -45 }[dir]
  return (
    <svg viewBox="0 0 24 24" className={`h-[1em] w-[1em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.25" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M3 12h17M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Btn({ to, href, children, className = '', dark = false, ...rest }) {
  const cls = `group inline-flex items-center gap-4 meta transition-colors duration-500 ${dark ? 'text-black' : 'text-white'} ${className}`
  const inner = (
    <>
      <span className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 group-hover:bg-accent group-hover:border-accent group-hover:text-black ${dark ? 'border-black/30' : 'border-white/30'}`}>
        <Arrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
      <span className="ul">{children}</span>
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

export function Solid({ to, href, children, className = '', ...rest }) {
  const cls = `group inline-flex items-center gap-3 bg-accent px-7 py-4 meta text-black transition-all duration-500 hover:bg-white ${className}`
  const inner = <>{children}<Arrow className="text-sm transition-transform duration-500 group-hover:translate-x-1" /></>
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

export function Meta({ children, className = '', accent = false }) {
  return <div className={`meta flex items-center gap-3 ${accent ? 'text-accent' : ''} ${className}`}>{children}</div>
}

/* ---------- ticker ---------- */
export function Marquee({ items, className = '' }) {
  const list = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {list.map((t, i) => (
          <span key={i} className="display-wide flex items-center gap-10 pr-10 text-[clamp(1.4rem,3.6vw,3.24rem)] opacity-90">
            {t}<span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- full-screen pinned statement ---------- */
export function Statement({ lines, image, className = '', sub }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.8], ['12%', '-12%'])
  return (
    <section ref={ref} className={`relative h-[140svh] ${className}`}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-black">
        {image && (
          <motion.div style={{ scale }} className="absolute inset-0">
            <img src={image} alt="" className="h-full w-full object-cover opacity-60" style={{ filter: 'contrast(1.1) saturate(.6)' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
          </motion.div>
        )}
        <motion.div style={{ opacity, y }} className="relative px-6 text-center">
          <Lines as="p" lines={lines} className="display text-[clamp(2.3rem,7.92vw,8.64rem)]" stagger={0.12} />
          {sub && <p className="meta mt-8 text-gray">{sub}</p>}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- horizontal scroll (vertical scroll drives x) ---------- */
export function Horizontal({ children, count, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(count - 1) * 100}vw`])
  return (
    <section ref={ref} className={`relative hidden lg:block ${className}`} style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">{children}</motion.div>
      </div>
    </section>
  )
}

/* ---------- inner page hero ---------- */
export function Hero({ kicker, lines, image, desc, meta = [], children, big = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-black">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }} src={image} alt="" className="h-full w-full object-cover opacity-50" style={{ filter: 'contrast(1.1) saturate(.65)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </motion.div>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div style={{ y: textY, opacity: op }} className="wrap relative flex min-h-[100svh] flex-col justify-end pb-14 pt-40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}><Meta accent>{kicker}</Meta></motion.div>
        <Lines lines={lines} inView={false} delay={0.4} className={`display mt-6 ${big ? 'text-[min(9.36vw,11.5vh)]' : 'text-[min(7.2vw,9.36vh)]'}`} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {desc && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease: EASE }} className="max-w-xl text-base leading-relaxed text-white/75 lg:col-span-6 lg:text-lg">{desc}</motion.p>}
          {(meta.length > 0 || children) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
              {meta.length > 0 && (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {meta.map(([k, v]) => <div key={k}><dt className="meta text-gray">{k}</dt><dd className="mt-1 text-sm text-white">{v}</dd></div>)}
                </dl>
              )}
              {children && <div className="flex flex-wrap gap-8">{children}</div>}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

/* Section label with rule */
export function Kicker({ n, children, className = '' }) {
  return (
    <div className={`meta flex items-center gap-4 ${className}`}>
      {n && <span className="text-accent">{n}</span>}
      <span className="h-px w-10 bg-current opacity-30" />
      <span className="opacity-70">{children}</span>
    </div>
  )
}
