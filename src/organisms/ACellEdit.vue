<template>
      <HFModal @outclick="$emit('close')">
            <template v-slot:header>
                <div class="title"> {{$t("message.choose_cell")}} </div>
            </template>

            <textarea v-model="a_url"></textarea>
            {{a_id}}
            <ContentView v-if="content" :size="100" :content="content"></ContentView>
            <template v-slot:footer>
                <button @click="submit({content:content})">{{$t("function.submit")}}</button>
                <button @click="$emit('close')">{{$t("function.cancel")}}</button>
            </template>
      </HFModal>
</template>
<script lang="ts">

import Vue from "vue"
import HFModal from "@organisms/HFModal.vue";
import ContentView from "@organisms/ContentView.vue";
import {AContent,Content} from "@lib/bingo/content"
import {Bingo} from "@lib/bingo/Bingo"

export type DataType ={
      content: AContent
      a_url: string
}

export default Vue.extend({
    data:function():DataType {
        return {
          content:null,
          a_url:""
        };
    },
   computed:{
     a_id:function():string{
       let url:URL
       let code:string
       try{
        url = new URL(this.a_url);
        let kaisou = url.pathname.split("/");
        for(let i=0;i<kaisou.length;i++){
          if(kaisou[i] == "dp") return kaisou[i+1];
        }
       }catch{
         return "invalid";
       }
       return "invalid"
     }
   },
   watch: {
      'a_id':{
        handler: function (val) {
          if(val == "invalid") return;
          this.content = new AContent(val);
        }
      },
   },
    props: {
        bingo: {
            type: Bingo,
            required: true
        },
    },
    methods:{
      submit: function(obj:any){
        this.$emit("selected",obj);
      },
      closeModal: function(){
        this.$emit("cancel");
      }
    },
  components: {
    ContentView,
    HFModal
  },
})
</script>
<style scoped>
.box{
  float: left;
}
</style>