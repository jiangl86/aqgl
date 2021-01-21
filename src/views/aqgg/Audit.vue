<template>
  <div class="aqgg-audit">
    <yu-form name="公告审批" isEdit>
      <yu-label-radio name="审批结果" :options="options"></yu-label-radio>
    </yu-form>
  </div>
</template>

<script>
import YuForm from "components/content/form/YuForm";
import YuLabelRadio from "components/content/form/YuLabelRadio";
export default {
  name: "AqggAudit",
  data() {
    return {
      ggId: 0,
      options: [
        { label: "审批通过", value: 1 },
        { label: "不通过", value: 0 },
      ],
    };
  },
  components: {
    YuForm,
    YuLabelRadio,
  },
  created() {
    this.ggId = this.$route.query.ggId;
    console.log(this.ggId);
  },
};
</script>

<style scoped>
</style>
