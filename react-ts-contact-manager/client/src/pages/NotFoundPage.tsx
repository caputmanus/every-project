import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="center">
      <h1>404</h1>
      <p>Такой страницы нет.</p>
      <p><Link to="/">На главную</Link></p>
    </section>
  )
}
