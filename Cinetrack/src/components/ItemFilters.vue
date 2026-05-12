<template>
  <div class="filters">

    <div class="filters__search-wrap">
      <span class="filters__search-icon">🔍</span>
      <input
        class="filters__search"
        type="text"
        placeholder="Поиск по названию..."
        :value="modelValue.search"
        @input="update('search', $event.target.value)"
      />
    </div>

    <select
      :value="modelValue.category"
      @change="update('category', $event.target.value)"
    >
      <option value="">Все жанры</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <select
      :value="modelValue.status"
      @change="update('status', $event.target.value)"
    >
      <option value="">Все статусы</option>
      <option value="active">К просмотру</option>
      <option value="done">Просмотрено</option>
    </select>

    <button
      v-if="hasActiveFilters"
      class="filters__reset"
      @click="reset"
    >
      ✕ Сбросить
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  categories: { type: Array,  default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const hasActiveFilters = computed(() =>
  props.modelValue.search || props.modelValue.category || props.modelValue.status
)

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function reset() {
  emit('update:modelValue', { search: '', category: '', status: '' })
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.75rem;
}

.filters__search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}
.filters__search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  pointer-events: none;
}
.filters__search {
  padding-left: 2.2rem;
}

select {
  width: auto;
  min-width: 145px;
  cursor: pointer;
}

.filters__reset {
  background: var(--danger-dim);
  color: var(--danger);
  border: 1px solid var(--danger);
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 10px;
}
.filters__reset:hover {
  background: var(--danger);
  color: #fff;
}

@media (max-width: 520px) {
  .filters { flex-direction: column; }
  .filters__search-wrap, select { width: 100%; }
}
</style>
