import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { partners } from '../data/site'
import { images } from '../data/images'
import { Reveal, Solid, SectionHead, Section, PageHeader, Steps } from '../components/ui'
import { ProjectCard, PartnersGrid, NextSteps } from '../components/cards'

const filters = ['All', 'Collaborative Research', 'CMRD-Led Research']
const imgs = { 'anc-2023': images.field, 'covishield-2022': images.lab, 'ncd-2025': images.hospital, 'diabetes-2025': images.desk }
const how = [
  ['Share your question', 'Your department or hospital brings a clinical question worth answering.'],
  ['Design together', 'We plan the study design, sample and tools with your team.'],
  ['Ethics & data', 'Ethical approval through the CMRD IRB, then data collection and analysis.'],
  ['Publish', 'We write the paper together and support journal submission.'],
]

export default function Projects() {
  const [f, setF] = useState('All')
  const list = f === 'All' ? projects : projects.filter((p) => p.type === f)
  const published = projects.filter((p) => p.status === 'Published').length
  return (
    <>
      <PageHeader crumb="Collaborative Works" sub="Research & Publications" title="Research we have done — and published" image={images.field}
        desc="Studies CMRD has led, and studies we have carried out with partner medical colleges and hospitals.">
        <Solid to="/contact">Propose a collaboration</Solid>
      </PageHeader>

      <Section tone="alt">
        <div className="grid grid-cols-3 gap-px bg-black/10">
          {[[published, 'Published studies'], [projects.length - published, 'In progress'], [partners.length, 'Partner institutions']].map(([v, l]) => (
            <Reveal key={l} className="bg-white p-6 text-center"><div className="headline text-4xl">{v}</div><div className="mt-2 text-sm text-gray-2">{l}</div></Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead sub="Research & Publications" title="All studies" desc="Open any study to read its summary." />
        <div className="meta mt-10 flex flex-wrap gap-6 border-b border-black/10">
          {filters.map((x) => <button key={x} onClick={() => setF(x)} className={`-mb-px border-b-2 pb-3 ${f === x ? 'border-accent text-black' : 'border-transparent'}`}>{x}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8 space-y-5">
            {list.map((p) => <ProjectCard key={p.id} p={p} image={imgs[p.id]} />)}
          </motion.div>
        </AnimatePresence>
      </Section>

      <Section tone="alt">
        <SectionHead sub="Work with us" title="How a collaboration works" />
        <div className="mt-12"><Steps items={how} /></div>
      </Section>

      <Section>
        <SectionHead sub="Partners" title="We Collaborated With" desc="Supporting research, strengthening impact." />
        <div className="mt-12"><PartnersGrid /></div>
      </Section>

      <NextSteps items={['irb', 'consultancy', 'contact']} />
    </>
  )
}
