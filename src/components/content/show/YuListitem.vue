<template>
  <div class="yu-listitem" :style="'background-color:' + bgColor">
    <yu-image
      v-if="showImage"
      :src="pData.image"
      :round="round"
      :width="width"
      :height="height"
      :fit="fit"
    ></yu-image>
    <div class="content"></div>
  </div>
</template>

<script>
import YuImage from "components/common/basic/YuImage";
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
    colNum: {
      type: Number,
      default: 1, //每行显示数量，仅没有图片时设置生效
    },
    bgColor: {
      type: String,
      default: "white",
    },
    pData: {
      type: Object,
      default: function () {
        return {
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
      YuImage,
    };
  },
  components: {},
};
</script>

<style scoped>
</style>
