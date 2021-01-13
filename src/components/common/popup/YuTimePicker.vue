<template>
  <div class="yu-time-picker">
    <yu-popup
      :isShow="show"
      :round="round"
      :lazyRender="lazyRender"
      @clickPopupOverlay="hideTimerPicker"
      @openedPopup="openedPopup"
    >
      <div class="picker-info" ref="pickerInfo">
        <div class="title">{{ title }}</div>
        <div class="picker-content">
          <yu-scroll
            ref="hourScroll"
            class="hour-scroll"
            @scrollEnd="hourScrollEnd"
          >
            <ul>
              <li v-for="i in 4" :key="'hbefore' + i"></li>
              <li v-for="hour in hourArray" :key="hourKey(hour)">
                {{ hour }}
              </li>
              <li v-for="i in 4" :key="'hafter' + i"></li>
            </ul>
          </yu-scroll>
          <yu-scroll
            ref="minuteScroll"
            class="minute-scroll"
            v-if="!onlyHour"
            @scrollEnd="minuteScrollEnd"
          >
            <ul>
              <li v-for="i in 4" :key="'mbefore' + i"></li>
              <li v-for="minute in minuteArray" :key="minuteKey(minute)">
                {{ minute }}
              </li>
              <li v-for="i in 4" :key="'mafter' + i"></li>
            </ul>
          </yu-scroll>
          <div class="picker-mask"></div>
          <div class="picker-select"></div>
        </div>
        <div class="action" v-if="!readonly" @click="confirmTime">确定</div>
      </div>
    </yu-popup>
  </div>
</template>

<script>
import YuPopup from "components/common/popup/YuPopup";
import YuScroll from "components/common/scroll/YuScroll";
export default {
  name: "YuTimerPicker",
  props: {
    title: {
      type: String,
      default: "请选择具体时间",
    },
    minHour: {
      type: Number,
      default: 0,
    },
    maxHour: {
      type: Number,
      default: 23,
    },
    defaultTime: {
      type: String,
      default: "08:00",
    },
    onlyHour: {
      type: Boolean,
      default: false,
    },
    minuteInterval: {
      type: Number,
      default: 1, // 分钟间隔，仅包含1,5,10，15四种，若为小于该四种的数字时，则取小于改数字的数，如设置为4，则取值为1
    },
    round: {
      type: Boolean,
      default: true, //是否圆角
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    lazyRender: {
      type: Boolean,
      default: true, //是否在显示弹层时才渲染节点
    },
  },
  data() {
    return {
      show: false,
      hourArray: [],
      minuteArray: [],
      hourIndex: 0,
      minuteIndex: 0,
      firstOpen: true, //是否是第一次加载，因为pop支持在弹出时才渲染节点（直接加载scroll有问题），本组件第一次渲染完成后需要滑动到默认时间
    };
  },
  components: {
    YuPopup,
    YuScroll,
  },
  watch: {},
  created() {
    this.initData();
  },
  mounted() {
    this.$refs.hourScroll && this.$refs.hourScroll.refresh();
    this.$refs.minuteScroll && this.$refs.minuteScroll.refresh();
    this.scrollToDefault();
  },
  methods: {
    initData() {
      let minHour = this.minHour < 0 ? 0 : this.minHour;
      let maxHour = this.maxHour > 23 ? 23 : this.maxHour;
      if (this.onlyHour) {
        while (minHour <= maxHour) {
          let hour = minHour + ":00";
          if (minHour < 10) {
            hour = "0" + hour;
          }
          this.hourArray.push(hour);
          minHour++;
        }
      } else {
        while (minHour <= maxHour) {
          let hour = minHour;
          if (minHour < 10) {
            hour = "0" + hour;
          }
          this.hourArray.push(hour);
          minHour++;
        }
        //初始化分钟数组
        let minute = 0;
        let interval = 1;
        if (this.minuteInterval < 5) {
          interval = 1;
        } else if (this.minuteInterval < 10) {
          interval = 5;
        } else if (this.minuteInterval < 15) {
          interval = 10;
        } else {
          interval = 15;
        }
        while (minute < 60) {
          let temp = minute;
          if (minute < 10) {
            temp = "0" + temp;
          }
          this.minuteArray.push(temp);
          minute += interval;
        }
      }

      //初始化默认时间
      let defaultTimeArr = this.defaultTime.split(":");
      let defaultHour = defaultTimeArr[0];
      if (!defaultHour.startsWith("0") && defaultHour.length == 1) {
        defaultHour = "0" + defaultHour;
      }
      if (this.onlyHour) {
        defaultHour = defaultHour + ":00";
      }
      this.hourIndex = this.hourArray.findIndex((ele) => ele == defaultHour);
      this.hourIndex = this.hourIndex < 0 ? 0 : this.hourIndex;

      if (!this.onlyHour) {
        if (defaultTimeArr.length == 2) {
          this.minuteIndex = this.minuteArray.findIndex(
            (ele) => ele == defaultTimeArr[1]
          );
          this.minuteIndex = this.minuteIndex < 0 ? 0 : this.minuteIndex;
        }
      }
    },

    scrollToDefault() {
      this.$refs.hourScroll &&
        this.$refs.hourScroll.scrollTo(0, -this.hourIndex * 40);
      this.$refs.minuteScroll &&
        this.$refs.minuteScroll.scrollTo(0, -this.minuteIndex * 40);
    },

    hourScrollEnd(position) {
      this.hourIndex = Math.round(-position.y / 40);
      this.$refs.hourScroll.scrollTo(0, -this.hourIndex * 40);
    },

    minuteScrollEnd(position) {
      this.minuteIndex = Math.round(-position.y / 40);
      this.$refs.minuteScroll &&
        this.$refs.minuteScroll.scrollTo(0, -this.minuteIndex * 40);
    },
    hourKey(hour) {
      return "H" + hour;
    },
    minuteKey(minute) {
      return "M" + minute;
    },

    //显示时间选择器
    showTimerPicker() {
      this.show = true;
    },

    //隐藏时间选择器
    hideTimerPicker() {
      this.show = false;
    },

    confirmTime() {
      let value = this.hourArray[this.hourIndex];
      if (!this.onlyHour) {
        value = value + ":" + this.minuteArray[this.minuteIndex];
      }
      this.hideTimerPicker();
      this.$emit("confirmTime", value);
    },

    //打开弹框事件
    openedPopup() {
      if (this.firstOpen) {
        this.scrollToDefault();
        this.firstOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.picker-info {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background-color: white;
}
.title {
  width: 100%;
  height: var(--liHeight);
  line-height: var(--liHeight);
  font-size: var(--font-size-md);
  overflow: hidden;
}
.picker-content {
  position: relative;
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: row;
}
.hour-scroll,
.minute-scroll {
  flex: 1;
  height: 360px;
  overflow: hidden;
}
ul {
  width: 100%;
}
li {
  width: 100%;
  height: var(--liHeight);
  line-height: var(--liHeight);
  font-size: var(--font-size-md);
  text-align: center;
}
.action {
  height: 44px;
  line-height: 44px;
  font-size: var(--font-size-lg);
  color: white;
  background-color: var(--mainColor);
}
.picker-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 360px;
  background: linear-gradient(
      rgba(255, 255, 255, 1) 0px,
      rgba(255, 255, 255, 0) 160px
    ),
    linear-gradient(rgba(255, 255, 255, 0) 200px, rgba(255, 255, 255, 1) 360px);
  background-position: top bottom;
  pointer-events: none;
}
.picker-select {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 42px;
  border-top: 1px solid var(--mainColor);
  border-bottom: 1px solid var(--mainColor);
  pointer-events: none;
}
</style>
