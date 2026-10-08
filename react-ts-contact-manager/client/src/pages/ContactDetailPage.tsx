import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { Contact } from '../services/api'
import { useAuth } from '../context/AuthContext'

export function ContactDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [contact, setContact] = useState<Contact | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getContact(id!).then(setContact).catch(err => setError(err.message))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (!contact) return <p className="notice">Загрузка…</p>

  const isOwner = user !== null && user.id === contact.userId

  async function handleDelete() {
    if (!window.confirm('Удалить контакт «' + contact.name + '»?')) return
    await api.deleteContact(contact.id)
    navigate('/dashboard')
  }

  return (
    <section className="card">
      <h1>{contact.name}</h1>
      <p>Email: {contact.email}</p>
      <p>Телефон: {contact.phone}</p>
      <p>Теги: {contact.tags || '—'}</p>
      <p>Статус: {contact.status === 'active' ? 'активен' : 'в архиве'}</p>
      {isOwner ? (
        <div className="row">
          <Link className="btn" to={'/contacts/' + contact.id + '/edit'}>Изменить</Link>
          <button className="btn danger" onClick={handleDelete}>Удалить</button>
        </div>
      ) : null}
      <p><Link to="/contacts">← Ко всем контактам</Link></p>
    </section>
  )
}
