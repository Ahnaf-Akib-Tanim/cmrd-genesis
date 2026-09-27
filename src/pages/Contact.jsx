import { useState } from 'react'
import { site } from '../data/site'
import { Reveal, Solid, SectionHead, Section, PageHeader, Field } from '../components/ui'
import { NextSteps } from '../components/cards'

const wa = `https://wa.me/${site.whatsapp.replace('+', '')}`

export default function Contact() {
  const [sent, setSent] = useState(false)
  const ways = [
    ['Phone', site.phones.join(' · '), `tel:${site.phones[0]}`],
    ['WhatsApp', site.phones[1], wa],
    ['Helpline', site.helpline, `tel:${site.helpline}`],
    ['Email', site.email, `mailto:${site.email}`],
  ]
  return (
    <>
      <PageHeader crumb="Contact" sub="Contact" title="We’re here to help"
        desc="Questions about a course, a consultation or an IRB submission? Call, WhatsApp, email, or visit our centre in Hatirpool." />

      <Section tone="alt">
        <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map(([k, v, href], i) => (
            <Reveal key={k} delay={i * 0.05} className="h-full">
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block h-full bg-white p-6 transition-colors hover:bg-white-2">
                <p className="meta">{k}</p><p className="mt-3 text-lg font-medium">{v}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead sub="Visit us" title="Our centre" />
            <p className="mt-6 text-lg">{site.address}</p>
            <p className="mt-2 text-gray-2">Saturday – Thursday, 10:00 – 19:00</p>
            <div className="mt-8 h-72 overflow-hidden border border-black/10"><iframe title="Map" src="https://www.google.com/maps?q=Meher+Tower,+Sonargaon+Road,+Hatirpool,+Dhaka&output=embed" className="h-full w-full" loading="lazy" /></div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-black/10 bg-white-2 p-7 sm:p-8">
              <h2 className="headline text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-gray-2">We reply within one working day.</p>
              {sent ? (
                <p className="mt-8 text-xl font-medium">Thank you — your message has been sent. (Demo)</p>
              ) : (
                <form className="mt-6 grid gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Name" placeholder="Your name" required /><Field label="Phone" placeholder="01XXX-XXXXXX" /></div>
                  <Field label="Email" type="email" placeholder="you@example.com" required />
                  <Field label="Subject" as="select">{['Course enquiry', 'Research consultancy', 'IRB submission', 'Collaboration', 'Other'].map((o) => <option key={o}>{o}</option>)}</Field>
                  <Field label="Message" as="textarea" rows={5} required />
                  <Solid type="submit" className="w-full">Send message</Solid>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      <NextSteps title="Looking for something specific?" items={['courses', 'consultancy', 'irb']} />
    </>
  )
}
