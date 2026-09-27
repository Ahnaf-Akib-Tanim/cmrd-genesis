import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { courses } from '../data/courses'
import { posts } from '../data/posts'
import { images } from '../data/images'
import { mentors, galleryPhotos } from '../data/people'
import { Reveal, Btn, Solid, Arrow, SectionHead, Section } from '../components/ui'
import { CourseCard, PostCard, SpecialtiesGrid, PartnersGrid, HelpStrip } from '../components/cards'

/* Section order mirrors cmrd.info:
   Welcome + service cards → Research Consultancy → IRB → Specialties → Research Skill Development
   → Blog → Honorable Resources → We Collaborated With → Photo Gallery */
export default function Home() {
  return (
    <>
      <Hero />
      <Consultancy />
      <IRB />
      <Section><SectionHead sub="Why choose CMRD" title="Specialties" /><div className="mt-12"><SpecialtiesGrid /></div></Section>
      <SkillDevelopment />
      <Section>
        <SectionHead sub="Blog" title="Fresh writing from the CMRD team" desc="New research notes, institutional updates, and practical insights in one place." action={<Btn to="/blog">View all</Btn>} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((p, i) => <Reveal key={p.id} delay={i * 0.06} className="h-full"><PostCard p={p} /></Reveal>)}
        </div>
      </Section>
      <Resources />
      <Section>
        <SectionHead sub="Partners" title="We Collaborated With" desc="Supporting research, strengthening impact." action={<Btn to="/projects">See our research</Btn>} />
        <div className="mt-12"><PartnersGrid /></div>
      </Section>
      <Gallery />
      <HelpStrip />
    </>
  )
}

/* ---------- Welcome + two service cards ---------- */
function Hero() {
  const cards = [
    { k: 'Skill Development', t: 'Find the right skill development course', d: 'Research methodology, biostatistics and scientific writing — online or offline, with recordings and a certificate.', to: '/courses', cta: 'Explore courses' },
    { k: 'Research Consultancy', t: 'Do you need the consultancy service?', d: 'One-to-one support on your protocol, data analysis, thesis or manuscript from our MPH research physician team.', to: '/consultancy', cta: 'Get consultancy' },
  ]
  return (
    <section className="light pt-32 pb-20 sm:pt-36">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal><p className="meta text-accent">Welcome to CMRD</p></Reveal>
            <Reveal delay={0.05}><h1 className="headline mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]">Guiding Research,<br />Building Expertise.</h1></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-2">The {site.fullName} helps doctors and healthcare professionals in Bangladesh learn research, get expert support, and publish ethically — since {site.established}.</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-6">
              <Solid to="/join?mode=register">Join us</Solid>
              <Btn to="/about">About CMRD</Btn>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="img grade" style={{ aspectRatio: '5/4' }}><img src={images.hero} alt="Researcher at work" /></div>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08}>
              <Link to={c.to} className="group flex h-full flex-col border border-black/10 bg-white-2 p-8 transition-colors hover:border-black/30 hover:bg-white">
                <p className="meta">{c.k}</p>
                <h3 className="headline mt-4 text-2xl">{c.t}</h3>
                <p className="mt-3 flex-1 text-gray-2">{c.d}</p>
                <span className="meta mt-8 flex items-center gap-2 text-black">{c.cta} <Arrow className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Research Consultancy ---------- */
function Consultancy() {
  const services = ['Protocol & synopsis development', 'Questionnaire & data management', 'Statistical analysis & interpretation', 'Thesis & dissertation support', 'Manuscript writing & publication', 'Conference abstract & presentation']
  return (
    <Section tone="alt">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5"><div className="img grade" style={{ aspectRatio: '4/5' }}><img src={images.data} alt="Consultancy session" /></div></Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead sub="Research Consultancy" title="Through which CMRD has earned your trust." desc="Work one-to-one with a physician from our MPH research team at any stage of your research. You keep full ownership of your work — we teach, demonstrate and support." />
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {services.map((s, i) => (
              <li key={s} className="flex gap-4 hairline py-4 text-[15px]"><span className="meta pt-0.5">{String(i + 1).padStart(2, '0')}</span>{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-6">
            <Solid to="/consultancy#request">Request consultancy</Solid>
            <Btn to="/consultancy">How it works</Btn>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- CMRD Institutional Review Board ---------- */
function IRB() {
  const features = ['Online protocol submission', 'Independent ethical review', 'Approval letter with verification', 'Transparent application tracking']
  return (
    <Section tone="dark">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHead onDark sub="CMRD Institutional Review Board" title="Ethical Review for Research Protocols" desc="Submit your research application online, track review progress, respond to revisions, and verify approval letters." />
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Solid to="/irb">Visit IRB Portal</Solid>
            <Link to="/irb#guidelines" className="ul meta">Submission guidelines</Link>
            <Link to="/irb#verify" className="ul meta">Verify an approval letter</Link>
          </div>
        </div>
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
          {features.map((f, i) => (
            <Reveal key={f} delay={i * 0.06} className="bg-navy p-6"><div className="meta text-accent">0{i + 1}</div><div className="mt-6 text-lg">{f}</div></Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- Research Skill Development: Upcoming / Ongoing / Free ---------- */
function SkillDevelopment() {
  const groups = [['upcoming', 'Upcoming Courses'], ['ongoing', 'Ongoing Courses'], ['free', 'Free Courses']]
  const [tab, setTab] = useState('upcoming')
  const Column = ({ k }) => {
    const list = courses.filter((c) => c.status === k)
    return (
      <div className="space-y-4">
        {list.length ? list.map((c) => <CourseCard key={c.id} c={c} />) : <p className="border border-dashed border-black/15 p-5 text-sm text-gray-2">No {k} courses available.</p>}
      </div>
    )
  }
  return (
    <Section tone="alt">
      <SectionHead sub="Courses" title="Research Skill Development" desc="Practical courses taught by physicians — with recorded videos and a certificate on completion." action={<Btn to="/courses">View all courses</Btn>} />
      <div className="meta mt-10 flex gap-6 hairline-b lg:hidden">
        {groups.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 pb-3 ${tab === k ? 'border-accent text-black' : 'border-transparent'}`}>{l.replace(' Courses', '')}</button>)}
      </div>
      <div className="mt-6 lg:hidden"><Column k={tab} /></div>
      <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-3">
        {groups.map(([k, l]) => <div key={k}><h3 className="mb-5 text-xl font-medium">{l}</h3><Column k={k} /></div>)}
      </div>
    </Section>
  )
}

/* ---------- Honorable Resources ---------- */
function Resources() {
  return (
    <Section tone="alt">
      <SectionHead sub="Honorable Resources" title="CMRD shines in their light" desc="Our eminent mentor panel guides every course and consultation." action={<Btn to="/about#mentors">Explore all</Btn>} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mentors.map(([n, r, img], i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="img grade" style={{ aspectRatio: '4/5' }}><img src={img} alt="" /></div>
            <div className="mt-4 font-medium">{n}</div><div className="text-sm text-gray-2">{r}</div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-2">Placeholder profiles — to be replaced with CMRD’s mentor panel.</p>
    </Section>
  )
}

/* ---------- Photo Gallery ---------- */
function Gallery() {
  return (
    <Section tone="alt">
      <SectionHead sub="Moments" title="Photo Gallery" action={<Btn to="/about#gallery">See all</Btn>} />
      <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {galleryPhotos.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.05}>
            <div className="img grade group" style={{ aspectRatio: '4/3' }}><img src={src} alt="" className="transition-transform duration-700 group-hover:scale-[1.04]" /></div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
