<template>
<section>
      <div class="container-fluid text-center">
            <h2>Quick Bingo</h2>
            <router-link to="/create">Start!</router-link>
            <button @click="openModal">open</button>
      </div>
      <MyModal v-if="modal"></MyModal>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import MyModal from "./MyModal.vue";

export type DataType ={
      modal:Boolean
}

export default Vue.extend({
      data():DataType{
      return {
            modal: false,
        };
      },
      methods:{
            openModal: function(){
                  this.modal = true;
            }
      },
      components:{
            MyModal
      }
})
</script>
<style>

</style>