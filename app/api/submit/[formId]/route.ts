import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(
  req: NextRequest,
  { params }: { params: { formId: string } }
) {
  const { formId } = params
  const { data: body } = await req.json().then(d => ({ data: d })).catch(() => ({ data: null }))
  if (!body?.data) return NextResponse.json({ error: 'No data' }, { status: 400 })

  // Create Supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  // Get form (verify it exists and is published)
  const { data: form } = await supabase
    .from('forms')
    .select('id, title, fields, whatsapp_number')
    .eq('id', formId)
    .eq('is_published', true)
    .single()

  if (!form) return NextResponse.json({ error: 'Form not found' }, { status: 404 })

  // Save submission to Supabase
  const { error: insertError } = await supabase
    .from('submissions')
    .insert({ form_id: formId, data: body.data })

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })

  // Send WhatsApp notification (if token + number configured)
  if (
    process.env.WHATSAPP_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    form.whatsapp_number
  ) {
    await sendWhatsApp(form, body.data)
  }

  return NextResponse.json({ success: true })
}

async function sendWhatsApp(
  form: { title: string; fields: { id: string; label: string }[] },
  data: Record<string, string>
) {
  const lines = form.fields
    .map((f: { id: string; label: string }) => `*${f.label}:* ${data[f.id] ?? '—'}`)
    .join('\n')

  const message = `📋 *New Form Submission*\n*Form:* ${form.title}\n\n${lines}`

  const to = (form as any).whatsapp_number.replace(/[^0-9]/g, '')

  await fetch(
    `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      }),
    }
  ).catch(console.error)
}
