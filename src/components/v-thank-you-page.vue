<!-- eslint-disable prettier/prettier -->
<template>
  <menu-navigation />
  <el-row class="success">
    <el-col :sm="12" :lg="6">
      <el-result icon="success" title="Order Confirmation">
        <template #extra>
          <el-button type="primary" @click="this.$router.push(`/`)"
            >On main page</el-button
          >
        </template>
      </el-result>
    </el-col>
  </el-row>
  <v-footer />
</template>
<script>
import MenuNavigation from "@/components/v-menu.vue";
import VFooter from "./v-footer.vue";
export default {
  components: { MenuNavigation, VFooter },
  name: "thank-you-page",
};
</script>
<style scoped>
.success {
  display: flex;
  justify-content: center;
}
</style>
