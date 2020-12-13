<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />
    <p class="text-left">You are logged in as:{{username}}</p>
    <todolist></todolist>
  </div>
</template>

<script>
import Todolist from "./components/Todolist.vue";
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      username: ""
    };
  },
  components: {
    Todolist
  },

 

  mounted() {
    axios
      .get("api/user")
      .then(response => {
        this.username = response.data.email;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
/* color: #2c3e50;
  margin-top: 60px;
  font-size: 19px;
} */
</style>



