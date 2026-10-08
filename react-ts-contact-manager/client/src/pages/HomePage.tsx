import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import type { Contact } from '../services/api'
import { ContactCard } from '../components/ContactCard'

export function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    api.getContacts()
    .then(function (data) {
      // Если с сервера пришел null или не массив, сохраняем пустой список []
      if (data && Array.isArray(data)) {
        setContacts(data)
      } else {
        setContacts([])
      }
    })
    .catch(function () {
      setContacts([])
    })
  }, [])

  // Набираем первые 3 контакта через обычный цикл
  const preview: Contact[] = []
  if (contacts) {
    for (let i = 0; i < contacts.length; i++) {
      if (preview.length < 3) {
        preview.push(contacts[i])
      } else {
        break
      }
    }
  }

  return (
    <section>
    <h1>Менеджер контактов</h1>
    <p>Храните свои контакты, ищите по имени и тегам, смотрите демо-профили из внешнего API.</p>
    <p className="row">
    <Link className="btn" to="/register">Создать аккаунт</Link>
    <Link className="btn" to="/contacts">Все контакты</Link>
    </p>
    <h2>Последние контакты</h2>
    {preview.length === 0 ? (
      <p className="notice">Пока пусто.</p>
    ) : (
      <div className="grid">
      {preview.map(c => <ContactCard key={c.id} contact={c} />)}
      </div>
    )}
    </section>
  )
}
