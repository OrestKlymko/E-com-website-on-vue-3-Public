<!-- eslint-disable prettier/prettier -->
<template>
  <menu-navigation />
  <div class="wrapper">
    <ul>
      <li
        class="card"
        v-for="product in this.$store.state.addToCartProd"
        :key="product.id">
        <img :src="product.image" class="image" />
        <div class="list-description" style="padding: 14px">
          {{ product.title }}
        </div>

        <div class="bottom">
          <el-button class="reduce" @click="reduceProd(product)" type="warning"
            >-</el-button
          >
          <div class="count">{{ product.count }}</div>
          <el-button class="increase" @click="increase(product)" type="success"
            >+</el-button
          >
          <div>
            <b>Price:</b> {{ (product.price * product.count).toFixed(2) }}$
          </div>
          <el-button
            class="deleteBTN"
            type="danger"
            @click="removeFromCart(product)"
            >Delete</el-button
          >
        </div>
      </li>
    </ul>

    <div class="totalPrice"><b>Total price:</b> {{ totalPrice() }}$</div>
    <el-button class="success" type="success" round @click="successCheck"
      >Checkout</el-button
    >
  </div>
  <v-footer />
</template>

<script>
import Notiflix from "notiflix";
import MenuNavigation from "../components/v-menu.vue";
import checkData from "./calculated/totalPrice";
import VFooter from "./v-footer.vue";

export default {
  components: { MenuNavigation, VFooter },
  name: "add-to-card",
  data: () => ({
    num: 1,
  }),
  methods: {
    removeFromCart(product) {
      this.$store.state.addToCartProd.splice(product, 1);
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.state.addToCartProd)
      );
    },
    increase(product) {
      if (product.count < product.rating.count) {
        product.count++;
        localStorage.setItem(
          "cart",
          JSON.stringify(this.$store.state.addToCartProd)
        );
      } else {
        Notiflix.Notify.failure("We don't have this item so much...");
      }
    },
    reduceProd(product) {
      product.count--;
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.state.addToCartProd)
      );
      if (product.count == 0) {
        this.removeFromCart(product);
        this.totalPrice();
        localStorage.setItem(
          "cart",
          JSON.stringify(this.$store.state.addToCartProd)
        );
      }
    },
    totalPrice() {
      return checkData(this.$store.state.addToCartProd).toFixed(2);
    },
    successCheck() {
      if (this.$store.state.addToCartProd.length == 0) {
        Notiflix.Notify.failure("Your cart is empty");
      } else {
        this.$router.push("/checkout");
      }
    },
  },

  created() {
    this.$store.state.addToCartProd = JSON.parse(localStorage.getItem("cart"));
  },
};
</script>

<style scoped>
.image {
  width: 50px;
  height: 50px;
  display: block;
}
.count {
  display: block;
  margin-left: 6px;
  margin-right: 6px;
}
.card {
  list-style-type: none;
  display: grid;
  grid-template-columns: 0.5fr 2fr 2fr;
  padding: 15px;
  margin-bottom: 15px;
  border: 10px solid transparent;
  border-image: linear-gradient(to right, transparent 0%, #adf2f7 100%);
  border-image-slice: 1;
}

.list-description {
  display: flex;
}

.bottom {
  display: flex;
  align-items: center;
}

.increase {
  height: 30px;
  width: 15px;
  border-radius: 25%;
  background-color: green;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.deleteBTN {
  margin-left: auto;
}

.reduce {
  height: 30px;
  width: 15px;
  border-radius: 25%;
  background-color: red;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.totalPrice {
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 24px;
}

.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.success {
  min-width: 300px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
}
</style>
