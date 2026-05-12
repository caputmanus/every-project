<template>
  <div class="auth-page">
    <div class="auth-card">

      <!--  Логотип  -->
      <div class="auth-logo">
        <span class="auth-logo__icon">🎬</span>
        <span class="auth-logo__text">CineTrack</span>
      </div>

      <!--  Переключатель режима  -->
      <div class="auth-tabs">
        <button
          :class="['auth-tab', { 'auth-tab--active': mode === 'login' }]"
          @click="switchMode('login')"
        >Войти</button>
        <button
          :class="['auth-tab', { 'auth-tab--active': mode === 'register' }]"
          @click="switchMode('register')"
        >Регистрация</button>
      </div>

      <!--  Форма  -->
      <form class="auth-form" @submit.prevent="handleSubmit" novalidate>

        <div class="form-group" :class="{ 'form-group--error': errors.login }">
          <label for="a-login">Логин</label>
          <input
            id="a-login"
            v-model="form.login"
            placeholder="Введите логин..."
            autocomplete="username"
          />
          <span class="form-error" v-if="errors.login">{{ errors.login }}</span>
        </div>

        <div class="form-group" :class="{ 'form-group--error': errors.password }">
          <label for="a-pass">Пароль</label>
          <div class="pass-wrap">
            <input
              id="a-pass"
              v-model="form.password"
              :type="showPass ? 'text' : 'password'"
              placeholder="Введите пароль..."
              autocomplete="current-password"
            />
            <button
              type="button"
              class="pass-toggle"
              @click="showPass = !showPass"
              :aria-label="showPass ? 'Скрыть пароль' : 'Показать пароль'"
            >{{ showPass ? '🙈' : '👁' }}</button>
          </div>
          <span class="form-error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <!-- Глобальная ошибка (неверный логин/пароль) -->
        <div class="auth-error" v-if="globalError">{{ globalError }}</div>

        <button type="submit" class="btn-submit">
          {{ mode === 'login' ? 'Войти' : 'Создать аккаунт' }}
        </button>

      </form>

      <p class="auth-hint">
        <template v-if="mode === 'login'">
          Нет аккаунта?
          <button class="link-btn" @click="switchMode('register')">Зарегистрироваться</button>
        </template>
        <template v-else>
          Уже есть аккаунт?
          <button class="link-btn" @click="switchMode('login')">Войти</button>
        </template>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login, register } = useAuth()

const mode       = ref('login')  // 'login' | 'register'
const showPass   = ref(false)
const globalError = ref('')

const form   = reactive({ login: '', password: '' })
const errors = reactive({ login: '', password: '' })

function switchMode(m) {
  mode.value        = m
  globalError.value = ''
  errors.login      = ''
  errors.password   = ''
}

//  Валидация 
function validate() {
  errors.login    = ''
  errors.password = ''
  let valid = true

  if (!form.login.trim()) {
    errors.login = 'Введите логин'
    valid = false
  } else if (form.login.trim().length < 3) {
    errors.login = 'Минимум 3 символа'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Введите пароль'
    valid = false
  } else if (form.password.length < 4) {
    errors.password = 'Минимум 4 символа'
    valid = false
  }

  return valid
}

function handleSubmit() {
  globalError.value = ''
  if (!validate()) return

  const result = mode.value === 'login'
    ? login(form.login.trim(), form.password)
    : register(form.login.trim(), form.password)

  if (result.ok) {
    router.push('/')
  } else {
    globalError.value = result.error
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  padding: 2.25rem 2.25rem 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/*  Логотип  */
.auth-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
}
.auth-logo__icon { font-size: 1.5rem; }

/*  Табы  */
.auth-tabs {
  display: flex;
  background: var(--surface2);
  border-radius: 10px;
  padding: 3px;
  gap: 3px;
}
.auth-tab {
  flex: 1;
  padding: 0.5rem;
  border-radius: 8px;
  background: none;
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all var(--transition);
}
.auth-tab--active {
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/*  Форма  */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-group--error input {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px var(--danger-dim);
}
.form-error {
  font-size: 0.8rem;
  color: var(--danger);
}

/*  Поле пароля с кнопкой показа  */
.pass-wrap {
  position: relative;
}
.pass-wrap input {
  padding-right: 2.5rem;
}
.pass-toggle {
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  padding: 0.2rem;
  border-radius: 4px;
  font-size: 0.95rem;
  color: var(--text-muted);
  border: none;
  line-height: 1;
}
.pass-toggle:hover { transform: translateY(-50%) scale(1.1); }

/*  Глобальная ошибка  */
.auth-error {
  background: var(--danger-dim);
  border: 1px solid var(--danger);
  color: var(--danger);
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 500;
}

/*  Кнопка submit  */
.btn-submit {
  background: var(--primary);
  color: #fff;
  padding: 0.7rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 10px;
  width: 100%;
  transition: background var(--transition), transform var(--transition);
}
.btn-submit:hover { background: var(--primary-hover); }

/*  Подсказка снизу  */
.auth-hint {
  text-align: center;
  font-size: 0.83rem;
  color: var(--text-muted);
}
.link-btn {
  background: none;
  color: var(--primary);
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  font-weight: 600;
  border: none;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.link-btn:hover { transform: none; color: var(--primary-hover); }
</style>
