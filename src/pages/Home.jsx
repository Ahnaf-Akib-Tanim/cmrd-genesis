import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { site, partners } from '../data/site'
import { courses } from '../data/courses'
import { projects } from '../data/projects'
import { posts } from '../data/posts'
import { images } from '../data/images'
import { EASE, Lines, Reveal, ScrollWords, ParallaxImg, RevealImg, Btn, Solid, Arrow, Meta, Kicker, Marquee, Statement, Horizontal, CountUp } from '../components/ui'
import Particles from '../components/Particles'

const areas = [
  { n: '01', t: 'Research Methodology', s: 'Training', d: 'Study design, sampling, protocol writing and ethics — taught by physicians in small cohorts, online and at Hatirpool.', img: images.classroom, to: '/courses' },
  { n: '02', t: 'Data & Analysis', s: 'Consultancy', d: 'One-to-one statistical analysis and interpretation with our MPH research physician team. Corrections are always free.', img: images.data, to: '/consultancy' },
  { n: '03', t: 'Collaborative Research', s: 'Publications', d: 'Studies designed and published with partner medical colleges and hospitals across Bangladesh.', img: images.field, to: '/projects' },
  { n: '04', t: 'Ethical Review', s: 'IRB Portal', d: 'Independent Institutional Review Board with online submission, transparent tracking and verifiable approval letters.', img: images.notebook, to: '/irb' },
  { n: '05', t: 'Insights', s: 'Blog', d: 'Short explainers on statistics and methodology, in Bangla and English, from the people who teach it.', img: images.library, to: '/blog' },
]

const irbSteps = [
  ['Register', 'Create a CMRD account and complete your researcher profile.'],
  ['Submit protocol', 'Fill in the application form and upload the required documents.'],
  ['Ethical review', 'Independent reviewers evaluate the protocol for compliance.'],
  ['Decision', 'Approval, revision request or chairperson decision — with reasons.'],
  ['Approval letter', 'Download an official letter anyone can verify online.'],
]

export default function Home() {
  return (
    <>
      <HomeHero />
      <Mission />
      <BigWord />
      <FullImage />
      <DataStory />
      <WhatWeDo />
      <Research />
      <Statement lines={['Evidence', 'changes', '*decisions.*']} image={images.field} sub="CMRD — research for public health in Bangladesh" />
      <IRB />
      <Training />
      <Insights />
      <section className="bg-black py-10 hairline hairline-b"><Marquee items={partners} /></section>
    </>
  )
}

/* ================= HERO ================= */
function HomeHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-black">
      {/* image, right-anchored, masked */}
      <motion.div style={{ y: imgY }} className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <motion.img initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 3, ease: EASE }} src={images.hero} alt="" className="h-full w-full object-cover" style={{ filter: 'contrast(1.12) saturate(.55) brightness(.85)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent lg:via-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>
      <Particles className="opacity-70" density={0.8} />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <motion.div style={{ y: textY, opacity: fade }} className="wrap relative flex h-full flex-col justify-between pb-8 pt-24 sm:pt-28">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="flex items-center justify-between">
          <Meta>{site.tagline}</Meta>
          <Meta className="hidden md:flex">Dhaka, Bangladesh — est. {site.established}</Meta>
        </motion.div>

        <div>
          <Lines inView={false} delay={0.5} lines={['Research', 'that', 'changes', 'what we', '*know.*']} className="display text-[min(9.72vw,10.4vh)] sm:text-[min(9.72vw,11.2vh)]" />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="grid items-end gap-6 md:grid-cols-12">
          <p className="max-w-md text-base leading-relaxed text-white/70 md:col-span-5 md:text-base">A research institute for healthcare professionals — training, physician-led consultancy and independent ethical review, under one roof in Dhaka.</p>
          <div className="meta flex flex-wrap gap-x-6 gap-y-2 text-white/60 md:col-span-4">
            <span>Research</span><span>Training</span><span>Consultancy</span><span>IRB</span>
          </div>
          <div className="meta flex items-center gap-3 md:col-span-3 md:justify-end">
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><Arrow dir="down" /></motion.span> Scroll
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ================= MISSION ================= */
function Mission() {
  return (
    <section className="light relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-3"><Kicker n="01">Mission</Kicker></Reveal>
        <div className="lg:col-span-9">
          <ScrollWords className="headline text-[clamp(1.7rem,4.32vw,4.46rem)]" text="We believe better research leads to *better* health. Most clinicians are never taught research — they are simply expected to produce it. Since 2016 we have taught the methods openly, charged as little as we can, and refused to write anyone’s thesis for them." />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:ml-[25%]">
            <Reveal><p className="text-lg leading-relaxed text-gray-2">A study you understand is the only kind worth publishing. That principle shapes every course, every consultation and every ethical review we run.</p></Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-6"><Btn dark to="/about">Our story</Btn><Btn dark to="/consultancy">Work with us</Btn></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= BIG WORD — letter-spacing driven by scroll ================= */
function BigWord() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ls = useTransform(scrollYProgress, [0, 0.5, 1], ['-0.05em', '0.12em', '-0.05em'])
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  return (
    <section ref={ref} className="light overflow-hidden py-10">
      <motion.div style={{ letterSpacing: ls, x }} className="display-narrow whitespace-nowrap text-center text-[clamp(3.6rem,15.1vw,17.3rem)] text-black">RESEARCH</motion.div>
    </section>
  )
}

/* ================= FULL IMAGE ================= */
function FullImage() {
  return (
    <section className="light relative pb-24 sm:pb-32">
      <ParallaxImg src={images.classroom} alt="A CMRD training session" className="h-[60svh] lg:h-[90svh]" speed={0.12} />
      <div className="wrap grid gap-12 pt-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-6">
          <Reveal><Meta className="text-gray-2">Hatirpool, Dhaka</Meta></Reveal>
          <Reveal delay={0.1}><p className="headline mt-6 max-w-lg text-xl text-black sm:text-2xl lg:text-[1.9rem]">Small cohorts. Physicians as faculty. Every session recorded, every certificate verifiable.</p></Reveal>
          <Reveal delay={0.2}><p className="mt-6 max-w-md text-gray-2">Our training rooms sit a few minutes from Dhaka Medical College — but most of our cohort joins from wards, clinics and district hospitals across the country.</p></Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <RevealImg src={images.pipette} alt="Reviewing a manuscript" ratio="4/5" from="left" />
          <Meta className="mt-4 text-gray-2">Fig. — manuscript review, illustrative</Meta>
        </div>
      </div>
    </section>
  )
}

/* ================= DATA STORY ================= */
function DataStory() {
  const rows = [
    { v: 10, suffix: '', big: 'Years', small: 'Teaching health-science research since 2016', vis: <Timeline /> },
    { v: partners.length, suffix: '', big: 'Partners', small: 'Medical colleges and hospitals we publish with', vis: <Network n={partners.length} /> },
    { v: 27, suffix: '', big: 'Insights', small: 'Articles on statistics and methodology', vis: <Dots n={27} /> },
    { v: 3, suffix: '', big: 'Pillars', small: 'Training · Consultancy · Ethical review', vis: <Bars /> },
  ]
  return (
    <section className="relative bg-navy py-24 text-white sm:py-32">
      <div className="absolute inset-0 grid-bg" />
      <div className="wrap relative">
        <Reveal><Kicker n="02">CMRD in numbers</Kicker></Reveal>
        <div className="mt-16">
          {rows.map((r, i) => (
            <Reveal key={r.big} amount={0.4} className="grid items-center gap-8 hairline py-12 lg:grid-cols-12 lg:py-16">
              <div className="flex items-baseline gap-6 lg:col-span-6">
                <span className="display text-[clamp(3.6rem,10.1vw,10.8rem)] leading-[0.8] tabular-nums"><CountUp value={r.v} suffix={r.suffix} /></span>
                <span className="display-narrow text-[clamp(1.2rem,2.52vw,2.52rem)] text-accent">{r.big}</span>
              </div>
              <p className="max-w-xs text-gray lg:col-span-2">{r.small}</p>
              <div className="h-24 lg:col-span-4 lg:h-32">{r.vis}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
function Timeline() {
  const years = Array.from({ length: 11 }, (_, i) => 2016 + i)
  return (
    <svg viewBox="0 0 400 100" className="h-full w-full" fill="none">
      <motion.line x1="10" x2="390" y1="50" y2="50" stroke="#f3f1ec" strokeOpacity=".5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: EASE }} />
      {years.map((y, i) => (
        <motion.g key={y} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}>
          <line x1={10 + i * 38} x2={10 + i * 38} y1={i % 5 === 0 ? 36 : 44} y2={i % 5 === 0 ? 64 : 56} stroke={i === 10 ? '#ff5a1f' : '#f3f1ec'} strokeOpacity={i === 10 ? 1 : .6} />
          {i % 5 === 0 && <text x={10 + i * 38} y="84" textAnchor={i === 10 ? 'end' : i === 0 ? 'start' : 'middle'} fontFamily="JetBrains Mono" fontSize="9" fill="#9aa0a8">{y}</text>}
        </motion.g>
      ))}
    </svg>
  )
}
function Network({ n }) {
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [200 + Math.cos(a) * 150, 50 + Math.sin(a) * 38] })
  return (
    <svg viewBox="0 0 400 100" className="h-full w-full" fill="none">
      {pts.map(([x, y], i) => <motion.line key={i} x1="200" y1="50" x2={x} y2={y} stroke="#f3f1ec" strokeOpacity=".35" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1, ease: EASE }} />)}
      {pts.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="3" fill="#f3f1ec" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} style={{ transformOrigin: `${x}px ${y}px` }} />)}
      <circle cx="200" cy="50" r="5" fill="#ff5a1f" />
    </svg>
  )
}
function Dots({ n }) {
  return (
    <div className="grid h-full grid-cols-9 gap-2 content-center">
      {Array.from({ length: n }, (_, i) => <motion.span key={i} className="h-2.5 w-2.5 rounded-full bg-white/80" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }} />)}
    </div>
  )
}
function Bars() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[['Training', 100], ['Consultancy', 78], ['Ethical review', 56]].map(([l, w], i) => (
        <div key={l} className="flex items-center gap-4">
          <span className="meta w-28 text-gray">{l}</span>
          <div className="h-px flex-1 bg-white/10"><motion.div className={`h-full ${i === 0 ? 'bg-accent' : 'bg-white/70'}`} initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.15, ease: EASE }} /></div>
        </div>
      ))}
    </div>
  )
}

/* ================= WHAT WE DO — horizontal ================= */
function WhatWeDo() {
  return (
    <>
      <Horizontal count={areas.length + 1} className="light">
        <div className="flex h-full w-screen shrink-0 items-center px-14">
          <div>
            <Kicker n="03" className="text-black">What we do</Kicker>
            <h2 className="display mt-8 text-[clamp(2.9rem,6.48vw,7.2rem)] text-black">Five<br />ways to<br />work<br />with us</h2>
            <p className="meta mt-10 flex items-center gap-3 text-gray-2"><Arrow /> Keep scrolling</p>
          </div>
        </div>
        {areas.map((a) => (
          <div key={a.n} className="relative flex h-full w-screen shrink-0 items-center border-l border-black/10 px-14">
            <div className="grid w-full grid-cols-12 items-center gap-8">
              <div className="col-span-5">
                <Meta className="text-accent">{a.n} — {a.s}</Meta>
                <h3 className="display mt-6 text-[clamp(1.9rem,3.17vw,3.6rem)] text-black">{a.t}</h3>
                <p className="mt-8 max-w-md text-lg text-gray-2">{a.d}</p>
                <Btn dark to={a.to} className="mt-10">Explore</Btn>
              </div>
              <div className="col-span-6 col-start-7 h-[70vh]">
                <div data-cursor="view" className="img grade h-full"><img src={a.img} alt="" /></div>
              </div>
            </div>
          </div>
        ))}
      </Horizontal>

      {/* mobile / tablet fallback */}
      <section className="light py-24 lg:hidden">
        <div className="wrap">
          <Kicker n="03">What we do</Kicker>
          <h2 className="display mt-6 text-[clamp(2.2rem,9.36vw,4.32rem)]">Five ways to work with us</h2>
        </div>
        <div className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {areas.map((a) => (
            <Link key={a.n} to={a.to} className="w-[80vw] shrink-0 snap-start sm:w-[55vw]">
              <div className="img grade" style={{ aspectRatio: '4/5' }}><img src={a.img} alt="" /></div>
              <Meta className="mt-5 text-accent">{a.n} — {a.s}</Meta>
              <h3 className="display mt-2 text-3xl">{a.t}</h3>
              <p className="mt-3 text-gray-2">{a.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* ================= RESEARCH — editorial ================= */
function Research() {
  const [f, ...rest] = projects
  return (
    <section className="relative bg-black py-24 text-white sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><Kicker n="04">Research</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.76vw,6.48rem)]">Featured<br />research</h2></Reveal>
          <Reveal delay={0.1}><Btn to="/projects">All publications</Btn></Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Link to="/projects" className="group lg:col-span-8" data-cursor="view">
            <RevealImg src={images.field} alt={f.title} ratio="16/10" cursor="view" />
            <div className="mt-6 grid gap-4 lg:grid-cols-8">
              <Meta className="text-gray lg:col-span-2">{f.date} · {f.partner}</Meta>
              <h3 className="headline text-xl sm:text-2xl lg:col-span-6"><span className="ul">{f.title}</span></h3>
            </div>
            <p className="mt-4 max-w-2xl text-gray lg:ml-[25%]">{f.summary}</p>
          </Link>
          <div className="flex flex-col gap-14 lg:col-span-4 lg:pt-32">
            {rest.slice(0, 2).map((p, i) => (
              <Link key={p.id} to="/projects" className="group" data-cursor="view">
                <RevealImg src={i === 0 ? images.hospital : images.doctorTablet} alt={p.title} ratio="4/3" />
                <Meta className="mt-5 text-gray">{p.date} · {p.status}</Meta>
                <h3 className="headline mt-2 text-xl"><span className="ul">{p.title}</span></h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= IRB — interactive ================= */
function IRB() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => { if (!auto) return; const t = setInterval(() => setStep((s) => (s + 1) % irbSteps.length), 2800); return () => clearInterval(t) }, [auto])
  return (
    <section className="relative bg-navy py-24 text-white sm:py-32" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      <Particles className="opacity-30" density={0.5} link={100} />
      <div className="wrap relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Kicker n="05">Institutional Review Board</Kicker></Reveal>
          <Lines as="h2" lines={['Ethics,', 'made', '*visible.*']} className="display mt-6 text-[clamp(2.2rem,5.76vw,5.76rem)]" />
          <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg text-gray">Independent ethical review for human-subjects research — submit, track and verify, entirely online.</p><Btn to="/irb" className="mt-10">Open the IRB portal</Btn></Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/10" />
            <motion.div className="absolute left-[27px] top-0 w-px bg-accent" animate={{ height: `${(step / (irbSteps.length - 1)) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
            {irbSteps.map(([t, d], i) => (
              <button key={t} onMouseEnter={() => setStep(i)} onClick={() => setStep(i)} className="group relative flex w-full items-start gap-8 py-5 text-left">
                <span className={`display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-500 ${step >= i ? 'border-accent bg-navy text-accent' : 'border-white/20 bg-navy text-white/40'}`}>0{i + 1}</span>
                <div className="pt-3">
                  <div className={`display text-2xl transition-colors duration-500 sm:text-3xl ${step === i ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}>{t}</div>
                  <AnimatePresence initial={false}>
                    {step === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-sm overflow-hidden text-gray"><span className="block pt-3">{d}</span></motion.p>}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 hairline pt-6">
            <span className="meta text-gray">Status</span>
            <AnimatePresence mode="wait"><motion.span key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="meta text-accent">{['Awaiting profile', 'Documents received', 'Under review', 'Decision issued', 'Approved · verifiable'][step]}</motion.span></AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= TRAINING — typographic list with floating image ================= */
function Training() {
  const list = courses.filter((c) => c.status !== 'free').slice(0, 4)
  const [hov, setHov] = useState(-1)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 20 }), sy = useSpring(y, { stiffness: 120, damping: 20 })
  const imgs = [images.classroom, images.data, images.desk, images.library]
  const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  return (
    <section className="light relative py-24 sm:py-32" onMouseMove={(e) => { x.set(e.clientX); y.set(e.clientY) }}>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><Kicker n="06">Training</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.76vw,6.48rem)]">Learn the<br />method</h2></Reveal>
          <Reveal delay={0.1}><Btn dark to="/courses">All courses</Btn></Reveal>
        </div>
        <div className="mt-16">
          {list.map((c, i) => (
            <Link key={c.id} to="/courses" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} className="group grid items-center gap-x-8 gap-y-3 hairline py-8 transition-colors duration-500 lg:grid-cols-12 lg:py-10">
              <span className="meta text-gray-2 lg:col-span-1">0{i + 1}</span>
              <span className="display-wide text-[clamp(1.3rem,3.02vw,3.24rem)] transition-transform duration-700 group-hover:translate-x-3 lg:col-span-7">{c.title}</span>
              <span className="meta text-gray-2 lg:col-span-3">{c.duration} · {c.mode} · {c.status === 'free' ? 'Free' : `Starts ${fmt(c.start)}`}</span>
              <span className="hidden justify-end lg:col-span-1 lg:flex"><Arrow className="text-2xl transition-transform duration-500 group-hover:translate-x-2" /></span>
            </Link>
          ))}
          <div className="hairline" />
        </div>
      </div>
      {/* floating preview */}
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block">
        <AnimatePresence>
          {hov >= 0 && (
            <motion.div key={hov} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: EASE }} className="img grade -ml-32 -mt-44 h-72 w-64">
              <img src={imgs[hov]} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

/* ================= INSIGHTS ================= */
function Insights() {
  const [first, ...rest] = posts
  const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  return (
    <section className="relative bg-white-2 py-32 text-black sm:py-44">
      <div className="wrap">
        <Reveal><Kicker n="07">Insights</Kicker></Reveal>
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <a href="#" className="group lg:col-span-7">
            <RevealImg src={images.notebook} alt="" ratio="16/9" />
            <Meta className="mt-6 text-gray-2">{fmt(first.date)} · {first.category}</Meta>
            <h3 className="headline bengali mt-3 text-3xl sm:text-4xl"><span className="ul">{first.title}</span></h3>
            <p className="bengali mt-4 max-w-xl text-gray-2">{first.excerpt}</p>
          </a>
          <div className="lg:col-span-4 lg:col-start-9">
            {rest.slice(0, 5).map((p) => (
              <a key={p.id} href="#" className="group block hairline py-6 first:border-t-0">
                <Meta className="text-gray-2">{fmt(p.date)} · {p.category}</Meta>
                <h4 className="bengali mt-2 text-lg font-medium leading-snug"><span className="ul">{p.title}</span></h4>
              </a>
            ))}
            <Btn dark to="/blog" className="mt-8">All articles</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Solid }
