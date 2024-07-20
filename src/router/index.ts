import { createRouter, createWebHistory } from 'vue-router'
import AllBooksViews from '@/views/AllBooksViews.vue'
import SelectedBooksViews from '@/views/FavoriteBooksViews.vue'
import NotFoundViews from '@/views/NotFoundViews.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'all',
      component: AllBooksViews
    },
    {
      path: '/selected',
      name: 'selected',
      component: SelectedBooksViews,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundViews
    }
  ]
})

router.beforeEach((to) => {
  const user = useUserStore()

  if (to.meta.requiredAuth && !user.isAuthorized) {
    return '/'
  }
})

export default router
