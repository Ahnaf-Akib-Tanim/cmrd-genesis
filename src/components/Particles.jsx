import { useEffect, useRef } from 'react'

/* Drifting data-network: points connected by hairlines, gently repelled by the pointer. */
export default function Particles({ className = '', density = 1, color = '243,241,236', accent = '255,90,31', link = 130 }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, pts = [], raf, mouse = { x: -1e4, y: -1e4 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((w * h) / 16000 * density)
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() < .08 ? 2 : 1, a: Math.random() < .06 }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduce) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
          if (d2 < 22500) { const f = (1 - d2 / 22500) * .6; p.vx += dx / Math.sqrt(d2) * f * .05; p.vy += dy / Math.sqrt(d2) * f * .05 }
          p.x += p.vx; p.y += p.vy; p.vx *= .995; p.vy *= .995
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
        }
      }
      ctx.lineWidth = .5
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy
        if (d < link * link) { ctx.strokeStyle = `rgba(${color},${(1 - Math.sqrt(d) / link) * .22})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
      }
      for (const p of pts) { ctx.fillStyle = p.a ? `rgba(${accent},.9)` : `rgba(${color},.55)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill() }
      raf = requestAnimationFrame(draw)
    }
    const onMove = (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top } }
    const ro = new ResizeObserver(resize); ro.observe(c)
    window.addEventListener('mousemove', onMove, { passive: true })
    resize(); draw()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('mousemove', onMove) }
  }, [density, color, accent, link])
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
