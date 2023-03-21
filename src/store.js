import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      addToCartProd: [],
    };
  },
});

export default store;
