<template>
  <div class="app">
    <HeaderNav />
    <AppLoader />
    <main class="main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import HeaderNav from './components/HeaderNav.vue'
import AppFooter from './components/AppFooter.vue'
import AppLoader from './components/AppLoader.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/*  Светлая тема (default)  */
:root {
  --bg:           #f4f3ef;
  --surface:      #ffffff;
  --surface2:     #f9f8f5;
  --text:         #1a1a1a;
  --text-muted:   #7a7268;
  --border:       #e2dfd8;
  --primary:      #c8410a;
  --primary-hover:#a83608;
  --primary-dim:  rgba(200, 65, 10, 0.10);
  --danger:       #d63030;
  --danger-dim:   rgba(214, 48, 48, 0.10);
  --success:      #2a7d4f;
  --success-dim:  rgba(42, 125, 79, 0.12);
  --radius:       14px;
  --shadow:       0 4px 20px rgba(0,0,0,0.07);
  --shadow-lg:    0 8px 32px rgba(0,0,0,0.12);
  --transition:   0.18s ease;
}

/*  Тёмная тема  */
[data-theme="dark"] {
  --bg:           #111010;
  --surface:      #1c1b1a;
  --surface2:     #242321;
  --text:         #ede9e3;
  --text-muted:   #8a8278;
  --border:       #2e2c2a;
  --primary:      #e05a1e;
  --primary-hover:#c94e16;
  --primary-dim:  rgba(224, 90, 30, 0.15);
  --danger:       #e04444;
  --danger-dim:   rgba(224, 68, 68, 0.15);
  --success:      #3a9e65;
  --success-dim:  rgba(58, 158, 101, 0.15);
  --shadow:       0 4px 20px rgba(0,0,0,0.40);
  --shadow-lg:    0 8px 32px rgba(0,0,0,0.55);
}

/*  Цветовые схемы  */
[data-scheme="indigo"] {
  --primary: #4f46e5; --primary-hover: #4338ca; --primary-dim: rgba(79,70,229,0.10);
}
[data-scheme="teal"] {
  --primary: #0d7377; --primary-hover: #0a5e61; --primary-dim: rgba(13,115,119,0.10);
}
[data-scheme="rose"] {
  --primary: #e11d48; --primary-hover: #be123c; --primary-dim: rgba(225,29,72,0.10);
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition: background var(--transition), color var(--transition);
  -webkit-font-smoothing: antialiased;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 2.5rem 1.5rem;
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
}

/*  Общие переиспользуемые стили  */
a { color: var(--primary); text-decoration: none; }

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 0.9rem;
  border-radius: 10px;
  padding: 0.5rem 1.1rem;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
}
button:hover  { transform: translateY(-1px); }
button:active { transform: translateY(0); }

input, textarea, select {
  font-family: inherit;
  font-size: 0.95rem;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 0.65rem 0.9rem;
  background: var(--surface);
  color: var(--text);
  width: 100%;
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
  appearance: none;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-dim);
}

@media (max-width: 640px) {
  .main { padding: 1.5rem 1rem; }
}
</style>
