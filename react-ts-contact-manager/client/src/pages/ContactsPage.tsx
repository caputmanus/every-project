import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { Contact } from '../services/api'
import { ContactCard } from '../components/ContactCard'

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.getContacts().then(setContacts).catch(err => setError(err.message))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (contacts === null) return <p className="notice">Загрузка…</p>

  const q = query.trim().toLowerCase()
  const found: Contact[] = []
  for (const c of contacts) {
    const text = (c.name + ' ' + c.email + ' ' + c.tags).toLowerCase()
    if (text.includes(q)) found.push(c)
  }

  return (
    <section>
      <h1>Все контакты</h1>
      <input
        className="search"
        placeholder="Поиск по имени, email или тегам"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {found.length === 0 ? (
        <p className="notice">Ничего не найдено.</p>
      ) : (
        <div className="grid">
          {found.map(c => <ContactCard key={c.id} contact={c} />)}
        </div>
      )}
    </section>
  )
}
