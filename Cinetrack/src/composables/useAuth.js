import { ref, computed } from 'vue'
import { getSession, loginUser, registerUser, logoutUser } from '../services/auth.js'

// Singleton: состояние хранится на уровне модуля 
const currentUser = ref(getSession())

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value)
  const userName   = computed(() => currentUser.value?.login ?? '')

  function login(login, password) {
    const result = loginUser(login, password)
    if (result.ok) currentUser.value = result.user
    return result
  }

  function register(login, password) {
    const result = registerUser(login, password)
    if (result.ok) currentUser.value = result.user
    return result
  }

  function logout(router) {
    logoutUser()
    currentUser.value = null
    router.push('/login')
  }

  return { currentUser, isLoggedIn, userName, login, register, logout }
}
