const AqggList = () =>
    import ('views/aqgg/List')
const AqggDetail = () =>
    import ('views/aqgg/Detail')

const aqggRoutes = [{
        path: '/notice',
        name: 'AqggList',
        component: AqggList,
    },
    {
        path: '/notice/detail',
        name: 'AqggDetail',
        component: AqggDetail,
    },
]

export default aqggRoutes