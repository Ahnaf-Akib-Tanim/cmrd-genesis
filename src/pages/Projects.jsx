import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { partners } from '../data/site'
import { images } from '../data/images'
import { Hero, Reveal, Btn, Kicker, ParallaxImg, Marquee, ScrollWords, Statement } from '../components/ui'
import { ProjectEntry, Closing } from '../components/cards'

const filters = ['All', 'Collaborative Research', 'CMRD-Led Research']
const imgs = [images.field, images.hospital, images.doctorTablet, images.stethoscope]

export default function Projects() {
  const [f, setF] = useState('All')
  const list = f === 'All' ? projects : projects.filter((p) => p.type === f)
  return (
    <>
      <Hero kicker="03 — Collaborative works" image={images.field} lines={['Research', 'built', '*together.*']} desc="Studies designed, conducted and published with partner medical colleges and hospitals — and CMRD-led research on questions that matter to Bangladesh." meta={[['Published', projects.filter((p) => p.status === 'Published').length], ['In progress', projects.filter((p) => p.status !== 'Published').length], ['Partners', partners.length]]}>
        <Btn to="/contact">Propose a collaboration</Btn>
      </Hero>

      <section className="light py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3"><Reveal><Kicker n="02">Approach</Kicker></Reveal></div>
          <ScrollWords className="headline text-[clamp(1.4rem,3.6vw,3.6rem)] lg:col-span-9" text="Every collaborative study begins with a department’s clinical question and ends with a paper the department can *stand* behind." />
        </div>
      </section>

      <section className="bg-black py-24 text-white sm:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal><Kicker n="03">Portfolio</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.76vw,6.48rem)]">Studies</h2></Reveal>
            <Reveal className="meta flex gap-6">
              {filters.map((x) => <button key={x} onClick={() => setF(x)} className={`relative pb-1 ${f === x ? 'text-white' : 'text-gray hover:text-white'}`}>{x}{f === x && <motion.span layoutId="ptab" className="absolute inset-x-0 -bottom-px h-px bg-accent" />}</button>)}
            </Reveal>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-14">
              {list.map((p, i) => <ProjectEntry key={p.id} p={p} index={i} image={imgs[projects.indexOf(p) % imgs.length]} />)}
              <div className="hairline" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-24 hairline hairline-b py-8"><Marquee items={partners} /></div>
      </section>

      <Statement lines={['Questions', 'worth', '*answering.*']} image={images.hospital} />
      <Closing light lines={['Have a', 'clinical', '*question?*']} primary={['Start a conversation', '/contact']} />
    </>
  )
}
