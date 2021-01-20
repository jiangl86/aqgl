<template>
  <div class="yu-form">
    <yu-top-nav :name="name" class="nav">
      <template #func-actions>
        <button>更多</button>
      </template>
    </yu-top-nav>
    <yu-scroll class="scroll" ref="scroll">
      <slot></slot>
    </yu-scroll>
    <div class="bottom-func">
      <slot name="funcs">
        <button @click="tempSave">暂存</button>
        <button @click="save">提交</button>
      </slot>
    </div>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuScroll from "components/common/scroll/YuScroll";

export default {
  name: "YuForm",
  props: {
    name: {
      type: String, //表单名称
      required: true,
    },
    dataRight: {
      type: Object, //可操作权限
    },
  },
  data() {
    return {};
  },
  components: {
    YuTopNav,
    YuScroll,
  },
};
</script>

<style scoped>
.scroll {
  margin-top: 44px;
  width: 100vw;
  height: calc(100vh - 85px);
  padding: 0 10px;
  box-sizing: border-box;
}
.bottom-func {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  display: flex;
  flex-direction: row;
  background-color: #eee;
  border-top: 1px solid #ccc;
}

.bottom-func button {
  flex: 1;
  outline: none;
  border: none;
}
</style>
