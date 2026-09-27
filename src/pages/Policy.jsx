import { Link } from 'react-router-dom'
import { Reveal, Section, PageHeader } from '../components/ui'
import { site } from '../data/site'

const content = {
  refund: { crumb: 'Refund Policy', title: 'Refund Policy', sections: [
    ['Course fees', 'You get a full refund if you withdraw at least 7 days before the course starts. If you withdraw within 7 days of the start date, you can get a 50% refund or move to a future batch. No refund is given after the second session.'],
    ['Consultancy services', 'Consultancy fees are quoted for the agreed work and paid in stages. Any stage that has not started is fully refundable. Work already delivered is not refundable, but corrections on it are always free.'],
    ['IRB application fees', 'IRB fees are not refundable once your protocol has entered review. If you withdraw before the review begins, you get a full refund.'],
    ['How to request a refund', `Email ${site.email} or call ${site.helpline} with your name and payment reference. Refunds are processed within 10 working days to the original payment method.`],
  ] },
  privacy: { crumb: 'Privacy Policy', title: 'Privacy Policy', sections: [
    ['What we collect', 'Your account details (name, phone, email, profession), your course enrolments, files you share for consultancy, and documents you submit to the IRB.'],
    ['How we use it', 'To run your courses and consultations, process IRB reviews, issue certificates and approval letters, and send you service updates. We never sell your data.'],
    ['Your research data', 'Datasets you share are used only for the agreed work, stored securely, and deleted on request after the project ends. IRB documents are kept as ethical-review record rules require.'],
    ['Your rights', `You can ask for a copy of your data, or ask us to correct or delete it, by emailing ${site.email}.`],
  ] },
  terms: { crumb: 'Terms & Conditions', title: 'Terms & Conditions', sections: [
    ['Using the platform', 'By creating an account you agree to give accurate information and to use CMRD services only for lawful, ethical research.'],
    ['Academic integrity', 'CMRD provides training, analysis and editing support. The research and its authorship remain yours, and you are responsible for presenting it honestly.'],
    ['Course materials', 'Recorded videos and course materials are for the enrolled participant only and may not be shared.'],
    ['Certificates & approvals', 'Certificates and IRB approval letters carry a unique verification code. Any alteration makes the document invalid.'],
    ['Changes to these terms', 'CMRD may update these terms. Continuing to use the platform means you accept the updated terms.'],
  ] },
}

export default function Policy({ kind }) {
  const c = content[kind]
  return (
    <>
      <PageHeader crumb={c.crumb} sub="Company" title={c.title} desc="Last updated September 2026. Applies to all CMRD services." />
      <Section tone="alt">
        <div className="mx-auto max-w-3xl">
          {c.sections.map(([h, p], i) => (
            <Reveal key={h} className="border-b border-black/10 py-8 first:border-t">
              <h2 className="text-xl font-medium">{i + 1}. {h}</h2>
              <p className="mt-3 leading-relaxed text-gray-2">{p}</p>
            </Reveal>
          ))}
          <p className="mt-10 text-gray-2">Questions? <Link to="/contact" className="ul text-black">Contact us</Link> or email <a href={`mailto:${site.email}`} className="ul text-black">{site.email}</a>.</p>
        </div>
      </Section>
    </>
  )
}
