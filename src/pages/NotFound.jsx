import { Solid, Btn } from '../components/ui'

export default function NotFound() {
  return (
    <section className="light flex min-h-[80svh] items-center pt-32 pb-20">
      <div className="wrap">
        <p className="meta text-accent">Error 404</p>
        <h1 className="headline mt-4 text-4xl sm:text-5xl">We couldn’t find that page.</h1>
        <p className="mt-4 max-w-lg text-lg text-gray-2">It may have moved, or the link may be wrong. Try one of these instead:</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Solid to="/">Go to home</Solid>
          <Btn to="/courses">Courses</Btn>
          <Btn to="/consultancy">Consultancy</Btn>
          <Btn to="/contact">Contact</Btn>
        </div>
      </div>
    </section>
  )
}
