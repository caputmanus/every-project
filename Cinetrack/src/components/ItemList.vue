<template>
  <!--  Режим карточек  -->
  <div v-if="viewMode === 'cards'" class="list-grid">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>

  <!--  Режим таблицы  -->
  <div v-else class="table-wrap">
    <table class="list-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Жанр</th>
          <th>Статус</th>
          <th>Дата</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          :class="{ 'row--done': item.isDone }"
          class="row--clickable"
          @click="$router.push(`/film/${item.id}`)"
        >
          <td class="td-title">{{ item.title }}</td>
          <td><span class="tag">{{ item.category }}</span></td>
          <td>
            <span :class="item.isDone ? 'status--done' : 'status--pending'">
              {{ item.isDone ? '✓ Просмотрено' : 'К просмотру' }}
            </span>
          </td>
          <td class="td-date">{{ formatDate(item.createdAt) }}</td>
          <td>
            <div class="t-actions">
              <button @click.stop="$emit('toggle', item.id)" class="action-btn" :title="item.isDone ? 'Снять отметку' : 'Просмотрено'">
                {{ item.isDone ? '↩' : '✓' }}
              </button>
              <router-link :to="`/edit/${item.id}`" class="action-btn" title="Редактировать" @click.stop>✎</router-link>
              <button @click.stop="$emit('delete', item.id)" class="action-btn action-btn--danger" title="Удалить">✕</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useSettings } from '../composables/useSettings.js'
import ItemCard from './ItemCard.vue'

defineProps({ items: { type: Array, required: true } })
defineEmits(['toggle', 'delete'])

const { viewMode } = useSettings()

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('ru-RU', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}
</script>

<style scoped>
/*  Сетка карточек  */
.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.2rem;
}

/*  Таблица  */
.table-wrap { overflow-x: auto; border-radius: var(--radius); border: 1.5px solid var(--border); }

.list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  background: var(--surface);
}

.list-table th {
  padding: 0.75rem 1.1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  background: var(--surface2);
  border-bottom: 1.5px solid var(--border);
  white-space: nowrap;
}

.list-table td {
  padding: 0.8rem 1.1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.list-table tbody tr:last-child td { border-bottom: none; }

.list-table tbody tr {
  transition: background var(--transition);
}
.row--clickable { cursor: pointer; }
.list-table tbody tr:hover { background: var(--surface2); }

.row--done .td-title {
  text-decoration: line-through;
  color: var(--text-muted);
}

.td-date { white-space: nowrap; color: var(--text-muted); font-size: 0.82rem; }

.tag {
  background: var(--primary-dim);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}

.status--done    { color: var(--success);    font-weight: 600; font-size: 0.85rem; }
.status--pending { color: var(--text-muted); font-size: 0.85rem; }

.t-actions { display: flex; gap: 0.3rem; }

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 0.4rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition);
}
.action-btn:hover {
  background: var(--primary-dim);
  border-color: var(--primary);
  color: var(--primary);
}
.action-btn--danger:hover {
  background: var(--danger-dim);
  border-color: var(--danger);
  color: var(--danger);
}
</style>
