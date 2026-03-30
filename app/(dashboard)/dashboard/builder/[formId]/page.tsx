'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import {
  Plus, Trash2, GripVertical, Save, Eye, ArrowLeft,
  Type, Mail, Phone, AlignLeft, Hash, Calendar, ChevronDown, Loader2
} from 'lucide-react'

type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'number' | 'date' | 'select'

type Field = {
  id: string
  type: FieldType
  label: string
  placeholder: string
  required: boolean
  options: string[]
}

const FIELD_TYPES: { type: FieldType; label: string; icon: React.ElementType }[] = [
  { type: 'text',     label: 'Short Text',  icon: Type },
  { type: 'email',    label: 'Email',       icon: Mail },
  { type: 'phone',    label: 'Phone',       icon: Phone },
  { type: 'textarea', label: 'Long Text',   icon: AlignLeft },
  { type: 'number',   label: 'Number',      icon: Hash },
  { type: 'date',     label: 'Date',        icon: Calendar },
  { type: 'select',   label: 'Dropdown',    icon: ChevronDown },
]

function newField(type: FieldType): Field {
  return {
    id: `field_${Date.now()}`,
    type,
    label: FIELD_TYPES.find(f => f.type === type)?.label ?? 'Field',
    placeholder: '',
    required: false,
    options: type === 'select' ? ['Option 1', 'Option 2'] : [],
  }
}

export default function BuilderPage() {
  const router = useRouter()
  const params = useParams()
  const formId = params.formId as string
  const isNew = formId === 'new'
  const supabase = createClient()

  const [title, setTitle] = useState('Untitled Form')
  const [description, setDescription] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [fields, setFields] = useState<Field[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (!isNew) {
      supabase.from('forms').select('*').eq('id', formId).single().then(({ data }) => {
        if (data) {
          setTitle(data.title)
          setDescription(data.description ?? '')
          setWhatsapp(data.whatsapp_number ?? '')
          setFields(data.fields ?? [])
          setSavedId(data.id)
        }
        setLoading(false)
      })
    }
  }, [formId])

  function addField(type: FieldType) {
    const f = newField(type)
    setFields(prev => [...prev, f])
    setSelected(f.id)
  }

  function updateField(id: string, patch: Partial<Field>) {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f))
  }

  function removeField(id: string) {
    setFields(prev => prev.filter(f => f.id !== id))
    setSelected(null)
  }

  function moveField(id: string, dir: 'up' | 'down') {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id)
      if (dir === 'up' && idx === 0) return prev
      if (dir === 'down' && idx === prev.length - 1) return prev
      const arr = [...prev]
      const swap = dir === 'up' ? idx - 1 : idx + 1
      ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      return arr
    })
  }

  async function save() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const payload = { title, description, fields, whatsapp_number: whatsapp, user_id: user.id }

    if (isNew && !savedId) {
      const { data, error } = await supabase.from('forms').insert(payload).select().single()
      if (data) { setSavedId(data.id); router.replace(`/dashboard/builder/${data.id}`) }
    } else {
      await supabase.from('forms').update(payload).eq('id', savedId ?? formId)
    }
    setSaving(false)
  }

  const activeField = fields.find(f => f.id === selected)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Topbar */}
      <div className="flex items-center gap-4 mb-6">
        <a href="/dashboard" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition">
          <ArrowLeft className="w-4 h-4 text-charcoal-500" />
        </a>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 text-xl font-extrabold text-charcoal-900 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-brand-400 focus:outline-none px-1 py-0.5 transition"
        />
        <div className="flex gap-2">
          {(savedId || !isNew) && (
            <a
              href={`/f/${savedId ?? formId}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-charcoal-700 border border-slate-200 bg-white rounded-xl hover:bg-charcoal-50 transition"
            >
              <Eye className="w-4 h-4" /> Preview
            </a>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-green transition disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr_280px] gap-5">
        {/* Left — Add fields */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
          <h3 className="text-xs font-bold text-charcoal-500 uppercase tracking-widest mb-4">Add Fields</h3>
          <div className="space-y-1.5">
            {FIELD_TYPES.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => addField(type)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-brand-50 hover:text-brand-700 transition text-left"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>

          {/* WhatsApp number */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <label className="block text-xs font-bold text-charcoal-500 uppercase tracking-widest mb-2">
              WhatsApp Number
            </label>
            <input
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="+601xxxxxxxx"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
            />
            <p className="text-[11px] text-charcoal-400 mt-1.5">Submissions will be sent here</p>
          </div>
        </div>

        {/* Center — Form canvas */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Form description (optional)"
            rows={2}
            className="w-full text-sm text-charcoal-500 bg-transparent border-b border-dashed border-slate-200 focus:outline-none focus:border-brand-300 resize-none mb-5 px-1 py-1 transition"
          />

          {fields.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-brand-400" />
              </div>
              <p className="text-sm text-charcoal-400">Click a field type on the left to add it here</p>
            </div>
          )}

          <div className="space-y-3">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                onClick={() => setSelected(field.id)}
                className={`group relative border rounded-xl p-4 cursor-pointer transition ${
                  selected === field.id
                    ? 'border-brand-400 bg-brand-50/30 shadow-sm'
                    : 'border-slate-200 hover:border-brand-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-charcoal-800">{field.label}</span>
                      {field.required && <span className="text-red-500 text-xs font-bold">*</span>}
                      <span className="text-[10px] bg-slate-100 text-charcoal-400 px-1.5 py-0.5 rounded font-mono">{field.type}</span>
                    </div>
                    {/* Preview of field */}
                    {field.type === 'textarea' ? (
                      <div className="h-12 bg-slate-50 border border-slate-200 rounded-lg" />
                    ) : field.type === 'select' ? (
                      <div className="h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3">
                        <span className="text-xs text-slate-400">{field.options[0] ?? 'Select…'}</span>
                      </div>
                    ) : (
                      <div className="h-8 bg-slate-50 border border-slate-200 rounded-lg" />
                    )}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); removeField(field.id) }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-charcoal-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Field settings */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
          {!activeField ? (
            <div className="text-center py-10">
              <p className="text-sm text-charcoal-400">Click a field to edit its settings</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-charcoal-500 uppercase tracking-widest">Field Settings</h3>

              <div>
                <label className="block text-xs font-semibold text-charcoal-600 mb-1.5">Label</label>
                <input
                  value={activeField.label}
                  onChange={e => updateField(activeField.id, { label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-600 mb-1.5">Placeholder</label>
                <input
                  value={activeField.placeholder}
                  onChange={e => updateField(activeField.id, { placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeField.required}
                  onChange={e => updateField(activeField.id, { required: e.target.checked })}
                  className="w-4 h-4 accent-brand-500"
                />
                <span className="text-sm font-medium text-charcoal-700">Required field</span>
              </label>

              {activeField.type === 'select' && (
                <div>
                  <label className="block text-xs font-semibold text-charcoal-600 mb-1.5">Options (one per line)</label>
                  <textarea
                    value={activeField.options.join('\n')}
                    onChange={e => updateField(activeField.id, { options: e.target.value.split('\n') })}
                    rows={5}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition resize-none"
                  />
                </div>
              )}

              {/* Move up/down */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => moveField(activeField.id, 'up')}
                  className="flex-1 py-2 text-xs font-semibold text-charcoal-600 border border-slate-200 rounded-xl hover:bg-charcoal-50 transition"
                >
                  ↑ Move Up
                </button>
                <button
                  onClick={() => moveField(activeField.id, 'down')}
                  className="flex-1 py-2 text-xs font-semibold text-charcoal-600 border border-slate-200 rounded-xl hover:bg-charcoal-50 transition"
                >
                  ↓ Move Down
                </button>
              </div>

              <button
                onClick={() => removeField(activeField.id)}
                className="w-full py-2 text-xs font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition"
              >
                Remove Field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
