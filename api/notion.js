// Vercel serverless function — proxie les soumissions vers Notion API
// Évite le blocage CORS des requêtes browser directes vers api.notion.com

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.NOTION_TOKEN
  const dbId = process.env.NOTION_DB_ID

  // Diagnostic — visible dans les logs Vercel Functions
  console.log('[notion] NOTION_TOKEN présent :', Boolean(token))
  console.log('[notion] NOTION_DB_ID présent :', Boolean(dbId))
  console.log('[notion] DB_ID value :', dbId)

  if (!token || !dbId) {
    console.error('[notion] Variables manquantes — vérifie Vercel Dashboard > Settings > Environment Variables')
    return res.status(500).json({
      error: 'Missing Notion configuration',
      debug: { token: Boolean(token), dbId: Boolean(dbId) },
    })
  }

  // Champs envoyés par Contact.jsx
  const {
    nom,           // nom complet (prenom + nom combinés côté front)
    email,
    telephone,
    etablissement,
    ville,
    message,
    note_google,   // valeur select quiz (ex: "⭐⭐ Entre 3.5 et 4.0")
    volume_avis,   // valeur select quiz (ex: "📊 Entre 5 et 20")
    profil_quiz,   // valeur select quiz (ex: "🔴 Exposé — urgent")
    score_quiz,    // nombre brut (ex: "14")
    source,        // "📝 Formulaire contact" ou "🎯 Quiz site web"
  } = req.body

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const properties = {
    // ── Propriétés obligatoires ──────────────────────────────────
    'Nom complet': {
      title: [{ text: { content: nom || 'Contact site' } }],
    },
    'Email': {
      email: email || null,
    },
    'Source': {
      select: { name: source || '📝 Formulaire contact' },
    },
    'Statut Lead': {
      select: { name: '🆕 Nouveau' },
    },
    'Date premier contact': {
      date: { start: today },
    },
  }

  // ── Propriétés optionnelles ──────────────────────────────────
  if (telephone) {
    properties['Téléphone'] = { phone_number: telephone }
  }

  if (etablissement) {
    properties['Établissement'] = {
      rich_text: [{ text: { content: etablissement } }],
    }
  }

  if (ville) {
    properties['Ville'] = {
      rich_text: [{ text: { content: ville } }],
    }
  }

  if (note_google) {
    properties['Note Google actuelle'] = {
      select: { name: note_google },
    }
  }

  if (volume_avis) {
    properties['Volume avis/mois'] = {
      select: { name: volume_avis },
    }
  }

  if (profil_quiz) {
    properties['Profil Quiz'] = {
      select: { name: profil_quiz },
    }
  }

  if (score_quiz !== undefined && score_quiz !== '') {
    properties['Score Quiz'] = {
      number: Number(score_quiz),
    }
  }

  if (message) {
    properties['Message initial'] = {
      rich_text: [{ text: { content: message } }],
    }
  }

  console.log('[notion] Payload envoyé à Notion :', JSON.stringify({ parent: { database_id: dbId }, properties }, null, 2))

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties,
      }),
    })

    if (!notionRes.ok) {
      const err = await notionRes.text()
      console.error('[notion] Notion API error status:', notionRes.status)
      console.error('[notion] Notion API error body:', err)
      return res.status(502).json({ error: 'Notion API error', status: notionRes.status, detail: err })
    }

    const data = await notionRes.json()
    console.log('[notion] Page créée avec succès, id:', data.id)
    return res.status(200).json({ ok: true, id: data.id })
  } catch (e) {
    console.error('[notion] Fetch error:', e.message)
    return res.status(500).json({ error: 'Internal error', detail: e.message })
  }
}
