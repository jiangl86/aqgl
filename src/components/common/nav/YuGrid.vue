<template>
  <div class="yu-grid">
    <van-grid
      :column-num="columnNum"
      :icon-size="iconSize"
      :gutter="space"
      :border="border"
      :square="square"
      :clickable="clickable"
      :direction="direction"
      ref="grid"
    >
      <van-grid-item
        v-for="(item, index) in pData"
        :key="itemKey(item, index)"
        :text="item.text"
        :icon="item.icon"
        :dot="item.dot"
        :badge="item.badge"
        :url="item.url"
        :to="item.to"
        ref="gridItem"
        @click.native="clickItem(item)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Grid as VanGrid, GridItem as VanGridItem } from "vant";
export default {
  name: "YuGrid",
  props: {
    pData: {
      type: Array,
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
            url: "", //点击后跳转的链接地址
            to: "", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
          },
        ];
      },
    },
    columnNum: {
      type: Number,
      default: 4, //列数
    },
    iconSize: {
      type: Number,
      default: 40, //图标大小，默认单位为px
    },
    space: {
      type: Number,
      default: 0, //格子之间的间距，默认单位为px
    },
    border: {
      type: Boolean,
      default: false, //是否显示边框
    },
    square: {
      type: Boolean,
      default: true, //是否将格子固定为正方形
    },
    clickable: {
      type: Boolean,
      default: true, //是否开启点击反馈
    },
    direction: {
      type: String,
      default: "vertical", //格子内容排列的方向，可选值为 horizontal
    },
    bgColor: {
      type: String, //格子内背景颜色
      default: "transparent",
    },
  },
  data() {
    return {};
  },
  components: {
    VanGrid,
    VanGridItem,
  },
  mounted() {
    this.initStyle();
  },
  methods: {
    //初始化背景颜色
    initStyle() {
      for (let i = 0; i < this.$refs.gridItem.length; i++) {
        this.$refs.gridItem[i].$el.querySelector(
          ".van-grid-item__content"
        ).style.backgroundColor = this.bgColor;
      }
    },

    itemKey(item, index) {
      return "item" + item.text + index;
    },
    clickItem(item) {
      console.log(item);
      this.$emit("clickItem", item);
    },
  },
};
</script>

<style scoped>
</style>
