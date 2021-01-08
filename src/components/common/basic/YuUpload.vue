<template>
  <div class="yu-upload">
    <cube-upload
      ref="upload"
      v-model="files"
      :action="action"
      :simultaneous-uploads="1"
      :process-file="processFile"
      @file-submitted="fileSubmitted"
    />
  </div>
</template>

<script>
export default {
  name: "YuUpload",
  props: {
    action: "",
  },
  data() {
    return {
      files,
    };
  },
  components: {},
};
</script>

<style scoped>
</style>
