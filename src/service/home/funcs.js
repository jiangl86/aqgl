const allFuncs = [{
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
export function getFunName(code) {
    let func = allFuncs.find(ele => ele.code == code)
    return func ? func.text : ''
}

export function getMainFuncs() {
    return allFuncs
}

export function getChildFuncs(code) {
    if (code == 'zzjg') {
        return [{
                code: "awhzjjg", //编码
                text: "安委会组织机构",
                icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
                to: "/zzjg/awhzjjg", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            },
            {
                code: "aqglry", //编码
                text: "安全管理人员",
                icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
                to: "/zzjg/aqglry", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            },
            {
                code: "zyfzr", //编码
                text: "主要负责人",
                icon: "fire-o", //图标名称或图片链接
                to: "/zzjg/zyfzr", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            },
            {
                code: "zj", //编码
                text: "专家",
                icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
                to: "/zzjg/zj", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            },
        ]
    }
    return [{
            code: "zxjh", //编码
            text: "专项计划",
            icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接

            badge: 3,
            to: "/zxjh", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
            code: "jsjh", //编码
            text: "角色计划",
            icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
            dot: true,
            to: "/jsjh", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            description: "创建角色计划",
        },
        {
            code: "yhpc", //编码
            text: "隐患排查",
            icon: "fire-o", //图标名称或图片链接
            to: "/testList", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
            code: "lsjl", //编码
            text: "历史记录",
            icon: "todo-list", //图标名称或图片链接
            //   dot: true,
            badge: 3,
            to: "/lsjl", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            description: "最近未处理",
        },
        {
            code: "ssp", //编码
            text: "随手拍",
            icon: "photo", //图标名称或图片链接

            to: "/ssp", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            description: "快速记录隐患",
            gap: true
        },
        {
            code: "csjp", //编码
            text: "测试键盘",
            icon: "photo", //图标名称或图片链接

            to: "/csjp", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },

    ]
}