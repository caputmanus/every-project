# Менеджер контактов (тема №20)

Полноценный сайт: регистрация, вход, личный кабинет, CRUD контактов
на собственном сервере, страница с внешним API.

## Стек
- Frontend: React 19 + TypeScript + Vite, React Router DOM 7
- Backend: Node.js + Express 5, данные в server/db.json (переживает перезапуск)
- Auth: bcryptjs, сессия в HttpOnly cookie
- Внешний API: GET https://dummyjson.com/users?limit=12

## Запуск (Node 20+), два терминала
    cd server  && npm install && npm run dev    # http://localhost:4000
    cd client  && npm install && npm run dev    # http://localhost:5173

Vite проксирует /api на сервер — cookie работают без CORS.

## Маршруты
| Путь | Доступ | Назначение |
|---|---|---|
| / | публичный | главная, обзор контактов |
| /contacts | публичный | все контакты + поиск |
| /contacts/:id | публичный | карточка контакта (useParams) |
| /register, /login | публичный | регистрация, вход |
| /explore | публичный | внешний API + фильтр + повтор |
| /dashboard | только вход | мои контакты, CRUD |
| /contacts/new, /contacts/:id/edit | только вход | создание, редактирование |
| * | | 404 |

## API
Свой сервер: /api/register, /api/login, /api/logout, /api/me,
GET/POST/PUT/DELETE /api/contacts (у PUT/DELETE — проверка владельца).
Внешний: GET dummyjson.com/users (показать запрос и JSON во вкладке Network).

## Права
Admin-роли нет (базовый уровень). Сервер проверяет вход и владение:
чужой контакт → 403, несуществующий → 404. Пароли — только bcrypt-хеши.
Сессии в памяти сервера: перезагрузка страницы вход сохраняет,
перезапуск сервера разлогинивает (контакты остаются в db.json).

## Сценарии проверки
1. Создать контакт → F5 → на месте (см. server/db.json).
2. Второй пользователь меняет чужой контакт по URL/напрямую → 403.
3. Войти → F5 → сессия восстановлена.
4. Выйти → открыть /dashboard → редирект на /login.
5. Пустая форма → валидация (required + ошибка сервера).
6. Отключить интернет → /explore → ошибка + «Повторить».
7. /contacts/999999 → «Контакт не найден»; /abc → 404.
