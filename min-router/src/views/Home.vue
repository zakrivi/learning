<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      @click="onClick"
      @xxx="onXXX"
      acd="13213"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    onClick() {
      console.log("onClick");
    },
    onXXX() {
      console.log("onXXX");
    },
  },
};
</script>
