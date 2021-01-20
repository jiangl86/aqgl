<template>
  <div class="yu-uploader">
    <van-uploader
      v-model="fileList"
      :preview-size="previewSize"
      :preview-full-image="previewFullImage"
      :multiple="multiple"
      :max-count="maxCount"
      :max-size="maxSize"
      :capture="capture"
      :lazy-load="lazyLoad"
      :result-type="resultType"
      :image-fit="imageFit"
      :upload-icon="uploadIcon"
      :show-upload="showUpload"
      :after-read="afterRead"
      :beforeRead="beforeRead"
      :disabled="disabled"
      :deletable="deletable"
      @oversize="onOversize"
      @click-preview="clickPreview"
      @delete="deleteFile"
      ref="loader"
    />
  </div>
</template>

<script>
import { Uploader as VanUploader, Lazyload } from "vant";
import Vue from "vue";

//Lazyload 是 Vue 指令，使用前需要对指令进行注册。
Vue.use(Lazyload);
export default {
  name: "YuUploader",
  props: {
    previewSize: {
      type: Number,
      default: 80, //预览图和上传区域的尺寸，默认单位为 px
    },
    previewFullImage: {
      type: Boolean,
      default: true, //是否在点击预览图后展示全屏图片预览
    },
    multiple: {
      type: Boolean,
      default: true, //是否开启图片多选，部分安卓机型不支持
    },
    maxCount: {
      type: Number, //最大允许上传数量
    },
    maxSize: {
      type: Number, //单个文件最大容量，单位为byte
    },
    disabled: {
      type: Boolean,
      default: false, //是否禁用
    },
    deletable: {
      type: Boolean,
      default: true, //是否显示删除按钮
    },
    lazyLoad: {
      type: Boolean,
      default: true, //是否懒加载
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
    showUpload: {
      type: Boolean,
      default: true, //是否展示上传图标，查看时不展示
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
      fileList: [
        {
          url:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  components: {
    VanUploader,
  },
  methods: {
    //上传文件前处理,后续上传前处理放在这里，比如压缩文件
    beforeRead(file) {
      //   this.$emit("beforeRead", file);
      return true;
    },

    //读取文件后执行
    afterRead(file, detail) {
      // 此时可以自行将文件上传至服务器
      this.$emit("afterRead", file, detail);
    },

    //超过允许文件大小后触发
    onOversize(file, detail) {
      this.$emit("oversize", file, detail);
    },

    //点击预览图
    clickPreview(file, detail) {
      this.$emit("clickPreview", file, detail);
    },

    deleteFile(file, detail) {
      this.$emit("deleteFile", file, detail);
    },
    //关闭自带的大图预览窗口
    closeImagePreview() {
      this.$refs.loader.closeImagePreview();
    },
    //发起文件选择
    chooseFile() {
      this.$refs.loader.chooseFile();
    },
  },
};
</script>

<style scoped>
</style>
