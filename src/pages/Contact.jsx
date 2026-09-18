import { useState } from 'react'
import { site } from '../data/site'
import { images } from '../data/images'
import { Hero, Reveal, Solid, Meta, Kicker } from '../components/ui'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Hero kicker="07 — Contact" image={images.hospital} lines={['Talk', 'to', '*us.*']} big desc="Questions about a course, a consultation or an IRB submission? Reach us by phone, WhatsApp, email or at our Hatirpool centre." meta={[['Hours', 'Sat–Thu, 10–19'], ['Helpline', site.helpline], ['Email', site.email]]} />

      <section className="light py-24 sm:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Kicker n="02">Reach us</Kicker>
            <dl className="mt-10 space-y-8">
              {[['Visit', site.address], ['Call', `${site.phones.join(' · ')} · Helpline ${site.helpline}`], ['WhatsApp', site.whatsapp], ['Email', `${site.email} · ${site.irbEmail} (IRB)`]].map(([k, v]) => <div key={k}><dt className="meta text-gray-2">{k}</dt><dd className="headline mt-2 text-xl">{v}</dd></div>)}
            </dl>
            <div className="mt-12 h-72 overflow-hidden bg-white-2 grayscale"><iframe title="Map" src="https://www.google.com/maps?q=Meher+Tower,+Sonargaon+Road,+Hatirpool,+Dhaka&output=embed" className="h-full w-full" loading="lazy" /></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <Meta accent>Send a message</Meta>
            {sent ? <div className="mt-10"><div className="display text-5xl">Thank you.</div><p className="mt-4 text-gray-2">We reply within one working day. (Demo)</p></div> : (
              <form className="mt-10 grid gap-8" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <div className="grid gap-8 sm:grid-cols-2"><F label="Name" placeholder="Your name" /><F label="Phone" placeholder="01XXX-XXXXXX" /></div>
                <F label="Email" type="email" placeholder="you@example.com" />
                <div><label className="meta text-gray-2">Subject</label><select className="mt-2 w-full border-b border-black/30 bg-transparent py-2 outline-none focus:border-black">{['Course enquiry', 'Research consultancy', 'IRB submission', 'Institutional collaboration', 'Other'].map((o) => <option key={o}>{o}</option>)}</select></div>
                <div><label className="meta text-gray-2">Message</label><textarea rows={4} className="mt-2 w-full border-b border-black/30 bg-transparent py-2 outline-none focus:border-black" /></div>
                <Solid type="submit" className="w-fit">Send message</Solid>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
function F({ label, ...rest }) {
  return <div><label className="meta text-gray-2">{label}</label><input {...rest} className="mt-2 w-full border-b border-black/30 bg-transparent py-2 outline-none placeholder:text-gray-2/60 focus:border-black" /></div>
}
