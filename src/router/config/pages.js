const pages = [
    {
        path: '/hello',
        meta: {
            label: '首页'
        },
        component: () => import('@/components/hello-world')
    }
]
export default pages
