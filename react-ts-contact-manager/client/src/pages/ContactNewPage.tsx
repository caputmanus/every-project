import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import type { ContactInput } from '../services/api'
import { ContactForm } from '../components/ContactForm'

export function ContactNewPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: ContactInput) {
    const contact = await api.createContact(data)
    navigate('/contacts/' + contact.id)
  }

  return (
    <section>
      <h1>Новый контакт</h1>
      <ContactForm submitText="Создать" onSubmit={handleSubmit} />
    </section>
  )
}
