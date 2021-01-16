<template>
  <div class="container">
    <yu-menu-list navName="隐患排查治理" :pList="list"></yu-menu-list>
  </div>
</template>

<script>
import YuMenuList from "components/common/nav/YuMenuList";
export default {
  name: "aaa",
  data() {
    return {
      list: [
        {
          groupId: "1", //按分组展示，分组之间间隔较组内大
          menus: [
            {
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
          ],
        },
        {
          groupId: "2", //按分组展示，分组之间间隔较组内大
          menus: [
            {
              code: "lsjl", //编码
              text: "历史记录",
              icon: "todo-list", //图标名称或图片链接
              //   dot: true,
              badge: 3,
              to: "/lsjl", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
              description: "最近未处理",
            },
          ],
        },
        {
          groupId: "3", //按分组展示，分组之间间隔较组内大
          menus: [
            {
              code: "ssp", //编码
              text: "随手拍",
              icon: "photo", //图标名称或图片链接

              to: "/ssp", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
              description: "快速记录隐患",
            },
          ],
        },
      ],
    };
  },
  components: {
    YuMenuList,
  },
};
</script>

<style scoped>
</style>
