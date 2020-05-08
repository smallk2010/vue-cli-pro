import pages from './pages'

export default {
    routes: [
        {
            path: '*',
            redirect: {
                path: '/demo'
            }
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('@/pages/demo'),
            redirect: '/hello',
            children: pages
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/login')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/pages/home')
        }
    ]
}
