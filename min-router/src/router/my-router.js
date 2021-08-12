let Vue; // 保存Vue的构造函数，在插件中调用

class VueRouter {
  constructor(options) {
    this.$options = options;
    // 把this.current变成响应式的数据
    // 将来数据一旦发生变化， router-view的render函数能够自动重新执行
    const initial = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "current", initial);

    window.addEventListener("hashchange", (e) => {
      this.current = window.location.hash.slice(1) || "/";
      console.log("hashchange: ", this.current, e);
    });

    window.addEventListener("popstate", (e) => {
      this.current = window.location.hash.slice(1) || "/";
      console.log("popstate: ", window.location.hash.slice(1), e);
    });
  }
  push(options) {
    if(this.current === options.path){
      return
    }
    window.history.pushState(
      {
        key: Date.now(),
      },
      "",
      options.path
    );
    this.updateCurrent(options.path);
  }
  back() {
    window.history.back();
  }

  updateCurrent(path) {
    this.current = path;
  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;

  //   1. 挂在$router属性
  // 全局混入(延迟下面的逻辑到router创建完毕并且附加到选项上时才执行)
  Vue.mixin({
    beforeCreate() {
      // 注意此钩子在每个组件创建实例的时候都会被调用
      // 根实例才有router选项
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 实现两个组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
        default: "",
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: `${this.to}`,
            target: "_self",
          },
          on: {
            click: (e) => {
              e.preventDefault();
              this.$router.push({
                path: this.to
              });
              // debugger;
              // window.history.pushState(
              //   {
              //     key: Date.now(),
              //   },
              //   "",
              //   this.to
              // );
            },
          },
        },
        this.$slots.default
      );
    },
  });

  Vue.component("router-view", {
    render(h) {
      let component = null;
      // 获取当前路由所对应的组件并将它渲染出来
      const current = this.$router.current;
      let route = this.$router.$options.routes.find((e) => {
        return e.path === current;
      });
      if (route) {
        component = route.component;
      }

      return h(component);
    },
  });
};

export default VueRouter;
