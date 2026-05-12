// Ключи хранилища (вынесены в константы)
const KEYS = {
  ITEMS:    'cinetrack_items',
  SETTINGS: 'cinetrack_settings'
}

// Начальные демо-данные
const DEMO_ITEMS = [
  {
    id: crypto.randomUUID(),
    title: 'Демо',
    description: 'Демо',
    category: 'Фантастика',
    createdAt: Date.now() - 86400000 * 5,
    isDone: true,
    deletedAt: null
  },
]

//  Чтение фильмов из localStorage 
export function getItems() {
  try {
    const raw = localStorage.getItem(KEYS.ITEMS)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('[storage] getItems failed:', e)
    return []
  }
}

//  Сохранение фильмов в localStorage 
export function saveItems(items) {
  try {
    localStorage.setItem(KEYS.ITEMS, JSON.stringify(items))
  } catch (e) {
    console.error('[storage] saveItems failed:', e)
  }
}

//  Чтение настроек из localStorage 
export function getSettings() {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('[storage] getSettings failed:', e)
    return null
  }
}

//  Сохранение настроек в localStorage 
export function saveSettings(settings) {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
  } catch (e) {
    console.error('[storage] saveSettings failed:', e)
  }
}

//  Инициализация начальными данными, если хранилище пусто 
export function initDataIfEmpty() {
  const existing = getItems()
  if (existing.length === 0) {
    saveItems(DEMO_ITEMS)
    return DEMO_ITEMS
  }
  return existing
}

