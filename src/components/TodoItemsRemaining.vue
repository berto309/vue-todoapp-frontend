<template>
    <div>
       {{remaining}} active task left. 
    </div>
</template>


<script>
export default {
    name: 'todoItemsRemaining',
    computed: {
        remaining(){
            return this.$store.getters.remaining
        }
    },
    
   
}

</script>

<style>
    
</style>