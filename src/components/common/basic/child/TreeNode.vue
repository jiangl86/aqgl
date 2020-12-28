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
    pData: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder() {
      return this.pData.children && this.pData.children.length > 0;
    },
  },
  components: {
    TreeNode,
  },
  methods: {},
  created() {
    this.isOpen = this.pData.childSelected;
  },
};
</script>

<style scoped>
</style>
