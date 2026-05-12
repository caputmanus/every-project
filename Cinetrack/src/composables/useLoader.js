import { ref } from 'vue'

//  Singleton: состояние хранится на уровне модуля 
const isLoading = ref(false)

export function useLoader() {
  // Показать оверлей загрузки
  function showLoader() {
    isLoading.value = true
  }

  // Скрыть оверлей загрузки
  function hideLoader() {
    isLoading.value = false
  }

  return { isLoading, showLoader, hideLoader }
}
