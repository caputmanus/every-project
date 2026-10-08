import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import type { Contact } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { ContactCard } from '../components/ContactCard'

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState<Contact[] | null>(null)

  useEffect(() => {
    api.getMyContacts().then(setContacts).catch(() => setContacts([]))
  }, [])

  if (contacts === null) return <p className="notice">Загрузка…</p>

  async function handleDelete(id: number) {
    if (!window.confirm('Удалить контакт?')) return
    await api.deleteContact(id)
    api.getMyContacts().then(setContacts) // просто перечитываем список
  }

  return (
    <section>
      <h1>Мои контакты{user ? ' · ' + user.name : ''}</h1>
      <p><Link className="btn" to="/contacts/new">Новый контакт</Link></p>
      {contacts.length === 0 ? (
        <p className="notice">Контактов пока нет. Создайте первый!</p>
      ) : (
        <div className="grid">
          {contacts.map(c => (
            <ContactCard
              key={c.id}
              contact={c}
              onEdit={id => navigate('/contacts/' + id + '/edit')}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
