const AqggList = () =>
    import ('views/aqgg/List')
const AqggDetail = () =>
    import ('views/aqgg/Detail')
const AqggAudit = () =>
    import ('views/aqgg/Audit')

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
    {
        path: '/notice/audit',
        name: 'AqggAudit',
        component: AqggAudit,
    },
]

export default aqggRoutes