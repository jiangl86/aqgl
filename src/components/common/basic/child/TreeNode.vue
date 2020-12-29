<template>
  <div class="tree-node" v-show="pData.show">
    <li>
      <div>
        <div class="decorate" @click="toggle">
          <span
            v-for="index in level"
            :key="pData.id + index"
            class="left-indent"
          ></span
          ><i v-if="isFolder && isOpen" class="open cubeic-select"></i
          ><i v-else-if="isFolder && !isOpen" class="close cubeic-arrow"></i
          ><i v-else class="open-icon"></i>
        </div>
        <div class="info" @click="nodeSelect">
          {{ pData.name
          }}<span v-show="pData.selected" class="cubeic-ok"></span>
        </div>
      </div>
      <ul v-if="pData.children" v-show="isOpen">
        <TreeNode
          v-for="child in pData.children"
          :pData="child"
          :key="child.id"
          :level="level + 1"
          :autoExpandSelect="autoExpandSelect"
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
    level: {
      type: Number,
      default: 1, //节点在树中的层级，从第1层开始
    },
    autoExpandSelect: {
      type: Boolean,
      default: true, //是否自动展开选中的节点，默认是
    },
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
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    nodeSelect() {
      this.$bus.$emit("nodeClick", this.pData);
    },
  },
  created() {
    if (this.autoExpandSelect) {
      this.isOpen = this.pData.childSelected;
    } else {
      this.isOpen = false;
    }
  },
  updated() {
    this.$bus.$emit("nodeUpdate");
  },
};
</script>

<style scoped>
.tree-node > li > div {
  width: 100vw;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  display: flex;
}
.before {
  display: flex;
  align-items: center;
}
.left-indent {
  display: inline-flex;
  width: 10px;
}
.open {
  width: 18px;
  height: 18px;
}
.close {
  width: 18px;
  height: 18px;
}
.open-icon {
  display: inline-flex;
  width: 18px;
}
.info {
  padding-left: 2px;
  position: relative;
  flex: 1;
  text-align: left;
  display: flex;
}
.info span {
  color: green;
  position: absolute;
  right: 10px;
  top: center;
  align-self: center;
}
</style>
