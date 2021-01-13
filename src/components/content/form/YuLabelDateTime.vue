<template>
  <div class="yu-label-date-time">
    <label>{{ name }}</label>
    <div class="content">
      <input
        type="text"
        v-model="value1"
        class="before"
        :placeholder="beforeTips1"
        @focus="focus1"
      />
      <div class="separator" v-if="showSeparator">{{ separatorTips }}</div>
      <input
        v-if="showSeparator"
        type="text"
        v-model="value2"
        class="after"
        :placeholder="afterTips1"
        @focus="focus2"
      />
      <yu-icon
        v-show="showClear1"
        icon="clear"
        class="clear"
        @click.native="clear1"
      ></yu-icon>
    </div>

    <div class="content second" v-if="showSecond">
      <input
        type="text"
        v-model="value3"
        class="before"
        :placeholder="beforeTips2"
        @focus="focus3"
      />
      <div class="separator" v-if="showSeparator">{{ separatorTips }}</div>
      <input
        v-if="showSeparator"
        type="text"
        v-model="value4"
        class="after"
        :placeholder="afterTips2"
        @focus="focus4"
      />
      <yu-icon
        v-show="showClear2"
        icon="clear"
        class="clear"
        @click.native="clear2"
      ></yu-icon>
    </div>

    <yu-date-picker
      ref="firstDate"
      :type="dateType"
      :minDate="minDate1"
      :maxDate="maxDate1"
      :defaultDate="defaultDate1"
      :readonly="readonly"
      :max-range="maxRange"
      @confirmDate="confirmDate1"
    ></yu-date-picker>
    <yu-time-picker
      v-if="showTimePicker"
      ref="firstTime"
      :minHour="minHour"
      :maxHour="maxHour"
      :defaultTime="defaultTime1"
      :onlyHour="onlyHour"
      :minuteInterval="minuteInterval"
      :readonly="readonly"
      @confirmTime="confirmTime1"
    ></yu-time-picker>
    <yu-date-picker
      v-if="showSecond"
      ref="secondDate"
      :type="dateType"
      :minDate="minDate2"
      :maxDate="maxDate2"
      :defaultDate="defaultDate2"
      :readonly="readonly"
      :max-range="maxRange"
      @confirmDate="confirmDate2"
    ></yu-date-picker>
    <yu-time-picker
      v-if="showSecond"
      ref="secondTime"
      :minHour="minHour"
      :maxHour="maxHour"
      :defaultTime="defaultTime2"
      :onlyHour="onlyHour"
      :minuteInterval="minuteInterval"
      :readonly="readonly"
      @confirmTime="confirmTime2"
    ></yu-time-picker>
  </div>
</template>

<script>
import YuDatePicker from "components/common/popup/YuDatePicker";
import YuTimePicker from "components/common/popup/YuTimePicker";
import YuIcon from "components/common/basic/YuIcon";

import { dateFormat } from "common/util/dateFormat";
export default {
  name: "YuLabelDateTime",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },

    type: {
      type: String,
      default: "date", //日期选择类型，date选择单个日期，dateRange选择日期范围，datetime选择单个日期及具体时间，datetimeRange选择具体日期时间范围
    },

    readonly: {
      type: Boolean,
      default: false, //是否只读
    },

    initialValue: {
      type: Array, //如果只有一个时间时则数组只有一个元素，每个元素格式为 2018-10-12 08:12(包含具体时间),2018-10-12（仅包含日期）
    },

    //日期选择相关信息
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
    maxRange: {
      type: Number, //日期区间最多可选天数
    },

    //时间相关信息
    minHour: {
      type: Number,
      default: 0,
    },
    maxHour: {
      type: Number,
      default: 23,
    },
    onlyHour: {
      type: Boolean,
      default: false,
    },
    minuteInterval: {
      type: Number,
      default: 5, // 分钟间隔，仅包含1,5,10，15四种，若为小于该四种的数字时，则取小于改数字的数，如设置为4，则取值为1
    },
  },
  data() {
    return {
      value: [], //最终选择的值，是一个数组，若仅有一个元素时，则数组仅有一个元素，每个元素格式为 2018-10-12 08:12(包含具体时间),2018-10-12（仅包含日期）

      beforeTips1: "选择日期",
      separatorTips: "至",
      afterTips1: "选择时间",
      beforeTips2: "选择结束日期",
      afterTips2: "选择结束时间",

      value1: "",
      value2: "",
      value3: "", //仅type等于datetimeRange时有该数
      value4: "", //仅type等于datetimeRange时有该数

      dateType: "", //日期选择类型，根据type进行初始化

      //仅type等于datetimeRange时有第二组数
      defaultDate1: null, //date对象数组
      defaultDate2: null, //date对象数组
      defaultTime1: "08:00",
      defaultTime2: "08:00",
      minDate1: this.minDate, //date对象
      minDate2: this.minDate, //date对象
      maxDate1: this.maxDate, //date对象
      maxDate2: this.maxDate, //date对象
    };
  },
  components: {
    YuDatePicker,
    YuTimePicker,
    YuIcon,
  },
  computed: {
    showSecond() {
      return this.type == "datetimeRange";
    },
    showSeparator() {
      return this.type != "date";
    },
    showTimePicker() {
      return this.type == "datetime" || this.type == "datetimeRange";
    },
    showClear1() {
      if (
        !this.readonly &&
        (this.value1.trim() != "" || this.value2.trim() != "")
      ) {
        return true;
      }
      return false;
    },
    showClear2() {
      if (
        !this.readonly &&
        (this.value3.trim() != "" || this.value4.trim() != "")
      ) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.value = [];
      //如果仅选择单个日期
      if (this.type == "date") {
        this.dateType = "single";
        if (this.initialValue && this.initialValue.length > 0) {
          this.value1 = this.initialValue[0];
          this.defaultDate1 = [];
          this.defaultDate1.push(new Date(this.initialValue[0]));
        }
        this.value.push(this.value1);
      } else if (this.type == "dateRange") {
        this.dateType = "range";
        this.beforeTips1 = "请选择开始日期";
        this.afterTips1 = "请选择结束日期";
        this.separatorTips = "至";
        if (this.initialValue && this.initialValue.length > 0) {
          this.defaultDate1 = [];
          this.value1 = this.initialValue[0];
          this.defaultDate1.push(new Date(this.initialValue[0]));
          if (this.initialValue[1]) {
            this.value2 = this.initialValue[1];
            this.defaultDate1.push(new Date(this.initialValue[1]));
          }
        }
        this.value.push(this.value1);
        this.value.push(this.value2);
      } else if (this.type == "datetime") {
        this.dateType = "single";
        this.afterTips1 = "选择时间";
        this.separatorTips = "";
        if (this.initialValue && this.initialValue.length > 0) {
          this.defaultDate1 = [];
          this.defaultDate1.push(new Date(this.initialValue[0]));
          this.value1 = this.initialValue[0].split(" ")[0];
          if (this.initialValue[0].split(" ")[1]) {
            this.value2 = this.initialValue[0].split(" ")[1];
            this.defaultTime1 = this.value2;
          }
        }
        this.value.push(this.value1 + " " + this.value2);
      } else if ((this.type = "datetimeRange")) {
        this.dateType = "single";
        this.beforeTips1 = "选择开始日期";
        this.afterTips1 = "选择开始时间";
        this.separatorTips = "";
        if (this.initialValue && this.initialValue.length > 0) {
          this.defaultDate1 = [];
          this.defaultDate1.push(new Date(this.initialValue[0]));
          this.value1 = this.initialValue[0].split(" ")[0];
          if (this.initialValue[0].split(" ")[1]) {
            this.value2 = this.initialValue[0].split(" ")[1];
            this.defaultTime1 = this.value2;
          }

          if (this.initialValue[1]) {
            this.defaultDate2 = [];
            this.defaultDate2.push(new Date(this.initialValue[1]));
            this.value3 = this.initialValue[1].split(" ")[0];
            if (this.initialValue[1].split(" ")[1]) {
              this.value4 = this.initialValue[1].split(" ")[1];
              this.defaultTime2 = this.value4;
            }
          }
        }
        this.value.push(this.value1 + " " + this.value2);
        this.value.push(this.value3 + " " + this.value4);
      }
    },
    //第一个输入框获得焦点
    focus1() {
      this.$refs.firstDate && this.$refs.firstDate.showDatePicker();
    },

    //第二个输入框获得焦点
    focus2() {
      if (this.type == "datetime" || this.type == "datetimeRange") {
        this.$refs.firstTime && this.$refs.firstTime.showTimerPicker();
      } else if (this.type == "dateRange") {
        this.$refs.firstDate && this.$refs.firstDate.showDatePicker();
      }
    },

    //第三个输入框获得焦点
    focus3() {
      this.$refs.secondDate && this.$refs.secondDate.showDatePicker();
    },

    //第4个输入框获得焦点
    focus4() {
      this.$refs.secondTime && this.$refs.secondTime.showTimerPicker();
    },

    confirmDate1(value) {
      if (this.type == "dateRange") {
        //这种情况下返回的是数组
        this.value1 = dateFormat(value[0]);
        this.value2 = dateFormat(value[1]);
        this.value[0] = this.value1;
        this.value[1] = this.value2;
      } else {
        this.value1 = dateFormat(value);
        this.value[0] =
          this.value2 == "" ? this.value1 : this.value1 + " " + this.value2;
        if (this.type == "datetime" && this.value2 == "") {
          this.focus2();
        }
        if (this.type == "datetimeRange") {
          this.minDate2 = value;
          let newMax = new Date();
          newMax.setDate(value.getDate() + 180);
          this.maxDate2 = newMax;
        }
      }
    },

    //第二个时间选择框确认，仅在datetimeRange时使用
    confirmDate2(value) {
      this.value3 = dateFormat(value);
      this.value[1] =
        this.value4 == "" ? this.value3 : this.value3 + " " + this.value4;
    },

    //第一个时间选择框确认
    confirmTime1(value) {
      this.value2 = value;
      this.value[0] = this.value1 + " " + this.value2;
    },

    //第2个时间选择框确认
    confirmTime2(value) {
      this.value4 = value;
      this.value[1] = this.value3 + " " + this.value4;
    },
    //清除第一个输入框内容
    clear1() {
      this.value1 = "";
      this.value2 = "";
      this.value[0] = "";
      if (this.type == "dateRange") {
        this.value[1] = "";
      }
    },
    //清除第2个输入框内容
    clear2() {
      this.value3 = "";
      this.value4 = "";
      this.value[1] = "";
    },
  },
};
</script>

<style scoped>
.yu-label-date-time {
  display: flex;
  flex-direction: var(--showDirection);
  padding: 0 10px;
  padding-bottom: 5px;
  background-color: var(--form-field-color);
}
label {
  width: var(--form-label-width);
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--form-label-color);
  align-self: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
.content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  border: 1px solid #ebebeb;
  height: 28px;
  line-height: 28px;
}
.second {
  margin-top: 10px;
}

input {
  display: block;
  min-width: 100px;
  border: none;
  padding: 0 10px;
}

.before {
  flex: 1;
  box-sizing: border-box;
}
.separator {
  left: 50%;
  transform: translateX(-50%);
}
.after {
  flex: 1;
  box-sizing: border-box;
}

.clear {
  position: absolute;
  right: 5px;
  top: 3px;
  color: var(--clear-button-color);
}
</style>
