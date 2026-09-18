import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Dot + ring cursor. Elements opt-in with data-cursor="view|link|drag". */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('')
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) setMode(t.dataset.cursor)
      else if (e.target.closest('a, button, [role=button], input, select, textarea, label')) setMode('link')
      else setMode('')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); document.body.classList.remove('has-cursor') }
  }, [x, y])

  if (!enabled) return null
  const big = mode === 'view' || mode === 'drag'
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference" />
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-white/80 mix-blend-difference"
        animate={{ width: big ? 88 : mode === 'link' ? 40 : 28, height: big ? 88 : mode === 'link' ? 40 : 28, marginLeft: big ? -44 : mode === 'link' ? -20 : -14, marginTop: big ? -44 : mode === 'link' ? -20 : -14, backgroundColor: big ? 'rgba(243,241,236,0.95)' : 'rgba(243,241,236,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {big && <span className="meta text-black" style={{ fontSize: 10 }}>{mode === 'drag' ? 'Drag' : 'View'}</span>}
      </motion.div>
    </>
  )
}
