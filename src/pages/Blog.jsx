import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { posts, categories, series } from '../data/posts'
import { images } from '../data/images'
import { Reveal, Btn, SectionHead, Section, PageHeader } from '../components/ui'
import { PostCard, NextSteps } from '../components/cards'

const langs = [['all', 'All languages'], ['en', 'English'], ['bn', 'বাংলা']]

export default function Blog() {
  const [cat, setCat] = useState('All')
  const [lang, setLang] = useState('all')
  const [q, setQ] = useState('')
  const list = posts.filter((p) => (cat === 'All' || p.category === cat) && (lang === 'all' || p.lang === lang) && p.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader crumb="Blog" sub="Blog" title="Fresh writing from the CMRD team"
        desc="New research notes, institutional updates, and practical insights in one place — short, free articles in Bangla and English." />

      <Section tone="alt">
        <div className="grid gap-10 border border-black/10 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="img grade lg:col-span-4" style={{ aspectRatio: '4/3' }}><img src={images.library} alt="" /></div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <p className="meta text-accent">Featured series · {series.count} articles</p>
            <h2 className="headline mt-3 text-2xl sm:text-3xl">{series.title}</h2>
            <p className="mt-4 text-gray-2">{series.desc}</p>
            <Btn href="#" className="mt-8">Start with part one</Btn>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead sub="All articles" title="Browse by topic" />
        <div className="mt-10 flex flex-col gap-4 border-b border-black/10 lg:flex-row lg:items-end lg:justify-between">
          <div className="meta flex flex-wrap gap-6">
            {categories.map((c) => <button key={c} onClick={() => setCat(c)} className={`-mb-px border-b-2 pb-3 ${cat === c ? 'border-accent text-black' : 'border-transparent'}`}>{c}</button>)}
          </div>
          <div className="mb-3 flex gap-3">
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language" className="border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black">
              {langs.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" aria-label="Search articles" className="w-full border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-black sm:w-56" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cat + lang + q} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8">
            {list.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PostCard key={p.id} p={p} />)}</div>
            ) : <p className="border border-dashed border-black/15 p-10 text-center text-gray-2">No articles match your search.</p>}
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          {[1, 2, 3].map((n) => <button key={n} className={`h-10 w-10 border ${n === 1 ? 'border-black bg-black text-white' : 'border-black/15 hover:border-black'}`}>{n}</button>)}
          <button className="h-10 border border-black/15 px-4 hover:border-black">Next</button>
        </div>
      </Section>

      <NextSteps title="Ready to go further?" items={['courses', 'consultancy', 'about']} />
    </>
  )
}
