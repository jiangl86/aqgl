<template>
  <div class="test">
    <yu-grid :pData="funcs" :space="10" :columnNum="3"></yu-grid>
    <yu-icon icon="refund-o" :size="24" dot></yu-icon>
    <yu-tabbar></yu-tabbar>
    <yu-label-select name="风险等级" :pData="risks"></yu-label-select>
    <yu-label-date-time name="开始时间"></yu-label-date-time>
  </div>
</template>

<script>
import YuGrid from "components/common/nav/YuGrid";
import YuIcon from "components/common/basic/YuIcon";
import YuTabbar from "components/common/nav/YuTabbar";
import YuLabelSelect from "components/content/form/YuLabelSelect";
import YuLabelDateTime from "components/content/form/YuLabelDateTime";
export default {
  name: "Test",
  data() {
    return {
      funcs: [
        {
          code: "yhpc", //编码
          text: "隐患排查",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
        },
        {
          code: "yhpc", //编码
          text: "隐患排查",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
          url: "http://localhost:8080", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "yhpc", //编码
          text: "隐患排查治理",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
          url: "http://localhost:8080", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
      ],
      //   risks: [
      //     {
      //       id: 1,
      //       name: "重大风险",
      //     },
      //     {
      //       id: 2,
      //       name: "较大风险",
      //     },
      //     {
      //       id: 3,
      //       name: "一般风险",
      //     },
      //   ],
      risks: [
        {
          name: "一级节点1",
          id: 1,
          children: [
            {
              name: "二级节点11",
              id: 11,
              children: [
                {
                  name: "三级节点111",
                  id: 111,
                },
                {
                  name: "三级节点112",
                  id: 112,
                },
              ],
            },
            {
              name: "二级节点12",
              id: 12,
              children: [
                {
                  name: "三级节点121",
                  id: 121,
                },
              ],
            },
          ],
        },
        {
          name: "一级节点2",
          id: 2,
          children: [
            {
              name: "二级节点21",
              id: 21,
              children: [
                {
                  name: "三级节点211",
                  id: 211,
                },
                {
                  name: "三级节点212",
                  id: 212,
                },
              ],
            },
            {
              name: "二级节点22",
              id: 22,
            },
          ],
        },
        {
          name: "一级节点3",
          id: 3,
        },
        {
          name: "一级节点4",
          id: 4,
          children: [
            {
              name: "二级节点41",
              id: 41,
              children: [
                {
                  name: "三级节点411",
                  id: 411,
                },
                {
                  name: "三级节点412",
                  id: 412,
                  children: [
                    {
                      name: "四级节点4121",
                      id: 4121,
                    },
                    {
                      name: "四级节点4122",
                      id: 4122,
                    },
                    {
                      name: "四级节点4123",
                      id: 4123,
                    },
                    {
                      name: "四级节点4124",
                      id: 4124,
                    },
                  ],
                },
              ],
            },
            {
              name: "二级节点42",
              id: 42,
            },
          ],
        },
        {
          name: "一级节点5",
          id: 5,
          children: [
            {
              name: "二级节点51",
              id: 51,
              children: [
                {
                  name: "三级节点511",
                  id: 511,
                },
                {
                  name: "三级节点512",
                  id: 512,
                  children: [
                    {
                      name: "四级节点5121",
                      id: 5121,
                    },
                    {
                      name: "四级节点5122",
                      id: 5122,
                    },
                    {
                      name: "四级节点5123",
                      id: 5123,
                    },
                    {
                      name: "四级节点5124",
                      id: 5124,
                    },
                    {
                      name: "四级节点5125",
                      id: 5125,
                    },
                  ],
                },
                {
                  name: "三级节点513",
                  id: 513,
                  children: [
                    {
                      name: "四级节点5131",
                      id: 5131,
                    },
                    {
                      name: "四级节点5132",
                      id: 5132,
                    },
                  ],
                },
              ],
            },
            {
              name: "二级节点22",
              id: 22,
            },
          ],
        },
        {
          name: "一级节点6",
          id: 6,
        },
        {
          name: "一级节点7",
          id: 7,
        },
        {
          name: "一级节点8",
          id: 8,
        },
        {
          name: "一级节点9",
          id: 9,
          children: [
            {
              name: "二级节点91",
              id: 91,
              children: [
                {
                  name: "三级节点911",
                  id: 911,
                },
                {
                  name: "三级节点912",
                  id: 912,
                  children: [
                    {
                      name: "四级节点9121",
                      id: 9121,
                    },
                    {
                      name: "四级节点9122",
                      id: 9122,
                    },
                    {
                      name: "四级节点9123",
                      id: 9123,
                    },
                    {
                      name: "四级节点9124",
                      id: 9124,
                    },
                    {
                      name: "四级节点9125",
                      id: 9125,
                    },
                  ],
                },
              ],
            },
            {
              name: "二级节点22",
              id: 22,
            },
          ],
        },
      ],
    };
  },
  components: {
    YuGrid,
    YuIcon,
    YuTabbar,
    YuLabelSelect,
    YuLabelDateTime,
  },
};
</script>

<style scoped>
</style>
