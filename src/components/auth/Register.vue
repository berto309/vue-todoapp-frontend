<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <div class="form-control">
        <label for="name">Name</label>       
        <input type="text" name="name" id="name" class="login-input" v-model="name">
        <p class="error" v-if="errorMessage.name">{{errorMessage.name[0]}}</p>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email">
        <p class="error" v-if="errorMessage.email">{{errorMessage.email[0]}}</p>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
        <p class="error" v-if="errorMessage.password">{{errorMessage.password[0]}}</p>
      </div>

       <div class="form-control mb-more">
        <label for="password">Confirm Password</label>
        <input type="password" name="password_confirmation" id="confirm_password" class="login-input" v-model="password_confirmation">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>

    </form>
  </div>
</template>


<script>
export default {
    
    data() {
      return {
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        errorMessage:[]  
      }
    },

    computed: {
      nameErrors(){
        return this.$store.getters.nameErrors
      },
      emailErrors(){
        return this.$store.getters.emailErrors
      },
      passwordErrors(){
        return this.$store.getters.passwordErrors
      },
    },

    methods: {
    register(){
     this.$store.dispatch('register',{
       name:this.name,
       email:this.email,
       password: this.password,
       password_confirmation: this.password_confirmation
     }).then(()=>{
      
       this.$router.push({name:'todos'})
      
     }).catch(error=>{
    if (error.response.status === 422) {
      this.errorMessage = error.response.data.errors
    }
     
     })
  
   }

  
    },
}
</script>