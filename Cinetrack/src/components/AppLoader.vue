<template>
  <transition name="fade">
    <div v-if="isLoading" class="loader-overlay" aria-label="Загрузка...">
      <div class="loader-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useLoader } from '../composables/useLoader.js'

const { isLoading } = useLoader()
</script>

<style scoped>
/* Оверлей блокирует клики пока isLoading = true */
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.30);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: all;  /* блокирует все клики ниже */
  backdrop-filter: blur(2px);
}

/* Анимированное кольцо */
.loader-ring {
  display: inline-block;
  position: relative;
  width: 56px;
  height: 56px;
}
.loader-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 44px;
  height: 44px;
  margin: 6px;
  border: 4px solid transparent;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.loader-ring div:nth-child(1) { animation-delay: -0.24s; }
.loader-ring div:nth-child(2) { animation-delay: -0.16s; }
.loader-ring div:nth-child(3) { animation-delay: -0.08s; }

@keyframes spin { to { transform: rotate(360deg); } }

/* Переход появления/исчезновения */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
