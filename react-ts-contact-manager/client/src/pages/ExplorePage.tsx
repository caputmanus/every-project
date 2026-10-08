import { useEffect, useState } from 'react'

type DummyUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  company: { name: string }
}

export function ExplorePage() {
  const [users, setUsers] = useState<DummyUser[] | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    setUsers(null)
    setError('')

    fetch('https://dummyjson.com/users?limit=12', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(data => setUsers(data.users))
      .catch(err => {
        if (err.name !== 'AbortError') setError('Не удалось загрузить данные. Проверьте интернет.')
      })

    // очистка эффекта: отмена устаревшего запроса
    return () => controller.abort()
  }, [reload])

  if (error) {
    return (
      <section>
        <h1>Каталог людей (внешний API)</h1>
        <p className="error">{error}</p>
        <button className="btn" onClick={() => setReload(reload + 1)}>Повторить</button>
      </section>
    )
  }

  if (users === null) return <p className="notice">Загрузка…</p>

  const q = query.trim().toLowerCase()
  const found: DummyUser[] = []
  for (const u of users) {
    const text = (u.firstName + ' ' + u.lastName + ' ' + u.email + ' ' + u.company.name).toLowerCase()
    if (text.includes(q)) found.push(u)
  }

  return (
    <section>
      <h1>Каталог людей (внешний API)</h1>
      <p>Живой GET-запрос к dummyjson.com — видно во вкладке Network.</p>
      <input
        className="search"
        placeholder="Поиск по имени, email, компании"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="btn" onClick={() => setReload(reload + 1)}>Обновить</button>
      {found.length === 0 ? (
        <p className="notice">Ничего не найдено.</p>
      ) : (
        <div className="grid">
          {found.map(u => (
            <div className="card" key={u.id}>
              <img src={u.image} alt={u.firstName + ' ' + u.lastName} />
              <h3>{u.firstName} {u.lastName}</h3>
              <p>{u.email}</p>
              <p>{u.phone}</p>
              <p className="tags">{u.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
