import Vue from "vue";
import Vuex from "vuex";
// this.$store
console.log(Vuex);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    // state从哪里来
    add(state) {
      console.log("mutations---");
      state.counter++;
    },
  },
  actions: {
    // 参数从哪里来
    add({ commit }) {
      // setTimeout(() => {
      commit("add");
      // }, 1000);
      return 9;
    },
  },
  modules: {},
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
  },
});
