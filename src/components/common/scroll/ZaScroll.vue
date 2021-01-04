<template>
  <div ref="wrapper">
    <div class="content">
      <div class="refresh" v-if="pullDownRefresh && positionY > 40">
        下拉刷新数据
      </div>
      <slot></slot>
      <div class="more" v-if="pullUpload">上拉加载更多...</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
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
  },
  data() {
    return {
      scroll: null,
      positionY: 0,
      positionX: 0,
    };
  },
  components: {
    BScroll,
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      console.log("refresh");
      this.scroll && this.scroll.refresh();
    },
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown();
      this.scroll && tis.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullDownRefresh: this.pullDownRefresh,
      pullUpLoad: this.pullUpload,
      probeType: 3,
      click: true,
      dblclick: this.dblclick,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
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
      console.log(position);
      this.$emit("scrollEnd", position);
    });
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
}

.refresh {
  width: 100%;
  background-color: lightyellow;
}
.more {
  width: 100%;
  background-color: lightyellow;
}
</style>
