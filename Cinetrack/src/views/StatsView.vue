<template>
  <div>
    <h1 class="page-title">Статистика</h1>

    <!--  Общий прогресс  -->
    <div class="stats-card">
      <div class="progress-header">
        <span class="progress-label">Просмотрено</span>
        <span class="progress-fraction">{{ doneCount }} / {{ totalCount }}</span>
      </div>
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
      <p class="progress-caption">
        {{ progressPercent }}% завершено
        <template v-if="activeCount > 0"> — ещё {{ activeCount }} {{ plural(activeCount, 'фильм', 'фильма', 'фильмов') }} в очереди</template>
        <template v-else> — список полностью просмотрен 🎉</template>
      </p>
    </div>

    <!--  Карточки-счётчики  -->
    <div class="counters-grid">
      <div class="counter-card">
        <span class="counter-card__num">{{ totalCount }}</span>
        <span class="counter-card__label">Всего в списке</span>
      </div>
      <div class="counter-card counter-card--pending">
        <span class="counter-card__num">{{ activeCount }}</span>
        <span class="counter-card__label">К просмотру</span>
      </div>
      <div class="counter-card counter-card--done">
        <span class="counter-card__num">{{ doneCount }}</span>
        <span class="counter-card__label">Просмотрено</span>
      </div>
      <div class="counter-card counter-card--archived">
        <span class="counter-card__num">{{ deletedCount }}</span>
        <span class="counter-card__label">В архиве</span>
      </div>
    </div>

    <!--  Разбивка по жанрам  -->
    <div class="section-title">По жанрам</div>
    <div v-if="byGenre.length === 0" class="no-data">Нет данных</div>
    <div v-else class="genre-list">
      <div
        v-for="genre in byGenre"
        :key="genre.name"
        class="genre-row"
      >
        <span class="genre-row__name">{{ genre.name }}</span>
        <div class="genre-row__bar-wrap">
          <div
            class="genre-row__bar"
            :style="{ width: (genre.count / totalCount * 100) + '%' }"
          ></div>
        </div>
        <span class="genre-row__count">{{ genre.count }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useItems } from '../composables/useItems.js'

const { activeItems, totalCount, activeCount, doneCount, deletedCount } = useItems()

//  Процент просмотренных 
const progressPercent = computed(() =>
  totalCount.value === 0
    ? 0
    : Math.round((doneCount.value / totalCount.value) * 100)
)

//  Разбивка по жанрам 
const byGenre = computed(() => {
  const map = {}
  activeItems.value.forEach(i => {
    map[i.category] = (map[i.category] ?? 0) + 1
  })
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

//  Склонение числительных 
function plural(n, one, few, many) {
  const mod10  = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
</script>

<style scoped>
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 1.75rem;
}

/*  Прогресс  */
.stats-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 600;
}
.progress-fraction { color: var(--text-muted); }

.progress-track {
  width: 100%;
  height: 10px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 99px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-caption {
  font-size: 0.84rem;
  color: var(--text-muted);
}

/*  Счётчики  */
.counters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.counter-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: box-shadow var(--transition);
}
.counter-card:hover { box-shadow: var(--shadow); }
.counter-card--pending { border-color: var(--primary); }
.counter-card--done    { border-color: var(--success); }
.counter-card--archived { border-color: var(--text-muted); }

.counter-card__num {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: var(--text);
}
.counter-card--pending .counter-card__num { color: var(--primary); }
.counter-card--done    .counter-card__num { color: var(--success); }
.counter-card--archived .counter-card__num { color: var(--text-muted); }

.counter-card__label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

/*  Жанры  */
.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.no-data { color: var(--text-muted); font-size: 0.9rem; }

.genre-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.genre-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.genre-row__name {
  width: 130px;
  flex-shrink: 0;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text);
}
.genre-row__bar-wrap {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}
.genre-row__bar {
  height: 100%;
  background: var(--primary);
  border-radius: 99px;
  transition: width 0.5s ease;
}
.genre-row__count {
  width: 28px;
  text-align: right;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
  flex-shrink: 0;
}
</style>
