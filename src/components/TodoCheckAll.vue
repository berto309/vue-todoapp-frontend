<template>
    <div>
       <div><label for="">
            <input type="checkbox" :checked="!anyRemaining" @change="allChecked"><span>Check All</span>
            </label>
        </div> 
    </div>
</template>


<script>
export default {
    name: 'todoCheckAll',
    
    computed: {
        anyRemaining(){
            return this.$store.getters.anyRemaining 
        }
    },
    methods: {
        allChecked(){
      this.$store.dispatch('checkAll', event.target.checked)
            
        }
    },
   
}

</script>

<style>
    
</style>