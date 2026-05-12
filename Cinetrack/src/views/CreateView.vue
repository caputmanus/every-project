<template>
  <div>
    <div class="page-header">
      <router-link to="/" class="back-link">← Назад</router-link>
      <h1 class="page-title">Добавить фильм</h1>
    </div>

    <ItemForm submit-label="Добавить в список" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ItemForm    from '../components/ItemForm.vue'
import { useItems } from '../composables/useItems.js'

const router   = useRouter()
const { addItem } = useItems()

function handleSubmit(data) {
  addItem(data)
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
</style>
