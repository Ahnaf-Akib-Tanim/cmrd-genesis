import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { posts, categories, series } from '../data/posts'
import { images } from '../data/images'
import { Hero, Lines, Reveal, Btn, Meta, Kicker, RevealImg } from '../components/ui'
import { PostRow, Closing } from '../components/cards'

export default function Blog() {
  const [cat, setCat] = useState('All')
  const list = posts.filter((p) => cat === 'All' || p.category === cat)
  return (
    <>
      <Hero kicker="04 — CMRD Insights" image={images.library} lines={['Research,', '*explained.*']} big desc="Short, practical articles on statistics, methodology and publication — written by our research physicians in Bangla and English." meta={[['Articles', '27'], ['Languages', 'বাংলা · English'], ['Series', '1 running']]} />

      {/* series — light asymmetric */}
      <section className="light py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-2"><RevealImg src={images.data} alt="" ratio="4/5" from="left" /></div>
          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <Reveal><Meta accent>Featured series — {series.count} articles</Meta></Reveal>
            <Lines as="h2" lines={['Regression', 'output', 'interpretation', 'basics']} className="display mt-6 text-[clamp(1.7rem,3.6vw,3.6rem)]" />
            <Reveal delay={0.2}><p className="mt-6 max-w-md text-lg text-gray-2">{series.desc}</p><Btn dark href="#" className="mt-10">Start with part one</Btn></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white-2 py-32 text-black sm:py-44">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal><Kicker n="02">All articles</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.76vw,6.48rem)]">Archive</h2></Reveal>
            <Reveal className="meta flex flex-wrap gap-6">
              {categories.map((c) => <button key={c} onClick={() => setCat(c)} className={`relative pb-1 ${cat === c ? 'text-black' : 'text-gray-2 hover:text-black'}`}>{c}{cat === c && <motion.span layoutId="btab" className="absolute inset-x-0 -bottom-px h-px bg-accent" />}</button>)}
            </Reveal>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-14">
              {list.map((p, i) => <PostRow key={p.id} post={p} index={i} />)}
              <div className="hairline" />
            </motion.div>
          </AnimatePresence>
          <div className="meta mt-10 flex items-center gap-6"><span>Page 1</span><span className="text-gray-2">/ 3</span><a href="#" className="ul ml-auto">Next page</a></div>
        </div>
      </section>

      <Closing lines={['New articles,', 'in your', '*inbox.*']} primary={['Create free account', '/join?mode=register']} />
    </>
  )
}
