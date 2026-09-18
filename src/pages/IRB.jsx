import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/site'
import { images } from '../data/images'
import { EASE, Hero, Lines, Reveal, Btn, Solid, Meta, Kicker, RevealImg, Statement } from '../components/ui'
import Particles from '../components/Particles'
import { Closing } from '../components/cards'

const steps = [
  ['Register', 'Create a CMRD account and complete your researcher profile.', 'Profile complete'],
  ['Submit protocol', 'Fill in the application form and upload the required documents.', 'Documents received'],
  ['Ethical review', 'Independent reviewers evaluate your protocol for compliance.', 'Under review'],
  ['Decision', 'Approval, revision request, or chairperson decision — with reasons.', 'Decision issued'],
  ['Approval letter', 'Download your official, verifiable approval letter.', 'Approved · verifiable'],
]
const docs = ['Completed application form', 'Full study protocol', 'Informed consent form (Bangla & English)', 'Data collection instrument / questionnaire', 'CV of principal investigator', 'Supervisor / department endorsement', 'Budget & timeline (if funded)']

export default function IRB() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const [code, setCode] = useState('')
  const [res, setRes] = useState(null)
  useEffect(() => { if (!auto) return; const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 3000); return () => clearInterval(t) }, [auto])
  const verify = (e) => { e.preventDefault(); setRes(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim())) }

  return (
    <>
      <Hero kicker="06 — Institutional Review Board" image={images.notebook} lines={['Ethics,', 'made', '*visible.*']} desc="Submit your protocol for independent ethical assessment, track your application, respond to revisions and verify approvals — entirely online." meta={[['Full review', '2–4 weeks'], ['Expedited', '7–10 days'], ['Coordinator', site.irbEmail]]}>
        <Btn to="/join?mode=register">Apply now</Btn>
      </Hero>

      {/* process — interactive */}
      <section className="relative bg-navy py-24 text-white sm:py-32" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
        <Particles className="opacity-30" density={0.5} link={100} />
        <div className="wrap relative">
          <Reveal><Kicker n="02">How it works</Kicker></Reveal>
          <div className="mt-14 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute left-[31px] top-0 bottom-0 w-px bg-white/10" />
                <motion.div className="absolute left-[31px] top-0 w-px bg-accent" animate={{ height: `${(step / (steps.length - 1)) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
                {steps.map(([t, d], i) => (
                  <button key={t} onMouseEnter={() => setStep(i)} onClick={() => setStep(i)} className="group relative flex w-full items-start gap-8 py-6 text-left">
                    <span className={`display relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-500 ${step >= i ? 'border-accent bg-navy text-accent' : 'border-white/20 bg-navy text-white/40'}`}>0{i + 1}</span>
                    <div className="pt-3">
                      <div className={`display text-2xl transition-colors duration-500 sm:text-3xl ${step === i ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}>{t}</div>
                      <AnimatePresence initial={false}>{step === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-md overflow-hidden text-lg text-gray"><span className="block pt-3">{d}</span></motion.p>}</AnimatePresence>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* live state panel */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-32 border border-white/15 p-8">
                <Meta className="text-gray">Application</Meta>
                <div className="meta mt-2 text-white">CMRD/IRB/2026/0142</div>
                <div className="mt-8"><Meta className="text-gray">Status</Meta>
                  <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="display mt-2 text-2xl text-accent">{steps[step][2]}</motion.div></AnimatePresence>
                </div>
                <div className="mt-8 h-px w-full bg-white/10"><motion.div className="h-full bg-accent" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} /></div>
                <div className="meta mt-3 flex justify-between text-gray"><span>Step {step + 1}</span><span>of {steps.length}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* documents — light */}
      <section className="light py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Kicker n="03">Before you apply</Kicker></Reveal>
            <Lines as="h2" lines={['Required', '*documents.*']} className="display mt-8 text-[clamp(2rem,4.68vw,5.04rem)]" />
            <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg text-gray-2">Have these ready to avoid delays. Uploads are stored securely and visible only to the review board.</p>
              <div className="mt-10 flex flex-wrap gap-8"><a href="#" className="ul meta">Guidelines & SOP</a><a href="#" className="ul meta">Application form</a><a href="#" className="ul meta">Consent template</a></div></Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {docs.map((d, i) => <Reveal key={d} delay={i * 0.04} amount={0.6} className="flex gap-8 hairline py-5 text-lg"><span className="meta pt-2 text-gray-2">{String(i + 1).padStart(2, '0')}</span>{d}</Reveal>)}
            <div className="hairline" />
          </div>
        </div>
      </section>

      {/* verify — black */}
      <section id="verify" className="relative bg-black py-24 text-white sm:py-32">
        <div className="absolute inset-0 grid-bg" />
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Kicker n="04">Verification</Kicker></Reveal>
            <Lines as="h2" lines={['Verify', 'any', '*approval.*']} className="display mt-8 text-[clamp(2.2rem,5.76vw,6.48rem)]" />
            <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg text-gray">Journals, supervisors and institutions can verify a letter instantly using the code printed on it. For this demo, any code in the format XXXX-XXXX returns a sample result.</p></Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <form onSubmit={verify} className="flex items-end gap-6 border-b border-white/40 pb-4">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="7F3K-9QAZ" className="meta-lg flex-1 bg-transparent text-3xl text-white outline-none placeholder:text-white/25" style={{ letterSpacing: '.1em' }} />
              <button type="submit" className="ul meta">Verify</button>
            </form>
            <AnimatePresence mode="wait">
              {res !== null && (
                <motion.div key={String(res) + code} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-10">
                  {res ? (
                    <div className="border border-accent/50 p-8">
                      <Meta accent>Valid approval</Meta>
                      <div className="headline mt-4 text-2xl">Hypertension awareness and treatment adherence among urban garment workers</div>
                      <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
                        {[['Reference', 'CMRD/IRB/2026/0142'], ['PI', 'Dr. A. Rahman'], ['Approved', '12 Mar 2026'], ['Valid until', '11 Mar 2027']].map(([k, v]) => <div key={k}><dt className="meta text-gray">{k}</dt><dd className="mt-1">{v}</dd></div>)}
                      </dl>
                    </div>
                  ) : <p className="headline text-2xl text-gray">No approval found for that code.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Statement lines={['Independent.', 'Transparent.', '*Verifiable.*']} image={images.pipette} sub={`IRB coordinator · ${site.irbEmail}`} />
      <Closing light lines={['Ready to', 'submit your', '*protocol?*']} primary={['Register & apply', '/join?mode=register']} />
    </>
  )
}

export { Solid, RevealImg }
