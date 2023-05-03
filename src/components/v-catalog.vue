<!-- eslint-disable prettier/prettier -->
<template>
  <menu-navigation />
  <div v-if="!loading">
    <img
      :src="`https://cdn.dribbble.com/users/31776/screenshots/754788/loading_cart.gif`"
      alt="Loading..."
      class="loadingSpinner" />
  </div>
  <el-row class="list">
    <el-col class="list-item" v-for="product in products" :key="product.id">
      <el-card class="list-content" shadow="hover">
        <div class="card">
          <img :src="product.image" class="image" />
          <b
            ><span class="title">{{ product.title }}</span></b
          >
          <div>Count: {{ product.rating.count }}</div>
          <vue3-star-ratings :v-bind="product.rating.rating" />
          <div style="display: block; padding-bottom: 10px; padding-top: 10px">
            Price: {{ product.price }}$
          </div>
          <el-button
            class="addToCart"
            type="primary"
            @click="addToCart(product)"
            >Add to card</el-button
          >
        </div>
      </el-card>
    </el-col>
  </el-row>
  <v-footer />
</template>

<script>
import axios from "axios";
import MenuNavigation from "@/components/v-menu.vue";
import VFooter from "./v-footer.vue";
import Notiflix from "notiflix";

export default {
  name: "item-cards",
  components: { MenuNavigation, VFooter },

  data: () => ({
    products: null,
    loading: false,
  }),
  async created() {
    axios.get("https://e-commerce-vue.herokuapp.com/products").then((r) => {
      r.data.forEach((element) => {
        if (element.rating.count == 0) {
          axios.delete(`/deleteProduct/${element._id}`);
        }
      });
      axios.get("https://e-commerce-vue.herokuapp.com/products").then((r) => {
        this.products = r.data;
        this.loading = true;
      });
    });
    if (localStorage.getItem("cart") !== null) {
      this.$store.state.addToCartProd = JSON.parse(
        localStorage.getItem("cart")
      );
    }
  },
  methods: {
    addToCart(product) {
      let isEmpty;
      if (this.$store.state.addToCartProd == 0) {
        isEmpty = this.$store.state.addToCartProd.find(
          (item) => item.id == product.id
        );
      }
      if (!isEmpty) {
        this.$store.state.addToCartProd.push(product);
        product.count = 1;
        localStorage.setItem(
          "cart",
          JSON.stringify(this.$store.state.addToCartProd)
        );
      } else if (product.count < product.rating.count) {
        product.count++;
        localStorage.setItem(
          "cart",
          JSON.stringify(this.$store.state.addToCartProd)
        );
      } else {
        Notiflix.Notify.failure("We don't have this item so much...");
      }
    },
  },
};
</script>

<style scoped>
.el-col-24 {
  flex: none;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.image {
  width: 100px;
  height: 100px;
  display: block;
}

* {
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
  margin: 0 auto;
  max-width: 60em;
  line-height: 1.3;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  width: 100%;
}
h2 {
  margin-top: 0;
  margin-bottom: 0.4em;
}

/*Flex items*/
.list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  display: flex;
  padding: 0.5em;
  width: 100%;
}

.title {
  text-align: center;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
}

.loadingSpinner {
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

@media all and (min-width: 40em) {
  .list-item {
    width: 50%;
  }
}
@media all and (min-width: 60em) {
  .list-item {
    width: 33.33%;
  }
}
.list-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
}
.list-content p {
  flex: 1 0 auto;
}
</style>
