<template>
  <div>
    <h1 class="page-title">Настройки</h1>

    <div class="settings-stack">

      <!--  Тема  -->
      <section class="settings-section">
        <h2 class="settings-section__title">Тема оформления</h2>
        <div class="btn-group">
          <button
            v-for="t in THEMES"
            :key="t.value"
            :class="['option-btn', { 'option-btn--active': theme === t.value }]"
            @click="setTheme(t.value)"
          >
            {{ t.icon }} {{ t.label }}
          </button>
        </div>
      </section>

      <!--  Цветовая схема  -->
      <section class="settings-section">
        <h2 class="settings-section__title">Цветовая схема</h2>
        <div class="scheme-grid">
          <button
            v-for="s in SCHEMES"
            :key="s.value"
            :class="['scheme-btn', { 'scheme-btn--active': colorScheme === s.value }]"
            @click="setColorScheme(s.value)"
          >
            <span class="scheme-dot" :style="{ background: s.color }"></span>
            {{ s.label }}
          </button>
        </div>
      </section>

      <!--  Режим отображения  -->
      <section class="settings-section">
        <h2 class="settings-section__title">Режим отображения</h2>
        <div class="btn-group">
          <button
            :class="['option-btn', { 'option-btn--active': viewMode === 'cards' }]"
            @click="setViewMode('cards')"
          >
            ▦ Карточки
          </button>
          <button
            :class="['option-btn', { 'option-btn--active': viewMode === 'table' }]"
            @click="setViewMode('table')"
          >
            ☰ Таблица
          </button>
        </div>
      </section>

      <!--  Подтверждение удаления  -->
      <section class="settings-section">
        <h2 class="settings-section__title">Безопасность</h2>
        <label class="toggle-row">
          <span class="toggle-row__text">
            <strong>Подтверждать удаление</strong>
            <small>Показывать диалог перед удалением фильма</small>
          </span>
          <div
            class="toggle"
            :class="{ 'toggle--on': confirmDelete }"
            role="switch"
            :aria-checked="confirmDelete"
            tabindex="0"
            @click="setConfirmDelete(!confirmDelete)"
            @keydown.space.prevent="setConfirmDelete(!confirmDelete)"
          >
            <div class="toggle__thumb"></div>
          </div>
        </label>
      </section>

    </div>
  </div>
</template>

<script setup>
import { useSettings } from '../composables/useSettings.js'

const {
  theme, colorScheme, viewMode, confirmDelete,
  setTheme, setColorScheme, setViewMode, setConfirmDelete
} = useSettings()

const THEMES = [
  { value: 'light', label: 'Светлая', icon: '☀️' },
  { value: 'dark',  label: 'Тёмная',  icon: '🌙' }
]

const SCHEMES = [
  { value: 'cinema', label: 'Cinema',  color: '#c8410a' },
  { value: 'indigo', label: 'Indigo',  color: '#4f46e5' },
  { value: 'teal',   label: 'Teal',    color: '#0d7377' },
  { value: 'rose',   label: 'Rose',    color: '#e11d48' }
]
</script>

<style scoped>
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 1.75rem;
}

.settings-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 560px;
}

.settings-section {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.settings-section__title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

/*  Кнопки-переключатели  */
.btn-group { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.option-btn {
  padding: 0.5rem 1.1rem;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--surface2);
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all var(--transition);
}
.option-btn:hover { border-color: var(--primary); color: var(--primary); }
.option-btn--active {
  border-color: var(--primary);
  background: var(--primary-dim);
  color: var(--primary);
  font-weight: 700;
}

/*  Цветовые схемы  */
.scheme-grid { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.scheme-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--surface2);
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all var(--transition);
}
.scheme-btn:hover { border-color: var(--primary); }
.scheme-btn--active {
  border-color: var(--primary);
  background: var(--primary-dim);
  color: var(--text);
  font-weight: 700;
}

.scheme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid rgba(255,255,255,0.3);
}

/*  Toggle switch  */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
}
.toggle-row__text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.toggle-row__text strong { font-size: 0.9rem; color: var(--text); }
.toggle-row__text small  { font-size: 0.78rem; color: var(--text-muted); }

.toggle {
  width: 44px;
  height: 24px;
  background: var(--border);
  border-radius: 99px;
  position: relative;
  cursor: pointer;
  transition: background var(--transition);
  flex-shrink: 0;
}
.toggle--on { background: var(--primary); }

.toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  transition: transform var(--transition);
}
.toggle--on .toggle__thumb { transform: translateX(20px); }
</style>
