<template>
  <div
    class="yu-tabbar-item"
    :class="{ active: isActive }"
    @click="changeFocus(index)"
  >
    <yu-icon
      :dot="dot"
      :badge="badge"
      :size="size"
      :icon="icon"
      :color="color"
    ></yu-icon>
    <div class="icon-text" :style="'color:' + color">{{ name }}</div>
  </div>
</template>

<script>
import YuIcon from "components/common/basic/YuIcon";
export default {
  name: "YuTabbarItem",
  props: {
    index: {
      type: Number,
      required: true, //顺序索引
    },
    name: {
      type: String,
      required: true, //item名称
    },
    defaultIcon: "", //图标名称或图片链接
    activeIcon: "", //激活图标名称或图片链接
    dot: {
      type: Boolean,
      default: false, //是否显示小红点
    },
    badge: {
      type: String, //图标右上角徽标的内容，如位操作数量，
    },
    size: {
      type: Number,
      default: 24,
    },
    defaultColor: {
      type: String,
      default: "black",
    },
    activeColor: {
      type: String,
      default: "white",
    },
    to: {
      type: String,
    },
  },
  data() {
    return {
      color: this.color,
      icon: this.defaultIcon,
      isActive: false,
    };
  },
  components: {
    YuIcon,
  },
  methods: {
    setStyle() {
      this.isActive = this.$route.path == this.to;
      this.color = this.isActive ? this.activeColor : this.defaultColor;
      this.icon = this.isActive ? this.activeIcon : this.defaultIcon;
    },
    changeFocus(index) {
      if (this.to && this.to != this.$route.path) {
        this.$router.replace(this.to);
      }

      this.setStyle();
      this.$emit("clickItem", index);
    },
  },
  watch: {
    $route(to, from) {
      this.isActive = this.$route.path == this.to;
      this.setStyle();
    },
  },
  mounted() {
    this.setStyle();
  },
};
</script>

<style scoped>
.yu-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.icon-text {
  flex: 1;
  font-size: var(--font-size-sm);
}
</style>
