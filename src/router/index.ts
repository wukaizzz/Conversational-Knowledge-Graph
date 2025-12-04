import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import ChatFull from '@/components/ChatFull.vue'
import ChatWelcome from '@/components/ChatWelcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/chat',
    },
    {
      path: '/chat',
      name: 'chat',
      components:{
        main:ChatView,
      },
      children:[
        {
          path:'',
          name:'ChatWelcome',
          component:ChatWelcome,
        },
        {
          path:':sessionId',
          name:'ChatSession',
          component:ChatFull,
          props:true,
        }
      ]   
    },
  ],
})
// {
//   path: '/about',
//   name: 'about',
// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import('../views/AboutView.vue'),
// },
export default router
