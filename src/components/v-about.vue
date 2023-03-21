<template>
  <menu-navigation />
  <div>
    <h1 class="headline">About this website</h1>
    <div>
      The following technologies were used in this website:
      <ul>
        <li>Vue 3 composition API</li>
        <li>Vuex store</li>
        <li>Mongo database</li>
        <li>Koa.js</li>
        <li>UI library Element+</li>
      </ul>
      This project simulates a simple e-commerce site that interacts closely
      with Mongo database data. The server API was written using Koa. On the
      catalog page, you get a list of current items from the database that are
      available. When you complete an order, then data will push to another
      database. This data include information about the user, the product, the
      quantity and the final amount of the each product,
    </div>
  </div>
  <v-footer />
</template>
<script>
import VFooter from "./v-footer.vue";
import MenuNavigation from "../components/v-menu.vue";
export default {
  components: { MenuNavigation, VFooter },
  data: () => ({}),
};
</script>
<style scoped>
.headline {
  text-align: center;
  padding: 20px 0;
}
</style>
