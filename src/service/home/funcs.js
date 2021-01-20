import allFuncs from './funcList'

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