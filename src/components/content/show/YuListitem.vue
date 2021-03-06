<template>
  <div
    class="yu-listitem"
    :style="'background-color:' + bgColor"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <yu-image
      v-if="showImage"
      :src="pData.image"
      :round="round"
      :width="width"
      :height="height"
      :fit="fit"
      class="image-info"
    ></yu-image>
    <div class="content">
      <div class="title">{{ pData.name }}</div>

      <div
        class="other-info"
        v-for="(item, index) in pData.otherInfo"
        :key="pData.id + 'o' + index"
      >
        <span class="key-info">{{ item.key }}:</span>

        <span class="value-info">{{ item.value }}</span>
      </div>
      <div
        class="current-user-info"
        :style="'color:' + currentUserColor"
        v-if="pData.currentUser"
      >
        当前由{{ pData.currentUser }}处理
      </div>
      <yu-tag
        v-if="showState"
        class="state"
        :content="pData.state"
        :type="tagType"
      ></yu-tag>
    </div>
  </div>
</template>

<script>
import YuImage from "components/common/basic/YuImage";
import YuTag from "components/common/basic/YuTag";
export default {
  name: "YuListitem",
  props: {
    showImage: {
      type: Boolean,
      default: false, //是否有图片
    },
    round: {
      type: Boolean,
      default: false, //图片是否显示为圆形
    },
    width: {
      type: String,
      default: "80px",
    },
    height: {
      type: String,
      default: "80px",
    },
    fit: {
      type: String,
      default: "fill", //图片填充模式contain（保持宽高缩放图片，使图片的长边能完全显示出来）,cover,fill,none(原始尺寸),scale-down（取none或contain中较小的一个）
    },
    showState: {
      type: Boolean,
      default: false, //是否显示state,默认在右上角
    },
    bgColor: {
      type: String,
      default: "white",
    },
    currentUserColor: {
      type: String,
      default: "orange",
    },
    pData: {
      type: Object,
      default: function () {
        return {
          id: "", //数据id
          image: "", //图片路径
          name: "", //列表显示的标题，相对其他信息使用大号字体
          state: "", //状态名称
          currentUser: "", //当前由谁在处理
          otherInfo: [
            {
              key: "", //key的名称,比如“姓名”
              value: "", //value的值，比如“张三”
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      tagType: "primary",

      singleClickTimer: null, //单击计时器
      fullFillSingleClick: false, //是否满足单击条件，300毫秒内没有双击，且没有长按，没有移动在结束点击时算单击
      longTouchTimer: null, //长按计时器
      initX1: 0, //放大缩小时，第一个手指初始x坐标
      initY1: 0, //放大缩小时，第一个手指初始y坐标
    };
  },
  components: {
    YuTag,
    YuImage,
  },
  created() {
    if (this.showState) {
      if (this.pData.state.indexOf("完成") != -1) {
        this.tagType = "success";
      } else if (this.pData.state.indexOf("超期") != -1) {
        this.tagType = "danger";
      }
    }
  },
  mounted() {
    this.$emit("itemLoaded");
  },
  methods: {
    //点击item
    clickItem() {
      this.$emit("clickItem", this.pData);
    },

    //长按事件
    longTouch() {
      this.$emit("longTouch", this.pData);
    },

    //通过下面三个事件判断是单击还是长按事件
    touchstart(e) {
      this.initX1 = e.touches[0].pageX;
      this.initY1 = e.touches[0].pageY;
      if (e.touches.length == 1) {
        //单击计时器
        if (this.singleClickTimer) {
          clearTimeout(this.singleClickTimer);
        }

        this.fullFillSingleClick = true;

        //长按计时器
        this.longTouchTimer = setTimeout(() => {
          this.fullFillSingleClick = false; //如果满足长按条件，则取消单击条件
          this.longTouch(); //执行长按事件
        }, 1500);
      }
      if (e.touches.length == 2) {
        //不满足单击条件
        this.fullFillSingleClick = false;
        //清除长按计时器
        if (this.longTouchTimer) {
          clearTimeout(this.longTouchTimer);
        }
      }
    },
    touchmove(e) {
      if (e.touches.length == 1) {
        let moveX = e.touches[0].pageX - this.initX1;
        let moveY = e.touches[0].pageY - this.initY1;

        let distance = Math.sqrt(moveX * moveX + moveY * moveY);
        //如果移动，取消长按计时器
        if (distance > 20 && this.longTouchTimer) {
          clearTimeout(this.longTouchTimer);
        }
        //如果移动，取消单击计时器
        if (distance > 20) {
          this.fullFillSingleClick = false;
        }
      }
    },
    touchend(e) {
      //清除长按计时器
      if (this.longTouchTimer) {
        clearTimeout(this.longTouchTimer);
      }
      //如果满足单击条件，则执行单击
      if (this.fullFillSingleClick) {
        this.clickItem();
      }
    },
  },
};
</script>

<style scoped>
.yu-listitem {
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
}
.image-info {
  margin-right: 10px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  line-height: 1.4;
}

.title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* 状态样式 */
.state {
  position: absolute;
  right: 10px;
  top: 35px;
  transform: rotate(30deg);
}

.other-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: var(--font-size-xs);
  color: var(--list-content-color);
  overflow: hidden;
}
.key-info {
  max-width: 30%;
  box-sizing: border-box;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.value-info {
  flex: 1;
  overflow: hidden;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.current-user-info {
  text-align: left;
  font-size: var(--font-size-xs);
}
</style>
