import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import ResendVerificationView from '@/views/ResendVerificationView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import ExpensesView from '@/views/ExpensesView.vue'
import ReportsView from '@/views/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    {
      path: '/resend-verification',
      name: 'resend-verification',
      component: ResendVerificationView,
    },
  ],
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  try {
    const auth = useAuthStore()
    const user = await auth.getAuthenticatedUser()

    if (user && (to.name === 'login' || to.name === 'register' || to.name === 'verify_email')) {
      next({ name: 'dashboard' })
    } else if (to.meta.requiresAuth && !user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    next({ name: 'login' })
  }
})

export default router