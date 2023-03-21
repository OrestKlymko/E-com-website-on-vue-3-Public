import { createRouter, createWebHistory } from "vue-router";
import checkout from "/src/components/v-checkout.vue";
import addToCart from "/src/components/v-cart.vue";
import itemCard from "/src/components/v-catalog.vue";
import TyPage from "/src/components/v-thank-you-page.vue";
import about from "/src/components/v-about.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "catalog",
      component: itemCard,
    },
    {
      path: "/cart",
      name: "cart",
      component: addToCart,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: checkout,
    },
    {
      path: "/ty",
      name: "ty",
      component: TyPage,
    },
    {
      path: "/about",
      name: "about",
      component: about,
    },
  ],
});
