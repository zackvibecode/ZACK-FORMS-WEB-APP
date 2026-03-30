'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { Send, Loader2 } from 'lucide-react'
import Logo from '@/components/Logo'

type Field = {
  id: string
  type: string
  label: string
  placeholder: string
  required: boolean
  options: string[]
}

type Form = {
  id: string
  title: string
  description: string
  fields: Field[]
  whatsapp_number: string
}

export default function PublicFormPage() {
  const params = useParams()
  const formId = params.formId as string
  const supabase = createClient()

  const [form, setForm] = useState<Form | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .eq('is_published', true)
      .single()
      .then(({ data }) => {
        if (!data) setNotFound(true)
        else setForm(data)
        setLoading(false)
      })
  }, [formId])

  function setValue(id: string, value: string) {
    setValues(prev => ({ ...prev, [id]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form) return

    // Build WhatsApp message from form answers
    const lines = form.fields
      .map(f => `*${f.label}:* ${values[f.id] ?? '-'}`)
      .join('\n')

    const message = `📋 *${form.title}*\n\n${lines}`

    // Save to Supabase silently in background (won't block the WhatsApp redirect)
    supabase.from('submissions').insert({ form_id: form.id, data: values }).then()

    // Clean the phone number (remove spaces, dashes, +)
    const phone = form.whatsapp_number.replace(/[^0-9]/g, '')

    // Open WhatsApp with pre-filled message
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(waLink, '_blank')
  }

  // ── States ──────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-screen bg-charcoal-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen bg-charcoal-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-charcoal-800 mb-2">Form not found</h2>
        <p className="text-charcoal-500 text-sm">This form may have been removed or the link is incorrect.</p>
      </div>
    </div>
  )

  if (!form) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/40 to-white py-12 px-4">
      <div className="max-w-lg mx-auto">

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft-lg overflow-hidden">

          {/* Green top bar */}
          <div className="h-2 bg-gradient-to-r from-brand-400 to-brand-600" />

          <div className="p-8">
            {/* Title */}
            <h1 className="text-2xl font-extrabold text-charcoal-900 mb-2">{form.title}</h1>
            {form.description && (
              <p className="text-charcoal-500 text-sm leading-relaxed mb-6">{form.description}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {form.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}…`}
                      value={values[field.id] ?? ''}
                      onChange={e => setValue(field.id, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={values[field.id] ?? ''}
                      onChange={e => setValue(field.id, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition bg-white appearance-none"
                    >
                      <option value="">Choose an option…</option>
                      {field.options.filter(Boolean).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}…`}
                      value={values[field.id] ?? ''}
                      onChange={e => setValue(field.id, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    />
                  )}
                </div>
              ))}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold rounded-2xl shadow-green transition-all duration-200 flex items-center justify-center gap-2.5 text-base mt-2"
              >
                {/* WhatsApp icon */}
                <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp
              </button>

              {/* Helper text */}
              <p className="text-center text-xs text-charcoal-400">
                Clicking will open WhatsApp with your answers ready to send
              </p>
            </form>
          </div>
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <span className="text-xs text-charcoal-400">Powered by</span>
          <Logo size={16} textSize="text-xs" />
        </div>
      </div>
    </div>
  )
}
