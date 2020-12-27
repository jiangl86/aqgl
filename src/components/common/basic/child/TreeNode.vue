<template>
  <div class="tree-node">
    <li>
      <div>
        <div class="decorate"></div>
        <div class="info"></div>
      </div>
      <ul v-if="item.children">
        <TreeNode
          v-for="child in item.children"
          :data="child"
          :key="child.id"
        ></TreeNode>
      </ul>
    </li>
  </div>
</template>

<script>
import TreeNode from "./TreeNode";
export default {
  name: "TreeNode",
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    TreeNode,
  },
  methods: {},
  created() {
    this.isOpen = this.data.childSelected;
  },
};
</script>

<style scoped>
</style>
