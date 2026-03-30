'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { ArrowLeft, Download, Inbox, Loader2 } from 'lucide-react'

type Submission = { id: string; data: Record<string, string>; created_at: string }
type Form = { id: string; title: string; fields: { id: string; label: string }[] }

export default function SubmissionsPage() {
  const params = useParams()
  const formId = params.formId as string
  const supabase = createClient()
  const [form, setForm] = useState<Form | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('forms').select('*').eq('id', formId).single(),
      supabase.from('submissions').select('*').eq('form_id', formId).order('created_at', { ascending: false }),
    ]).then(([{ data: formData }, { data: subData }]) => {
      if (formData) setForm(formData)
      if (subData) setSubmissions(subData)
      setLoading(false)
    })
  }, [formId])

  function exportCSV() {
    if (!form || !submissions.length) return
    const headers = form.fields.map(f => f.label)
    const rows = submissions.map(s =>
      form.fields.map(f => `"${(s.data[f.id] ?? '').replace(/"/g, '""')}"`)
    )
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title}-submissions.csv`
    a.click()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <a href="/dashboard" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition">
          <ArrowLeft className="w-4 h-4 text-charcoal-500" />
        </a>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-charcoal-900">{form?.title ?? 'Submissions'}</h1>
          <p className="text-sm text-charcoal-500">{submissions.length} response{submissions.length !== 1 ? 's' : ''}</p>
        </div>
        {submissions.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-charcoal-700 border border-slate-200 bg-white rounded-xl hover:bg-charcoal-50 transition"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Inbox className="w-12 h-12 text-charcoal-200 mx-auto mb-3" />
          <h3 className="font-bold text-charcoal-700 mb-1">No submissions yet</h3>
          <p className="text-sm text-charcoal-400">Share your form link and responses will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-bold text-charcoal-500 uppercase tracking-wide">Date</th>
                  {form?.fields.map(f => (
                    <th key={f.id} className="px-4 py-3 text-left text-xs font-bold text-charcoal-500 uppercase tracking-wide">
                      {f.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, i) => (
                  <tr key={sub.id} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-charcoal-50/30'}`}>
                    <td className="px-4 py-3 text-charcoal-400 text-xs whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                    {form?.fields.map(f => (
                      <td key={f.id} className="px-4 py-3 text-charcoal-700">
                        {sub.data[f.id] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
