import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useBaseStore } from '@/store/useBaseStore'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
  // routes: [
  //   {
  //     path: '/:catchAll(.*)',
  //     component: NotFound
  //   }
  // ],
})

router.afterEach((to, from) => {
  const store = useBaseStore()
  store.isLoadingRouter = false
});

export default router