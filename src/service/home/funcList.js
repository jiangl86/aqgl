//所有一级功能点
const mainFuncs = [{
        code: 'aqgg',
        text: '公告',
        icon: require('assets/images/mainfunc/main_gg.png'),
        to: '/notice',
    },
    {
        code: 'zzjg',
        text: '组织机构',
        icon: require('assets/images/mainfunc/main_zzjgjry.png'),
        to: '/childmenus/zzjg',
    },
    {
        code: 'zrzmb',
        text: '责任制目标',
        icon: require('assets/images/mainfunc/main_zrzmb.png'),
        to: '/childmenus/zrzmb',
    },
    {
        code: 'aqtr',
        text: '安全投入',
        icon: require('assets/images/mainfunc/main_aqtr.png'),
        to: '/aqtr',
    },
    {
        code: 'aqwg',
        text: '安全网格',
        icon: require('assets/images/mainfunc/main_wgqy.png'),
        to: '/aqwg',
    },
    {
        code: 'fxgk',
        text: '风险管控',
        icon: require('assets/images/mainfunc/main_wxy.png'),
        to: '/childmenus/fxgk',
    },
    {
        code: 'yhpczl',
        text: '隐患排查治理',
        icon: require('assets/images/mainfunc/main_yhpc.png'),
        to: '/childmenus/yhpczl',
    },
    {
        code: 'sbss',
        text: '设备实施',
        icon: require('assets/images/mainfunc/main_tzsb.png'),
        to: '/childmenus/sbss',
    },
    {
        code: 'tzry',
        text: '特种人员',
        icon: require('assets/images/mainfunc/main_tzry.png'),
        to: '/tzry',
    },
    {
        code: 'whp',
        text: '危化品',
        icon: require('assets/images/mainfunc/main_whp.png'),
        to: '/whp',
    },
    {
        code: 'aqjy',
        text: '安全教育',
        icon: require('assets/images/mainfunc/main_aqpx.png'),
        to: '/childmenus/aqjy',
    },
    {
        code: 'gfxzy',
        text: '高风险作业',
        icon: require('assets/images/mainfunc/main_fxzy.png'),
        to: '/gfxzy',
    },
    {
        code: 'cbs',
        text: '承包商',
        icon: require('assets/images/mainfunc/main_cbs.png'),
        to: '/childmenus/cbs',
    },
    {
        code: 'zyjk',
        text: '职业健康',
        icon: require('assets/images/mainfunc/main_zyjk.png'),
        to: '/childmenus/zyjk',
    },
    {
        code: 'yjgl',
        text: '应急管理',
        icon: require('assets/images/mainfunc/main_yjgl.png'),
        to: '/childmenus/yjgl',
    },
    {
        code: 'sgsj',
        text: '事故事件',
        icon: require('assets/images/mainfunc/main_sgsj.png'),
        to: '/sgsj',
    },
    {
        code: 'aqtx',
        text: '安全体系',
        icon: require('assets/images/mainfunc/main_aqtx.png'),
        to: '/aqtx',
    },
    {
        code: 'aqhy',
        text: '安全会议',
        icon: require('assets/images/mainfunc/main_aqhy.png'),
        to: '/aqhy',
    },
    {
        code: 'zsk',
        text: '知识库',
        icon: require('assets/images/mainfunc/main_zsk.png'),
        to: '/childmenus/zsk',
    },

]


//安全组织机构及人员相关功能
const zzjgChildFuncs = [{
        code: 'awhzjjg',
        text: '安委会组织机构',
        icon: require('assets/images/mainfunc/main_zzjgjry.png'),
        to: '/zzjg/awhzjjg',
    },
    {
        code: 'aqglry',
        text: '安全管理人员',
        icon: require('assets/images/mainfunc/main_zrzmb.png'),
        to: '/zzjg/aqglry',
    },
    {
        code: 'zyfzr',
        text: '主要负责人',
        icon: require('assets/images/mainfunc/main_aqtr.png'),
        to: '/zzjg/zyfzr',
    },
    {
        code: "zj", //编码
        text: "专家",
        icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
        to: "/zzjg/zj", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
    },
]

//责任制目标子功能
const zrzmbChildFuncs = [{
        code: 'zrzmb',
        text: '安全责任制',
        icon: require('assets/images/mainfunc/main_zrzmb.png'),
        to: '/zrzmb/aqzrz',
    },
    {
        code: 'aqmb',
        text: '安全目标',
        icon: require('assets/images/mainfunc/main_zrzmb.png'),
        to: '/zrzmb/aqmb',
    },
]

const allFuncs = [
    //一级功能列表
    ...mainFuncs,
    //二级功能列表
    ...zzjgChildFuncs,
    ...zrzmbChildFuncs,
]

export default allFuncs