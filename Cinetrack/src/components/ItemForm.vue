<template>
  <form class="item-form" @submit.prevent="handleSubmit" novalidate>

    <!--  Поиск по библиотеке TMDB  -->
    <div class="form-section">
      <label class="form-label">Поиск в библиотеке фильмов</label>
      <TmdbSearch @select="fillFromTmdb" />
      <p class="form-hint">
        Начните вводить название — поля заполнятся автоматически.
        Или заполните форму вручную ↓
      </p>
    </div>

    <div class="form-divider"><span>Данные фильма</span></div>

    <!--  Постер (если выбрали из TMDB)  -->
    <div v-if="form.posterPath" class="form-poster-preview">
      <img
        :src="`https://image.tmdb.org/t/p/w200${form.posterPath}`"
        :alt="form.title"
        class="poster-img"
      />
      <div class="poster-info">
        <span class="poster-title">{{ form.title }}</span>
        <span v-if="form.year" class="poster-year">{{ form.year }}</span>
        <span v-if="form.rating" class="poster-rating">⭐ {{ form.rating }}</span>
        <button type="button" class="poster-clear" @click="clearPoster">✕ Убрать постер</button>
      </div>
    </div>

    <!--  Название  -->
    <div class="form-group" :class="{ 'form-group--error': errors.title }">
      <label for="f-title">Название фильма *</label>
      <input id="f-title" v-model="form.title" placeholder="Например: Интерстеллар" autocomplete="off" />
      <span class="form-error" v-if="errors.title">{{ errors.title }}</span>
    </div>

    <!--  Описание  -->
    <div class="form-group" :class="{ 'form-group--error': errors.description }">
      <label for="f-desc">Описание *</label>
      <textarea id="f-desc" v-model="form.description" rows="5" placeholder="Краткое описание сюжета..."></textarea>
      <span class="form-error" v-if="errors.description">{{ errors.description }}</span>
    </div>

    <!--  Жанр  -->
    <div class="form-group" :class="{ 'form-group--error': errors.category }">
      <label for="f-cat">Жанр *</label>
      <select id="f-cat" v-model="form.category">
        <option value="" disabled>Выберите жанр...</option>
        <option v-for="g in GENRES" :key="g" :value="g">{{ g }}</option>
      </select>
      <span class="form-error" v-if="errors.category">{{ errors.category }}</span>
    </div>

    <!--  Кнопки  -->
    <div class="form-actions">
      <router-link to="/films" class="btn-cancel">Отмена</router-link>
      <button type="submit" class="btn-submit">{{ submitLabel }}</button>
    </div>

  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import TmdbSearch from './TmdbSearch.vue'

const props = defineProps({
  initial:     { type: Object, default: () => ({ title: '', description: '', category: '', posterPath: null, rating: null, year: null, tmdbId: null }) },
  submitLabel: { type: String, default: 'Сохранить' }
})
const emit = defineEmits(['submit'])

const GENRES = [
  'Боевик', 'Драма', 'Комедия', 'Триллер', 'Ужасы',
  'Фантастика', 'Аниме', 'Документальный', 'Мультфильм', 'Криминал', 'Романтика'
]

const form = reactive({
  title:       props.initial.title,
  description: props.initial.description,
  category:    props.initial.category,
  posterPath:  props.initial.posterPath  ?? null,
  rating:      props.initial.rating      ?? null,
  year:        props.initial.year        ?? null,
  tmdbId:      props.initial.tmdbId      ?? null,
})
const errors = reactive({ title: '', description: '', category: '' })

watch(() => props.initial, val => {
  Object.assign(form, {
    title: val.title, description: val.description, category: val.category,
    posterPath: val.posterPath ?? null, rating: val.rating ?? null,
    year: val.year ?? null, tmdbId: val.tmdbId ?? null,
  })
}, { deep: true })

function fillFromTmdb(movie) {
  form.title = movie.title; form.description = movie.description
  form.category = movie.category; form.posterPath = movie.posterPath
  form.rating = movie.rating; form.year = movie.year; form.tmdbId = movie.tmdbId
  errors.title = errors.description = errors.category = ''
}

function clearPoster() {
  form.posterPath = form.rating = form.year = form.tmdbId = null
}

function validate() {
  errors.title = errors.description = errors.category = ''
  let valid = true
  if (!form.title.trim())                       { errors.title = 'Введите название'; valid = false }
  else if (form.title.trim().length < 2)        { errors.title = 'Минимум 2 символа'; valid = false }
  if (!form.description.trim())                 { errors.description = 'Введите описание'; valid = false }
  else if (form.description.trim().length < 10) { errors.description = 'Минимум 10 символов'; valid = false }
  if (!form.category)                           { errors.category = 'Выберите жанр'; valid = false }
  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    title: form.title.trim(), description: form.description.trim(),
    category: form.category, posterPath: form.posterPath,
    rating: form.rating, year: form.year, tmdbId: form.tmdbId,
  })
}
</script>

<style scoped>
.item-form {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 2rem; max-width: 580px;
  display: flex; flex-direction: column; gap: 1.35rem;
}
.form-section { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.form-hint  { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; }
.form-divider {
  display: flex; align-items: center; gap: 0.75rem;
  color: var(--text-muted); font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.form-poster-preview {
  display: flex; gap: 1rem; align-items: flex-start;
  background: var(--surface2); border: 1.5px solid var(--border);
  border-radius: 10px; padding: 0.85rem;
}
.poster-img { width: 60px; height: 88px; object-fit: cover; border-radius: 6px; flex-shrink: 0; box-shadow: var(--shadow); }
.poster-info { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
.poster-title  { font-weight: 700; font-size: 0.95rem; color: var(--text); }
.poster-year, .poster-rating { font-size: 0.8rem; color: var(--text-muted); }
.poster-clear {
  background: var(--danger-dim); color: var(--danger); border: 1px solid var(--danger);
  border-radius: 6px; padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 600;
  margin-top: 0.25rem; width: fit-content; cursor: pointer; transition: all var(--transition);
}
.poster-clear:hover { background: var(--danger); color: #fff; }
.form-group { display: flex; flex-direction: column; gap: 0.45rem; }
.form-group label { font-size: 0.82rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.form-group--error input,
.form-group--error textarea,
.form-group--error select { border-color: var(--danger); box-shadow: 0 0 0 3px var(--danger-dim); }
.form-error { font-size: 0.8rem; color: var(--danger); }
.form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; padding-top: 0.5rem; border-top: 1px solid var(--border); }
.btn-cancel {
  padding: 0.6rem 1.3rem; border-radius: 10px; border: 1.5px solid var(--border);
  color: var(--text-muted); font-size: 0.9rem; font-weight: 500; transition: all var(--transition);
}
.btn-cancel:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-dim); }
.btn-submit { background: var(--primary); color: #fff; padding: 0.6rem 1.5rem; font-size: 0.9rem; font-weight: 600; border-radius: 10px; }
.btn-submit:hover { background: var(--primary-hover); }
@media (max-width: 480px) {
  .item-form { padding: 1.25rem; }
  .form-actions { flex-direction: column-reverse; }
  .btn-cancel, .btn-submit { width: 100%; text-align: center; }
}
</style>
