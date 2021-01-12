<template>
  <div class="yu-icon">
    <van-icon
      :name="icon"
      :dot="dot"
      :badge="badge"
      :color="color"
      :size="size"
    />
  </div>
</template>

<script>
import { Icon as VanIcon } from "vant";
export default {
  name: "YuIcon",
  props: {
    icon: "", //图标名称或图片链接
    dot: {
      type: Boolean,
      default: false, //是否显示小红点
    },
    badge: {
      type: String, //图标右上角徽标的内容，如位操作数量，
    },
    color: {
      type: String, //图标颜色
    },
    size: {
      type: Number, //图标大小
    },
  },
  data() {
    return {};
  },
  components: {
    VanIcon,
  },
};
</script>

<style scoped>
</style>
