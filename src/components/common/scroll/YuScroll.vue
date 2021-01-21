<template>
  <div ref="wrapper">
    <div class="content">
      <div class="refresh" v-if="pullDownRefresh && positionY > 40">
        下拉刷新数据
      </div>
      <slot></slot>
      <div
        class="more"
        v-if="pullUpload && scroll && positionY < scroll.maxScrollY - 10"
      >
        <span v-if="isLastPage">没有更多数据了</span>
        <span v-else>上拉加载更多数据...</span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import Zoom from "@better-scroll/zoom";

// BScroll.use(Zoom);
export default {
  name: "YuScroll",
  props: {
    pullDownRefresh: {
      type: Boolean,
      default: false, //是否具备下来刷新功能，默认否
    },
    pullUpload: {
      type: Boolean,
      default: false, //是否支持上拉加载新数据功能，默认否
    },
    scrollX: {
      type: Boolean,
      default: false, //是否支持X轴滚动，默认为否
    },
    scrollY: {
      type: Boolean,
      default: true, //Y轴滚动，默认Y轴
    },
    dblclick: {
      type: Boolean,
      default: false, //是否支持双击事件，默认为否
    },
    probeType: {
      type: Number,
      default: 3, //决定是否派发 scroll 事件，对页面的性能有影响，尤其是在 useTransition 为 true 的模式下
    },
    momentum: {
      type: Boolean,
      default: true, //当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画
    },
    isLastPage: {
      type: Boolean, //是否最后一页
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      positionY: 0,
      positionX: 0,
      // pullUploadTips: this.isLastPage?"上拉加载更多数据...",
    };
  },
  components: {
    BScroll,
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    scrollBy(x, y, time = 300) {
      this.scroll && this.scroll.scrollBy(x, y, time);
    },
    scrollToElement(el, time = 300) {
      this.scroll && this.scroll.scrollToElement(el, time, true, true);
    },
    stop() {
      this.scroll && this.scroll.stop();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      console.log("refresh");
      this.scroll && this.scroll.refresh();
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
      this.scroll && this.scroll.refresh();
    },

    // //当已经没有更多数据时，将上拉加载更多提示语修改为“没有数据了”
    // modidyUploadTips() {
    //   this.pullUploadTips = "没有更多数据了";
    // },

    // restoreUploadTips() {
    //   this.pullUploadTips = "上拉加载更多数据...";
    // },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullDownRefresh: this.pullDownRefresh,
      pullUpLoad: this.pullUpload,
      probeType: this.probeType,
      click: true,
      dblclick: this.dblclick,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      momentum: this.momentum,
    });

    if (this.pullUpload) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    if (this.pullDownRefresh) {
      this.scroll.on("pullingDown", () => {
        this.$emit("pullingDown");
      });
    }

    this.scroll.on("scroll", (position) => {
      this.positionY = position.y;
      this.positionX = position.x;
      this.$emit("scroll", position);
    });
    this.scroll.on("scrollEnd", (position) => {
      this.$emit("scrollEnd", position);
    });
    this.scroll.on("touchEnd", (position) => {
      this.$emit("touchEnd", position);
    });
  },
};
</script>

<style scoped>
/* .content {
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
} */

.refresh {
  width: 100%;
  background-color: lightyellow;
}
.more {
  width: 100%;
  background-color: lightyellow;
}
</style>
