import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

export function Layout() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await api.logout()
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <header className="header">
        <span className="logo">Мои Контакты</span>
        <nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/contacts">Все контакты</NavLink>
          <NavLink to="/explore">Каталог API</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">Мой кабинет</NavLink>
              <button onClick={handleLogout}>Выйти ({user.name})</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Вход</NavLink>
              <NavLink to="/register">Регистрация</NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
