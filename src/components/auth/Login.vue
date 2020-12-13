<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">
      <div v-if="errorMessage" class="error text-center">{{errorMessage}}</div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email" required />
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password" required />
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">
         <div class="lds-ring-container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div>   </div>
         Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  axios.defaults.baseURL = "http://laravel-todoapp.test/";
  axios.defaults.withCredentials = true;
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        errorMessage:''
        
       
      };
    },
   
   
   
   
    methods: {
      login() {
        this.$store
          .dispatch("storeCookie", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({
              name: "todos"
            });
          })
          .catch((error) =>{
       this.errorMessage = error.response.data.errors.email[0]
       this.password = ''
          })
         

         
      }
    }
  };
</script>

<style lang="">
</style>