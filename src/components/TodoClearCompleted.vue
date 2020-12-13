<template>
    <div>
      <button v-if="showClearCompletedButton" @click="clearCompleted">
         Clear completed
     </button>
    </div>
</template>


<script>
export default {
    name: 'todoClearCompleted',

    computed: {
        showClearCompletedButton(){
          return  this.$store.getters.showClearCompletedButton
        }
    },
    
    methods: {
        clearCompleted(){
            this.$store.dispatch('clearCompleted')
      
           
        }
    },
   
}

</script>

<style>
    
</style>