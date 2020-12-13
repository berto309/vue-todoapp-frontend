<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("clearTodos");
    this.$store.dispatch("removeCookie").then(() => {
      this.$router.push({ name: "login" });
    });
  }
};
</script>