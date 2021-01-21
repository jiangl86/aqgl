<template>
  <div class="yu-form">
    <yu-top-nav :name="name" class="nav" :showFunc="moreButtons.length > 0">
      <template #func-actions>
        <button @click="showMorePopup">更多</button>
      </template>
    </yu-top-nav>
    <yu-scroll class="scroll" ref="scroll">
      <slot></slot>
    </yu-scroll>
    <div class="bottom-func" v-if="bottomButtons.length > 0">
      <slot name="funcs">
        <button
          v-for="btn in bottomButtons"
          :key="btn.code"
          :class="{ active: bottomButtons.length == 1 }"
          @click="btnClick(btn)"
        >
          <yu-icon v-if="btn.icon" :icon="btn.icon"></yu-icon>
          {{ btn.name }}
        </button>
      </slot>
    </div>

    <!-- <yu-option-picker
      v-if="moreButtons.length > 0"
      :pData="moreButtons"
      :show="moreShow"
    ></yu-option-picker> -->
    <yu-popup
      v-if="moreButtons.length > 0"
      :isShow="moreShow"
      round
      @clickPopupOverlay="hideMorePopup"
    >
      <ul class="more-popup">
        <li v-for="btn in moreButtons" :key="btn.code" @click="btnClick(btn)">
          <yu-icon v-if="btn.icon" :icon="btn.icon" class="btn-icon"></yu-icon>
          {{ btn.name }}
        </li>
        <li @click="hideMorePopup">取消</li>
      </ul>
    </yu-popup>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuScroll from "components/common/scroll/YuScroll";
import YuIcon from "components/common/basic/YuIcon";
import YuPopup from "components/common/popup/YuPopup";

export default {
  name: "YuForm",
  props: {
    name: {
      type: String, //表单名称
      required: true,
    },
    isEdit: {
      type: Boolean, //是否需要进行编辑保存（比如正在编辑页面，审批页面等）
      default: false,
    },
    dataRight: {
      type: Object, //可操作权限
      // "addFlag":"0/1",新增权限标记
      // "editFlag":"0/1",修改权限标记
      // "viewFlag":"0/1",查看权限标记
      // "delFlag":"0/1",删除权限标记
      // "auditFlag":"0/1",审批权限标记
      // "reAuditFlag":"0/1",撤回审批权限标记
      // "appointFlag":"0/1",指定权限标记
      // "reapirFlag":"0/1",整改权限标记
      // "acceptFlag":"0/1",验收权限标记
      // "startFlag":"0/1",启动权限标记
      // "pauseFlag":"0/1",暂停权限标记
      // "stopFlag":"0/1",结束权限标记
    },
  },
  data() {
    return {
      bottomButtons: [], //底部加载功能按钮，根据权限进行初始化，包括code,name
      moreButtons: [], //更多弹框加载功能按钮，根据权限进行初始化,包括code,name
      moreShow: false, //更多按钮弹出框是否显示
    };
  },
  components: {
    YuTopNav,
    YuScroll,
    YuIcon,
    YuPopup,
  },
  created() {
    this.initData();
  },
  mounted() {
    //初始化样式
    this.initStyle();
  },
  methods: {
    //初始化数据，主要根据该条数据权限初始化，底部和右上角功能按钮
    initData() {
      if (this.isEdit) {
        this.bottomButtons.push({
          code: "save",
          name: "提交",
          icon: "success",
        });
      } else {
        if (this.dataRight) {
          if (this.dataRight.editFlag && this.dataRight.editFlag == "1") {
            this.bottomButtons.push({
              code: "edit",
              name: "修改",
              icon: "edit",
            });
          }
          if (this.dataRight.reAuditFlag && this.dataRight.reAuditFlag == "1") {
            this.bottomButtons.push({
              code: "reAudit",
              name: "撤回",
              icon: "revoke",
            });
          }
          if (this.dataRight.auditFlag && this.dataRight.auditFlag == "1") {
            this.bottomButtons.push({
              code: "audit",
              name: "审批",
              icon: "sign",
            });
          }

          if (this.dataRight.appointFlag && this.dataRight.appointFlag == "1") {
            this.bottomButtons.push({
              code: "appoint",
              name: "整改",
              icon: "replay",
            });
          }
          if (this.dataRight.repairFlag && this.dataRight.repairFlag == "1") {
            this.bottomButtons.push({
              code: "repair",
              name: "整改",
              icon: "replay",
            });
          }
          if (this.dataRight.acceptFlag && this.dataRight.acceptFlag == "1") {
            this.bottomButtons.push({
              code: "accept",
              name: "验收",
              icon: "success",
            });
          }

          if (this.dataRight.startFlag && this.dataRight.startFlag == "1") {
            this.bottomButtons.push({
              code: "start",
              name: "启动",
              icon: "play",
            });
          }
          if (this.dataRight.stopFlag && this.dataRight.stopFlag == "1") {
            this.bottomButtons.push({
              code: "stop",
              name: "结束",
              icon: "stop",
            });
          }

          if (this.dataRight.delFlag && this.dataRight.delFlag == "1") {
            this.moreButtons.push({
              code: "del",
              name: "删除",
              icon: "delete-o",
            });
          }
          if (this.dataRight.pauseFlag && this.dataRight.pauseFlag == "1") {
            this.moreButtons.push({
              code: "pause",
              name: "暂停",
              icon: "pause",
            });
          }
        }
      }
    },

    //初始化样式，主要是内容展示区域的高度
    initStyle() {
      let height = window.screen.height - 44;
      if (this.bottomButtons.length > 0) {
        height -= 41;
      }
      this.$refs.scroll.$el.style.height = height + "px";
    },

    //点击功能按钮
    btnClick(btn) {
      console.log(btn);
      this.$emit("btnClick", btn);
    },

    //点击更多
    showMorePopup() {
      this.moreShow = true;
    },

    //隐藏更多面板弹出框
    hideMorePopup() {
      this.moreShow = false;
    },
  },
};
</script>

<style scoped>
.scroll {
  margin-top: 44px;
  width: 100vw;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-func button:hover {
  background-color: lightblue;
}
.active {
  background-color: var(--mainColor);
  color: white;
}

.more-popup {
  display: flex;
  flex-direction: column;
}

.more-popup li {
  width: 100vw;
  height: var(--liHeight);
  line-height: var(--liHeight);
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.more-popup li:last-child {
  color: var(--mainColor);
}
.btn-icon {
  margin-right: 10px;
}
</style>
