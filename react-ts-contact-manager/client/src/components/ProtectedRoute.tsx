import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p className="notice">Загрузка…</p>
  if (!user) {
    // запоминаем, куда хотел попасть пользователь — вернём его сюда после входа
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
