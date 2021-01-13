<template>
  <div class="yu-listitem" :style="'background-color:' + bgColor">
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
      <yu-tag v-if="showState" class="state">{{ pData.state }}</yu-tag>
      <div
        class="other-info"
        v-for="(item, index) in pData.otherInfo"
        :key="pData.id + 'o' + index"
      >
        <span class="keyInfo">{{ item.key }}:</span
        ><span class="valueInfo">{{ item.value }}</span>
      </div>
      <div class="current-user-info" :style="'color:' + currentUserColor">
        {{ pData.currentUser }}
      </div>
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
    return {};
  },
  components: {
    YuTag,
    YuImage,
  },
};
</script>

<style scoped>
.yu-listitem {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 0 10px;
}
.image-info {
  margin-right: 10px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--font-size-md);
  font-weight: 600;
}
</style>
