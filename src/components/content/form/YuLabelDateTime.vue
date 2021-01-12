<template>
  <div class="yu-label-date-time">
    <label @click="clickLabel">{{ name }}</label>
    <div class="content">
      <label class="before">{{ beforeTips }}</label>
      <label class="separator">{{ separatorTips }}</label>
      <label class="after">{{ afterTips }}}</label>
    </div>
    <div class="content">
      <label class="before">{{ beforeTips }}</label>
      <label class="separator">{{ separatorTips }}</label>
      <label class="after">{{ afterTips }}}</label>
    </div>
  </div>
</template>

<script>
import YuDatePicker from "components/common/popup/YuDatePicker";
import YuTimePicker from "components/common/popup/YuTimePicker";
export default {
  name: "YuLabelDateTime",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
    placeholder: "请选择",
    maxlength: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      beforeTips: "选择日期",
      separatorTips: "至",
      afterTips: "选择时间",
    };
  },
  components: {
    YuDatePicker,
    YuTimePicker,
  },
};
</script>

<style scoped>
.yu-label-date-time {
  display: flex;
  flex-direction: var(--showDirection);
  padding: 0 10px;
  padding-bottom: 5px;
  background-color: white;
}
label {
  width: var(--form-label-width);
  text-align: left;
  padding-left: 10px;
  font-size: var(--font-size-sm);
  color: var(--form-label-color);
  align-self: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
.content {
  position: relative;
  flex: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ebebeb;
  height: var(--inputHeight);
  line-height: var(--inputHeight);
}

.before {
  flex: 1;
}
.separator {
  left: 50%;
}
</style>
