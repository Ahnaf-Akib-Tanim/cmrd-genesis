import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../data/images'
import { Solid, Field } from '../components/ui'

const perks = ['Enrol in courses and watch recorded videos', 'Book consultations and track your requests', 'Submit IRB protocols and follow the review', 'Download certificates and approval letters']

export default function Join() {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'register' ? 'register' : 'login')
  const [done, setDone] = useState(false)
  useEffect(() => { setMode(params.get('mode') === 'register' ? 'register' : 'login') }, [params])
  const switchMode = (m) => { setDone(false); setParams(m === 'register' ? { mode: 'register' } : {}) }

  return (
    <section className="light pt-32 pb-20 sm:pt-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="meta text-accent">Join Us</p>
          <h1 className="headline mt-4 text-4xl sm:text-5xl">One free account for everything at CMRD</h1>
          <ul className="mt-8 space-y-3">
            {perks.map((p) => <li key={p} className="flex gap-3 text-[16px]"><span className="mt-2.5 h-1 w-3 shrink-0 bg-accent" />{p}</li>)}
          </ul>
          <div className="img grade mt-10 hidden lg:block" style={{ aspectRatio: '16/10' }}><img src={images.classroom} alt="" /></div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border border-black/10 bg-white-2 p-7 sm:p-10">
            <div className="grid grid-cols-2 border border-black/15 bg-white p-1 text-sm">
              {[['login', 'Sign in'], ['register', 'Create account']].map(([m, l]) => (
                <button key={m} onClick={() => switchMode(m)} className={`py-2.5 font-medium transition-colors ${mode === m ? 'bg-black text-white' : 'text-gray-2 hover:text-black'}`}>{l}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10">
                  <h2 className="headline text-3xl">{mode === 'login' ? 'Welcome back.' : 'Welcome to CMRD.'}</h2>
                  <p className="mt-3 text-gray-2">Demo only — the member dashboard is outside the scope of this public-pages redesign.</p>
                  <Solid to="/" className="mt-8">Back to home</Solid>
                </motion.div>
              ) : (
                <motion.form key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8 grid gap-5" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
                  {mode === 'register' && <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" placeholder="Dr. Your Name" required /><Field label="Phone" placeholder="01XXX-XXXXXX" required /></div>}
                  <Field label="Email" type="email" placeholder="you@example.com" required />
                  <Field label="Password" type="password" placeholder="At least 8 characters" required />
                  {mode === 'register' && (
                    <Field label="I am a" as="select">
                      {['Post-graduate trainee (FCPS / MD / MS)', 'MPH student', 'Medical officer / Physician', 'Faculty member', 'Nurse / Allied health', 'Other researcher'].map((o) => <option key={o}>{o}</option>)}
                    </Field>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    {mode === 'login'
                      ? <><label className="flex items-center gap-2 text-gray-2"><input type="checkbox" className="accent-accent" /> Remember me</label><a href="#" className="ul">Forgot password?</a></>
                      : <label className="flex items-start gap-2 text-gray-2"><input type="checkbox" required className="mt-1 accent-accent" /><span>I agree to the <Link to="/terms" className="ul text-black">Terms</Link> and <Link to="/privacy-policy" className="ul text-black">Privacy Policy</Link></span></label>}
                  </div>
                  <Solid type="submit" className="w-full">{mode === 'login' ? 'Sign in' : 'Create account'}</Solid>
                  <p className="text-center text-sm text-gray-2">
                    {mode === 'login' ? 'New to CMRD? ' : 'Already have an account? '}
                    <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} className="ul text-black">{mode === 'login' ? 'Create an account' : 'Sign in'}</button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
