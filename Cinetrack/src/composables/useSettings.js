import { ref } from 'vue'
import { getSettings, saveSettings } from '../services/storage.js'

//  Singleton: состояние хранится на уровне модуля 
const theme         = ref('light')
const colorScheme   = ref('cinema')  // cinema | indigo | teal | rose
const viewMode      = ref('cards')   // cards | table
const confirmDelete = ref(true)

//  Инициализация из localStorage 
const stored = getSettings()
if (stored) {
  theme.value         = stored.theme         ?? 'light'
  colorScheme.value   = stored.colorScheme   ?? 'cinema'
  viewMode.value      = stored.viewMode      ?? 'cards'
  confirmDelete.value = stored.confirmDelete ?? true
}

// Применить тему к документу при старте
applyToDocument()

//  Вспомогательная функция применения атрибутов 
function applyToDocument() {
  document.documentElement.setAttribute('data-theme',  theme.value)
  document.documentElement.setAttribute('data-scheme', colorScheme.value)
}

function persist() {
  saveSettings({
    theme:         theme.value,
    colorScheme:   colorScheme.value,
    viewMode:      viewMode.value,
    confirmDelete: confirmDelete.value
  })
}

export function useSettings() {
  function setTheme(val) {
    theme.value = val
    applyToDocument()
    persist()
  }

  function setColorScheme(val) {
    colorScheme.value = val
    applyToDocument()
    persist()
  }

  function setViewMode(val) {
    viewMode.value = val
    persist()
  }

  function setConfirmDelete(val) {
    confirmDelete.value = val
    persist()
  }

  return {
    theme,
    colorScheme,
    viewMode,
    confirmDelete,
    setTheme,
    setColorScheme,
    setViewMode,
    setConfirmDelete
  }
}
