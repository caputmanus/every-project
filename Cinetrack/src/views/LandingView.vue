<template>
  <div class="landing">

    <!--  Hero  -->
    <section class="hero">
      <div class="hero__badge">✦ Персональный трекер фильмов</div>
      <h1 class="hero__title">
        Твой <span class="hero__title-accent">личный</span><br />кинозал
      </h1>
      <p class="hero__sub">
        Добавляй фильмы из глобальной библиотеки, отмечай просмотренные,
        следи за статистикой. Всё хранится прямо в твоём браузере.
      </p>
      <div class="hero__cta">
        <router-link to="/login" class="btn-primary">Начать →</router-link>
        <router-link to="/login" class="btn-secondary">Войти</router-link>
      </div>

      <!-- Декоративные карточки-превью -->
      <div class="hero__preview">
        <div class="preview-card preview-card--1">
          <div class="preview-card__img">🎬</div>
          <div class="preview-card__body">
            <span class="preview-card__cat">Фантастика</span>
            <span class="preview-card__title">Начало</span>
            <span class="preview-card__badge done">✓ Просмотрено</span>
          </div>
        </div>
        <div class="preview-card preview-card--2">
          <div class="preview-card__img">🎭</div>
          <div class="preview-card__body">
            <span class="preview-card__cat">Драма</span>
            <span class="preview-card__title">Побег из Шоушенка</span>
            <span class="preview-card__badge pending">○ К просмотру</span>
          </div>
        </div>
        <div class="preview-card preview-card--3">
          <div class="preview-card__img">🦇</div>
          <div class="preview-card__body">
            <span class="preview-card__cat">Боевик</span>
            <span class="preview-card__title">Тёмный рыцарь</span>
            <span class="preview-card__badge pending">○ К просмотру</span>
          </div>
        </div>
      </div>
    </section>

    <!--  Фичи  -->
    <section class="features">
      <h2 class="features__title">Всё что нужно</h2>
      <div class="features__grid">
        <div class="feature-card" v-for="f in features" :key="f.icon">
          <span class="feature-card__icon">{{ f.icon }}</span>
          <h3 class="feature-card__title">{{ f.title }}</h3>
          <p class="feature-card__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!--  CTA снизу  -->
    <section class="cta-bottom">
      <h2 class="cta-bottom__title">Готов начать?</h2>
      <p class="cta-bottom__sub">Регистрация занимает 10 секунд. Никакой почты, никаких карт.</p>
      <router-link to="/login" class="btn-primary">Создать аккаунт →</router-link>
    </section>

  </div>
</template>

<script setup>
const features = [
  { icon: '🔍', title: 'Глобальная библиотека', desc: 'Ищи фильмы по названию — данные, описание и постер заполнятся автоматически из мировой базы.' },
  { icon: '✓',  title: 'Статус просмотра',      desc: 'Отмечай фильмы просмотренными одним нажатием. Следи за прогрессом на странице статистики.' },
  { icon: '🗂️', title: 'Жанры и фильтры',       desc: 'Фильтруй список по жанру, статусу или поисковому запросу — находи нужное мгновенно.' },
  { icon: '🗃️', title: 'Архив',                  desc: 'Удалённые фильмы попадают в архив. Восстанови в любой момент или удали навсегда.' },
  { icon: '📊', title: 'Статистика',             desc: 'Прогресс-бар, счётчики и разбивка по жанрам — видно сколько уже посмотрел.' },
  { icon: '🌙', title: 'Тёмная тема',            desc: 'Светлая и тёмная тема, четыре цветовых схемы. Настрой под себя.' },
]
</script>

<style scoped>
.landing { display: flex; flex-direction: column; gap: 5rem; padding-bottom: 4rem; }

/*  Hero  */
.hero {
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  padding-top: 2rem;
}

.hero__badge {
  display: inline-block;
  background: var(--primary-dim); color: var(--primary);
  border: 1px solid var(--primary); border-radius: 20px;
  padding: 0.3rem 1rem; font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.04em;
}

.hero__title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 800; line-height: 1.05;
  color: var(--text);
}
.hero__title-accent { color: var(--primary); }

.hero__sub {
  max-width: 520px; color: var(--text-muted);
  font-size: 1.05rem; line-height: 1.65;
}

.hero__cta { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }

.btn-primary {
  display: inline-block;
  background: var(--primary); color: #fff;
  padding: 0.75rem 1.75rem; border-radius: 12px;
  font-size: 0.95rem; font-weight: 700;
  transition: background var(--transition), transform var(--transition);
}
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); }

.btn-secondary {
  display: inline-block;
  background: var(--surface); color: var(--text);
  padding: 0.75rem 1.75rem; border-radius: 12px;
  font-size: 0.95rem; font-weight: 600;
  border: 1.5px solid var(--border);
  transition: all var(--transition);
}
.btn-secondary:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-2px); }

/*  Превью карточки  */
.hero__preview {
  display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
  margin-top: 1rem;
}

.preview-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 0.9rem 1.1rem;
  display: flex; align-items: center; gap: 0.85rem;
  min-width: 220px; max-width: 260px; flex: 1;
  box-shadow: var(--shadow);
  animation: float 4s ease-in-out infinite;
}
.preview-card--2 { animation-delay: -1.3s; }
.preview-card--3 { animation-delay: -2.6s; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

.preview-card__img { font-size: 2rem; flex-shrink: 0; }
.preview-card__body { display: flex; flex-direction: column; gap: 0.25rem; }
.preview-card__cat { font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; }
.preview-card__title { font-weight: 700; font-size: 0.88rem; color: var(--text); }
.preview-card__badge { font-size: 0.72rem; font-weight: 600; }
.preview-card__badge.done    { color: var(--success); }
.preview-card__badge.pending { color: var(--text-muted); }

/*  Фичи  */
.features { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.features__title {
  font-family: 'Syne', sans-serif; font-size: 1.9rem; font-weight: 800;
  text-align: center; color: var(--text);
}
.features__grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.1rem; width: 100%;
}
.feature-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 1.4rem;
  display: flex; flex-direction: column; gap: 0.6rem;
  transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
}
.feature-card:hover { box-shadow: var(--shadow-lg); border-color: var(--primary); transform: translateY(-2px); }
.feature-card__icon { font-size: 1.75rem; }
.feature-card__title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: var(--text); }
.feature-card__desc  { font-size: 0.875rem; color: var(--text-muted); line-height: 1.55; }

/*  CTA снизу  */
.cta-bottom {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 3rem 2rem;
  text-align: center; display: flex; flex-direction: column;
  align-items: center; gap: 1rem;
}
.cta-bottom__title { font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 800; }
.cta-bottom__sub   { color: var(--text-muted); font-size: 0.95rem; max-width: 380px; }
</style>
