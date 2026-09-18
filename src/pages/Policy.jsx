import { Link } from 'react-router-dom'
import { Lines, Reveal, Meta } from '../components/ui'
import { site } from '../data/site'

const content = {
  refund: { lines: ['Refund', '*policy.*'], sections: [
    ['Course fees', 'A full refund is available if a withdrawal request is made at least 7 days before the course start date. Withdrawals within 7 days of the start date are eligible for a 50% refund or a transfer to a future batch. No refund is issued after the second session has been delivered.'],
    ['Consultancy services', 'Consultancy fees are quoted per scope and paid in stages. Any stage not yet started is fully refundable. Work already delivered is non-refundable; however, corrections on delivered work are always free.'],
    ['IRB application fees', 'IRB processing fees are non-refundable once a protocol has entered review. Applications withdrawn before review begins are refunded in full.'],
    ['How to request', `Email ${site.email} or call ${site.helpline} with your account name and payment reference. Refunds are processed within 10 working days to the original payment method.`],
  ] },
  privacy: { lines: ['Privacy', '*policy.*'], sections: [
    ['What we collect', 'Account details (name, phone, email, professional role), course enrolment history, consultancy files you share with us, and IRB submission documents.'],
    ['How we use it', 'To deliver courses and consultancy, process IRB reviews, issue certificates and approval letters, and send service announcements. We never sell personal data.'],
    ['Research data', 'Datasets shared for analysis are used solely for the agreed work, stored securely, and deleted on request after project completion. IRB documents are retained as required by ethical-review record-keeping standards.'],
    ['Your rights', `You may request a copy, correction or deletion of your personal data at any time by contacting ${site.email}.`],
  ] },
  terms: { lines: ['Terms &', '*conditions.*'], sections: [
    ['Use of the platform', 'By creating an account you agree to provide accurate information and to use CMRD services for lawful, ethical research purposes only.'],
    ['Academic integrity', 'CMRD provides training, analysis and editorial support. Intellectual ownership and authorship of research remain with the researcher, who is responsible for representing the work honestly to their institution and journals.'],
    ['Course materials', 'Recorded videos and course materials are licensed for personal use by the enrolled participant only and may not be redistributed.'],
    ['Certificates & approvals', 'Certificates and IRB approval letters carry unique verification codes. Any alteration invalidates the document.'],
    ['Changes', 'CMRD may update these terms; continued use of the platform after changes constitutes acceptance.'],
  ] },
}

export default function Policy({ kind }) {
  const c = content[kind]
  return (
    <>
      <section className="wrap pt-44 pb-20">
        <Meta accent>Legal — updated September 2026</Meta>
        <Lines lines={c.lines} inView={false} delay={0.2} className="display mt-6 text-[clamp(2.2rem,7.2vw,7.92rem)]" />
      </section>
      <section className="light py-32">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            {c.sections.map(([h, p], i) => (
              <Reveal key={h} className="grid grid-cols-[3.5rem_1fr] gap-4 hairline py-10">
                <span className="meta pt-2 text-gray-2">{String(i + 1).padStart(2, '0')}</span>
                <div><h2 className="display-wide text-3xl">{h}</h2><p className="mt-4 text-lg text-gray-2">{p}</p></div>
              </Reveal>
            ))}
            <div className="hairline" />
            <p className="mt-10 text-gray-2">Questions? <Link to="/contact" className="ul text-black">Contact us</Link> or email <a href={`mailto:${site.email}`} className="ul text-black">{site.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
