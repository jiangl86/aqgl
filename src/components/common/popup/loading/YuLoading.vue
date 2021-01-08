<template>
  <div class="loading" v-if="isShowLoading">
    <div class="icons">
      <div class="bars"></div>
      <div class="bars"></div>
      <div class="bars"></div>
    </div>
    <div class="text">努力加载中...</div>
  </div>
</template>

<script>
export default {
  name: "ZaLoading",
  data() {
    return {
      isShowLoading: false,
    };
  },
  methods: {
    showLoading() {
      this.isShowLoading = true;
    },
    hideLoading() {
      this.isShowLoading = false;
    },
  },
  components: {},
};
</script>

<style scoped>
.loading {
  position: fixed;
  width: 100vw;
  height: calc(100vh - 44px);
  left: 0;
  top: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: var(--smallSize);
  z-index: 600;
  background-color: rgba(0, 0, 0, 0.2);
}
.loading .icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
}
.loading .bars {
  width: 5px;
  height: 12px;
  position: relative;
  margin: 5px;
  background-color: #20a0ff;
}
.loading .bars::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: inherit;
  animation: extend 0.6s ease-out infinite;
}
@keyframes extend {
  0% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(1.5);
  }
  50% {
    transform: scaleY(2);
  }
  75% {
    transform: scaleY(1.5);
  }
  100% {
    transform: scaleY(1);
  }
}
.loading .bars:nth-child(2)::before {
  animation-delay: 0.2s;
}
.loading .bars:nth-child(3)::before {
  animation-delay: 0.4s;
}
</style>
