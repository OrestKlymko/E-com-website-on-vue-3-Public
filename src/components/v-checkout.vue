<!-- eslint-disable prettier/prettier -->
<template>
  <menu-navigation />
  <div class="wrapper">
    <el-form label-width="120px">
      <el-form-item label="Enter your name">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="Shipping address">
        <el-input v-model="address" />
      </el-form-item>
      <el-form-item label="Choose country">
        <select class="countryChoose" v-model="selectedCountry">
          <option class="oneCountry" disabled value="">
            Please select one
          </option>
          <option v-for="country in countries" :key="country.id">
            {{ country.name.official }}
          </option>
        </select>
      </el-form-item>
      <el-form-item label="Fast delivery">
        <el-switch v-model="delivery" />
      </el-form-item>
      <el-form-item label="Comment">
        <el-input v-model="comment" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="checkedAgree"
          class="checkAgree"
          label="I agree to the privacy policy"
          size="large" />
      </el-form-item>
      <el-form-item class="button-form">
        <el-button @click="this.$router.push('/cart')">Back</el-button>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
    <div class="totalPrice"><b>You should pay </b> {{ totalPrice() }}$</div>
  </div>
  <v-footer />
</template>

<script>
import Notiflix from "notiflix";
import axios from "axios";
import checkData from "./calculated/totalPrice";
import MenuNavigation from "../components/v-menu.vue";
import VFooter from "./v-footer.vue";

export default {
  components: { MenuNavigation, VFooter },
  name: "checkout-component",
  data: () => ({
    name: "",
    comment: "",
    address: "",
    delivery: false,
    checkedAgree: false,
    countries: [],
    selectedCountry: "",
  }),
  methods: {
    totalPrice() {
      let totalPiceNew = checkData(this.$store.state.addToCartProd);
      if (this.delivery == true) {
        totalPiceNew += 30;
      }
      return totalPiceNew.toFixed(2);
    },
    validateForm() {
      if (
        this.name.length == 0 ||
        this.checkedAgree == false ||
        this.address.length == 0 ||
        this.selectedCountry.length == 0
      ) {
        return false;
      }
      return true;
    },
    async onSubmit() {
      if (this.validateForm()) {
        axios.post("/success", {
          name: this.name,
          country: this.selectedCountry,
          fastDelivery: this.delivery ? "Yes" : "No",
          totalAmount: await this.totalPrice(),
          item: this.$store.state.addToCartProd.map((e) => {
            return {
              name_item: e.title,
              quantity: e.count,
              price: e.price * e.count,
            };
          }),
        });
        axios.get("/products").then((r) => {
          let temporaryArray = [];
          for (let data in r.data) {
            for (let i = 0; i < this.$store.state.addToCartProd.length; i++) {
              if (
                r.data[data].title == this.$store.state.addToCartProd[i].title
              ) {
                temporaryArray.push(r.data[data]);
              }
              temporaryArray.forEach((e) => {
                if (e.title == this.$store.state.addToCartProd[i].title) {
                  const update = {
                    rating: {
                      count:
                        e.rating.count -
                        this.$store.state.addToCartProd[i].count,
                    },
                  };
                  axios.patch(`/productReload/${e._id}`, update);
                }
              });
            }
          }
        });
        this.$store.state.addToCartProd = [];
        localStorage.clear();
        await this.$router.push("/ty");
        this.$forceUpdate();
      } else {
        Notiflix.Notify.failure("Please, fill in all fields");
      }
    },
  },
  async mounted() {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const data = response.data;
    this.countries = data;
    this.$store.state.addToCartProd = JSON.parse(localStorage.getItem("cart"));
  },
};
</script>

<style scoped>
.image {
  width: 100px;
  height: 100px;
  display: block;
}

.totalPrice {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 24px;
}
.checkAgree {
  margin: 10px auto;
  width: 100%;
}

.countryChoose {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}

.wrapper {
  padding: 20px;
}
</style>
