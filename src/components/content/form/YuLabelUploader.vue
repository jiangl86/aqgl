<template>
  <div class="yu-label-uploader">
    <label>{{ name }}</label>
    <yu-uploader
      :previewSize="previewSize"
      :disabled="disabled"
      :deletable="deletable"
      :capture="capture"
      :resultType="resultType"
      :imageFit="imageFit"
      :uploadIcon="uploadIcon"
      class="yu-uploader"
      ref="uploader"
    ></yu-uploader>
  </div>
</template>

<script>
import YuUploader from "components/common/basic/YuUploader";
export default {
  name: "YuLabelUploader",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
    previewSize: {
      type: Number,
      default: 80, //预览图和上传区域的尺寸，默认单位为 px
    },
    disabled: {
      type: Boolean,
      default: false, //是否禁用
    },
    deletable: {
      type: Boolean,
      default: true, //是否显示删除按钮
    },
    capture: {
      type: String, //图片选取模式，可选值为 camera (直接调起摄像头)
    },
    resultType: {
      type: String,
      default: "dataUrl", //文件读取结果类型，可选值为 file(结果仅包含 File 对象) text(结果包含 File 对象，以及文件的文本内容),dataUrl(结果包含 File 对象，以及文件对应的 base64 编码)
    },
    imageFit: {
      type: String,
      default: "cover", //预览图片填充模式contain（保持宽高缩放图片，使图片的长边能完全显示出来）,cover,fill,none(原始尺寸),scale-down（取none或contain中较小的一个）
    },
    uploadIcon: {
      type: String,
      default: "photograph", //上传区域图标名称或图片链接
    },
  },
  data() {
    return {};
  },
  components: {
    YuUploader,
  },
};
</script>

<style scoped>
.yu-label-uploader {
  display: flex;
  flex-direction: var(--showDirection);
  align-items: flex-start;
  padding-bottom: 5px;
  background-color: var(--form-field-color);
  /* width: 100%; */
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
.yu-uploader {
  flex: 1;
  padding: 0 10px;
}
</style>
