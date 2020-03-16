import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/home/Home.vue');
const Profile = ()=>import('../views/profile/Profile.vue');
const Showcart = ()=>import('../views/showcart/Showcart.vue');
const Category = ()=>import('../views/category/Category.vue');
const Detail = ()=>import('../views/detail/Detail.vue');
Vue.use(VueRouter)

const routes=[
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/profile',
        component: Profile,
      },
      {
        path: '/showcart',
        component: Showcart,
      },
      {
        path: '/category',
        component: Category,
      },
      {
        path: '/detail/:iid',
        component: Detail
      }
]

const router = new VueRouter({
    routes,
    mode:'history'
})


export default router
