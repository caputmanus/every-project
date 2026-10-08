export type User = { id: number; name: string; email: string }

export type Contact = {
  id: number
  userId: number
  name: string
  email: string
  phone: string
  tags: string
  status: 'active' | 'archived'
  createdAt: string
}

export type ContactInput = {
  name: string
  email: string
  phone: string
  tags: string
  status: string
}

async function request(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  let data: any = null
  try {
    data = await res.json()
  } catch {
    // пустое тело ответа
  }
  if (!res.ok) throw new Error(data && data.error ? data.error : 'Ошибка ' + res.status)
  return data
}

function send(url: string, method: string, body?: object) {
  return request(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  })
}

export const api = {
  register: (name: string, email: string, password: string) =>
    send('/api/register', 'POST', { name, email, password }) as Promise<User>,

  login: (email: string, password: string) =>
    send('/api/login', 'POST', { email, password }) as Promise<User>,

  logout: () => send('/api/logout', 'POST'),

  getContacts: () => request('/api/contacts') as Promise<Contact[]>,
  getContact: (id: string) => request('/api/contacts/' + id) as Promise<Contact>,
  getMyContacts: () => request('/api/contacts/mine') as Promise<Contact[]>,

  createContact: (data: ContactInput) => send('/api/contacts', 'POST', data) as Promise<Contact>,
  updateContact: (id: string, data: ContactInput) => send('/api/contacts/' + id, 'PUT', data) as Promise<Contact>,
  deleteContact: (id: number) => send('/api/contacts/' + id, 'DELETE')
}
