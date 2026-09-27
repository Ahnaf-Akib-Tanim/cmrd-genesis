import { Link } from 'react-router-dom'
import { site, partners } from '../data/site'
import { images } from '../data/images'
import { Reveal, Solid, Btn, Arrow, SectionHead, Section, PageHeader } from '../components/ui'
import { SpecialtiesGrid, PartnersGrid, NextSteps } from '../components/cards'
import { mentors, galleryPhotos } from '../data/people'

const offer = [
  ['Research methodology courses', 'Our core offering — learn to design and run a study.', '/courses'],
  ['Data management & analysis training', 'Handle and analyse your data with confidence.', '/courses'],
  ['Article publishing guidance', 'From manuscript to journal submission.', '/consultancy'],
  ['Technical support & consultancy', 'One-to-one help for researchers nationwide.', '/consultancy'],
  ['Independent ethical review', 'The CMRD Institutional Review Board.', '/irb'],
]
const timeline = [
  ['2016', 'CMRD is established in Dhaka to teach research methodology to healthcare professionals.'],
  ['2021', 'CMRD-led study on side-effects of the Covishield vaccine reported by doctors (published 2022).'],
  ['2023', 'Collaborative publication with Delta Medical College on antenatal care and perinatal outcomes.'],
  ['Today', 'Courses, consultancy, collaborative research and an online IRB — all in one place.'],
]

export default function About() {
  return (
    <>
      <PageHeader crumb="About us" sub={`About CMRD · Since ${site.established}`} title="A research-competent environment for healthcare professionals" image={images.meeting}
        desc={`The ${site.fullName} is a research institute in Dhaka that provides hands-on training, technical support and consultancy to health researchers across Bangladesh.`}>
        <Solid to="/contact">Contact us</Solid>
        <Btn to="/courses">See our courses</Btn>
      </PageHeader>

      <Section tone="alt">
        <div className="grid gap-px bg-black/10 md:grid-cols-2">
          <Reveal className="bg-white p-8"><p className="meta text-accent">Our mission</p><p className="mt-4 text-xl leading-relaxed">To create a research-competent environment for healthcare professionals for constructive, ethical research.</p></Reveal>
          <Reveal delay={0.08} className="bg-white p-8"><p className="meta text-accent">How we work</p><p className="mt-4 text-xl leading-relaxed">We teach health-science research with efficiency and integrity — and keep it affordable, with free corrections.</p></Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead sub="What we offer" title="Everything a health researcher needs" desc="Established in 2016, CMRD has earned a reputation as an ethical and successful institution in teaching and disseminating health-science research." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {offer.map(([t, d, to], i) => (
              <Reveal key={t} delay={i * 0.04}>
                <Link to={to} className="group flex items-center justify-between gap-6 border-b border-black/10 py-5 first:border-t">
                  <div><p className="text-lg font-medium">{t}</p><p className="mt-1 text-sm text-gray-2">{d}</p></div>
                  <Arrow className="shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHead sub="Our journey" title="Milestones" />
        <div className="mt-12 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map(([y, d], i) => (
            <Reveal key={y} delay={i * 0.06} className="h-full bg-white p-6"><div className="headline text-3xl text-accent">{y}</div><p className="mt-4 text-sm text-gray-2">{d}</p></Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead sub="Why choose CMRD" title="Specialties" />
        <div className="mt-12"><SpecialtiesGrid /></div>
      </Section>

      <Section tone="alt" id="mentors">
        <SectionHead sub="Honorable Resources" title="CMRD shines in their light" desc="Our eminent mentor panel guides every course and consultation." />
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

      <Section>
        <SectionHead sub="Partners" title={`We Collaborated With (${partners.length})`} desc="Supporting research, strengthening impact." />
        <div className="mt-12"><PartnersGrid /></div>
      </Section>

      <Section tone="alt" id="gallery">
        <SectionHead sub="Moments" title="Photo Gallery" />
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {galleryPhotos.map((src) => <div key={src} className="img grade" style={{ aspectRatio: '4/3' }}><img src={src} alt="" /></div>)}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead sub="Visit us" title="Easily reachable, in central Dhaka" />
            <dl className="mt-8 space-y-4 text-[15px]">
              <div><dt className="text-sm text-gray-2">Address</dt><dd>{site.address}</dd></div>
              <div><dt className="text-sm text-gray-2">Phone</dt><dd>{site.phones.join(' · ')}</dd></div>
              <div><dt className="text-sm text-gray-2">Helpline</dt><dd>{site.helpline}</dd></div>
              <div><dt className="text-sm text-gray-2">Email</dt><dd>{site.email}</dd></div>
            </dl>
          </div>
          <div className="h-80 overflow-hidden border border-black/10 lg:col-span-7 lg:h-auto">
            <iframe title="CMRD location" src="https://www.google.com/maps?q=Meher+Tower,+Sonargaon+Road,+Hatirpool,+Dhaka&output=embed" className="h-full min-h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </Section>

      <NextSteps items={['courses', 'consultancy', 'irb']} />
    </>
  )
}
