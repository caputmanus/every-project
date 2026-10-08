import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const user = await api.login(email, password)
      setUser(user)
      // возвращаемся на страницу, с которой послали на вход
      const from = (location.state as { from?: string } | null)?.from
      navigate(from ?? '/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Email
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>Пароль
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit">Войти</button>
      </form>
      <p>Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link></p>
    </section>
  )
}
