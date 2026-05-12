<template>
  <header class="header">
    <div class="header__inner">

      <router-link to="/" class="header__logo">        <span class="logo-icon">🎬</span>
        <span class="logo-text">CineTrack</span>
      </router-link>

      <!-- Навигация для десктопа -->
      <nav class="header__nav">
        <router-link to="/films"    class="nav-link">Главная</router-link>
        <router-link to="/archive"  class="nav-link">Архив</router-link>
        <router-link to="/stats"    class="nav-link">Статистика</router-link>
        <router-link to="/settings" class="nav-link">Настройки</router-link>
        <router-link to="/about"    class="nav-link">О проекте</router-link>
      </nav>

      <router-link to="/create" class="btn-add">+ Добавить</router-link>

      <!-- Имя пользователя + выход -->
      <div class="header__user">
        <span class="header__username">{{ userName }}</span>
        <button class="btn-logout" @click="handleLogout" title="Выйти">↪</button>
      </div>

      <!-- Бургер для мобильных -->
      <button class="burger" @click="toggleMenu" aria-label="Меню">
        <span class="burger__line" :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Мобильное меню -->
    <transition name="slide">
      <nav v-if="menuOpen" class="mobile-nav">
        <router-link to="/films"    class="nav-link" @click="closeMenu">Главная</router-link>
        <router-link to="/archive"  class="nav-link" @click="closeMenu">Архив</router-link>
        <router-link to="/stats"    class="nav-link" @click="closeMenu">Статистика</router-link>
        <router-link to="/settings" class="nav-link" @click="closeMenu">Настройки</router-link>
        <router-link to="/about"    class="nav-link" @click="closeMenu">О проекте</router-link>
        <router-link to="/create"   class="btn-add"  @click="closeMenu">+ Добавить фильм</router-link>
        <button class="btn-logout-mobile" @click="handleLogout">↪ Выйти</button>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu  = () => { menuOpen.value = false }

const router = useRouter()
const { userName, logout } = useAuth()

function handleLogout() {
  closeMenu()
  logout(router)
}
</script>

<style scoped>
.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/*  Логотип  */
.header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--text);
  white-space: nowrap;
  transition: color var(--transition);
}
.header__logo:hover { color: var(--primary); }
.logo-icon { font-size: 1.2rem; }

/*  Навигация  */
.header__nav {
  display: flex;
  gap: 0.2rem;
  flex: 1;
}

.nav-link {
  color: var(--text-muted);
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color var(--transition), background var(--transition);
  white-space: nowrap;
}
.nav-link:hover {
  color: var(--text);
  background: var(--surface2);
}
/* Активный пункт меню выделен */
.nav-link.router-link-exact-active,
.nav-link.router-link-active {
  color: var(--primary);
  background: var(--primary-dim);
  font-weight: 600;
}

/*  Кнопка добавления  */
.btn-add {
  background: var(--primary);
  color: #fff;
  padding: 0.45rem 1.1rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background var(--transition), transform var(--transition);
}
.btn-add:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

/*  Бургер  */
.burger {
  display: none;
  background: none;
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-left: auto;
}
.burger__line,
.burger__line::before,
.burger__line::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  position: relative;
  transition: all 0.25s;
}
.burger__line::before,
.burger__line::after {
  content: '';
  position: absolute;
}
.burger__line::before { top: -5px; }
.burger__line::after  { top:  5px; }
.burger__line.open          { background: transparent; }
.burger__line.open::before  { transform: rotate(45deg); top: 0; }
.burger__line.open::after   { transform: rotate(-45deg); top: 0; }

/*  Мобильное меню  */
.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.5rem 1.25rem;
  gap: 0.2rem;
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.mobile-nav .btn-add { margin-top: 0.5rem; text-align: center; display: block; }

/* Анимация мобильного меню */
.slide-enter-active, .slide-leave-active { transition: max-height 0.25s ease, opacity 0.2s ease; overflow: hidden; max-height: 400px; }
.slide-enter-from, .slide-leave-to       { max-height: 0; opacity: 0; }

/*  Пользователь  */
.header__user {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}
.header__username {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0.2rem 0.75rem;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-logout {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  padding: 0.3rem 0.55rem;
  font-size: 1rem;
  transition: all var(--transition);
}
.btn-logout:hover {
  border-color: var(--danger);
  color: var(--danger);
  background: var(--danger-dim);
}

.btn-logout-mobile {
  background: var(--danger-dim);
  color: var(--danger);
  border: 1px solid var(--danger);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  margin-top: 0.25rem;
  text-align: left;
}

/*  Адаптивность  */
@media (max-width: 768px) {
  .header__nav  { display: none; }
  .btn-add      { display: none; }
  .header__user { display: none; }
  .burger       { display: flex; }
}
</style>
