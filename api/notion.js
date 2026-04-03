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

  const {
    prenom, nom, email, telephone,
    restaurant, ville, message,
    source, profil, score,
    volume, note, temps, frein,
  } = req.body

  const nomComplet = [prenom, nom].filter(Boolean).join(' ')

  const properties = {
    Nom: {
      title: [{ text: { content: nomComplet || 'Contact site' } }],
    },
    Email: { email: email || null },
    Statut: {
      select: { name: '🆕 Nouveau' },
    },
    Source: {
      select: { name: source || '🌐 Site web' },
    },
  }

  if (telephone) {
    properties.Téléphone = { phone_number: telephone }
  }

  if (restaurant) {
    properties.Restaurant = {
      rich_text: [{ text: { content: restaurant } }],
    }
  }

  if (ville) {
    properties.Ville = {
      rich_text: [{ text: { content: ville } }],
    }
  }

  if (profil) {
    properties['Profil quiz'] = {
      rich_text: [{ text: { content: `${profil} (score ${score}/18)` } }],
    }
  }

  // Notes enrichies avec toutes les données quiz
  const noteLines = [
    message,
    volume ? `Volume avis : ${volume}` : null,
    note ? `Note Google : ${note}` : null,
    temps ? `Temps réponse : ${temps}` : null,
    frein ? `Frein principal : ${frein}` : null,
    restaurant ? `Restaurant : ${restaurant}` : null,
    ville ? `Ville : ${ville}` : null,
    telephone ? `Tél : ${telephone}` : null,
  ].filter(Boolean)

  if (noteLines.length) {
    properties.Notes = {
      rich_text: [{ text: { content: noteLines.join('\n') } }],
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
