<template>
  <div class="yu-list">
    <yu-top-nav
      v-if="showNav"
      :showFunc="false"
      :name="navName"
      ref="nav"
    ></yu-top-nav>
    <div class="search" v-if="showSearch" ref="search">
      <yu-input
        :height="38"
        :placeholder="placeholder"
        ref="input"
        @input="input"
      ></yu-input>
      <button class="search-btn" @click="searchClick">搜索</button>
      <yu-icon
        v-show="showClear"
        icon="clear"
        class="clear"
        @click.native="clear"
      ></yu-icon>
    </div>
    <yu-scroll
      pullDownRefresh
      pullUpload
      :isLastPage="isLastPage"
      class="scroll"
      ref="scroll"
      @pullingDown="pullingDown"
      @pullingUp="pullingUp"
      @scrollEnd="scrollEnd"
    >
      <yu-listitem
        v-for="item in pList"
        :key="item.id"
        :showImage="showImage"
        :round="imgRound"
        :width="imgWidth"
        :height="imgHeight"
        :fit="imgFit"
        :showState="showState"
        :bgColor="bgColor"
        :currentUserColor="currentUserColor"
        :pData="item"
        class="items"
        @itemLoaded="itemLoaded"
        @clickItem="clickItem"
        @longTouch="longTouch"
      ></yu-listitem>
    </yu-scroll>
    <yu-popup
      v-if="showLongTouchPopup"
      :isShow="showPopup"
      round
      @clickPopupOverlay="hidePopup"
    >
      <ul class="more-popup">
        <li v-for="btn in popupFuncs" :key="btn.code" @click="btnClick(btn)">
          <yu-icon v-if="btn.icon" :icon="btn.icon" class="btn-icon"></yu-icon>
          {{ btn.name }}
        </li>
        <li v-if="popupFuncs.length == 0">没有撤回、删除等快捷操作权限</li>
        <li @click="hidePopup">取消</li>
      </ul>
    </yu-popup>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuListitem from "./YuListitem";
import YuScroll from "components/common/scroll/YuScroll";
import YuInput from "components/common/basic/YuInput";

import YuIcon from "components/common/basic/YuIcon";
import YuPopup from "components/common/popup/YuPopup";

import debounce from "common/util/debounce";
import { getEleHeight } from "common/util/csscompute";
export default {
  name: "YuList",
  props: {
    showNav: {
      type: Boolean, //是否展示导航栏
      default: false,
    },
    showSearch: {
      type: Boolean, //是否展示搜索框
      default: false,
    },
    showImage: {
      type: Boolean,
      default: false, //列表是否展示图片,需要数据中各item有image元素
    },
    showState: {
      type: Boolean,
      default: false, //是否显示state,默认在右上角，需要各item中有state元素
    },
    height: {
      type: Number, //list元素高度，主要用于控制scroll控制滚动，若不传该参数时，默认整个屏幕高度
    },
    navName: {
      type: String, //导航栏名称
    },
    isLastPage: {
      type: Boolean, //是否最后一页
      default: false,
    },
    showLongTouchPopup: {
      type: Boolean, //长按是否显示快捷操作面板
      default: false,
    },

    placeholder: {
      type: String, //搜索框提示文字
      required: true,
    },
    pList: {
      type: Array,
      required: true, //需要展示的数据列表
      //示例数据如下
      // {
      //     id: "1", //数据id
      //     image:
      //       "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
      //     name:
      //       "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
      //     state: "超期未整改",
      //     currentUser: "张三、李四",
      //     otherInfo: [
      //       {
      //         key: "设备号", //key的名称,比如“姓名”
      //         value: "SB551215454121", //value的值，比如“张三”
      //       },
      //       {
      //         key: "设备名称", //key的名称,比如“姓名”
      //         value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
      //       },
      //       {
      //         key: "检测日期", //key的名称,比如“姓名”
      //         value: "2020-12-18", //value的值，比如“张三”
      //       },
      //       {
      //         key: "是否超过有效保质期", //key的名称,比如“姓名”
      //         value: "否", //value的值，比如“张三”
      //       },
      //       {
      //         key: "有效期", //key的名称,比如“姓名”
      //         value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
      //       },
      //     ],
      //   },
    },

    bgColor: {
      type: String, //列表背景颜色，不传时，默认为白色
    },
    currentUserColor: {
      type: String, //当前操作人字体颜色，不传时，默认为橙色
    },
    imgRound: {
      type: Boolean,
      default: false, //图片是否显示为圆形
    },
    imgWidth: {
      type: String, //图片宽度，不传时，默认80
    },
    imgHeight: {
      type: String, //图片高度，不传时，默认80
    },
    imgFit: {
      type: String, //图片填充模式contain（保持宽高缩放图片，使图片的长边能完全显示出来）,cover,fill,none(原始尺寸),scale-down（取none或contain中较小的一个）
    },
  },
  data() {
    return {
      searchValue: "",
      scrollRefresh: null,
      itemloadedCount: 0,
      isPullingUp: false, //是否正在上拉加载新数据
      isPullingDown: false, //是否正在下拉刷新数据

      showPopup: false, //快捷操作面板显示状态
      popupFuncs: [], //快捷操作按钮对应的功能
    };
  },
  components: {
    YuTopNav,
    YuListitem,
    YuScroll,
    YuInput,
    YuIcon,
    YuPopup,
  },
  computed: {
    showClear() {
      if (this.searchValue.trim() != "") {
        return true;
      }
      return false;
    },
  },
  created() {},
  mounted() {
    this.initScrollStyle();
    this.scrollRefresh = debounce(this.$refs.scroll.refresh);
    this.scrollRefresh();
  },
  watch: {
    //监测pList数据，更新上拉加载及下拉刷新状态
    pList() {
      if (this.isPullingDown) {
        this.$refs.scroll.finishPullDown();
        this.isPullingDown = false;
        this.scrollRefresh && this.scrollRefresh();
      }

      if (this.isPullingUp) {
        this.$refs.scroll.finishPullUp();
        this.isPullingUp = false;
        this.scrollRefresh && this.scrollRefresh();
      }
    },
  },
  methods: {
    initScrollStyle() {
      let height = this.height ? this.height : window.screen.height;
      let marginTop = 0;
      if (this.showNav && this.$refs.nav) {
        let navHeight = getEleHeight(this.$refs.nav.$el);
        height -= navHeight;
        marginTop = navHeight;
      }

      if (this.showSearch) {
        let searchHeight = getEleHeight(this.$refs.search);
        height -= searchHeight;
        if (marginTop > 0) {
          marginTop -= searchHeight;
        }
      }
      this.$refs.scroll.$el.style.height = height + "px";
      this.$refs.scroll.$el.style.marginTop = marginTop + "px";
    },

    //隐藏快捷功能面板
    hidePopup() {
      this.showPopup = false;
    },

    //查询数据项有的便捷操作
    getPopupFuncs(item) {
      this.popupFuncs.splice(0, this.popupFuncs.length);
      if (item.dataRight) {
        let dataRight = item.dataRight;

        if (dataRight.reAuditFlag && dataRight.reAuditFlag == "1") {
          this.popupFuncs.push({
            code: "reAudit",
            name: "撤回",
            icon: "revoke",
          });
        }

        if (dataRight.startFlag && dataRight.startFlag == "1") {
          this.popupFuncs.push({
            code: "start",
            name: "启动",
            icon: "play",
          });
        }
        if (dataRight.pauseFlag && dataRight.pauseFlag == "1") {
          this.popupFuncs.push({
            code: "pause",
            name: "暂停",
            icon: "pause",
          });
        }
        if (dataRight.stopFlag && dataRight.stopFlag == "1") {
          this.popupFuncs.push({ code: "stop", name: "结束", icon: "stop" });
        }

        if (dataRight.delFlag && dataRight.delFlag == "1") {
          this.popupFuncs.push({
            code: "del",
            name: "删除",
            icon: "delete-o",
          });
        }
      }
    },

    //列表数据加载后刷新scroll,若采用刷新列表方式，key相同的数据不会重新加载
    itemLoaded() {
      this.scrollRefresh && this.scrollRefresh();
    },
    //item点击之后
    clickItem(item) {
      console.log("click");
      this.$emit("clickItem", item);
    },

    //长按事件
    longTouch(item) {
      console.log("long");
      this.getPopupFuncs(item);
      this.showPopup = true;
      this.$emit("longTouch", item);
    },

    //点击快捷操作面板功能按钮
    btnClick(btn) {
      console.log(btn);
      this.$emit("btnClick", btn);
    },

    //滚动结束后，上端位置不能大于0
    scrollEnd(position) {
      if (position.y > 0) {
        this.$refs.scroll.scrollTo(position.x, 0);
      }
    },
    //上拉加载
    pullingUp() {
      this.isPullingUp = true;
      this.$emit("pullingUp");
    },
    // 下拉刷新
    pullingDown() {
      this.isPullingDown = true;
      this.$emit("pullingDown");
    },

    //输入框值发生变化
    input(value) {
      this.searchValue = value;
    },
    //清空文字
    clear() {
      this.$refs.input.value = "";
      this.searchValue = "";
    },

    searchClick() {
      this.$emit("searchClick", this.$refs.input.value);
    },
  },
};
</script>

<style scoped>
.yu-list {
  display: flex;
  flex-direction: column;
}
.search {
  height: 40px;
  width: 100%;
  margin-top: 44px;
  position: relative;
}
.clear {
  position: absolute;
  right: 60px;
  top: 12px;
  color: var(--clear-button-color);
}
.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 12px;
  height: 37px;
  border: none;
  border-radius: 0 3px 3px 0;
}
.scroll {
  width: 100vw;
  overflow: hidden;
}
.items {
  margin-bottom: 5px;
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
