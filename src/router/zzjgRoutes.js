const AqglryList = () =>
    import ('views/zzjg/aqglry/List')
const AqglryDetail = () =>
    import ('views/zzjg/aqglry/Detail')


const zzjgRoutes = [
    //安委会组织机构相关页面

    //安全管理人员相关页面
    {
        path: '/zzjg/aqglry',
        name: 'AqglryList',
        component: AqglryList,
    },
    {
        path: '/zzjg/aqglry/detail',
        name: 'AqglryDetail',
        component: AqglryDetail,
    },
]

export default zzjgRoutes