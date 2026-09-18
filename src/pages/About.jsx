import { site, partners } from '../data/site'
import { images } from '../data/images'
import { Hero, Lines, Reveal, Btn, Meta, Kicker, ParallaxImg, RevealImg, ScrollWords, Statement, Marquee, CountUp } from '../components/ui'
import { Closing } from '../components/cards'

const values = [['Integrity', 'Ethical research is non-negotiable: we teach, support and review — never fabricate.'], ['Clarity', 'Every statistic explained until it makes sense to the clinician using it.'], ['Accessibility', 'Lowest fees, free corrections and a central Dhaka location.'], ['Accountability', 'Verifiable certificates and IRB approvals — trust you can check.']]
const timeline = [['2016', 'CMRD founded in Dhaka to teach research methodology to healthcare professionals.'], ['2018', 'Consultancy launched — the MPH research physician team begins one-to-one support.'], ['2021', 'First CMRD-led study: nationwide physician-reported Covishield side-effect research.'], ['2023', 'Joint publications with Delta Medical College and other partner institutions.'], ['2025', 'IRB portal: fully online independent ethical review with verifiable approvals.'], ['2026', 'Unified platform for courses, consultancy, research and IRB — this site.']]
const team = [['Executive Director', 'MBBS, MPH · Founder', images.portrait], ['Head of Research', 'MBBS, MPH, PhD (Epidemiology)', images.doctor], ['Lead Biostatistician', 'MSc Statistics, MPH', images.doctorTablet], ['IRB Chairperson', 'Professor of Community Medicine', images.stethoscope]]

export default function About() {
  return (
    <>
      <Hero kicker={`05 — About · since ${site.established}`} image={images.meeting} lines={['We', 'believe', 'better', '*research*']} desc="The Centre for Medical Research & Development is a renowned research institute providing hands-on training, technical support and consultancy to health researchers across Bangladesh." meta={[['Founded', '2016'], ['Based in', 'Hatirpool, Dhaka'], ['Partners', `${partners.length} institutions`]]} />

      {/* belief — light */}
      <section className="light py-24 sm:py-32">
        <div className="wrap">
          <Lines as="h2" lines={['leads to', 'better', '*health.*']} className="display text-[clamp(2.6rem,8.64vw,9.36rem)]" />
          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3"><Reveal><Kicker n="02">Mission</Kicker></Reveal></div>
            <ScrollWords className="headline text-[clamp(1.3rem,2.59vw,2.45rem)] lg:col-span-8" text="To create a research-competent environment for healthcare professionals for constructive, ethical research — teaching health-science research with efficiency and integrity, and supporting every clinician who wants to ask a question and answer it properly." />
          </div>
        </div>
      </section>

      <ParallaxImg src={images.classroom} alt="" className="h-[80svh]" speed={0.15} />

      {/* story + numbers — dark */}
      <section className="relative bg-navy py-24 text-white sm:py-32">
        <div className="absolute inset-0 grid-bg" />
        <div className="wrap relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Kicker n="03">Our story</Kicker></Reveal>
            <Lines as="h2" lines={['Ten years', 'of teaching', '*research.*']} className="display mt-8 text-[clamp(2rem,4.68vw,5.04rem)]" />
            <Reveal delay={0.2} className="mt-10 max-w-xl space-y-5 text-lg text-gray">
              <p>Established in 2016, CMRD has earned a reputation as an ethical and successful institution. Our core offering — research methodology courses — is complemented by data management and analysis training, article-publishing guidance and technical support for health researchers nationwide.</p>
              <p>We keep cohorts small, fees low and corrections free. We would rather a clinician leave understanding one regression table than carrying ten they cannot explain.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-x-8 lg:col-span-5 lg:col-start-8 lg:pt-16">
            {[[10, 'Years'], [partners.length, 'Partner institutions'], [27, 'Insights published'], [3, 'Pillars']].map(([v, l]) => (
              <Reveal key={l} className="hairline py-8"><div className="display text-[clamp(2.5rem,5.04vw,5.04rem)] leading-[0.8]"><CountUp value={v} /></div><div className="meta mt-4 text-gray">{l}</div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values — light */}
      <section className="light py-24 sm:py-32">
        <div className="wrap">
          <Reveal><Kicker n="04">Values</Kicker></Reveal>
          <div className="mt-14 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="light p-8 pt-10 lg:p-10">
                <div className="meta text-gray-2">0{i + 1}</div>
                <h3 className="display mt-10 text-3xl">{t}</h3>
                <p className="mt-4 text-gray-2">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline — black */}
      <section className="bg-black py-24 text-white sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><Kicker n="05">Milestones</Kicker><h2 className="display mt-6 text-[clamp(2.2rem,5.04vw,5.76rem)]">The<br />journey</h2></Reveal></div>
          <div className="lg:col-span-7 lg:col-start-6">
            {timeline.map(([y, d], i) => (
              <Reveal key={y} delay={i * 0.05} amount={0.6} className="grid grid-cols-[6rem_1fr] gap-6 hairline py-7 sm:grid-cols-[9rem_1fr]">
                <span className="display text-3xl text-accent sm:text-4xl">{y}</span>
                <p className="pt-2 text-lg text-gray">{d}</p>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </div>
      </section>

      {/* team — light */}
      <section className="light py-24 sm:py-32">
        <div className="wrap">
          <Reveal><Kicker n="06">Leadership</Kicker><h2 className="headline mt-6 max-w-2xl text-2xl sm:text-3xl">Physicians, statisticians and ethicists from Bangladesh’s leading medical colleges.</h2></Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([n, r, img], i) => (
              <Reveal key={n} delay={i * 0.08} className={i % 2 ? 'lg:mt-16' : ''}>
                <RevealImg src={img} alt={n} ratio="4/5" />
                <div className="mt-5 text-lg">{n}</div><div className="meta mt-1 text-gray-2">{r}</div>
              </Reveal>
            ))}
          </div>
          <p className="meta mt-10 text-gray-2">Placeholder profiles — replace with real team members and portraits.</p>
        </div>
        <div className="mt-24 hairline hairline-b py-8"><Marquee items={partners} /></div>
      </section>

      <Statement lines={['Hatirpool,', '*Dhaka.*']} image={images.hospital} sub={`${site.address} · Sat–Thu 10:00–19:00`} />
      <Closing light lines={['Come and', 'see the', '*centre.*']} primary={['Contact & directions', '/contact']} />
    </>
  )
}
