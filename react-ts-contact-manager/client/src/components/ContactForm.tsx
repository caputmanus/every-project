import { useState, type FormEvent } from 'react'
import type { Contact, ContactInput } from '../services/api'

type Props = {
  initial?: Contact
  submitText: string
  onSubmit: (data: ContactInput) => void | Promise<void>
}

export function ContactForm({ initial, submitText, onSubmit }: Props) {
  // один useState на все поля формы (группировка вместо пяти отдельных стейтов)
  const [form, setForm] = useState({
    name: initial ? initial.name : '',
    email: initial ? initial.email : '',
    phone: initial ? initial.phone : '',
    tags: initial ? initial.tags : '',
    status: initial ? initial.status : 'active'
  })
  const [error, setError] = useState('')

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit(form)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Имя *
        <input required value={form.name} onChange={e => setField('name', e.target.value)} />
      </label>
      <label>Email *
        <input required type="email" value={form.email} onChange={e => setField('email', e.target.value)} />
      </label>
      <label>Телефон *
        <input required value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+7 700 000-00-00" />
      </label>
      <label>Теги (через запятую)
        <input value={form.tags} onChange={e => setField('tags', e.target.value)} placeholder="работа, друзья" />
      </label>
      <label>Статус
        <select value={form.status} onChange={e => setField('status', e.target.value)}>
          <option value="active">активен</option>
          <option value="archived">в архиве</option>
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="btn" type="submit">{submitText}</button>
    </form>
  )
}
