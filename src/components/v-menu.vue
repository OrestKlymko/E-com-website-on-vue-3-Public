<!-- eslint-disable prettier/prettier -->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect">
    <el-menu-item index="0" @click="this.$router.push('/')"
      >OREST SHOP</el-menu-item
    >
    <div class="flex-grow" />
    <el-menu-item index="1" @click="this.$router.push('/about')"
      >About web</el-menu-item
    >
    <el-menu-item index="2" @click="this.$router.push('/')"
      >Catalog</el-menu-item
    >
    <el-badge
      :value="
        this.$store.state.addToCartProd == null
          ? 0
          : this.$store.state.addToCartProd.length
      "
      class="item"
      type="danger">
      <el-button class="btnCart" @click="this.$router.push('/cart')"
        >Cart</el-button
      >
    </el-badge>
  </el-menu>
</template>

<script>
export default {
  name: "menu-navigation",
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.btnCart {
  padding: 20px 40px;
}
</style>
