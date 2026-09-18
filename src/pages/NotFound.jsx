import { Lines, Btn } from '../components/ui'
import Particles from '../components/Particles'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black pb-20 pt-40">
      <Particles className="opacity-50" />
      <div className="wrap relative">
        <div className="display-narrow text-[30vw] leading-[0.75] text-white/[0.06] lg:text-[20vw]">404</div>
        <Lines as="h1" lines={['Still under', '*review.*']} inView={false} className="display -mt-[4vw] text-[clamp(1.8rem,5.04vw,5.04rem)]" />
        <p className="mt-6 text-gray">The page you requested does not exist in this demo.</p>
        <Btn to="/" className="mt-10">Back to home</Btn>
      </div>
    </section>
  )
}
