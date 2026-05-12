<template>
  <div>

    <!--  Фильм не найден  -->
    <div v-if="!item" class="not-found">
      <div class="not-found__icon">🎞️</div>
      <h2>Фильм не найден</h2>
      <p>Запись с ID <code>{{ route.params.id }}</code> не существует.</p>
      <router-link to="/" class="btn-home">← На главную</router-link>
    </div>

    <!--  Форма редактирования  -->
    <template v-else>
      <div class="page-header">
        <router-link to="/" class="back-link">← Назад</router-link>
        <h1 class="page-title">Редактировать фильм</h1>
      </div>

      <ItemForm
        :initial="item"
        submit-label="Сохранить изменения"
        @submit="handleSubmit"
      />
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ItemForm      from '../components/ItemForm.vue'
import { useItems }  from '../composables/useItems.js'

const route  = useRoute()
const router = useRouter()
const { getItemById, updateItem } = useItems()

// Найти фильм по ID из маршрута
const item = computed(() => getItemById(route.params.id))

function handleSubmit(data) {
  updateItem(route.params.id, data)
  router.push('/')
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.back-link {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: color var(--transition);
}
.back-link:hover { color: var(--primary); }
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
}

/*  Не найдено  */
.not-found {
  text-align: center;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}
.not-found__icon { font-size: 3rem; }
.not-found h2    { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; }
.not-found p     { color: var(--text-muted); }
.not-found code  {
  background: var(--surface2);
  padding: 0.1rem 0.4rem;
  border-radius: 5px;
  font-size: 0.9em;
}
.btn-home {
  display: inline-block;
  margin-top: 0.5rem;
  background: var(--primary);
  color: #fff;
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  font-weight: 600;
  transition: background var(--transition);
}
.btn-home:hover { background: var(--primary-hover); }
</style>
