import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../data/images'
import { EASE, Lines, Solid, Meta } from '../components/ui'
import Particles from '../components/Particles'

export default function Join() {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'register' ? 'register' : 'login')
  const [done, setDone] = useState(false)
  useEffect(() => { setMode(params.get('mode') === 'register' ? 'register' : 'login') }, [params])
  const switchMode = (m) => { setDone(false); setParams(m === 'register' ? { mode: 'register' } : {}) }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <div className="absolute inset-y-0 left-0 hidden w-1/2 lg:block">
        <img src={images.microscope} alt="" className="h-full w-full object-cover opacity-50" style={{ filter: 'contrast(1.1) saturate(.5)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
        <Particles className="opacity-50" density={0.6} />
        <div className="absolute inset-x-14 bottom-14">
          <Lines as="p" lines={['One account.', 'Every', '*service.*']} inView={false} delay={0.4} className="display text-[clamp(1.8rem,3.96vw,4.32rem)]" />
        </div>
      </div>

      <div className="wrap relative grid min-h-[100svh] items-center pt-32 pb-16 lg:grid-cols-2">
        <div />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 }} className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
          <div className="meta flex gap-8">
            {[['login', 'Sign in'], ['register', 'Create account']].map(([m, l]) => <button key={m} onClick={() => switchMode(m)} className={`relative pb-1 ${mode === m ? 'text-white' : 'text-gray hover:text-white'}`}>{l}{mode === m && <motion.span layoutId="auth" className="absolute inset-x-0 -bottom-px h-px bg-accent" />}</button>)}
          </div>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
                <h1 className="display text-4xl">{mode === 'login' ? 'Welcome back.' : 'Welcome.'}</h1>
                <p className="mt-5 text-gray">Demo only — the authenticated dashboard is outside the scope of this public-pages build.</p>
                <Solid to="/" className="mt-10">Back to home</Solid>
              </motion.div>
            ) : (
              <motion.form key={mode} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-12 space-y-8" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
                <h1 className="display text-4xl sm:text-5xl">{mode === 'login' ? 'Sign in.' : 'Join us.'}</h1>
                {mode === 'register' && <div className="grid gap-8 sm:grid-cols-2"><F label="Full name" placeholder="Dr. Your Name" required /><F label="Phone" placeholder="01XXX-XXXXXX" required /></div>}
                <F label="Email" type="email" placeholder="you@example.com" required />
                <F label="Password" type="password" placeholder="••••••••" required />
                {mode === 'register' && <div><label className="meta text-gray">I am a</label><select className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-white outline-none focus:border-accent">{['Post-graduate trainee (FCPS / MD / MS)', 'MPH student', 'Medical officer / Physician', 'Faculty member', 'Nurse / Allied health', 'Other researcher'].map((o) => <option key={o} className="text-black">{o}</option>)}</select></div>}
                <div className="flex items-center justify-between text-sm text-gray">
                  {mode === 'login' ? <><label className="flex items-center gap-2"><input type="checkbox" className="accent-accent" /> Remember me</label><a href="#" className="ul text-white">Forgot password?</a></> : <label className="flex items-start gap-2"><input type="checkbox" required className="mt-1 accent-accent" /><span>I agree to the <Link to="/terms" className="ul text-white">Terms</Link> and <Link to="/privacy-policy" className="ul text-white">Privacy Policy</Link></span></label>}
                </div>
                <Solid type="submit" className="w-full justify-between">{mode === 'login' ? 'Sign in' : 'Create account'}</Solid>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function F({ label, ...rest }) {
  return <div><label className="meta text-gray">{label}</label><input {...rest} className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/25 focus:border-accent" /></div>
}

export { Meta }
