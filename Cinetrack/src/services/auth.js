// Ключи хранилища
const KEYS = {
  USERS:   'cinetrack_users',
  SESSION: 'cinetrack_session'
}

// Простое хэширование пароля (не крипто, но не хранить plaintext)
function hashPassword(password) {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i)
    hash |= 0
  }
  return hash.toString(16)
}

// Получить всех пользователей
function getUsers() {
  try {
    const raw = localStorage.getItem(KEYS.USERS)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('[auth] getUsers failed:', e)
    return []
  }
}

// Сохранить список пользователей
function saveUsers(users) {
  try {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users))
  } catch (e) {
    console.error('[auth] saveUsers failed:', e)
  }
}

// Регистрация нового пользователя
export function registerUser(login, password) {
  const users = getUsers()

  if (users.find(u => u.login === login)) {
    return { ok: false, error: 'Пользователь с таким логином уже существует' }
  }

  const newUser = {
    id:        crypto.randomUUID(),
    login:     login.trim(),
    password:  hashPassword(password),
    createdAt: Date.now()
  }

  users.push(newUser)
  saveUsers(users)

  // Сразу создать сессию после регистрации
  saveSession(newUser)
  return { ok: true, user: { id: newUser.id, login: newUser.login } }
}

// Вход по логину и паролю
export function loginUser(login, password) {
  const users = getUsers()
  const user = users.find(
    u => u.login === login && u.password === hashPassword(password)
  )

  if (!user) {
    return { ok: false, error: 'Неверный логин или пароль' }
  }

  saveSession(user)
  return { ok: true, user: { id: user.id, login: user.login } }
}

// Сохранить сессию
function saveSession(user) {
  try {
    localStorage.setItem(KEYS.SESSION, JSON.stringify({
      id:    user.id,
      login: user.login
    }))
  } catch (e) {
    console.error('[auth] saveSession failed:', e)
  }
}

// Получить текущую сессию
export function getSession() {
  try {
    const raw = localStorage.getItem(KEYS.SESSION)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('[auth] getSession failed:', e)
    return null
  }
}

// Выйти (удалить сессию)
export function logoutUser() {
  try {
    localStorage.removeItem(KEYS.SESSION)
  } catch (e) {
    console.error('[auth] logoutUser failed:', e)
  }
}
