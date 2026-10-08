import { Link } from 'react-router-dom'
import type { Contact } from '../services/api'

type Props = {
  contact: Contact
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function ContactCard({ contact, onEdit, onDelete }: Props) {
  return (
    <div className="card">
      <h3><Link to={'/contacts/' + contact.id}>{contact.name}</Link></h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      {contact.tags ? <p className="tags">{contact.tags}</p> : null}
      <span className={contact.status === 'active' ? 'badge ok' : 'badge'}>
        {contact.status === 'active' ? 'активен' : 'в архиве'}
      </span>
      {onEdit || onDelete ? (
        <div className="row">
          {onEdit ? <button className="btn" onClick={() => onEdit(contact.id)}>Изменить</button> : null}
          {onDelete ? <button className="btn danger" onClick={() => onDelete(contact.id)}>Удалить</button> : null}
        </div>
      ) : null}
    </div>
  )
}
