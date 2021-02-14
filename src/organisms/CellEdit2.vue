<template>
      <HFModal @outclick="$emit('close')">
            <template v-slot:header>
                <div class="title"> {{$t("message.choose_cell")}} </div>
            </template>

                <div v-for="(content, index) in contents" :key="index" class="box">
                      <ContentView :enable="!except_id_list.includes(content.id)" :content='content' :size="size" @onClick="onClicked"></ContentView>
                      <p>{{content.title}}</p>
                </div>

            <template v-slot:footer>
                <button @click="$emit('close')">{{$t("function.cancel")}}</button>
            </template>
      </HFModal>
</template>
<script lang="ts">

import Vue from "vue"
import HFModal from "@organisms/HFModal.vue";
import ContentView from "@organisms/ContentView.vue";
import {Content} from "@lib/bingo/content"
import {Bingo} from "@lib/bingo/Bingo"

export type DataType ={
      contents: Array<Content>,
      size: number
}

export default Vue.extend({
    data:function():DataType {
        return {
            contents: Content.contents,
            size : (screen.width -100)/4
        };
    },
   computed:{
      except_id_list():Array<number>{
          return this.bingo.contents.map(c=>c.id);
      }
  },
    props: {
        bingo: {
            type: Bingo,
            required: true
        },
    },
    methods:{
      onClicked: function(obj:any){
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