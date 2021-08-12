<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ $store.state.counter }}</div>
    <br />

    <button @click="add">Add</button>
    <br />
    <br />

    <button @click="asyncAdd">Async Add</button>

    <p>{{ $store.getters.doubleCounter }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit("add");
    },
    asyncAdd() {
      console.log("asyncAdd ---start");
      const temp = this.$store.dispatch("add");
      console.log(temp);
      console.log("asyncAdd --- end");
    },
  },
};
</script>
