export function getAqggList({ page, row = 15, name }) {
    return [{
            id: "1" + page, //数据id
            name: "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳", //列表显示的标题，相对其他信息使用大号字体
            state: "审批通过",
            otherInfo: [{
                    key: "发布单位", //key的名称,比如“姓名”
                    value: "招商局集团", //value的值，比如“张三”
                },
                {
                    key: "发布部门", //key的名称,比如“姓名”
                    value: "公司管理层", //value的值，比如“张三”
                },
                {
                    key: "发布人", //key的名称,比如“姓名”
                    value: "张三", //value的值，比如“张三”
                },
                {
                    key: "发布时间", //key的名称,比如“姓名”
                    value: "2020-12-08", //value的值，比如“张三”
                },
                {
                    key: "转发人", //key的名称,比如“姓名”
                    value: "闫旭", //value的值，比如“张三”
                },
            ],
        },
        {
            id: "2" + page, //数据id
            name: "公告2222222", //列表显示的标题，相对其他信息使用大号字体
            state: "审批通过",
            otherInfo: [{
                    key: "发布单位", //key的名称,比如“姓名”
                    value: "招商局集团", //value的值，比如“张三”
                },
                {
                    key: "发布部门", //key的名称,比如“姓名”
                    value: "安全质量处", //value的值，比如“张三”
                },
                {
                    key: "发布人", //key的名称,比如“姓名”
                    value: "卢志飞", //value的值，比如“张三”
                },
                {
                    key: "发布时间", //key的名称,比如“姓名”
                    value: "2020-12-07", //value的值，比如“张三”
                },
            ],
            dataRight: {
                "editFlag": "1", //修改权限标记
                "delFlag": "1", //删除权限标记
                "auditFlag": "1", //审批权限标记
                "reAuditFlag": "1", //撤回审批权限标记
                "reapirFlag": "1", //整改权限标记
            }
        },
    ]
}

export function getAqggDetail({ ggId }) {
    return {
        ggId: ggId,
        ggName: '说的就是来得及熟练度进行',
        ggContent: '是都说了都结束了到家歇斯底里聚少离多计算机数量是多少来对付就算了，是都发生了打飞机死了圣诞福利时间到了附近都是，方式发送链接',
        dataRight: {
            "editFlag": "1", //修改权限标记
            "delFlag": "1", //删除权限标记
            "auditFlag": "1", //审批权限标记
            "reAuditFlag": "1", //撤回审批权限标记
            "reapirFlag": "1", //整改权限标记
        }
    }
}