<template>
  <article class="card" :class="{ 'card--done': item.isDone }">

    <router-link :to="`/film/${item.id}`" class="card__poster-link">
      <div class="card__poster">
        <img v-if="item.posterPath" :src="`https://image.tmdb.org/t/p/w500${item.posterPath}`" :alt="item.title" class="card__poster-img" loading="lazy" />
        <div v-else class="card__poster-placeholder">🎬</div>
        <div class="card__poster-overlay">Открыть</div>
      </div>
    </router-link>

    <div class="card__body">
      <div class="card__header">
        <span class="card__category">{{ item.category }}</span>
        <span v-if="item.isDone" class="card__watched">✓ Просмотрено</span>
        <span v-if="item.rating" class="card__rating">⭐ {{ item.rating }}</span>
      </div>

      <router-link :to="`/film/${item.id}`" class="card__title-link">
        <h3 class="card__title">{{ item.title }}</h3>
      </router-link>

      <p class="card__desc">{{ item.description }}</p>

      <div class="card__footer">
        <time class="card__date">{{ formatDate(item.createdAt) }}</time>
        <div class="card__actions">
          <button class="action-btn" :title="item.isDone ? 'Снять отметку' : 'Отметить просмотренным'" @click.stop="$emit('toggle', item.id)">{{ item.isDone ? '↩' : '✓' }}</button>
          <router-link :to="`/edit/${item.id}`" class="action-btn" title="Редактировать">✎</router-link>
          <button class="action-btn action-btn--danger" title="Удалить" @click.stop="$emit('delete', item.id)">✕</button>
        </div>
      </div>
    </div>

  </article>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['toggle', 'delete'])
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); display: flex; flex-direction: column;
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
  overflow: hidden;
}
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: var(--primary); }
.card--done { opacity: 0.82; }

.card__poster-link { display: block; }
.card__poster { position: relative; width: 100%; height: 180px; background: var(--surface2); overflow: hidden; }
.card__poster-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.card:hover .card__poster-img { transform: scale(1.05); }
.card__poster-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: linear-gradient(135deg, var(--surface2), var(--border)); }
.card__poster-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.05em; opacity: 0; transition: opacity 0.2s; }
.card:hover .card__poster-overlay { opacity: 1; }

.card__body { padding: 1.1rem; display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
.card__header { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.card__category { background: var(--primary-dim); color: var(--primary); font-size: 0.73rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; }
.card__watched  { background: var(--success-dim); color: var(--success); font-size: 0.73rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; }
.card__rating   { font-size: 0.73rem; color: var(--text-muted); margin-left: auto; }

.card__title-link { text-decoration: none; }
.card__title { font-family: 'Syne', sans-serif; font-size: 1.02rem; font-weight: 700; color: var(--text); line-height: 1.3; transition: color var(--transition); }
.card__title-link:hover .card__title { color: var(--primary); }
.card--done .card__title { text-decoration: line-through; color: var(--text-muted); }

.card__desc { color: var(--text-muted); font-size: 0.875rem; line-height: 1.55; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.card__footer { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; padding-top: 0.65rem; border-top: 1px solid var(--border); }
.card__date { font-size: 0.78rem; color: var(--text-muted); }
.card__actions { display: flex; gap: 0.3rem; }
.action-btn { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 30px; padding: 0 0.45rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 7px; color: var(--text-muted); font-size: 0.85rem; text-decoration: none; transition: all var(--transition); cursor: pointer; }
.action-btn:hover { background: var(--primary-dim); border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }
.action-btn--danger:hover { background: var(--danger-dim); border-color: var(--danger); color: var(--danger); }
</style>
