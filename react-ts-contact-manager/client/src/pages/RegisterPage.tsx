import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export function RegisterPage() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const user = await api.register(form.name, form.email, form.password)
      setUser(user)
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Имя
          <input required value={form.name} onChange={e => setField('name', e.target.value)} />
        </label>
        <label>Email
          <input required type="email" value={form.email} onChange={e => setField('email', e.target.value)} />
        </label>
        <label>Пароль (минимум 6 символов)
          <input required type="password" minLength={6} value={form.password} onChange={e => setField('password', e.target.value)} />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit">Создать аккаунт</button>
      </form>
      <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </section>
  )
}
