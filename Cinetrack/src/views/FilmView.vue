<template>
  <div>

    <!-- Фильм не найден -->
    <div v-if="!item" class="not-found">
      <div class="not-found__icon">🎞️</div>
      <h2>Фильм не найден</h2>
      <router-link to="/films" class="btn-back">← На главную</router-link>
    </div>

    <!-- Страница фильма -->
    <template v-else>
      <router-link to="/films" class="back-link">← Назад к списку</router-link>

      <div class="film-layout">

        <!--  Постер  -->
        <div class="film-poster">
          <img
            v-if="item.posterPath"
            :src="`https://image.tmdb.org/t/p/w500${item.posterPath}`"
            :alt="item.title"
            class="film-poster__img"
          />
          <div v-else class="film-poster__empty">🎬</div>

          <!-- Статус под постером -->
          <div class="film-poster__status">
            <span :class="item.isDone ? 'badge--done' : 'badge--pending'">
              {{ item.isDone ? '✓ Просмотрено' : '○ К просмотру' }}
            </span>
          </div>
        </div>

        <!--  Информация  -->
        <div class="film-info">

          <div class="film-info__meta">
            <span class="film-cat">{{ item.category }}</span>
            <span v-if="item.year" class="film-year">{{ item.year }}</span>
            <span v-if="item.rating" class="film-rating">⭐ {{ item.rating }}</span>
          </div>

          <h1 class="film-title">{{ item.title }}</h1>

          <p class="film-desc">{{ item.description }}</p>

          <div class="film-meta-row">
            <div class="film-meta-item">
              <span class="film-meta-item__label">Добавлено</span>
              <span class="film-meta-item__value">{{ formatDate(item.createdAt) }}</span>
            </div>
            <div v-if="item.deletedAt" class="film-meta-item">
              <span class="film-meta-item__label">В архиве с</span>
              <span class="film-meta-item__value">{{ formatDate(item.deletedAt) }}</span>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="film-actions">
            <button
              class="btn-toggle"
              :class="{ 'btn-toggle--done': item.isDone }"
              @click="handleToggle"
            >
              {{ item.isDone ? '↩ Снять отметку' : '✓ Отметить просмотренным' }}
            </button>

            <router-link :to="`/edit/${item.id}`" class="btn-edit">✎ Редактировать</router-link>

            <button class="btn-delete" @click="handleDelete">✕ Удалить</button>
          </div>

        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItems }    from '../composables/useItems.js'
import { useSettings } from '../composables/useSettings.js'

const route  = useRoute()
const router = useRouter()
const { getItemById, toggleDone, softDelete } = useItems()
const { confirmDelete } = useSettings()

const item = computed(() => getItemById(route.params.id))

function handleToggle() { toggleDone(route.params.id) }

function handleDelete() {
  if (confirmDelete.value && !confirm('Переместить фильм в архив?')) return
  softDelete(route.params.id)
  router.push('/films')
}

function formatDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: color var(--transition);
}
.back-link:hover { color: var(--primary); }

/*  Лэйаут: постер + инфо  */
.film-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: flex-start;
}

/*  Постер  */
.film-poster { display: flex; flex-direction: column; gap: 0.85rem; }
.film-poster__img {
  width: 100%; border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}
.film-poster__empty {
  width: 100%; aspect-ratio: 2/3;
  background: linear-gradient(135deg, var(--surface2), var(--border));
  border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center; font-size: 4rem;
}
.film-poster__status { text-align: center; }

.badge--done, .badge--pending {
  display: inline-block; padding: 0.35rem 1rem;
  border-radius: 20px; font-size: 0.85rem; font-weight: 700;
}
.badge--done    { background: var(--success-dim); color: var(--success); border: 1px solid var(--success); }
.badge--pending { background: var(--surface2);    color: var(--text-muted); border: 1px solid var(--border); }

/*  Информация  */
.film-info { display: flex; flex-direction: column; gap: 1.25rem; }

.film-info__meta {
  display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
}
.film-cat { background: var(--primary-dim); color: var(--primary); font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px; }
.film-year, .film-rating { font-size: 0.85rem; color: var(--text-muted); }

.film-title {
  font-family: 'Syne', sans-serif;
  font-size: 2.2rem; font-weight: 800; line-height: 1.15;
  color: var(--text);
}

.film-desc { color: var(--text-muted); line-height: 1.75; font-size: 0.95rem; }

.film-meta-row { display: flex; gap: 2rem; flex-wrap: wrap; }
.film-meta-item { display: flex; flex-direction: column; gap: 0.2rem; }
.film-meta-item__label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.film-meta-item__value { font-size: 0.9rem; color: var(--text); font-weight: 500; }

/*  Кнопки  */
.film-actions { display: flex; gap: 0.65rem; flex-wrap: wrap; padding-top: 0.5rem; border-top: 1px solid var(--border); }

.btn-toggle {
  background: var(--primary); color: #fff;
  padding: 0.6rem 1.3rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
  transition: background var(--transition);
}
.btn-toggle:hover { background: var(--primary-hover); }
.btn-toggle--done { background: var(--surface2); color: var(--text-muted); border: 1.5px solid var(--border); }
.btn-toggle--done:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-dim); }

.btn-edit {
  display: inline-flex; align-items: center;
  padding: 0.6rem 1.2rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
  border: 1.5px solid var(--border); color: var(--text-muted);
  transition: all var(--transition);
}
.btn-edit:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-dim); }

.btn-delete {
  background: var(--danger-dim); color: var(--danger); border: 1.5px solid var(--danger);
  padding: 0.6rem 1.2rem; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
  transition: all var(--transition);
}
.btn-delete:hover { background: var(--danger); color: #fff; }

/*  404  */
.not-found { text-align: center; padding: 5rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.9rem; }
.not-found__icon { font-size: 3rem; }
.not-found h2 { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; }
.btn-back { display: inline-block; margin-top: 0.5rem; background: var(--primary); color: #fff; padding: 0.6rem 1.4rem; border-radius: 10px; font-weight: 600; }

/*  Адаптивность  */
@media (max-width: 700px) {
  .film-layout { grid-template-columns: 1fr; }
  .film-poster { max-width: 240px; margin: 0 auto; }
  .film-title  { font-size: 1.6rem; }
}
</style>
