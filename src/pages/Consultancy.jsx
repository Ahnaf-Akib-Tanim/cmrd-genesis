import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/site'
import { images } from '../data/images'
import { EASE, Reveal, Solid, Btn, SectionHead, Section, PageHeader, Steps, Field } from '../components/ui'
import { SpecialtiesGrid, NextSteps } from '../components/cards'

const services = [
  ['Protocol & synopsis development', 'Choosing your research question, objectives, study design, sample size and ethical considerations — written to FCPS / MD / MS / MPH standards.'],
  ['Questionnaire & data management', 'Designing your data collection sheet, setting up data entry, and cleaning and coding your data in SPSS or Excel.'],
  ['Statistical analysis', 'The right tests for your data — from simple descriptive tables to regression — explained in plain language so you can defend them.'],
  ['Thesis & dissertation support', 'Chapter-by-chapter guidance, result tables, discussion writing and viva preparation.'],
  ['Manuscript & publication', 'Formatting your paper, choosing a journal, submitting it and responding to reviewers.'],
  ['Conference presentation', 'Writing your abstract and preparing your poster or slides.'],
]
const steps = [
  ['Tell us what you need', 'Call, WhatsApp or visit us. Share your topic, deadline and where you are stuck.'],
  ['Get a clear quote', 'We agree what will be delivered and a fixed fee before any work starts.'],
  ['Work one-to-one', 'Your consultant shows and explains every step, so you understand your own research.'],
  ['Receive & revise free', 'Get your files. If your supervisor or a reviewer asks for changes, corrections are free.'],
]
const faqs = [
  ['Who will work on my research?', 'A physician from our MPH research team, supported by our mentor panel. You will know your consultant by name and work with them directly.'],
  ['How much does it cost?', 'It depends on what you need — for example, analysis only or full thesis support. You get a fixed quote before we start, and CMRD keeps its fees as low as possible.'],
  ['What if my supervisor asks for changes?', 'Corrections to work we produced are always free, however many rounds it takes.'],
  ['Can I consult online?', 'Yes. Sessions run on Google Meet or Zoom with screen sharing. You can also meet us at our Hatirpool centre.'],
  ['Will you write my thesis for me?', 'No. We teach, demonstrate, analyse and edit — but the research and authorship stay yours. This keeps your work ethical.'],
]

export default function Consultancy() {
  const [open, setOpen] = useState(0)
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHeader crumb="Consultancy" sub="Research Consultancy" title="One-to-one help with your research" image={images.data}
        desc="Stuck on your protocol, data analysis, thesis or paper? Work directly with a physician from our MPH research team — at a low fee, with free corrections.">
        <Solid href="#request">Request consultancy</Solid>
        <Btn href={`https://wa.me/${site.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer">WhatsApp us</Btn>
      </PageHeader>

      <Section tone="alt">
        <SectionHead sub="What we help with" title="Support at every stage of your research" />
        <div className="mt-12 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05} className="h-full bg-white p-7">
              <span className="meta">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-lg font-medium">{t}</h3>
              <p className="mt-2 text-sm text-gray-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead sub="How it works" title="Four simple steps" />
        <div className="mt-12"><Steps items={steps} /></div>
      </Section>

      <Section tone="alt">
        <SectionHead sub="Why choose CMRD" title="Through which CMRD has earned your trust" />
        <div className="mt-12"><SpecialtiesGrid /></div>
      </Section>

      <Section id="request">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead sub="Questions" title="Frequently asked questions" />
            <div className="mt-8 border-t border-black/10">
              {faqs.map(([q, a], i) => (
                <div key={q} className="border-b border-black/10">
                  <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open === i}>
                    <span className="text-lg font-medium">{q}</span><span className="text-2xl leading-none text-accent">{open === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden text-gray-2"><span className="block pb-5">{a}</span></motion.p>}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border border-black/10 bg-white-2 p-7 sm:p-8">
              <h2 className="headline text-2xl">Request a consultation</h2>
              <p className="mt-2 text-sm text-gray-2">We reply within one working day.</p>
              {sent ? (
                <div className="mt-8"><p className="text-xl font-medium">Thank you — request received.</p><p className="mt-2 text-sm text-gray-2">(Demo) On the live site this will reach our team and appear in your account.</p></div>
              ) : (
                <form className="mt-6 grid gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" placeholder="Dr. Your Name" required /><Field label="Phone / WhatsApp" placeholder="01XXX-XXXXXX" required /></div>
                  <Field label="Email" type="email" placeholder="you@example.com" />
                  <Field label="What do you need help with?" as="select">{services.map(([t]) => <option key={t}>{t}</option>)}</Field>
                  <Field label="About your research" as="textarea" rows={4} placeholder="Topic, degree (FCPS / MD / MPH…), deadline" />
                  <Solid type="submit" className="w-full">Send request</Solid>
                  <p className="text-center text-sm text-gray-2">Or call the helpline: {site.helpline}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      <NextSteps items={['courses', 'irb', 'projects']} />
    </>
  )
}
