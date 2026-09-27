import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { courses } from '../data/courses'
import { images } from '../data/images'
import { Reveal, Solid, Btn, SectionHead, Section, PageHeader, Steps } from '../components/ui'
import { CourseCard, NextSteps, HelpStrip } from '../components/cards'

const tabs = [['all', 'All courses'], ['upcoming', 'Upcoming'], ['ongoing', 'Ongoing'], ['free', 'Free']]
const benefits = [
  ['Online & offline', 'Join from anywhere, or attend at our Hatirpool centre.'],
  ['Recorded videos', 'Watch any session again later.'],
  ['Eminent mentor panel', 'Taught by experienced physicians and researchers.'],
  ['Certificate', 'Awarded when you complete the course.'],
]
const enrol = [
  ['Create a free account', 'Sign up with your name, phone and email.'],
  ['Choose a course', 'Pick an upcoming or free course that fits your level.'],
  ['Pay & confirm', 'Pay the course fee; you get a confirmation right away.'],
  ['Join & learn', 'Attend live, watch recordings, and get your certificate.'],
]

export default function Courses() {
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(() => courses.filter((c) => (tab === 'all' || c.status === tab) && (c.title + c.tags.join(' ')).toLowerCase().includes(q.toLowerCase())), [tab, q])

  return (
    <>
      <PageHeader crumb="Skill Development" sub="Research Skill Development" title="Learn to do research yourself" image={images.classroom}
        desc="Practical courses in research methodology, biostatistics and scientific writing — for beginners and experienced researchers alike.">
        <Solid href="#catalogue">Browse courses</Solid>
        <Btn to="/join?mode=register">Create free account</Btn>
      </PageHeader>

      <Section tone="alt">
        <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05} className="h-full bg-white p-6"><h3 className="text-lg font-medium">{t}</h3><p className="mt-2 text-sm text-gray-2">{d}</p></Reveal>
          ))}
        </div>
      </Section>

      <Section id="catalogue">
        <SectionHead sub="Courses" title="Find the right course" desc="Filter by status or search by topic." />
        <div className="mt-10 flex flex-col gap-4 border-b border-black/10 sm:flex-row sm:items-end sm:justify-between">
          <div className="meta flex flex-wrap gap-6">
            {tabs.map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 pb-3 ${tab === k ? 'border-accent text-black' : 'border-transparent'}`}>
                {l} ({k === 'all' ? courses.length : courses.filter((c) => c.status === k).length})
              </button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. SPSS" aria-label="Search courses" className="mb-3 w-full border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-black sm:w-64" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab + q} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8">
            {list.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CourseCard key={c.id} c={c} detailed />)}</div>
            ) : (
              <p className="border border-dashed border-black/15 p-10 text-center text-gray-2">No courses available here right now. Follow our Facebook page or call the helpline to hear about the next batch.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section tone="alt">
        <SectionHead sub="Enrolment" title="How to join a course" />
        <div className="mt-12"><Steps items={enrol} /></div>
      </Section>

      <HelpStrip title="Not sure which course is right for you?" desc="Call the helpline or send us a WhatsApp message — we will suggest a course for your level and deadline." />
      <NextSteps items={['consultancy', 'blog', 'irb']} />
    </>
  )
}
