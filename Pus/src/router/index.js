import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Welcome.vue')

const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/User.vue')

const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Params.vue')

const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/List.vue')
const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/goods/Add.vue')


Vue.use(VueRouter)

const routes = [
    {path: '/admin/', redirect: '/admin/home'},
    {path: '/admin/login', component: Login},
    {
        path: '/admin/home',
        component: Home,
        redirect: '/admin/Welcome',
        children: [
            {path: '/admin/home', component: Welcome},
            {path: '/admin/users', component: Users},
            {path: '/admin/categories', component: Cate},
            {path: '/admin/params', component: Params},
            {path: '/admin/goods', component: GoodsList},
            {path: '/admin/goods/add', component: Add},
        ]
    }

]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
    // 访问登录页，放行
    if (to.path === '/admin/login') return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    // 没有token, 强制跳转到登录页
    if (!tokenStr) return next('/admin/login')
    next()
})

export default router
