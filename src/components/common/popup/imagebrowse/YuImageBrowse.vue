<template>
  <div
    class="yu-image-browse"
    v-show="isShow"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @dblclick="dblclick"
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
        @load="imgLoad"
      />
    </div>
    <div class="img-index">{{ currentIndex + 1 }}/{{ imgs.length }}</div>
    <yu-option-picker
      v-if="actionShow"
      :pData="actions"
      name="请选择操作"
      @cancel="cancel"
      @assert="assert"
    ></yu-option-picker>
  </div>
</template>

<script>
import YuOptionPicker from "components/common/popup/YuOptionPicker";

import { getEleWidth, getEleHeight } from "common/util/csscompute";
export default {
  name: "YuImageBrowse",
  data() {
    return {
      imgs: [], //需要展示的图片列表
      currentIndex: 0, //当前展示的图片对应的数组索引
      initialWidth: 0, //设备宽度
      initialHeight: 0, //设备高度
      scale: 1, //当前放大倍数，也是最小倍数
      maxScale: 4, //最大放大倍数
      loadCount: 0, //图片加载数量
      isShow: false, //控制该图片组件是否显示
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
      singleClickTimer: null, //单击计时器
      fullFillSingleClick: false, //是否满足单击条件，300毫秒内没有双击，且没有长按，没有移动在结束点击时算单击

      longTouchTimer: null, //长按计时器
      initX1: 0, //放大缩小时，第一个手指初始x坐标
      initY1: 0, //放大缩小时，第一个手指初始y坐标
      initX2: 0, //放大缩小时，第二个手指初始x坐标
      initY2: 0, //放大缩小时，第二个手指初始y坐标
      zoomTimer: null, //每200毫秒缩放一次
      canZoom: false, //当前是否可缩放
      moveTimer: null, //每200毫秒缩放一次
      canMove: false, //当前是否可移动
      left: 0, //Imgs当前左上角位置，用于定位
      top: 0,
    };
  },
  components: {
    YuOptionPicker,
  },

  methods: {
    //显示图片，供使用者调用的方法，imgs是需要展示的图片列表，
    //selectIndex为默认需要展示的图片索引，从0开始，maxScale为最大放大倍数，默认为4倍
    showImg(imgs, selectIndex = 0, maxScale = 4) {
      this.maxScale = maxScale;
      this.currentIndex = selectIndex;
      if (this.imgs != imgs) {
        this.imgs = imgs;
        this.loadCount = 0;
      } else {
        this.setImgPosAndSize();
        this.move();
      }

      this.isShow = true;
    },
    touchstart(e) {
      this.initX1 = e.touches[0].pageX;
      this.initY1 = e.touches[0].pageY;
      if (e.touches.length == 1) {
        console.log("aa");
        //单击计时器
        if (this.singleClickTimer) {
          clearTimeout(this.singleClickTimer);
        }
        this.singleClickTimer = setTimeout(() => {
          this.fullFillSingleClick = true;
        }, 300);
        //长按计时器
        this.longTouchTimer = setTimeout(() => {
          this.actionShow = true;
          this.fullFillSingleClick = false; //如果满足长按条件，则取消单击条件
        }, 1500);
      }
      if (e.touches.length == 2) {
        console.log("bb");
        //清除单击计时器
        if (this.singleClickTimer) {
          clearTimeout(this.singleClickTimer);
        }
        //清除长按计时器
        if (this.longTouchTimer) {
          clearTimeout(this.longTouchTimer);
        }
        this.initX2 = e.touches[1].pageX;
        this.initY2 = e.touches[1].pageY;
      }
    },
    touchmove(e) {
      if (e.touches.length == 1) {
        this.moveTimer = setInterval(() => {
          this.canMove = true;
        }, 100);
        let moveX = e.touches[0].pageX - this.initX1;
        let moveY = e.touches[0].pageY - this.initY1;

        let distance = Math.sqrt(moveX * moveX + moveY * moveY);
        //如果移动，取消长按计时器
        if (distance > 10 && this.longTouchTimer) {
          clearTimeout(this.longTouchTimer);
        }
        //如果移动，取消单击计时器
        if (distance > 5) {
          if (this.singleClickTimer) {
            clearTimeout(this.singleClickTimer);
          }
          this.fullFillSingleClick = false;
        }
        //进行图像移动
        if (this.canMove) {
          let left = this.left + moveX;
          let top = this.top + moveY;
          //最大可移动宽度和高度
          let maxWidth =
            (this.imgs.length - 2) * this.initialWidth +
            this.initialWidth * this.scale;
          let maxHeight = this.initialHeight * this.scale;
          if (left <= 0 && left >= -maxWidth && top <= 0 && top >= -maxHeight) {
            this.left = left;
            this.top = top;
            this.$refs.imgs.style.left = this.left + "px";
            this.$refs.imgs.style.top = this.top + "px";
          }

          this.initX1 = e.touches[0].pageX;
          this.initY1 = e.touches[0].pageY;
        }
      } else if (e.touches.length == 2) {
        let newL = Math.sqrt(
          (e.touches[0].pageX - e.touches[1].pageX) *
            (e.touches[0].pageX - e.touches[1].pageX) +
            (e.touches[0].pageY - e.touches[1].pageY) *
              (e.touches[0].pageY - e.touches[1].pageY)
        );

        let oldL = Math.sqrt(
          (this.initX1 - this.initX2) * (this.initX1 - this.initX2) +
            (this.initY1 - this.initY2) * (this.initY1 - this.initY2)
        );

        let scale = newL / oldL;
        this.zoom(scale);

        this.initX1 = e.touches[0].pageX;
        this.initY1 = e.touches[0].pageY;
        this.initX2 = e.touches[1].pageX;
        this.initY2 = e.touches[1].pageY;
      }
    },
    touchend(e) {
      //清除移动计时器
      if (this.moveTimer) {
        clearInterval(this.moveTimer);
      }
      //清除放大缩小计时器
      if (this.zoomTimer) {
        clearInterval(this.zoomTimer);
      }
      //清除长按计时器
      if (this.longTouchTimer) {
        clearTimeout(this.longTouchTimer);
      }
      //如果满足单击条件，则执行单击
      if (this.fullFillSingleClick) {
        this.singleClick();
      }
      //进行移动
      this.move();
    },
    singleClick() {
      this.isShow = false;
      this.fullFillSingleClick = false;
    },
    dblclick() {
      console.log("双击");
      //如果双击，清除单击计时器
      if (this.singleClickTimer) {
        clearTimeout(this.singleClickTimer);
      }
      //缩放图像至最大或最小
      let scale =
        this.scale < this.maxScale ? this.maxScale : 1 / this.maxScale;
      this.zoom(scale);
    },
    move() {
      let el = this.$refs.imgs.querySelector(".show");
      let switchThreshold = 0.25;
      //跳转到上一张
      if (
        this.left >
        (switchThreshold - this.currentIndex) * this.initialWidth
      ) {
        el.style.width = this.initialWidth + "px";
        el.style.height = this.initialHeight + "px";
        this.currentIndex -= 1;
        this.setImgPosAndSize();
      }
      //跳转到下一张
      else if (
        this.left <
        (1 - switchThreshold - this.currentIndex) * this.initialWidth -
          this.initialWidth * this.scale
      ) {
        el.style.width = this.initialWidth + "px";
        el.style.height = this.initialHeight + "px";
        this.currentIndex += 1;
        this.setImgPosAndSize();
      }
      //照片左边缘对齐左侧屏幕
      else if (
        this.left < (switchThreshold - this.currentIndex) * this.initialWidth &&
        this.left > -this.currentIndex * this.initialWidth
      ) {
        this.left = -this.currentIndex * this.initialWidth;
      }
      //照片右边缘对齐右侧屏幕
      else if (
        this.left >
          (1 - switchThreshold - this.currentIndex) * this.initialWidth -
            this.initialWidth * this.scale &&
        this.left <
          (1 - this.currentIndex) * this.initialWidth -
            this.initialWidth * this.scale
      ) {
        this.left =
          (1 - this.currentIndex) * this.initialWidth -
          this.initialWidth * this.scale;
      }
      this.$refs.imgs.style.left = this.left + "px";
      this.$refs.imgs.style.top = this.top + "px";
    },

    zoom(scale) {
      this.scale *= scale;
      this.scale = this.scale < 1 ? 1 : this.scale;
      this.scale = this.scale > this.maxScale ? this.maxScale : this.scale;

      let originW = getEleWidth(this.$refs.imgs.querySelector(".show"));
      let originH = getEleHeight(this.$refs.imgs.querySelector(".show"));

      let newW = this.initialWidth * this.scale;
      let newH = this.initialHeight * this.scale;

      this.$refs.imgs.querySelector(".show").style.width = newW + "px";
      this.$refs.imgs.querySelector(".show").style.height = newH + "px";

      let moveX = (originW - newW) / 2;
      let moveY = (originH - newH) / 2;
      this.left += moveX;
      this.top += moveY;
      this.move();
    },
    //操作确认，后续需要完善
    assert(selected) {
      this.actionShow = false;
    },
    cancel() {
      this.actionShow = false;
    },
    //初始化图片位置及大小，跳转图片时设置
    setImgPosAndSize() {
      this.left = -this.currentIndex * this.initialWidth;
      this.top = 0;
      this.scale = 1;
    },
    //图片加载事件
    imgLoad() {
      this.loadCount++;
      if (this.loadCount == this.imgs.length) {
        this.setImgPosAndSize();
        this.move();
      }
    },
  },
  mounted() {
    this.initialWidth = getEleWidth(document.querySelector("body"));
    this.initialHeight = window.screen.height;
    console.log(this.initialHeight);
    console.log(this.initialWidth);
  },
};
</script>

<style scoped>
.yu-image-browse {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 400;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.imgs {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
}
img {
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  background-color: black;
}
.img-index {
  position: absolute;
  left: 50%;
  bottom: 20px;
  color: white;
}
</style>
