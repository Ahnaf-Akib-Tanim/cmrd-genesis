import { Link } from 'react-router-dom'
import { site } from '../data/site'

const quick = [['Home', '/'], ['Consultancy', '/consultancy'], ['Skill Development', '/courses'], ['Collaborative Works', '/projects'], ['Blog', '/blog'], ['IRB Portal', '/irb']]
const company = [['About us', '/about'], ['Contact', '/contact'], ['Refund Policy', '/refund-policy'], ['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms']]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="display text-2xl">CMRD</Link>
          <p className="mt-2 text-sm text-gray">{site.fullName}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray">{site.tagline} Helping healthcare professionals in Bangladesh do constructive, ethical research since {site.established}.</p>
          <p className="mt-6 text-sm text-gray">{site.address}</p>
        </div>
        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="meta text-gray">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">{quick.map(([l, to]) => <li key={to}><Link to={to} className="ul">{l}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-2">
          <h3 className="meta text-gray">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">{company.map(([l, to]) => <li key={to}><Link to={to} className="ul">{l}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="meta text-gray">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Phone: <a className="ul" href={`tel:${site.phones[0]}`}>{site.phones[0]}</a></li>
            <li>WhatsApp: <a className="ul" href={`https://wa.me/${site.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer">{site.phones[1]}</a></li>
            <li>Helpline: <a className="ul" href={`tel:${site.helpline}`}>{site.helpline}</a></li>
            <li>Email: <a className="ul" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="ul" href={site.facebook} target="_blank" rel="noreferrer">Facebook Page</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col justify-between gap-2 py-5 text-xs text-gray sm:flex-row">
          <span>© {new Date().getFullYear()} cmrd.info</span>
          <span>Redesign concept · demo</span>
        </div>
      </div>
    </footer>
  )
}
