<template>
  <div class="notfound">
    <div class="notfound__code">404</div>
    <h1 class="notfound__title">Страница не найдена</h1>
    <p class="notfound__sub">Кажется, такого маршрута не существует.</p>
    <router-link to="/" class="btn-home">← На главную</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.notfound {
  text-align: center;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.notfound__code {
  font-family: 'Syne', sans-serif;
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  color: var(--primary);
  opacity: 0.2;
}
.notfound__title {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
}
.notfound__sub {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.btn-home {
  margin-top: 0.75rem;
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: background var(--transition);
}
.btn-home:hover { background: var(--primary-hover); }
</style>
