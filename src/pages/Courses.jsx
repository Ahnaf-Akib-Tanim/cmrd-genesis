import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { courses } from '../data/courses'
import { images } from '../data/images'
import { EASE, Hero, Lines, Reveal, Btn, Meta, Kicker, RevealImg, ParallaxImg, Statement } from '../components/ui'
import { CourseRow, Closing } from '../components/cards'

const tabs = [['upcoming', 'Upcoming'], ['ongoing', 'Ongoing'], ['free', 'Free'], ['all', 'All']]
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export default function Courses() {
  const [tab, setTab] = useState('upcoming')
  const [q, setQ] = useState('')
  const featured = courses.find((c) => c.status === 'upcoming')
  const list = useMemo(() => courses.filter((c) => (tab === 'all' || c.status === tab) && (q === '' || (c.title + c.tags.join(' ')).toLowerCase().includes(q.toLowerCase()))), [tab, q])

  return (
    <>
      <Hero kicker="02 — Skill development" image={images.classroom} lines={['Learn', 'the', '*method.*']} big desc="Structured courses in research methodology, biostatistics and scientific writing — taught by physicians, with recorded sessions and certificates on completion." meta={[['Formats', 'Online · Offline · Hybrid'], ['Recordings', 'Lifetime access'], ['Certificate', 'On completion']]}>
        <Btn href="#catalogue">Browse the catalogue</Btn>
      </Hero>

      {/* featured — light, asymmetric */}
      {featured && (
        <section className="light relative py-24 sm:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7"><RevealImg src={images.meeting} alt={featured.title} ratio="4/3" from="left" /></div>
            <div className="flex flex-col justify-end lg:col-span-5 lg:pb-10">
              <Reveal><Meta accent>Featured — {featured.status} · {featured.mode}</Meta></Reveal>
              <Lines as="h2" lines={featured.title.split(' ').reduce((a, w, i) => { i % 2 === 0 ? a.push(w) : (a[a.length - 1] += ' ' + w); return a }, [])} className="display mt-6 text-[clamp(1.9rem,3.96vw,3.96rem)]" />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-md text-lg text-gray-2">{featured.subtitle}. Small cohort, weekly live sessions with recordings, assignments reviewed by faculty.</p>
                <dl className="mt-10 grid grid-cols-3 gap-6 hairline pt-6">
                  {[['Starts', fmt(featured.start)], ['Duration', featured.duration], ['Fee', `৳${featured.fee.toLocaleString()}`]].map(([k, v]) => <div key={k}><dt className="meta text-gray-2">{k}</dt><dd className="headline mt-2 text-xl">{v}</dd></div>)}
                </dl>
                <Btn dark to="/join?mode=register" className="mt-10">Enrol now</Btn>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* catalogue — light typographic table */}
      <section id="catalogue" className="light pb-32 sm:pb-44">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal><Kicker n="03">Catalogue</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.76vw,6.48rem)]">Courses</h2></Reveal>
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="meta flex gap-6">
                {tabs.map(([k, l]) => (
                  <button key={k} onClick={() => setTab(k)} className={`relative pb-1 ${tab === k ? 'text-black' : 'text-gray-2 hover:text-black'}`}>
                    {l} <span className="opacity-50">{k === 'all' ? courses.length : courses.filter((c) => c.status === k).length}</span>
                    {tab === k && <motion.span layoutId="ctab" className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
                  </button>
                ))}
              </div>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="border-b border-black/30 bg-transparent py-1 text-sm outline-none placeholder:text-gray-2 focus:border-black sm:ml-6 sm:w-40" />
            </Reveal>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab + q} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-14">
              {list.length ? list.map((c, i) => <CourseRow key={c.id} c={c} index={i} />) : <div className="py-24"><div className="display text-4xl">No {tab === 'all' ? '' : tab} courses available.</div><p className="mt-3 text-gray-2">Check back soon or follow our Facebook page.</p></div>}
              <div className="hairline" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Statement lines={['Recorded.', 'Certified.', '*Yours.*']} image={images.library} sub="Every session recorded · every certificate verifiable" />
      <Closing lines={['Not sure', 'which', '*fits?*']} primary={['Talk to an advisor', '/consultancy#request']} />
    </>
  )
}
