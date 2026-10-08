import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import crypto from 'node:crypto'

const app = express()
app.use(express.json())
app.use(cookieParser())

const DB_FILE = new URL('./db.json', import.meta.url)

function loadDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}

const sessions = {}

function currentUser(req) {
  const sid = req.cookies.sid
  if (!sid || !sessions[sid]) return null
  return loadDb().users.find(u => u.id === sessions[sid]) || null
}

function requireAuth(req, res, next) {
  const user = currentUser(req)
  if (!user) return res.status(401).json({ error: 'Требуется вход' })
  req.user = user
  next()
}

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email }
}

app.post('/api/register', (req, res) => {
  const name = String(req.body.name || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  if (!name || !email || password.length < 6) {
    return res.status(400).json({ error: 'Имя, email и пароль (минимум 6 символов) обязательны' })
  }

  const db = loadDb()
  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Этот email уже зарегистрирован' })
  }

  const user = { id: db.nextUserId++, name, email, passwordHash: bcrypt.hashSync(password, 10) }
  db.users.push(user)
  saveDb(db)

  const sid = crypto.randomUUID()
  sessions[sid] = user.id
  res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax' })
  res.json(publicUser(user))
})

app.post('/api/login', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  const user = loadDb().users.find(u => u.email === email)
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Неверный email или пароль' })
  }

  const sid = crypto.randomUUID()
  sessions[sid] = user.id
  res.cookie('sid', sid, { httpOnly: true, sameSite: 'lax' })
  res.json(publicUser(user))
})

app.post('/api/logout', (req, res) => {
  delete sessions[req.cookies.sid]
  res.clearCookie('sid')
  res.json({ ok: true })
})

app.get('/api/me', (req, res) => {
  const user = currentUser(req)
  if (!user) return res.status(401).json({ error: 'Не авторизован' })
  res.json(publicUser(user))
})

function readContact(body) {
  return {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    tags: String(body.tags || '').trim(),
    status: body.status === 'archived' ? 'archived' : 'active'
  }
}

app.get('/api/contacts', (req, res) => {
  res.json(loadDb().contacts)
})

// ВАЖНО: /mine объявлен ДО /:id, иначе "mine" попадёт в :id
app.get('/api/contacts/mine', requireAuth, (req, res) => {
  res.json(loadDb().contacts.filter(c => c.userId === req.user.id))
})

app.get('/api/contacts/:id', (req, res) => {
  const contact = loadDb().contacts.find(c => c.id === Number(req.params.id))
  if (!contact) return res.status(404).json({ error: 'Контакт не найден' })
  res.json(contact)
})

app.post('/api/contacts', requireAuth, (req, res) => {
  const data = readContact(req.body)
  if (!data.name || !data.email || !data.phone) {
    return res.status(400).json({ error: 'Имя, email и телефон обязательны' })
  }
  const db = loadDb()
  const contact = { id: db.nextContactId++, userId: req.user.id, ...data, createdAt: new Date().toISOString() }
  db.contacts.push(contact)
  saveDb(db)
  res.status(201).json(contact)
})

app.put('/api/contacts/:id', requireAuth, (req, res) => {
  const db = loadDb()
  const contact = db.contacts.find(c => c.id === Number(req.params.id))
  if (!contact) return res.status(404).json({ error: 'Контакт не найден' })
  if (contact.userId !== req.user.id) return res.status(403).json({ error: 'Это не ваш контакт' })

  const data = readContact(req.body)
  if (!data.name || !data.email || !data.phone) {
    return res.status(400).json({ error: 'Имя, email и телефон обязательны' })
  }
  Object.assign(contact, data)
  saveDb(db)
  res.json(contact)
})

app.delete('/api/contacts/:id', requireAuth, (req, res) => {
  const db = loadDb()
  const index = db.contacts.findIndex(c => c.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Контакт не найден' })
  if (db.contacts[index].userId !== req.user.id) {
    return res.status(403).json({ error: 'Это не ваш контакт' })
  }
  db.contacts.splice(index, 1)
  saveDb(db)
  res.json({ ok: true })
})

// без path-паттерна оно работает и в Express 4, и в Express 5
app.use((req, res) => res.status(404).json({ error: 'Не найдено' }))

app.listen(4000, () => console.log('API: http://localhost:4000'))
