// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/firebaseConfig'
import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import ContactDetails from '@/views/ContactDetails.vue'
import Actions from '@/views/Actions.vue'
import contactlist from '@/views/contactList.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },

    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },

    {
      path: '/authorised',
      name: 'authorised',
      // route level code-splitting
      // this generates a separate chunk (Home-[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/authorised"),
      meta: { requiresAuth: true }
    },

    {
      path: '/contactdetails',
      name: 'contactdetails',
      component: () => import("@/views/ContactDetails"),
      meta: { requiresAuth: true }
    },

    {
      path: '/contactlist',
      name: 'contactlist',
      component: () => import("@/views/contactList"),
      meta: { requiresAuth: true }
    },

    {
      path: '/actions',
      name: 'actions',
      component: () => import("@/views/Actions"),
      meta: { requiresAuth: true }
    },

  ]
})

//router guard: check (in the meta) if a route requires authorisation b4 navigating to it
//if the current user is signed in, then they can access 'authorised'
//otherwise, redirect them to the signIn page  
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !(await getCurrentUser())) {
    return '/signin'
  }
})


export default router