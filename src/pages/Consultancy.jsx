import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site, specialties } from '../data/site'
import { images } from '../data/images'
import { EASE, Hero, Lines, Reveal, Btn, Solid, Meta, Kicker, ParallaxImg, RevealImg, ScrollWords, Statement } from '../components/ui'
import { Closing, Testimonials } from '../components/cards'

const services = [
  ['Protocol & synopsis', 'Research question, objectives, study design, sampling and ethics — to FCPS / MD / MS / MPH standards.'],
  ['Data management', 'Questionnaire design, entry templates, cleaning and coding in SPSS, Excel or REDCap.'],
  ['Statistical analysis', 'Descriptive to multivariable — with plain-language interpretation you can defend in a viva.'],
  ['Thesis support', 'Chapter-wise guidance, result tables, discussion drafting and viva preparation.'],
  ['Manuscript & publication', 'IMRaD formatting, journal selection, submission and reviewer-response support.'],
  ['Conference presentation', 'Abstract writing, poster and slide design for national and international meetings.'],
]
const steps = [
  ['Conversation', 'Share your topic, timeline and where you are stuck — by phone, WhatsApp or in person.'],
  ['Scope & fee', 'We agree deliverables and a fixed, transparent fee before any work starts.'],
  ['Working sessions', 'Your research physician demonstrates every step so you understand the analysis.'],
  ['Delivery', 'Receive your files. Supervisor or reviewer revisions are free — every round.'],
]
const faqs = [
  ['Who will actually work on my research?', 'A physician from our MPH research team, supervised by the mentor panel. You will know your consultant by name and work with them directly.'],
  ['How are fees decided?', 'Fees depend on scope and are quoted up front. CMRD is committed to the lowest service fees in the sector.'],
  ['What if my supervisor asks for changes?', 'Corrections to work we produced are always free — no matter how many rounds.'],
  ['Can I consult online?', 'Yes. Sessions run over Google Meet or Zoom with screen sharing. Offline sessions are available at our Dhaka centre.'],
  ['Do you write my thesis for me?', 'No. We teach, demonstrate, analyse and edit — authorship and intellectual ownership remain yours.'],
]
const testimonials = [
  { name: 'Dr. Nusrat Jahan', role: 'FCPS (Medicine) candidate, Dhaka Medical College', text: 'They explained my SPSS output line by line until I could defend every table in my thesis. The free corrections after my supervisor’s feedback were a lifesaver.' },
  { name: 'Dr. Tanvir Ahmed', role: 'Registrar, NICVD', text: 'From protocol to journal submission in four months. The mentor panel’s feedback on study design was sharper than anything I had received before.' },
  { name: 'Dr. Farzana Hossain', role: 'MPH student', text: 'The recorded sessions meant I could revise between night shifts. Affordable, professional, and genuinely patient teaching.' },
]

export default function Consultancy() {
  const [open, setOpen] = useState(0)
  const [sent, setSent] = useState(false)
  return (
    <>
      <Hero kicker="01 — Research consultancy" image={images.data} lines={['Expert', 'hands.', '*Your* work.']} desc="From protocol to publication, our MPH research physician team works one-to-one with you — at the lowest service fees, with free corrections." meta={[['Format', 'Online / offline'], ['Team', 'MPH physicians'], ['Corrections', 'Free']]}>
        <Btn href="#request">Request a consultation</Btn>
      </Hero>

      {/* services — light, two-column editorial */}
      <section className="light relative py-24 sm:py-32">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="wrap relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal><Kicker n="02">Services</Kicker></Reveal>
              <Lines as="h2" lines={['Everything', 'between an', 'idea and a', 'published', '*paper.*']} className="display mt-8 text-[clamp(2rem,4.68vw,5.04rem)]" />
              <Reveal delay={0.3} className="mt-12 w-3/4"><RevealImg src={images.desk} alt="" ratio="4/5" /></Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-40">
            {services.map(([t, d], i) => (
              <Reveal key={t} amount={0.5} className="group grid grid-cols-[3.5rem_1fr] gap-4 hairline py-8">
                <span className="meta pt-2 text-gray-2">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display-wide text-2xl transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl">{t}</h3>
                  <p className="mt-3 max-w-md text-gray-2">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* process — dark, numbers */}
      <section className="relative bg-navy py-24 text-white sm:py-32">
        <div className="wrap">
          <Reveal><Kicker n="03">How it works</Kicker></Reveal>
          <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1} className="bg-navy p-8 pt-10 lg:p-10">
                <div className="display text-[4rem] leading-[0.8] text-accent">{i + 1}</div>
                <h3 className="display-wide mt-10 text-2xl">{t}</h3>
                <p className="mt-4 text-gray">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Statement lines={['Free', 'corrections.', '*Always.*']} image={images.pipette} sub="Reviewer asked for changes? Revisions on our work never cost you anything." />

      {/* specialties — light typographic list */}
      <section className="light py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><Kicker n="04">Why CMRD</Kicker><h2 className="headline mt-6 text-2xl sm:text-3xl">Through which CMRD has earned your trust.</h2></Reveal></div>
          <div className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {specialties.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.08} className="hairline py-6">
                <div className="text-lg">{s.title}</div>
                <p className="mt-1 text-sm text-gray-2">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* FAQ + form — dark */}
      <section id="request" className="relative bg-navy py-24 text-white sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Kicker n="05">Questions</Kicker></Reveal>
            <div className="mt-10">
              {faqs.map(([q, a], i) => (
                <div key={q} className="hairline">
                  <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-start justify-between gap-6 py-6 text-left">
                    <span className="headline text-lg sm:text-xl">{q}</span><span className="display text-2xl leading-none text-accent">{open === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>{open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden"><p className="max-w-xl pb-6 text-gray">{a}</p></motion.div>}</AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <Meta accent>Request a consultation</Meta>
            {sent ? (
              <div className="mt-8"><div className="display text-4xl">Received.</div><p className="mt-4 text-gray">We reply within one working day. (Demo — the live site will create a ticket in your CMRD account.)</p></div>
            ) : (
              <form className="mt-8 grid gap-7" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <div className="grid gap-7 sm:grid-cols-2"><F label="Full name" placeholder="Dr. Your Name" /><F label="Phone / WhatsApp" placeholder="01XXX-XXXXXX" /></div>
                <F label="Email" type="email" placeholder="you@example.com" />
                <div><label className="meta text-gray">Service</label><select className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-white outline-none focus:border-accent">{services.map(([t]) => <option key={t} className="text-black">{t}</option>)}</select></div>
                <div><label className="meta text-gray">About your research</label><textarea rows={3} placeholder="Topic, degree, deadline, where you need help" className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent" /></div>
                <div className="flex flex-wrap items-center gap-6 pt-2"><Solid type="submit">Send request</Solid><span className="text-sm text-gray">or call {site.helpline}</span></div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <Closing light lines={['Prefer to', 'learn it', '*yourself?*']} primary={['Browse courses', '/courses']} />
    </>
  )
}

function F({ label, ...rest }) {
  return <div><label className="meta text-gray">{label}</label><input {...rest} className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent" /></div>
}
