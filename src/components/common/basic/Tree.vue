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
    title: "", //标题名称
    //树的列表，每个元素必须包含id,和name元素，其中有子节点的必须包含children子列表
    pData: {
      type: Array,
      default: function () {
        return [
          {
            name: "一级节点1",
            id: 1,
            isSelect: true,
            children: [
              {
                name: "二级节点11",
                id: 11,
                children: [
                  {
                    name: "三级节点111",
                    id: 111,
                  },
                  {
                    name: "三级节点112",
                    id: 112,
                  },
                ],
              },
              {
                name: "二级节点12",
                id: 12,
                children: [
                  {
                    name: "三级节点121",
                    id: 121,
                  },
                ],
              },
            ],
          },
          {
            name: "一级节点2",
            id: 2,
            isSelect: false,
            children: [
              {
                name: "二级节点21",
                id: 21,
                children: [
                  {
                    name: "三级节点211",
                    id: 211,
                  },
                  {
                    name: "三级节点212",
                    id: 212,
                  },
                ],
              },
              {
                name: "二级节点22",
                id: 22,
              },
            ],
          },
          {
            name: "一级节点3",
            id: 3,
          },
          {
            name: "一级节点4",
            id: 4,
            isSelect: false,
            children: [
              {
                name: "二级节点41",
                id: 41,
                children: [
                  {
                    name: "三级节点411",
                    id: 411,
                  },
                  {
                    name: "三级节点412",
                    id: 412,
                    children: [
                      {
                        name: "四级节点4121",
                        id: 4121,
                      },
                      {
                        name: "四级节点4122",
                        id: 4122,
                      },
                      {
                        name: "四级节点4123",
                        id: 4123,
                      },
                      {
                        name: "四级节点4124",
                        id: 4124,
                      },
                    ],
                  },
                ],
              },
              {
                name: "二级节点42",
                id: 42,
              },
            ],
          },
          {
            name: "一级节点5",
            id: 5,
            isSelect: false,
            children: [
              {
                name: "二级节点51",
                id: 51,
                children: [
                  {
                    name: "三级节点511",
                    id: 511,
                  },
                  {
                    name: "三级节点512",
                    id: 512,
                    children: [
                      {
                        name: "四级节点5121",
                        id: 5121,
                      },
                      {
                        name: "四级节点5122",
                        id: 5122,
                      },
                      {
                        name: "四级节点5123",
                        id: 5123,
                      },
                      {
                        name: "四级节点5124",
                        id: 5124,
                      },
                      {
                        name: "四级节点5125",
                        id: 5125,
                      },
                    ],
                  },
                ],
              },
              {
                name: "二级节点22",
                id: 22,
              },
            ],
          },
          {
            name: "一级节点6",
            id: 6,
          },
          {
            name: "一级节点7",
            id: 7,
          },
          {
            name: "一级节点8",
            id: 8,
          },
          {
            name: "一级节点9",
            id: 9,
            isSelect: false,
            children: [
              {
                name: "二级节点91",
                id: 91,
                children: [
                  {
                    name: "三级节点911",
                    id: 911,
                  },
                  {
                    name: "三级节点912",
                    id: 912,
                    children: [
                      {
                        name: "四级节点9121",
                        id: 9121,
                      },
                      {
                        name: "四级节点9122",
                        id: 9122,
                      },
                      {
                        name: "四级节点9123",
                        id: 9123,
                      },
                      {
                        name: "四级节点9124",
                        id: 9124,
                      },
                      {
                        name: "四级节点9125",
                        id: 9125,
                      },
                    ],
                  },
                ],
              },
              {
                name: "二级节点22",
                id: 22,
              },
            ],
          },
        ];
      },
    },
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
    this.initData(this.pData);
  },
  mounted() {},
};
</script>

<style scoped>
</style>
