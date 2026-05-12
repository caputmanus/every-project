<template>
  <div>

    <!--  Шапка страницы  -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Мои фильмы</h1>
        <p class="page-subtitle">Ведите список фильмов, отмечайте просмотренные</p>
      </div>
      <router-link to="/create" class="btn-primary">+ Добавить фильм</router-link>
    </div>

    <!--  Счётчики  -->
    <div class="stats-row">
      <div class="stat-chip">
        <span class="stat-chip__num">{{ totalCount }}</span>
        <span class="stat-chip__label">Всего</span>
      </div>
      <div class="stat-chip stat-chip--pending">
        <span class="stat-chip__num">{{ activeCount }}</span>
        <span class="stat-chip__label">К просмотру</span>
      </div>
      <div class="stat-chip stat-chip--done">
        <span class="stat-chip__num">{{ doneCount }}</span>
        <span class="stat-chip__label">Просмотрено</span>
      </div>
    </div>

    <!--  Фильтры  -->
    <ItemFilters v-model="filters" :categories="categories" />

    <!--  Пустое состояние  -->
    <div v-if="filteredItems.length === 0" class="empty-state">
      <p v-if="totalCount === 0">
        Список пуст.
        <router-link to="/create">Добавьте первый фильм!</router-link>
      </p>
      <p v-else>По вашим фильтрам ничего не найдено.</p>
    </div>

    <!--  Список  -->
    <ItemList
      v-else
      :items="filteredItems"
      @toggle="handleToggle"
      @delete="handleDelete"
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useItems }    from '../composables/useItems.js'
import { useSettings } from '../composables/useSettings.js'
import ItemFilters     from '../components/ItemFilters.vue'
import ItemList        from '../components/ItemList.vue'

const { activeItems, totalCount, activeCount, doneCount, toggleDone, softDelete } = useItems()
const { confirmDelete } = useSettings()

//  Состояние фильтров 
const filters = ref({ search: '', category: '', status: '' })

//  Уникальные жанры для фильтра 
const categories = computed(() =>
  [...new Set(activeItems.value.map(i => i.category))].sort()
)

//  Реактивная фильтрация 
const filteredItems = computed(() => {
  let list = activeItems.value

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()
    list = list.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
    )
  }

  if (filters.value.category) {
    list = list.filter(i => i.category === filters.value.category)
  }

  if (filters.value.status === 'done')   list = list.filter(i =>  i.isDone)
  if (filters.value.status === 'active') list = list.filter(i => !i.isDone)

  return list
})

//  Обработчики событий 
function handleToggle(id) {
  toggleDone(id)
}

function handleDelete(id) {
  // Подтверждение перед удалением (если настройка включена)
  if (confirmDelete.value && !confirm('Переместить фильм в архив?')) return
  softDelete(id)
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1.1;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  padding: 0.6rem 1.3rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background var(--transition), transform var(--transition);
}
.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

/*  Счётчики  */
.stats-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 0.4rem 1rem;
}
.stat-chip--pending { border-color: var(--primary); }
.stat-chip--done    { border-color: var(--success); }

.stat-chip__num {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text);
}
.stat-chip--pending .stat-chip__num { color: var(--primary); }
.stat-chip--done    .stat-chip__num { color: var(--success); }

.stat-chip__label {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/*  Пустое состояние  */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-muted);
  font-size: 1rem;
}
.empty-state a {
  color: var(--primary);
  font-weight: 500;
}
</style>
