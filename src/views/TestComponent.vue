<template>
  <div class="test-component">
    <!-- <yu-label-input name="标签名字"></yu-label-input> -->
    <yu-label-select
      name="树选择示例"
      :canInput="canInput"
      :multiSelect="multiSelect"
      :selectAssert="selectAssert"
      :chainSelect="chainSelect"
      :onlyLeaf="onlyLeaf"
      :initialSelect="initialSelect"
    ></yu-label-select>
    <div class="funcs">
      <button @click="multiSelect = false" :class="{ active: !multiSelect }">
        单选
      </button>
      <button @click="multiSelect = true" :class="{ active: multiSelect }">
        多选
      </button>
      <button @click="selectAssert = true" :class="{ active: selectAssert }">
        选择节点后返回，仅单选时可用
      </button>
      <button @click="selectAssert = false" :class="{ active: !selectAssert }">
        取消选择节点后返回
      </button>
      <button @click="chainSelect = true" :class="{ active: chainSelect }">
        级联选择
      </button>
      <button @click="chainSelect = false" :class="{ active: !chainSelect }">
        取消级联选择
      </button>
      <button @click="onlyLeaf = true" :class="{ active: onlyLeaf }">
        仅能选择叶子节点
      </button>
      <button @click="onlyLeaf = false" :class="{ active: !onlyLeaf }">
        取消仅能选择叶子节点
      </button>
      <button @click="canInput = true" :class="{ active: canInput }">
        可以输入
      </button>
      <button @click="canInput = false" :class="{ active: !canInput }">
        取消可以输入
      </button>
    </div>
  </div>
</template>

<script>
import YuLabelInput from "components/content/form/YuLabelInput";
import YuLabelSelect from "components/content/form/YuLabelSelect";
export default {
  name: "TestComponent",
  data() {
    return {
      canInput: false,
      multiSelect: true,
      selectAssert: false,
      chainSelect: true,
      onlyLeaf: false,
      initialSelect: [],
    };
  },
  components: {
    YuLabelInput,
    YuLabelSelect,
  },
  methods: {
    setData() {
      let aa = {
        name: "三级节点111",
        id: 111,
      };
      this.initialSelect.push(aa);
    },
  },
};
</script>

<style scoped>
.funcs {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}
.funcs button {
  margin-top: 10px;
  padding: 5px 0;
  outline: none;
  border: none;
}
.active {
  background-color: lightblue;
  outline: none;
  border: none;
}
</style>
