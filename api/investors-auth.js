// Serverless endpoint — validates investor access password server-side.
// Forensic #5 (AUDIT_06_MAI_2026.md) — password was previously hardcoded in client bundle.
// Set INVESTORS_PASSWORD as a Sensitive env var in Vercel (Production + Preview).
import crypto from 'crypto'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const expected = process.env.INVESTORS_PASSWORD
  if (!expected) {
    return res.status(500).json({ error: 'Service misconfigured' })
  }

  const { password } = req.body ?? {}
  if (typeof password !== 'string' || password.length !== expected.length) {
    return res.status(401).json({ ok: false })
  }

  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  const match = crypto.timingSafeEqual(a, b)

  return res.status(match ? 200 : 401).json({ ok: match })
}
