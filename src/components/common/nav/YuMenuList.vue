<template>
  <div class="yu-menu-list" :style="'background-color:' + bgColor">
    <yu-top-nav :showFunc="false" :name="navName" class="nav"></yu-top-nav>
    <div class="menus">
      <div
        v-for="item in pData"
        class="menu"
        :class="{ gap: item.gap }"
        :key="'i' + item.code"
        :style="'background-color:' + menuBgColor"
        @click="clickMenu(item)"
      >
        <yu-icon
          :icon="item.icon"
          :size="20"
          color="green"
          class="icon"
        ></yu-icon>
        <div class="name">{{ item.text }}</div>
        <span class="description">{{ item.description }}</span>
        <yu-badge :content="item.badge" :dot="item.dot"></yu-badge>
        <yu-icon icon="arrow" :size="20"></yu-icon>
      </div>
    </div>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuIcon from "components/common/basic/YuIcon";
import YuBadge from "components/common/show/YuBadge";
export default {
  name: "YuMenuList",
  props: {
    navName: {
      type: String, //导航栏名称
      required: true,
    },
    bgColor: {
      type: String,
      default: "transparent", //背景颜色
    },
    menuBgColor: {
      type: String,
      default: "white", //每一个menu背景颜色
    },
    pData: {
      type: Array,
      required: true,
      default: function () {
        return [
          {
            code: "测试", //编码
            text: "图标文字",
            icon: "", //图标名称或图片链接
            dot: {
              type: Boolean,
              default: false, //是否显示小红点
            },
            badge: {
              type: String, //图标右上角徽标的内容，如位操作数量，
            },
            to: "", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
            description: "",
            gap: {
              type: Boolean, //和上一个元素之间是否加大间隔
              default: false,
            },
          },
        ];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    YuTopNav,
    YuIcon,
    YuBadge,
  },

  methods: {
    clickMenu(item) {
      this.$router.push(item.to);
    },
  },
};
</script>

<style scoped>
.yu-menu-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.menus {
  display: flex;
  flex-direction: column;
}
.menus > div:nth-child(1) {
  margin-top: 44px;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--liHeight);
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.gap {
  margin-top: 10px;
}
.icon {
  margin-right: 10px;
}
.name {
  flex: 1;
  text-align: left;
  font-size: var(--font-size-sm);
}
.description {
  font-size: var(--font-size-xs);
  color: var(--list-content-color);
}
</style>
