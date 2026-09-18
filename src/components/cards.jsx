import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE, Arrow, Meta, Btn, RevealImg, Kicker, Reveal, Lines } from './ui'
import { site } from '../data/site'

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

/* ---------- Course row — big typographic ---------- */
export function CourseRow({ c, index, light = true }) {
  return (
    <Link to="/join?mode=register" className="group grid items-center gap-x-8 gap-y-3 hairline py-8 lg:grid-cols-12 lg:py-10">
      <span className={`meta lg:col-span-1 ${light ? 'text-gray-2' : 'text-gray'}`}>{String(index + 1).padStart(2, '0')}</span>
      <div className="lg:col-span-6">
        <div className="display-wide text-[clamp(1.2rem,2.59vw,2.59rem)] transition-transform duration-700 group-hover:translate-x-3">{c.title}</div>
        <div className={`mt-2 text-sm ${light ? 'text-gray-2' : 'text-gray'}`}>{c.subtitle}</div>
      </div>
      <div className={`meta lg:col-span-2 ${light ? 'text-gray-2' : 'text-gray'}`}>{fmt(c.start)}<br />{c.duration} · {c.sessions} sessions</div>
      <div className="meta lg:col-span-2"><span className={c.status === 'free' ? 'text-accent' : ''}>{c.status}</span><br /><span className={light ? 'text-gray-2' : 'text-gray'}>{c.mode} · {c.level}</span></div>
      <div className="flex items-center justify-between lg:col-span-1 lg:justify-end lg:gap-4">
        <span className="headline text-xl">{c.fee === 0 ? 'Free' : `৳${c.fee.toLocaleString()}`}</span>
        <Arrow className="text-xl transition-transform duration-500 group-hover:translate-x-2" />
      </div>
    </Link>
  )
}

/* ---------- Project — expandable editorial entry ---------- */
export function ProjectEntry({ p, index, image }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <article className="hairline">
      <button onClick={() => setOpen((o) => !o)} className="group grid w-full gap-x-8 gap-y-4 py-10 text-left lg:grid-cols-12">
        <span className="meta text-gray lg:col-span-1">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="headline text-2xl transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl lg:col-span-7 lg:text-4xl">{p.title}</h3>
        <div className="meta text-gray lg:col-span-3">{p.type}<br />{p.partner}<br />{p.date}</div>
        <div className="flex items-start justify-between lg:col-span-1 lg:justify-end">
          <span className={`meta ${p.status === 'Published' ? 'text-accent' : 'text-gray'}`}>{p.status}</span>
          <span className="display ml-6 text-2xl leading-none">{open ? '−' : '+'}</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="overflow-hidden">
            <div className="grid gap-10 pb-14 lg:grid-cols-12">
              {image && <div className="lg:col-span-5 lg:col-start-2"><RevealImg src={image} alt="" ratio="16/10" /></div>}
              <div className="lg:col-span-4 lg:col-start-8">
                <Meta className="text-gray">Key finding</Meta>
                <div className="display mt-3 text-3xl text-accent sm:text-4xl">{p.highlight}</div>
                <p className="mt-6 text-lg leading-relaxed text-gray">{p.summary}</p>
                <div className="meta mt-6 flex flex-wrap gap-x-4 gap-y-1 text-gray">{p.tags.map((t) => <span key={t}>#{t.replace(/\s+/g, '')}</span>)}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

/* ---------- Blog row ---------- */
export function PostRow({ post, index }) {
  return (
    <a href="#" className="group grid gap-x-8 gap-y-2 hairline py-8 lg:grid-cols-12">
      <div className="meta text-gray-2 lg:col-span-2">{fmt(post.date)}<br />{post.read} min · {post.lang === 'bn' ? 'বাংলা' : 'English'}</div>
      <div className="lg:col-span-7">
        <h3 className="bengali headline text-2xl transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl">{post.title}</h3>
        <p className="bengali mt-3 max-w-xl text-gray-2">{post.excerpt}</p>
      </div>
      <div className="flex items-start justify-between lg:col-span-3 lg:justify-end lg:gap-8">
        <span className="meta text-gray-2">{post.category}</span>
        <Arrow dir="upright" className="text-xl transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </a>
  )
}

/* ---------- Testimonials ---------- */
export function Testimonials({ items }) {
  const [i, setI] = useState(0)
  const t = items[i]
  return (
    <section className="relative bg-black py-24 text-white sm:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-2"><Kicker>Voices</Kicker></div>
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: EASE }} className="headline text-2xl sm:text-3xl lg:text-[2.6rem]">“{t.text}”</motion.blockquote>
          </AnimatePresence>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <div><div className="text-base">{t.name}</div><div className="text-sm text-gray">{t.role}</div></div>
            <div className="meta flex items-center gap-6">
              <button onClick={() => setI((i - 1 + items.length) % items.length)} className="ul">Prev</button>
              <span className="text-gray">{i + 1} / {items.length}</span>
              <button onClick={() => setI((i + 1) % items.length)} className="ul">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Closing statement ---------- */
export function Closing({ lines = ['Start your', 'research', '*here.*'], primary = ['Join us — it’s free', '/join?mode=register'], secondary = ['Talk on WhatsApp', `https://wa.me/${site.whatsapp.replace('+', '')}`], light = false }) {
  return (
    <section className={`${light ? 'light' : 'bg-black text-white'} py-24 sm:py-32`}>
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8"><Lines as="h2" lines={lines} className="display text-[clamp(2.4rem,7.2vw,7.92rem)]" /></div>
        <Reveal delay={0.2} className="flex flex-col justify-end gap-6 lg:col-span-4">
          <Btn dark={light} to={primary[1]}>{primary[0]}</Btn>
          <a href={secondary[1]} target="_blank" rel="noreferrer" className="ul meta w-fit">{secondary[0]}</a>
          <p className={`text-sm ${light ? 'text-gray-2' : 'text-gray'}`}>{site.helpline} · {site.email}</p>
        </Reveal>
      </div>
    </section>
  )
}
