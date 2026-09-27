import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/site'
import { images } from '../data/images'
import { Reveal, Solid, Btn, SectionHead, Section, PageHeader, Steps } from '../components/ui'
import { NextSteps } from '../components/cards'

const features = [
  ['Online protocol submission', 'Apply from anywhere — no paper forms.'],
  ['Independent ethical review', 'Your protocol is assessed by independent reviewers.'],
  ['Approval letter with verification', 'Each letter has a code anyone can check online.'],
  ['Transparent application tracking', 'See exactly where your application is at any time.'],
]
const steps = [
  ['Register', 'Create a CMRD account and complete your researcher profile.'],
  ['Submit protocol', 'Fill in the application form and upload the required documents.'],
  ['Ethical review', 'Reviewers check your study for ethical compliance.'],
  ['Decision', 'You receive an approval, a revision request, or a chairperson decision.'],
  ['Approval letter', 'Download your official approval letter once approved.'],
]
const docs = ['Completed application form', 'Full study protocol', 'Informed consent form (Bangla & English)', 'Data collection sheet / questionnaire', 'CV of the principal investigator', 'Supervisor or department endorsement', 'Budget & timeline (if funded)']

export default function IRB() {
  const [code, setCode] = useState('')
  const [res, setRes] = useState(null)
  const verify = (e) => { e.preventDefault(); setRes(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim())) }

  return (
    <>
      <PageHeader crumb="IRB Portal" sub="CMRD Institutional Review Board" title="Ethical Review for Research Protocols" image={images.notebook}
        desc="Any study involving people needs ethical approval. Submit your research application online, track review progress, respond to revisions, and verify approval letters.">
        <Solid to="/join?mode=register">Apply now</Solid>
        <Btn href="#verify">Verify an approval letter</Btn>
      </PageHeader>

      <Section tone="alt">
        <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05} className="h-full bg-white p-6"><span className="meta text-accent">0{i + 1}</span><h3 className="mt-4 text-lg font-medium">{t}</h3><p className="mt-2 text-sm text-gray-2">{d}</p></Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead sub="How it works" title="From application to approval in five steps" desc="Typical turnaround: 2–4 weeks for full review; 7–10 days for expedited review of minimal-risk studies." />
        <div className="mt-12"><Steps items={steps} /></div>
      </Section>

      <Section tone="alt" id="guidelines">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead sub="Submission guidelines" title="Documents you will need" desc="Have these ready before you apply to avoid delays. Uploads are visible only to the review board." />
            <div className="mt-8 flex flex-wrap gap-6"><a href="#" className="ul meta">IRB guidelines & SOP</a><a href="#" className="ul meta">Application form</a><a href="#" className="ul meta">Consent form template</a></div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {docs.map((d, i) => (
              <li key={d} className="flex gap-5 border-b border-black/10 py-4 text-[16px] first:border-t"><span className="meta pt-1">{String(i + 1).padStart(2, '0')}</span>{d}</li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="dark" id="verify">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHead onDark sub="Verification" title="Verify an approval letter" desc="Journals, supervisors and institutions can check any CMRD IRB letter using the code printed on it. (Demo: any code like 7F3K-9QAZ returns a sample result.)" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={verify} className="flex flex-col gap-3 sm:flex-row">
              <label className="flex-1"><span className="sr-only">Verification code</span>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code e.g. 7F3K-9QAZ" className="w-full border border-white/25 bg-transparent px-4 py-3.5 font-mono text-white outline-none placeholder:text-white/35 focus:border-accent" />
              </label>
              <Solid type="submit">Verify</Solid>
            </form>
            <AnimatePresence mode="wait">
              {res !== null && (
                <motion.div key={String(res) + code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 border border-white/15 p-6">
                  {res ? (
                    <>
                      <p className="meta text-accent">Valid approval</p>
                      <p className="mt-3 text-lg">Hypertension awareness and treatment adherence among urban garment workers</p>
                      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                        {[['Reference', 'CMRD/IRB/2026/0142'], ['Principal investigator', 'Dr. A. Rahman'], ['Approved on', '12 Mar 2026'], ['Valid until', '11 Mar 2027']].map(([k, v]) => <div key={k}><dt className="text-gray">{k}</dt><dd className="mt-1">{v}</dd></div>)}
                      </dl>
                    </>
                  ) : <p className="text-gray">No approval found for that code. Check the code and try again.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal className="flex flex-col items-start justify-between gap-6 border border-black/10 bg-white-2 p-8 md:flex-row md:items-center">
          <div><h2 className="headline text-2xl">Need help with your submission?</h2><p className="mt-2 text-gray-2">Contact the IRB coordinator at <a href={`mailto:${site.irbEmail}`} className="ul text-black">{site.irbEmail}</a></p></div>
          <Btn to="/contact">Contact page</Btn>
        </Reveal>
      </Section>

      <NextSteps title="Before or after approval" items={['consultancy', 'courses', 'projects']} />
    </>
  )
}
