<template>
  <div class="za-upload">
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
  name: "ZaUpload",
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
