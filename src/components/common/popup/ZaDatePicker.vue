<template>
  <div class="za-date-picker">
    <el-date-picker
      v-model="value"
      :type="type"
      :format="format"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :range-separator="rangeSeparator"
      :defaul-value="defaultValue"
      :value-format="valueFormat"
      @change="onChange"
      @blur="onBlur"
      ref="dateInput"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "ZaDatePicker",
  props: {
    initialValue: "", //初始值，格式为'yyyy-MM-dd'
    type: {
      type: String,
      default: "date", //显示类型,year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
    },
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false, //文本框可输入
    },
    clearable: {
      type: Boolean,
      default: true, //是否显示清除按钮
    },
    placeholder: {
      type: String, //非范围选择时的占位内容
      default: "请选择日期",
    },
    startPlaceholder: {
      type: String, //范围选择时开始日期的占位内容
      default: "开始日期",
    },
    endPlaceholder: {
      type: String, //范围选择时结束日期的占位内容
      default: "结束日期",
    },
    rangeSeparator: {
      type: String,
      default: "至", //选择范围时的分隔符
    },
    defaultValue: {
      type: Date,
      default: function () {
        return new Date();
      }, //可选，选择器打开时默认显示的时间
    },
  },
  data() {
    return {
      value: this.initialValue,
    };
  },
  components: {},
  methods: {
    clear() {
      this.$emit("clear");
    },
    onChange(value) {
      if (value == null) {
        this.clear();
      }
      this.$emit("change", value);
    },
    onBlur(ele) {
      this.$emit("blur", ele);
    },

    focus() {
      this.$refs.dateInput && this.$refs.dateInput.focus();
    },
  },
};
</script>

<style>
.el-date-picker {
  width: 100%;
  /* position: absolute;
  top: 50% !important;
  transform: translateY(-50%); */
}

.el-date-picker .el-picker-panel__content {
  width: 100%;
  margin: 15px 0;
}
.el-picker-panel__content table {
  width: 100%;
}
.el-picker-panel__content table tr {
  display: flex;
  justify-content: center;
}
.el-picker-panel__content table tr th {
  flex: 1;
}
.el-picker-panel__content table tr td {
  flex: 1;
}

/* 范围选择时相关样式调整 */
.el-date-range-picker {
  width: 100%;
}

.el-date-range-picker .el-picker-panel__body {
  width: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
}
.el-date-range-picker__content {
  width: 100%;
}
/* 当前日期样式 */
.el-date-table td.today span {
  color: #333;
  background-color: #fbeedb;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
