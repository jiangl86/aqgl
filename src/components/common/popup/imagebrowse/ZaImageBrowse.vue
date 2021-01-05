<template>
  <div
    class="za-image-browse"
    v-show="isShow"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <ZaScroll
      scrollX
      dblclick
      :probeType="2"
      :momentum="false"
      ref="scroll"
      class="scroll"
      @scrollEnd="scrollEnd"
      @zooming="zooming"
    >
      <div class="imgs" ref="imgs">
        <img
          v-for="(img, index) in imgs"
          :src="img"
          :key="index"
          :class="{
            show: index == currentIndex,
            last: index == currentIndex - 1,
            next: index == currentIndex + 1,
          }"
          @dblclick.prevent="dblclick"
          @load="loadImg"
        />
      </div>
    </ZaScroll>
    <div class="img-index">{{ currentIndex + 1 }}/{{ imgs.length }}</div>
    <ZaOptionPicker
      v-if="actionShow"
      :pData="actions"
      name="请选择操作"
      @cancel="cancel"
      @assert="assert"
    ></ZaOptionPicker>
  </div>
</template>

<script>
import ZaScroll from "components/common/scroll/ZaScroll";
import ZaOptionPicker from "components/common/popup/ZaOptionPicker";

import debounce from "common/util/debounce";
export default {
  name: "ZaImageBrowse",
  data() {
    return {
      imgs: [], //需要展示的图片列表
      currentIndex: 0, //当前展示的图片对应的数组索引
      initialWidth: 0, //设备宽度
      scale: 1, //当前放大倍数，也是最小倍数
      maxScale: 4, //最大放大倍数
      isShow: false, //控制该图片组件是否显示
      time: null, //双击计时器
      dbl: false, //是否双击
      refresh: null, //scroll防抖后的刷新函数
      loadCount: 0, //加载图片时，已加载的图片数量
      actionShow: false, //控制操作面板是否显示
      //支持的操作
      actions: [
        {
          name: "发送",
          id: 1,
        },
        {
          name: "收藏",
          id: 2,
        },
        {
          name: "保存图片",
          id: 3,
        },
      ],
      longTouchTimer: null, //长按计时器
      initX1: 0, //放大缩小时，第一个手指初始x坐标
      initY1: 0, //放大缩小时，第一个手指初始y坐标
      initX2: 0, //放大缩小时，第二个手指初始x坐标
      initY2: 0, //放大缩小时，第二个手指初始y坐标
    };
  },
  components: {
    ZaScroll,
    ZaOptionPicker,
  },

  methods: {
    getEleLeft(selector) {
      return window
        .getComputedStyle(document.querySelector(selector))
        .left.replace("px", "");
    },
    assert(selected) {
      alert(selected);
      this.actionShow = false;
    },
    cancel() {
      this.actionShow = false;
    },
    //长按显示操作
    touchstart(e) {
      if (e.touches.length == 1) {
        this.longTouchTimer = setTimeout(() => {
          this.actionShow = true;
        }, 2000);
      } else if (e.touches.length == 2) {
        this.initX1 = e.touches[0].pageX;
        this.initY1 = e.touches[0].pageY;
        this.initX2 = e.touches[1].pageX;
        this.initY2 = e.touches[1].pageY;
      }
    },
    touchmove(e) {
      if (this.longTouchTimer) {
        clearTimeout(this.longTouchTimer);
      }
      if (e.touches.length == 2) {
        let newL = math.sqrt(
          (e.touches[0].pageX - e.touches[1].pageX) *
            (e.touches[0].pageX - e.touches[1].pageX) +
            (e.touches[0].pageY - e.touches[1].pageY) *
              (e.touches[0].pageY - e.touches[1].pageY)
        );
        let oldL = math.sqrt(
          (this.initX1 - this.initX2) * (this.initX1 - this.initX2) +
            (this.initY1 - this.initY2)(this.initY1 - this.initY2)
        );
        let scale = newL / oldL;
        zooming(scale);
      }
    },
    touchend(e) {
      if (this.longTouchTimer) {
        clearTimeout(this.longTouchTimer);
      }
    },
    //单击隐藏
    hide() {
      clearTimeout(this.time); //首先清除计时器
      if (!this.dbl) {
        this.time = setTimeout(() => {
          this.isShow = false;
        }, 300); //大概时间300ms
      }
    },
    setWidth() {
      if (this.scale == 1) {
        this.$refs.scroll.scrollTo(-this.currentIndex * this.initialWidth, 0);
      }

      let width = this.initialWidth * this.scale;
      this.$refs.imgs.querySelector(".show").style.width = width + "px";

      this.$refs.scroll.$el.querySelector(
        ".content"
      ).style.height = window.getComputedStyle(
        this.$refs.imgs.querySelector(".show")
      ).height;

      //更新scroll
      this.refresh();
    },
    restoreWidth() {
      this.scale = 1;

      //恢复content高度
      this.$refs.scroll.$el.querySelector(
        ".content"
      ).style.height = window.getComputedStyle(
        this.$refs.imgs.querySelector(".show")
      ).height;

      //更新scroll
      this.refresh();
    },
    dblclick() {
      //禁止单击
      clearTimeout(this.time); //首先清除计时器
      this.dbl = true;
      setTimeout(() => {
        this.dbl = false;
      }, 300);
      //放大缩小
      this.scale = this.scale < this.maxScale ? this.maxScale : 1;
      //   this.scale += 0.5;
      this.setWidth();
    },
    zooming(scale) {
      this.scale += scale;
      this.scale = this.scale < 1 ? 1 : this.scale;
      this.scalethis.scale > this.maxScale ? this.maxScale : this.scale;
      this.setWidth();
    },

    scrollEnd(position) {
      let el = this.$refs.imgs.querySelector(".show");
      let switchThreshold = 0.25;

      //跳转到上一张
      if (
        position.x >
        (switchThreshold - this.currentIndex) * this.initialWidth
      ) {
        el.style.width = this.initialWidth + "px";
        this.currentIndex -= 1;
        this.scrollToCurrentIndex();
        this.restoreWidth();
      }
      //跳转到下一张
      else if (
        position.x <
        (1 - switchThreshold - this.currentIndex) * this.initialWidth -
          this.initialWidth * this.scale
      ) {
        el.style.width = this.initialWidth + "px";
        this.currentIndex += 1;
        this.scrollToCurrentIndex();
        this.restoreWidth();
      }
      //照片左边缘对齐左侧屏幕
      else if (
        position.x <
          (switchThreshold - this.currentIndex) * this.initialWidth &&
        position.x > -this.currentIndex * this.initialWidth
      ) {
        this.$refs.scroll.scrollTo(
          -this.currentIndex * this.initialWidth,
          position.y
        );
      }
      //照片右边缘对齐右侧屏幕
      else if (
        position.x >
          (1 - switchThreshold - this.currentIndex) * this.initialWidth -
            this.initialWidth * this.scale &&
        position.x <
          (1 - this.currentIndex) * this.initialWidth -
            this.initialWidth * this.scale
      ) {
        let x =
          (1 - this.currentIndex) * this.initialWidth -
          this.initialWidth * this.scale;
        this.$refs.scroll.scrollTo(x, position.y);
      }
    },

    showImg(imgs, selectIndex = 0, maxScale = 4) {
      this.maxScale = maxScale;
      this.currentIndex = selectIndex;
      if (this.imgs != imgs) {
        this.imgs = imgs;
        this.loadCount = 0;
      } else {
        this.scrollToCurrentIndex();
      }

      this.isShow = true;
    },
    //图像加载完成后，刷新scroll,若图像不变更时，有问题
    loadImg() {
      this.refresh();
      this.loadCount++;
      if (this.loadCount == this.imgs.length) {
        this.scrollToCurrentIndex();
      }
    },
    //跳转到指定的图片
    scrollToCurrentIndex() {
      let x = -this.currentIndex * this.initialWidth;
      this.$refs.scroll.scrollTo(x, 0);
    },
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh);
    this.initialWidth = window
      .getComputedStyle(document.querySelector("body"))
      .width.replace("px", "");
  },
};
</script>

<style scoped>
.za-image-browse {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 400;
  position: absolute;
  top: 0;
  left: 0;
}
.scroll {
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.imgs {
  display: flex;
  flex-direction: row;
  align-items: center;
}
img {
  width: 100vw;
}
.img-index {
  position: absolute;
  left: 50%;
  bottom: 20px;
  color: white;
}
</style>
