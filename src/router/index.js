import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const Test = () =>
    import ('views/Test')
const TestList = () =>
    import ('views/TestList')
const TestMenuList = () =>
    import ('views/TestMenuList')

const routes = [{
        path: '/',
        name: 'Home',
        component: TestMenuList
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/testList',
        name: 'TestList',
        component: TestList
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router