<template>
  <div>
    <h1 class="page-title">О проекте</h1>

    <div class="about-card">
      <p class="about-lead">
        <strong>CineTrack</strong> - персональный трекер фильмов.
        Добавляй фильмы в список, отмечай просмотренные, фильтруй по жанрам.
      </p>

      <hr />

      <section>
        <h2>Стек технологийは</h2>
        <ul>
          <li>Vue 3 + Vite</li>
          <li>Composition API (<code>&lt;script setup&gt;</code>)</li>
          <li>Vue Router 4</li>
          <li>LocalStorage (через сервисный слой)</li>
        </ul>
      </section>

      <section>
        <h2>Возможностиは</h2>
        <ul>
          <li>Добавление, редактирование, мягкое удаление фильмов</li>
          <li>Отметка "Просмотрено" с визуальным отличием</li>
          <li>Фильтрация по жанру, статусу, поиск по названию</li>
          <li>Архив (корзина) с восстановлением</li>
          <li>Статистика и прогресс-бар</li>
          <li>Светлая / тёмная тема, 4 цветовых схемы</li>
          <li>Режим карточек и режим таблицы</li>
          <li>Адаптивный интерфейс от 320px</li>
        </ul>
      </section>

      <hr />

      <p class="about-footer">Учебный проект · Колледж Хекслет</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 1.75rem;
}
.about-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.about-lead {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-muted);
}
hr { border: none; border-top: 1px solid var(--border); }
section { display: flex; flex-direction: column; gap: 0.65rem; }
h2 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; }
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}
ul li::before { content: '— '; color: var(--primary); font-weight: 700; }
code {
  background: var(--primary-dim);
  color: var(--primary);
  padding: 0.1rem 0.4rem;
  border-radius: 5px;
  font-size: 0.88em;
}
.about-footer {
  font-size: 0.82rem;
  color: var(--text-muted);
}
</style>
