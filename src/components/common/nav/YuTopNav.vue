<template>
  <div class="top-nav clearfix">
    <div class="back-btn" v-if="showBack" @click="back">
      <slot name="back-btn"><i class="cubeic-back"></i></slot>
    </div>
    <div class="func-name">{{ name }}</div>
    <div class="func-actions" v-if="showFunc">
      <slot name="func-actions"><button @click="save">保存</button></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "YuTopNav",
  props: {
    name: "",
    showBack: {
      type: Boolean,
      default: true,
    },
    //点击返回时，是否提示由上级处理还是直接返回
    backTip: {
      type: Boolean,
      default: false,
    },
    showFunc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      if (this.backTip) {
        this.$emit("back");
      } else {
        this.$router.go(-1);
      }
    },
    save() {
      this.$emit("save");
    },
  },
  components: {},
  mounted() {},
};
</script>

<style scoped>
.top-nav {
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 44px;
  padding-left: 10px;
  background-color: var(--mainColor);
  align-items: center;
  color: white;
  box-sizing: border-box;
}

.top-nav .back-btn {
  padding: 10px 10px 10px 0;
  font-size: 28px;
}

.top-nav .func-name {
  flex: 1;
  line-height: 44px;
  font-size: var(--font-size-xl);
  font-weight: 600;
  text-align: left;
}
.func-actions {
  display: flex;
  flex-direction: row;
}
.top-nav .func-actions button {
  padding: 5px 10px;
  margin-right: 10px;
  border: none;
  outline: none;
  background-color: var(--mainColor);
  color: white;
  cursor: pointer;
}
</style>
