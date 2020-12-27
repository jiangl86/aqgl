<template>
  <div class="container">
    <Scroll ref="scroll">
      <ul>
        <TreeNode v-for="item in data" :data="item" :key="item.id"></TreeNode>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import TreeNode from "./child/TreeNode";
export default {
  name: "Tree",
  props: {
    multiSelect: {
      type: Boolean,
      default: false, //是否支持多选，默认为否
    },
    chainSelect: {
      type: Boolean,
      default: false, //是否支持父子节点联动选择，默认为否
    },
    onlyLeaf: {
      type: Boolean,
      default: false, //是否仅允许选中叶子节点，默认为否
    },
    showSelected: {
      type: Boolean,
      default: false, //是否在该页面展示搜素结果，默认为否
    },
    showSearch: {
      type: Boolean,
      default: false, //是否展示搜索框，默认为否
    },
    autoExpandSelect: {
      type: Boolean,
      default: true, //是否自动展开选中的节点，默认是
    },
    titleName: "", //标题名称
    data: [], //树的列表，每个元素必须包含id,和name元素，其中有子节点的必须包含children子列表
    initialSelect: [], //加载页面时选中的元素
  },
  data() {
    return {
      selected: this.initialSelect.concat(),
    };
  },
  components: {
    Scroll,
    TreeNode,
  },
  methods: {
    //对树列表进行数据初始化，判断各节点及其子节点的选中状态
    initData(itemList) {
      for (let i = 0; i < this.itemList.length; i++) {
        item = this.itemList[i];
        let state = this.getSelectState(item);
        if (state == 0) {
          this.$set(item, "selected", false);
          this.$set(item, "childSelected", false);
        } else if (state == 1) {
          this.$set(item, "selected", true);
          this.$set(item, "childSelected", false);
        } else if (state == 2) {
          this.$set(item, "selected", false);
          this.$set(item, "childSelected", true);
        } else {
          this.$set(item, "selected", true);
          this.$set(item, "childSelected", true);
        }
        if (item.children) {
          initData(item.children);
        }
      }
    },

    //获取节点及子节点选中状态，若未选中返回0，当前节点选中返回1，子节点（所有子节点）选中返回2，当前节点和子节点均选中返回3
    getSelectState(item) {
      if (this.initialSelect && this.initialSelect.length > 0) {
        let childState = 0;
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            childState = getSelectState(item.children[j]);
            if (childState == 1) {
              break;
            }
          }
        }
        let i = 0;
        for (; i < this.initialSelect.length; i++) {
          if (item.id == this.initialSelect[i].id) {
            if (childState != 0) {
              return 3;
            } else {
              return 1;
            }
          }
        }
        if (i == this.initialSelect.length) {
          if (childState != 0) {
            return 2;
          } else {
            return 0;
          }
        }
      }

      return 0;
    },
  },
  created() {
    this.initData(this.data);
  },
  mounted() {},
};
</script>

<style scoped>
</style>
