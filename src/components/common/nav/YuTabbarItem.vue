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
    <div class="icon-text">{{ name }}</div>
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
    icon: "", //图标名称或图片链接
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
    color: {
      type: String,
      default: "white",
    },
    activeColor: {
      type: String,
      default: "red",
    },
    to: {
      type: String,
    },
  },
  data() {
    return {
      iconColor: this.color,
    };
  },
  components: {
    YuIcon,
  },
  methods: {
    initColor() {
      if (this.isActive) {
        this.iconColor = this.activeColor;
      } else {
        this.iconColor = this.color;
      }
    },
    changeFocus(index) {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path == this.path;
    },
  },
  components: {},
  mounted() {
    this.initColor();
  },
};
</script>

<style scoped>
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.active {
  background-color: #435084;
}
.icon-img {
  height: 24px;
  width: 24px;
  margin: 0 auto 2px;
}
.icon-img img {
  width: 100%;
}

.icon-text {
  flex: 1;
  font-size: 12px;
}
</style>
