<template>
  <div class="yu-label-uploader">
    <label><span v-if="required">*</span>{{ name }}</label>
    <yu-uploader
      :initialFiles="value"
      :previewSize="previewSize"
      :disabled="disabled"
      :deletable="deletable"
      :capture="capture"
      :resultType="resultType"
      :imageFit="imageFit"
      :uploadIcon="uploadIcon"
      :showUpload="showUpload"
      class="yu-uploader"
      ref="uploader"
      @afterRead="afterRead"
      @clickPreview="clickPreview"
      @deleteFile="deleteFile"
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
    required: {
      type: Boolean, //是否必填项，若为真会标识必填项标识
      default: false,
    },
    readonly: {
      type: Boolean, //控件是否只读
      default: false,
    },
    previewSize: {
      type: Number,
      default: 80, //预览图和上传区域的尺寸，默认单位为 px
    },
    disabled: {
      type: Boolean,
      default: false, //是否禁用
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
    initialFiles: {
      type: Array, //初始加载内容 ,数组每个元素为一个对象，若为网络图片，key为url如：{url:'http://128.0.0.1/232.jpg'}
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {
      value: this.initialFiles, //文件列表，正常情况下为上传后的url地址，上传成功后才保存在该列表中
      failFiles: [], //上传失败的文件列表
      deletable: true, //照片是否有删除按钮
      showUpload: true, //是否显示上传图片按钮
    };
  },
  components: {
    YuUploader,
  },
  created() {
    this.initData();
  },
  watch: {
    readonly: function () {
      console.log(this.readonly);
      if (this.readonly) {
        this.deletable = false;
        this.showUpload = false;
      }
    },
  },
  methods: {
    //初始化数据方法
    initData() {
      this.deletable = !this.readonly;
      this.showUpload = !this.readonly;
    },

    //读取文件后执行
    afterRead(file, detail) {
      // 或许在此上传文件，成功后放入value列表，失败放入failFiles
      console.log(file, detail);
    },

    //点击预览图,后续根据情况选择加载放大缩小的插件
    clickPreview(file, detail) {},

    //删除文件操作，主要是删除value或failFiles中对应文件
    deleteFile(file, detail) {
      console.log(file, detail);
    },
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
label span {
  color: red;
  margin-right: 3px;
}
.yu-uploader {
  flex: 1;
  padding: 0 10px;
}
</style>
