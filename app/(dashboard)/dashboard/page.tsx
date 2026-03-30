'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Plus, FileText, Eye, Pencil, Trash2, Copy, CheckCheck, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'

type Form = {
  id: string
  title: string
  description: string
  is_published: boolean
  created_at: string
  submission_count?: number
}

export default function DashboardPage() {
  const supabase = createClient()
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => { loadForms() }, [])

  async function loadForms() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) setForms(data)
    setLoading(false)
  }

  async function deleteForm(id: string) {
    if (!confirm('Delete this form? All submissions will be lost.')) return
    await supabase.from('forms').delete().eq('id', id)
    setForms(f => f.filter(x => x.id !== id))
  }

  function copyLink(id: string) {
    navigator.clipboard.writeText(`${window.location.origin}/f/${id}`)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal-900">My Forms</h1>
          <p className="text-charcoal-500 text-sm mt-0.5">Create forms and receive responses on WhatsApp</p>
        </div>
        <a
          href="/dashboard/builder/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl shadow-green transition hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> New Form
        </a>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && forms.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-brand-400" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-800 mb-2">No forms yet</h3>
          <p className="text-charcoal-500 text-sm mb-6">Create your first form and start collecting responses on WhatsApp</p>
          <a
            href="/dashboard/builder/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition"
          >
            <Plus className="w-4 h-4" /> Create First Form
          </a>
        </div>
      )}

      {/* Forms grid */}
      {!loading && forms.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {forms.map((form, i) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 p-6 flex flex-col"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  form.is_published
                    ? 'bg-brand-50 text-brand-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {form.is_published ? '● Live' : '○ Draft'}
                </span>
                <span className="text-xs text-charcoal-400">
                  {new Date(form.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-bold text-charcoal-900 mb-1 text-base">{form.title}</h3>
              <p className="text-sm text-charcoal-500 mb-4 line-clamp-2 flex-1">
                {form.description || 'No description'}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <a
                  href={`/dashboard/builder/${form.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-charcoal-600 hover:bg-charcoal-50 rounded-lg transition"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </a>
                <a
                  href={`/dashboard/submissions/${form.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-charcoal-600 hover:bg-charcoal-50 rounded-lg transition"
                >
                  <BarChart2 className="w-3.5 h-3.5" /> Results
                </a>
                <a
                  href={`/f/${form.id}`}
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-charcoal-600 hover:bg-charcoal-50 rounded-lg transition"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </a>
                <button
                  onClick={() => copyLink(form.id)}
                  className="ml-auto flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg transition"
                >
                  {copied === form.id ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === form.id ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="p-1.5 text-charcoal-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
