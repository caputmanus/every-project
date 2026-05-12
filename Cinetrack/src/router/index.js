import { createRouter, createWebHistory } from 'vue-router'
import { useLoader }  from '../composables/useLoader.js'
import { getSession } from '../services/auth.js'

import LandingView  from '../views/LandingView.vue'
import LoginView    from '../views/LoginView.vue'
import HomeView     from '../views/HomeView.vue'
import CreateView   from '../views/CreateView.vue'
import EditView     from '../views/EditView.vue'
import FilmView     from '../views/FilmView.vue'
import AboutView    from '../views/AboutView.vue'
import ArchiveView  from '../views/ArchiveView.vue'
import StatsView    from '../views/StatsView.vue'
import SettingsView from '../views/SettingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  //  Публичные (без авторизации) 
  { path: '/',       component: LandingView, meta: { public: true } },
  { path: '/login',  component: LoginView,   meta: { public: true } },

  //  Защищённые 
  { path: '/films',       component: HomeView     },
  { path: '/create',      component: CreateView   },
  { path: '/edit/:id',    component: EditView     },
  { path: '/film/:id',    component: FilmView     },
  { path: '/archive',     component: ArchiveView  },
  { path: '/stats',       component: StatsView    },
  { path: '/settings',    component: SettingsView },
  { path: '/about',       component: AboutView    },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

const { showLoader, hideLoader } = useLoader()

router.beforeEach((to) => {
  showLoader()

  const isLoggedIn = !!getSession()

  // Не авторизован → только публичные
  if (!to.meta.public && !isLoggedIn) return '/login'

  // Авторизован пытается зайти на /login → в список фильмов
  if (to.path === '/login' && isLoggedIn) return '/films'
})

router.afterEach(() => {
  setTimeout(() => hideLoader(), 400)
})

export default router
