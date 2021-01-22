import Vue from 'vue'
import VueRouter from 'vue-router'
import aqggRoutes from './aqggRoutes'
import zzjgRoutes from './zzjgRoutes'

Vue.use(VueRouter)



const Test = () =>
    import ('views/Test')
const TestList = () =>
    import ('views/TestList')
const TestComponent = () =>
    import ('views/TestComponent')



const Home = () =>
    import ('views/home/Index')
const Task = () =>
    import ('views/home/Task')
const MainFuncs = () =>
    import ('views/home/MainFuncs')
const Data = () =>
    import ('views/home/Data')
const Profile = () =>
    import ('views/home/Profile')

const ChildMenuList = () =>
    import ('views/common/ChildMenuList')

const routes = [{
        path: '/',
        component: Home,
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/home/task',
        children: [{
                path: 'task',
                name: 'Task',
                component: Task,
            }, {
                path: 'mainfuncs',
                name: 'MainFuncs',
                component: MainFuncs,
            },
            {
                path: 'data',
                name: 'Data',
                component: Data,
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
            },
        ],
    },

    {
        path: '/childmenus/:code',
        name: 'ChildMenuList',
        component: ChildMenuList,
    },

    ...aqggRoutes,
    ...zzjgRoutes,
    {
        path: '/test',
        name: 'Test',
        component: TestComponent
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


router.beforeEach((to, from, next) => {
    next()
})
export default router