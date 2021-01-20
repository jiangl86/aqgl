<template>
  <div class="aqgg-detail">
    <yu-form name="公告详情">
      <h4>{{ ggDetail.ggName }}</h4>
      <p>{{ ggDetail.ggContent }}</p>
    </yu-form>
  </div>
</template>

<script>
import YuForm from "components/content/form/YuForm";
import { getAqggDetail } from "service/aqgg";
export default {
  name: "AqggDetail",
  data() {
    return {
      ggId: 0,
      ggDetail: null, //公告内容
    };
  },
  components: {
    YuForm,
  },
  created() {
    this.ggId = this.$route.query.ggId;
    this.ggDetail = getAqggDetail({ ggId: this.ggId });
    console.log(this.ggDetail);
  },
  methods: {
    transfer() {
      console.log("转发");
    },
  },
};
</script>

<style scoped>
h4 {
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: var(--liHeight);
}
p {
  text-indent: 4;
  text-align: left;
  font-size: var(--font-size-sm);
  line-height: 25px;
}
</style>
