<template>
  <div class="yu-label-select">
    <label><span v-if="required">*</span>{{ name }}</label>
    <yu-icon
      v-if="showFold"
      :icon="foldIcon"
      class="fold"
      @click.native="foldClick"
    ></yu-icon>
    <div v-if="canInput" class="selectIcon" @click="showSelectPicker">选择</div>
    <yu-textarea
      :placeholder="placeholder"
      :initialValue="value"
      :maxlength="maxlength"
      :showReamin="showReamin"
      :autoExpand="autoExpand"
      :readonly="readonly"
      :disabled="disabled"
      @focus="focusTextarea"
      @input="changeTextarea"
      ref="textarea"
      class="textarea"
      v-show="showContent"
    ></yu-textarea>
    <yu-option-picker
      v-if="!showTree"
      :show="showSelect"
      :multiSelect="multiSelect"
      :name="selectName"
      :pData="pData"
      :initialSelect="selected"
      @assert="assertSelect"
      @cancel="cancelSelect"
    ></yu-option-picker>
    <yu-tree
      v-if="showTree"
      v-show="showSelect"
      :multiSelect="multiSelect"
      :name="selectName"
      :pData="pData"
      :initialSelect="selected"
      :selectAssert="selectAssert"
      :chainSelect="chainSelect"
      :onlyLeaf="onlyLeaf"
      :showSelected="showSelected"
      :showSearch="showSearch"
      :autoExpandSelect="autoExpandSelect"
      :backTip="backTip"
      @assert="assertSelect"
      @cancel="cancelSelect"
    ></yu-tree>
  </div>
</template>

<script>
import YuOptionPicker from "components/common/popup/YuOptionPicker";
import YuIcon from "components/common/basic/YuIcon";
import YuTextarea from "components/common/basic/YuTextarea";
import YuTree from "components/common/basic/YuTree";

//引入js方法
import debounce from "common/util/debounce";
export default {
  name: "YuLabelSelect",
  props: {
    name: "", //标签名称
    required: {
      type: Boolean, //是否必填项，若为真会标识必填项标识
      default: false,
    },
    canInput: {
      type: Boolean,
      default: true,
    },
    showFold: {
      type: Boolean,
      default: false, //是否显示收起隐藏按钮，仅在查看时显示
    },
    selectType: {
      type: String,
      default: "tree", //弹框类别，option,tree两类
    },

    //选择框相关公用信息
    multiSelect: {
      type: Boolean, //是否多选
      default: true,
    },
    selectName: "", //弹框的标题名称
    pData: {
      type: Array, //数组中每个选项为一个item,必须包含name和id属性
    },
    initialSelect: {
      type: Array, //数组中每个选项为一个item,必须包含name和id属性
    },

    //树列表选择相关信息
    selectAssert: {
      type: Boolean,
      default: false, //是否支持点击就确认，仅单选时支持
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
      default: true, //是否在该页面展示搜素结果，默认为否
    },
    showSearch: {
      type: Boolean,
      default: true, //是否展示搜索框，默认为否
    },
    autoExpandSelect: {
      type: Boolean,
      default: true, //是否自动展开选中的节点，默认是
    },
    backTip: {
      type: Boolean,
      default: false, //点击返回时，是否由上级处理还是直接返回
    },

    // textarea相关属性
    initialValue: {
      type: String, //在选择框中初始化的显示值，一般显示的是initialSelect的name
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    maxlength: {
      type: Number,
      default: 500,
    },
    showReamin: {
      type: Boolean,
      default: false,
    },
    autoExpand: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.initialSelect,
      value: this.initialValue,
      foldIcon: "arrow-up",
      showContent: true, //控制是否显示选择的内容
      showSelect: false, //控制是否显示弹框
      refreshSelectedDebounce: null,
    };
  },
  components: {
    YuOptionPicker,
    YuIcon,
    YuTextarea,
    YuTree,
  },
  computed: {
    showTree() {
      return this.selectType == "tree";
    },
  },
  methods: {
    //输入框获得焦点
    focusTextarea() {
      //若不可以输入，则显示选择框
      if (!this.canInput) {
        this.showSelectPicker();
      }
    },

    //输入框内容修改，判断输入的内容和选项是否有相同的，有则设置为选中状态,没有就设置为未选中
    changeTextarea(value) {
      this.refreshSelectedDebounce(value);
    },

    //根据填写的内容，刷新选中情况
    refreshSelected(value) {
      if (value != "") {
        //首先替换中文字符
        value = value.replaceAll("，", ",");
        let valueArr = value.split(",");
        //在选中列表中添加名字存在的item
        for (let i = 0; i < valueArr.length; i++) {
          let exist = false;
          //首先在已选中的数组中查找是否存在
          for (let j = 0; j < this.selected.length; j++) {
            if (valueArr[i] == this.selected[j].name) {
              exist = true;
              break;
            }
          }
          //如果不存在，再到pData中查找
          if (!exist) {
            let item = this.findItem(this.pData, valueArr[i]);
            if (item) {
              item.selected = true; //设置为选中状态
              this.selected.push(item);
            }
          }
        }

        //删除selected中多余的项
        for (let i = this.selected.length - 1; i >= 0; i--) {
          let j = 0;
          for (; j < valueArr.length; j++) {
            if (this.selected[i].name == valueArr[j]) {
              break;
            }
          }
          if (j == valueArr.length) {
            this.selected[i].selected = false;
            this.selected.splice(i, 1);
          }
        }
      }
    },

    //在一个数组中查找对应的name是否存在，数组每一项为未一个对象，都包含name属相，可能含有children属相,存在则返回item,否则返回null
    findItem(list, name) {
      let i = 0;
      let childItem = null;
      for (; i < list.length; i++) {
        if (list[i].name == name) {
          return list[i];
        }
        if (list[i].children) {
          let item = this.findItem(list[i].children, name);
          if (item) {
            childItem = item;
          }
        }
      }
      return childItem;
    },

    //显示选择框
    showSelectPicker() {
      this.showSelect = true;
    },

    //点击收起隐藏
    foldClick() {
      this.showContent = !this.showContent;
      this.foldIcon = this.showContent ? "arrow-up" : "arrow-down";
    },

    //弹框选择确认
    assertSelect(selected) {
      this.selected = selected;
      this.value = "";
      for (let i = 0; i < this.selected.length; i++) {
        this.value += "," + this.selected[i].name;
      }
      if (this.value != "") {
        this.value = this.value.substring(1);
      }
      this.$refs.textarea.setValue(this.value);
      this.showSelect = false;
    },

    // 取消选择
    cancelSelect() {
      this.showSelect = false;
    },
  },

  mounted() {
    //若展示折叠按钮，则当内容长度超过100时默认隐藏
    if (this.showFold && this.$refs.textarea.initialHeight > 100) {
      this.foldClick();
    }
    //若selected为空，则初始化为空数据
    if (!this.selected) {
      this.selected = [];
    }

    //通过防抖动，防止输入频繁刷新选中列表
    this.refreshSelectedDebounce = debounce(this.refreshSelected);
  },
};
</script>

<style scoped>
.yu-label-select {
  display: flex;
  flex-direction: var(--showDirection);
  padding-bottom: 5px;
  background-color: var(--form-field-color);
  position: relative;
}
label {
  width: var(--form-label-width);
  text-align: left;
  padding-left: 10px;
  font-size: var(--font-size-sm);
  color: var(--form-label-color);
  align-self: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
label span {
  color: red;
  margin-right: 3px;
}
.fold {
  position: absolute;
  padding: 8px 10px;
  right: 0px;
  top: 0px;
}

.selectIcon {
  position: absolute;
  padding: 8px 10px;
  right: 0px;
  top: 0px;
  /* 选择按钮颜色 */
  color: var(--mainColor);
  font-size: var(--font-size-sm);
}
.textarea {
  flex: 1;
  padding: 0 10px;
}
</style>
