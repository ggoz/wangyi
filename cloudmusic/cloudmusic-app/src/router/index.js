import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
},
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
{
  path: '/itemMusic',
  name: 'itemMusic',
  component: () =>
    import('../views/ItemMusic.vue')
},
{
  path: '/search',
  name: 'search',
  component: () =>
    import('../views/SearchMusic.vue')

},
{
  path: '/login',
  name: 'login',
  component: () =>
    import('../views/LoginView.vue')
}, {
  path: '/userinfo',
  name: 'userinfo',
  component: () =>
    import('../views/UserInfo.vue'),
  beforeEnter: (to, from, next) => {
    let cookie = sessionStorage.getItem('cookie')
    if (cookie) {
      next()
    } else {
      next('/login')
    }
  }
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/userinfo') {
    store.state.isBottomShow = false
  } else {
    store.state.isBottomShow = true
  }
  next()
})

export default router