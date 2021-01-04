<template>
  <div class="za-image-browse">
    <ZaScroll
      scrollX
      dblclick
      ref="scroll"
      class="scroll"
      @scrollEnd="scrollEnd"
    >
      <div class="imgs">
        <img
          v-for="(img, index) in imgs"
          :src="img"
          :key="index"
          :class="{
            show: index == currentIndex,
            last: index == currentIndex - 1,
            next: index == currentIndex + 1,
          }"
          @dblclick="zoom"
        />
        <!-- <img
          :src="imgs[currentIndex - 1]"
          ref="last"
          class="last"
          v-if="lastExist"
        />
        <img
          :src="imgs[currentIndex]"
          ref="show"
          class="show-img"
          @click="zoom"
        />
        <img
          :src="imgs[currentIndex + 1]"
          ref="next"
          class="next"
          v-if="nextExist"
        /> -->
      </div>
    </ZaScroll>
  </div>
</template>

<script>
import ZaTopNav from "components/common/nav/ZaTopNav";
import ZaScroll from "components/common/scroll/ZaScroll";
import BScroll from "better-scroll";
export default {
  name: "ZaImageBrowse",
  data() {
    return {
      imgs: [
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647099666,2758135680&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3353587742,1540290353&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2268108947,1773100229&fm=26&gp=0.jpg",
      ],
      currentIndex: 0,
      initialWidth: 0,
      scale: 1,
    };
  },
  components: {
    ZaTopNav,
    ZaScroll,
  },
  computed: {
    lastExist() {
      return this.currentIndex > 0;
    },
    nextExist() {
      return this.currentIndex < this.imgs.length - 1;
    },
  },
  methods: {
    getEleLeft(selector) {
      return window
        .getComputedStyle(document.querySelector(selector))
        .left.replace("px", "");
    },
    setWidth(width) {
      document.querySelector(".show").style.width = width + "px";
      //   this.$refs.last.style.width = "100vw";
      this.$refs.scroll.refresh();
    },
    restoreWidth() {
      this.scale = 1;
      document.querySelector("img").style.width = this.initialWidth + "px";
    },
    zoom() {
      this.scale += 0.2;
      let width = this.initialWidth * this.scale;
      this.setWidth(width);
    },
    scrollEnd(position) {
      console.log(position);

      if (position.x > -this.currentIndex * this.initialWidth + 160) {
        this.currentIndex -= 1;
        this.$refs.scroll.scrollTo(this.currentIndex * this.initialWidth, 0);
        this.restoreWidth();
      } else if (
        position.x <
        -this.currentIndex * this.initialWidth * this.scale + 160
      ) {
        this.currentIndex += 1;
        this.$refs.scroll.scrollTo(this.currentIndex * this.initialWidth, 0);
        this.restoreWidth();
      }
    },
  },
  mounted() {
    this.$refs.scroll.refresh();
    this.initialWidth = window
      .getComputedStyle(document.querySelector("body"))
      .width.replace("px", "");
    console.log(document.querySelector(".show"));
  },
};
</script>

<style scoped>
.za-image-browse {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2000;
  position: absolute;
  top: 0;
  left: 0;
}
.scroll {
  width: 100vw;
  overflow: scroll;
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
/* .show-img {
  width: 100vw;
}
.last {
  width: 100vw;
}
.next {
  width: 100vw;
} */
</style>
