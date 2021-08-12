// 1、插件：挂在$store
// 2、实现Store
let Vue;

export class Store {
  //   static install() {}
  constructor(options) {
    // 把state响应式处理
    // this.$store.state.xxx
    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
    });
    this._mutations = options.mutations;
    this._actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    this.getters = {};

    options.getters && this.handlerGetters(options.getters);
  }

  handlerGetters(getters) {
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state),
      });
    });
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("Please use replaceState to reset state");
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error("unknoen mutation type");
      return;
    }
    entry(this.state, payload);
  }
  dispatch(type, payload) {
    const mutation = this._actions[type];
    if (!mutation) {
      console.error("unknoen action type");
      return;
    }

    return mutation(this, payload);
  }
}

export const install = (_Vue) => {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
};

export default {
  Store,
  install,
};
