<template>
  <div class="tmdb-search" ref="rootEl">

    <!--  Поле поиска по библиотеке  -->
    <div class="tmdb-search__input-wrap">
      <span class="tmdb-search__icon">🎬</span>
      <input
        ref="inputEl"
        class="tmdb-search__input"
        type="text"
        v-model="query"
        placeholder="Поиск в библиотеке фильмов..."
        autocomplete="off"
        @input="handleInput"
        @keydown.down.prevent="moveDown"
        @keydown.up.prevent="moveUp"
        @keydown.enter.prevent="selectActive"
        @keydown.escape="close"
      />
      <span v-if="loading" class="tmdb-search__spinner">⟳</span>
    </div>

    <!--  Выпадашка с результатами  -->
    <transition name="drop">
      <div v-if="results.length > 0" class="tmdb-search__dropdown">
        <div
          v-for="(movie, i) in results"
          :key="movie.tmdbId"
          class="tmdb-search__item"
          :class="{ 'tmdb-search__item--active': i === activeIdx }"
          @mouseenter="activeIdx = i"
          @mousedown.prevent="selectMovie(movie)"
        >
          <!-- Постер -->
          <img
            v-if="movie.posterPath"
            :src="`https://image.tmdb.org/t/p/w92${movie.posterPath}`"
            class="tmdb-search__poster"
            :alt="movie.title"
          />
          <div v-else class="tmdb-search__poster tmdb-search__poster--empty">🎞️</div>

          <!-- Инфо -->
          <div class="tmdb-search__info">
            <span class="tmdb-search__title">{{ movie.title }}</span>
            <span class="tmdb-search__meta">
              <span class="tmdb-search__year" v-if="movie.year">{{ movie.year }}</span>
              <span class="tmdb-search__cat">{{ movie.category }}</span>
              <span class="tmdb-search__rating" v-if="movie.rating">⭐ {{ movie.rating }}</span>
            </span>
          </div>
        </div>
      </div>
    </transition>

    <!--  Подсказка при пустом запросе  -->
    <transition name="drop">
      <div v-if="noResults" class="tmdb-search__empty">
        Ничего не найдено. Заполните форму вручную.
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { searchMovies } from '../services/tmdb.js'

const emit = defineEmits(['select'])

const query     = ref('')
const results   = ref([])
const loading   = ref(false)
const noResults = ref(false)
const activeIdx = ref(-1)
const rootEl    = ref(null)
const inputEl   = ref(null)

let debounceTimer = null

//  Debounce: запрос не раньше чем через 350мс после последнего ввода 
function handleInput() {
  noResults.value = false
  results.value   = []
  activeIdx.value = -1
  clearTimeout(debounceTimer)

  if (query.value.trim().length < 2) return

  loading.value = true
  debounceTimer = setTimeout(async () => {
    const found = await searchMovies(query.value)
    loading.value = false
    results.value = found

    if (found.length === 0 && query.value.trim().length >= 2) {
      noResults.value = true
      // Убираем «ничего не найдено» через 2 сек
      setTimeout(() => { noResults.value = false }, 2000)
    }
  }, 350)
}

//  Выбор фильма из списка 
function selectMovie(movie) {
  query.value   = movie.title
  results.value = []
  noResults.value = false
  emit('select', movie)
}

//  Клавиатурная навигация 
function moveDown()   { if (activeIdx.value < results.value.length - 1) activeIdx.value++ }
function moveUp()     { if (activeIdx.value > 0) activeIdx.value-- }
function selectActive() {
  if (activeIdx.value >= 0 && results.value[activeIdx.value]) {
    selectMovie(results.value[activeIdx.value])
  }
}

function close() {
  results.value   = []
  noResults.value = false
}

//  Закрытие по клику вне компонента 
function handleOutsideClick(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) close()
}
onMounted(()   => document.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<style scoped>
.tmdb-search {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

/*  Поле ввода  */
.tmdb-search__input-wrap {
  position: relative;
}
.tmdb-search__icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  pointer-events: none;
}
.tmdb-search__input {
  padding-left: 2.3rem;
  padding-right: 2rem;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-dim);
  background: color-mix(in srgb, var(--surface) 90%, var(--primary));
}
.tmdb-search__spinner {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  animation: spin 0.7s linear infinite;
  font-size: 1rem;
  color: var(--text-muted);
}
@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }

/*  Выпадашка  */
.tmdb-search__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  z-index: 200;
  overflow: hidden;
  max-height: 380px;
  overflow-y: auto;
}

.tmdb-search__item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 0.9rem;
  cursor: pointer;
  transition: background var(--transition);
  border-bottom: 1px solid var(--border);
}
.tmdb-search__item:last-child { border-bottom: none; }
.tmdb-search__item--active,
.tmdb-search__item:hover { background: var(--primary-dim); }

/* Постер */
.tmdb-search__poster {
  width: 40px;
  height: 58px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
  background: var(--surface2);
}
.tmdb-search__poster--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  background: var(--surface2);
}

/* Инфо */
.tmdb-search__info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow: hidden;
}
.tmdb-search__title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tmdb-search__meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.tmdb-search__year,
.tmdb-search__cat,
.tmdb-search__rating {
  font-size: 0.73rem;
  color: var(--text-muted);
}
.tmdb-search__cat {
  background: var(--primary-dim);
  color: var(--primary);
  padding: 0.1rem 0.5rem;
  border-radius: 20px;
  font-weight: 600;
}

/* Пусто */
.tmdb-search__empty {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  z-index: 200;
  box-shadow: var(--shadow);
}

/* Анимация появления */
.drop-enter-active, .drop-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.drop-enter-from, .drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
