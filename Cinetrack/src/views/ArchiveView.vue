<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Архив</h1>
        <p class="page-subtitle">Удалённые фильмы — их можно восстановить или удалить навсегда</p>
      </div>
      <span v-if="archivedItems.length > 0" class="badge">{{ archivedItems.length }}</span>
    </div>

    <!-- Пустой архив -->
    <div v-if="archivedItems.length === 0" class="empty-state">
      <div class="empty-state__icon">🗃️</div>
      <p>Архив пуст. Удалённые фильмы появятся здесь.</p>
    </div>

    <!-- Список архивных записей -->
    <div v-else class="archive-list">
      <div
        v-for="item in archivedItems"
        :key="item.id"
        class="archive-row"
      >
        <div class="archive-row__info">
          <span class="archive-row__cat">{{ item.category }}</span>
          <span class="archive-row__title">{{ item.title }}</span>
          <span class="archive-row__date">удалён {{ formatDate(item.deletedAt) }}</span>
        </div>

        <div class="archive-row__actions">
          <button class="btn-restore" @click="handleRestore(item.id)">
            ↩ Восстановить
          </button>
          <button class="btn-delete" @click="handleDeleteForever(item.id)">
            ✕ Удалить навсегда
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItems }    from '../composables/useItems.js'
import { useSettings } from '../composables/useSettings.js'

const { archivedItems, restoreItem, deleteForever } = useItems()
const { confirmDelete } = useSettings()

function handleRestore(id) {
  restoreItem(id)
}

function handleDeleteForever(id) {
  if (confirmDelete.value && !confirm('Удалить фильм навсегда? Это действие необратимо.')) return
  deleteForever(id)
}

function formatDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('ru-RU', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
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
}
.page-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.badge {
  background: var(--danger-dim);
  color: var(--danger);
  border: 1px solid var(--danger);
  border-radius: 20px;
  padding: 0.25rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: 'Syne', sans-serif;
  white-space: nowrap;
}

/*  Пустое состояние  */
.empty-state {
  text-align: center;
  padding: 5rem 1rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.empty-state__icon { font-size: 2.5rem; }

/*  Список архива  */
.archive-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.archive-row {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  transition: box-shadow var(--transition);
}
.archive-row:hover { box-shadow: var(--shadow); }

.archive-row__info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex: 1;
}

.archive-row__cat {
  background: var(--surface2);
  color: var(--text-muted);
  font-size: 0.73rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}
.archive-row__title {
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: line-through;
  color: var(--text-muted);
}
.archive-row__date {
  font-size: 0.78rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.archive-row__actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

.btn-restore, .btn-delete {
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all var(--transition);
}
.btn-restore {
  background: var(--success-dim);
  color: var(--success);
  border: 1px solid var(--success);
}
.btn-restore:hover { background: var(--success); color: #fff; }

.btn-delete {
  background: var(--danger-dim);
  color: var(--danger);
  border: 1px solid var(--danger);
}
.btn-delete:hover { background: var(--danger); color: #fff; }

@media (max-width: 560px) {
  .archive-row { flex-direction: column; align-items: flex-start; }
  .archive-row__actions { width: 100%; }
  .btn-restore, .btn-delete { flex: 1; text-align: center; }
}
</style>
