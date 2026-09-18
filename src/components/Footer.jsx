import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { Lines, Btn } from './ui'
import Particles from './Particles'

const cols = [
  ['Explore', [['Research', '/projects'], ['Training', '/courses'], ['Consultancy', '/consultancy'], ['IRB Portal', '/irb'], ['Insights', '/blog'], ['About', '/about']]],
  ['Company', [['Contact', '/contact'], ['Join us', '/join?mode=register'], ['Sign in', '/join'], ['Refund policy', '/refund-policy'], ['Privacy', '/privacy-policy'], ['Terms', '/terms']]],
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <Particles className="opacity-40" density={0.6} link={110} />
      <div className="wrap relative pt-20 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Lines as="h2" lines={["Let's build", 'better', '*research.*']} className="display text-[clamp(2.2rem,5vw,4.6rem)]" />
            <div className="mt-8 flex flex-wrap gap-8">
              <Btn to="/join?mode=register">Join CMRD</Btn>
              <Btn href={`mailto:${site.email}`}>{site.email}</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:pt-2">
            {cols.map(([h, links]) => (
              <div key={h}>
                <div className="meta text-gray">{h}</div>
                <ul className="mt-4 space-y-1.5 text-sm">{links.map(([l, to]) => <li key={to}><Link to={to} className="ul">{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 hairline pt-6 text-[13px] text-gray sm:grid-cols-3">
          <div>{site.fullName}<br />{site.address}</div>
          <div>{site.phones.join(' · ')}<br />Helpline {site.helpline} · WhatsApp {site.whatsapp}</div>
          <div className="sm:text-right">© {new Date().getFullYear()} CMRD<br /><span className="meta">Redesign concept · demo</span></div>
        </div>
      </div>
      <div className="wrap relative -mb-[1.5vw] overflow-hidden">
        <div className="display-narrow select-none text-[22vw] leading-[0.75] text-white/[0.04] lg:text-[13vw]">CMRD</div>
      </div>
    </footer>
  )
}
