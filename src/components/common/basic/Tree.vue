<template>
  <div class="tree">
    <TopNav :name="name"></TopNav>
    <za-input
      v-if="showSearch"
      suffixIcon="el-icon-search"
      placeholder="请输入名称进行检索"
      class="search"
      ref="search"
      @keyup.native.13="search"
      @clear="recover"
    ></za-input>
    <Scroll ref="scroll" class="scroll">
      <ul>
        <TreeNode
          v-for="item in pData"
          :pData="item"
          :key="item.id"
          :autoExpandSelect="autoExpandSelect"
        ></TreeNode>
      </ul>
    </Scroll>
    <div ref="aa"></div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import TreeNode from "./child/TreeNode";
import TopNav from "components/common/nav/TopNav";
import ZaInput from "components/common/basic/Input";

import debounce from "common/util/debounce";

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
    //标题名称
    name: "",
    //树的列表，每个元素必须包含id,和name元素，其中有子节点的必须包含children子列表
    pData: {
      type: Array,
      default: function () {
        return [
          {
            name: "一级节点1",
            id: 1,
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
                  {
                    name: "三级节点513",
                    id: 513,
                    children: [
                      {
                        name: "四级节点5131",
                        id: 5131,
                      },
                      {
                        name: "四级节点5132",
                        id: 5132,
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
    //加载页面时选中的元素
    initialSelect: {
      type: Array,
    },
  },
  data() {
    return {
      selected: [],
      refresh: null,
    };
  },
  components: {
    Scroll,
    TreeNode,
    TopNav,
    ZaInput,
  },
  methods: {
    //对树列表进行数据初始化，判断各节点及其子节点的选中状态
    initData(itemList) {
      for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        let state = this.getSelectState(item);

        this.$set(item, "show", true); //设置是否展示，主要用于后面进行搜索展示
        if (state == 0) {
          this.$set(item, "selected", false);
          this.$set(item, "childSelected", false);
        } else if (state == 1) {
          this.$set(item, "selected", true);
          this.$set(item, "childSelected", false);
          this.pushToSelected(item);
        } else if (state == 2) {
          this.$set(item, "selected", false);
          this.$set(item, "childSelected", true);
        } else {
          this.$set(item, "selected", true);
          this.$set(item, "childSelected", true);
        }
        if (item.children) {
          this.initData(item.children);
        }
      }
    },

    //初始化样式
    initStyle() {
      let height = Number(
        window.getComputedStyle(this.$refs.scroll.$el).height.replace("px", "")
      );
      let marginTop = Number(
        window
          .getComputedStyle(this.$refs.scroll.$el)
          .marginTop.replace("px", "")
      );
      if (this.showSearch) {
        height -= 30;
        marginTop = 0;
      }
      if (this.showSelected) {
        height -= 42;
      }
      this.$refs.scroll.$el.style.height = height + "px";
      this.$refs.scroll.$el.style.marginTop = marginTop + "px";
    },

    //获取节点及子节点选中状态，若未选中返回0，当前节点选中返回1，子节点（所有子节点）有选中的返回2，当前节点和子节点均选中返回3
    getSelectState(item) {
      if (this.initialSelect && this.initialSelect.length > 0) {
        let childState = 0;
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            let state = this.getSelectState(item.children[j]);
            if (state != 0) {
              childState = state;
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

    //跳转至第一个选中的选项,选中项在若产生的移动则在页面最下方
    ScrollToSelect() {
      let pos = 0;
      if (this.selected) {
        pos = this.getFirstSelectPos(this.pData);
        let yPos = pos * 41;
        if (yPos > window.screen.availHeight - 44) {
          if (this.$refs.scroll) {
            yPos = window.screen.availHeight - 44 - yPos;
            this.$refs.scroll.scrollTo(0, yPos);
          }
        }
      }
    },

    //计算第一个选中点在树种的顺序
    getFirstSelectPos(itemList) {
      for (let i = 0; i < itemList.length; i++) {
        let child = itemList[i];
        if (child.children) {
          let pos = this.getFirstSelectPos(child.children);
          if (pos > 0) {
            return pos + i + 1;
          }
        }
        let j = 0;
        for (; j < this.selected.length; j++) {
          if (child.id == this.selected[j].id) {
            break;
          }
        }
        if (j < this.selected.length) {
          return i + 1;
        }
      }
      return 0;
    },
    //插入选中的节点，根据是否多选，是否级联选择来确定选中的信息
    pushToSelected(item) {
      //多选
      if (this.multiSelect) {
        //仅能选择叶子节点
        if (this.onlyLeaf) {
          if (!item.children) {
            item.selected = true;
            this.selected.push(item);
          }
        }
        //所有节点都可以选择
        else {
          item.selected = true;
          this.selected.push(item);
          //如果是级联选择
          if (this.chainSelect) {
            if (item.children) {
              for (let i = 0; i < item.children.length; i++) {
                this.pushToSelected(item.children[i]);
              }
            }
          }
        }
      }
      //单选
      else {
        if (this.onlyLeaf && item.children) {
          return;
        }
        //先删除之前所有已选择项
        for (let i = 0; i < this.selected.length; i++) {
          this.deleteFromSelected(this.selected[i], i);
        }
        item.selected = true;
        this.selected.push(item);
      }
    },

    // 从已选列表中移除选项,source用于判断数据来源，若是点击产生的，则级别删除所有下级子节点，
    // 若是由于取消某个子节点导致父节点删除，则仅删除父节点，这个时候source不用click,默认为点击产生
    deleteFromSelected(item, index, source = "click") {
      item.selected = false;
      this.selected.splice(index, 1);
      //若是父子联动选择，针对父子联动进行操作
      if (this.chainSelect) {
        //移除该节点对应父节点的选中状态
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].children) {
            for (let j = 0; j < this.selected[i].children.length; j++) {
              if (this.selected[i].children[j].id == item.id) {
                this.deleteFromSelected(this.selected[i], i, "other");
                break;
              }
            }
          }
        }
        //若有子节点，移除其对应子节点的选中状态
        if (item.children && source == "click") {
          for (let i = 0; i < item.children.length; i++) {
            for (let j = 0; j < this.selected.length; j++) {
              if (item.children[i].id == this.selected[j].id) {
                this.deleteFromSelected(item.children[i], j);
              }
            }
          }
        }
      }
    },

    //根据搜索关键字,设置节点展示
    setShowState(item, name) {
      if (item.name.indexOf(name) != -1) {
        item.show = true;
        if (item.children) {
          this.recoverShowState(item.children);
        }
        return 1;
      } else {
        let childState = 0;
        if (item.children) {
          for (let i = 0; i < item.children.length; i++) {
            let state = this.setShowState(item.children[i], name);
            if (state != 0) {
              childState = state;
            }
          }
        }
        if (childState != 0) {
          item.show = true;
          return 2;
        } else {
          item.show = false;
          return 0;
        }
      }
    },

    recoverShowState(itemList) {
      for (let i = 0; i < itemList.length; i++) {
        itemList[i].show = true;
        if (itemList[i].children) {
          this.recoverShowState(itemList[i].children);
        }
      }
    },
    //点击节点事件
    nodeClick(item) {
      let exist = false;
      for (let i = 0; i < this.selected.length; i++) {
        if (item.id == this.selected[i].id) {
          exist = true;
          this.deleteFromSelected(item, i);
          break;
        }
      }
      if (!exist) {
        this.pushToSelected(item);
      }
    },

    //根据搜素关键字显示树
    search() {
      if (this.$refs.search.value.trim() != "") {
        let name = this.$refs.search.value.trim();
        for (let i = 0; i < this.pData.length; i++) {
          this.setShowState(this.pData[i], name);
        }
      }
      //取消搜索结果
      else {
        this.recoverShowState(this.pData);
      }
    },
    //恢复完整树显示
    recover() {
      this.recoverShowState(this.pData);
    },
  },
  created() {
    this.initData(this.pData);
  },
  mounted() {
    this.initStyle();
    this.refresh = debounce(this.$refs.scroll.refresh);
    this.refresh();
    this.ScrollToSelect();

    //监听子组件数据初始化事件，然后滚动至选中项
    this.$bus.$on("nodeUpdate", () => {
      this.refresh();
    });
    this.$bus.$on("nodeClick", (node) => {
      this.nodeClick(node);
    });
    console.log(window.getComputedStyle(this.$refs.scroll.$el).height);
  },
  updated() {},
};
</script>

<style scoped>
.tree {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
}

.search {
  margin-top: 44px;
}
.scroll {
  margin-top: 44px;
  height: calc(100vh - 44px);
  overflow: hidden;
}
</style>
