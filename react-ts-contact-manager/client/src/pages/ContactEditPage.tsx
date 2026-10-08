import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { Contact, ContactInput } from '../services/api'
import { ContactForm } from '../components/ContactForm'

export function ContactEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState<Contact | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getContact(id!).then(setContact).catch(err => setError(err.message))
  }, [id])

  async function handleSubmit(data: ContactInput) {
    await api.updateContact(id!, data) // чужой контакт -> сервер ответит 403, покажем ошибку
    navigate('/contacts/' + id)
  }

  if (error) return <p className="error">{error}</p>
  if (!contact) return <p className="notice">Загрузка…</p>

  return (
    <section>
      <h1>Редактирование</h1>
      <ContactForm initial={contact} submitText="Сохранить" onSubmit={handleSubmit} />
    </section>
  )
}
