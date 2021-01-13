<template>
  <div class="yu-date-picker">
    <van-calendar
      v-model="show"
      :position="position"
      :type="type"
      :round="round"
      :title="title"
      :color="color"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="initialDate"
      :readonly="readonly"
      :max-range="maxRange"
      :show-confirm="showConfirm"
      @confirm="confirmDate"
      @select="selectDate"
      @unselect="unselectDate"
      @closed="closeDate"
      ref="calendar"
    />
  </div>
</template>

<script>
import { Calendar as VanCalendar } from "vant";
export default {
  name: "YuDatePicker",
  props: {
    position: {
      type: String,
      default: "bottom", //弹出位置，可选值为 top bottom right left
    },
    round: {
      type: Boolean,
      default: true, //是否显示圆角弹窗
    },
    type: {
      type: String,
      default: "single", //single表示选择单个日期，multiple表示选择多个日期，range表示选择日期区间
    },
    title: {
      type: String,
      default: "请选择日期", //日历标题
    },
    color: {
      type: String,
      default: "#406dfc", //主题色，对底部按钮和选中日期生效
    },
    minDate: {
      type: Date, //可选择的最小日期
      default: function () {
        let today = new Date();
        return today;
      },
    },
    maxDate: {
      type: Date, //可选择的最小日期
      default: function () {
        let today = new Date();
        today.setDate(today.getDate() + 180);
        return today;
      },
    },
    defaultDate: {
      type: Array, //默认选中的日期，date数组，当type为single时，数组仅包含一个元素，传入 null 表示默认不选择
      default: function () {
        return null;
      },
    },
    readonly: {
      type: Boolean,
      default: false, //是否只读
    },
    maxRange: {
      type: Number, //日期区间最多可选天数
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    //若为单选时，返回数据第一个对象
    initialDate() {
      if (this.defaultDate != null && this.type == "single") {
        return this.defaultDate[0];
      }
      if (this.defaultDate != null && this.defaultDate.length == 0) {
        return null;
      }
      return this.defaultDate;
    },
    showConfirm() {
      if (this.type == "multiple") {
        return true;
      }
      return false;
    },
  },
  components: { VanCalendar },
  methods: {
    showDatePicker() {
      this.show = true;
    },
    //滚动到某个具体的日期，date为Date对象
    scrollToDate(date) {
      this.$refs.calendar.scrollToDate(date);
    },
    //选择时触发，value为date对象（single）或date对象数组
    selectDate(value) {
      console.log(value);
      this.$emit("selectDate", value);
      if (this.type == "single") {
        this.$emit("confirmDate", value);
      } else if (
        this.type == "range" &&
        value.length == 2 &&
        value[1] != null
      ) {
        this.$emit("confirmDate", value);
      }
    },
    //取消选择时触发，value为date对象
    unselectDate(value) {
      this.$emit("unselectDate", value);
    },
    //多选时触发，value为date数组
    confirmDate(value) {
      this.show = false;
      this.$emit("confirmDate", value);
    },
    //关闭弹框时触发
    closeDate() {
      this.$emit("closeDate");
    },
  },
};
</script>

<style scoped>
</style>
