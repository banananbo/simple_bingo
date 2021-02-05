<template>
<section @click="(event)=>{ event.stopPropagation(); }">
  <button @click.stop="clicked" class="btn btn-primary">{{ $t("function.copy_and_play") }}</button>
  <DiscardGamePop v-if="view_discardPop" @discard="discardPlayingGame" @cancel="view_discardPop = false"></DiscardGamePop>
</section>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo";
import DiscardGamePop from "@organisms/DiscardGamePop.vue";

export type DataType ={
  view_discardPop: boolean,
}

export default Vue.extend({
    data:function():DataType {
        return {
          view_discardPop: false,
        };
    },
    props: {
      bingo: {
          type: Bingo,
          required: true
      },
    },
    created(){
    },
    components: {
      DiscardGamePop
    },
    methods: {
      clicked(){
          if(this.$store.state.bingo){
            this.view_discardPop = true;
          }else{
            this.copyBingo();
          }
      },
      copyBingo(){
          this.$store.state.bingo = Bingo.copyFromBingo(this.bingo);
          this.$router.push("/game");
      },
      discardPlayingGame: function(){
          this.view_discardPop = false;
          this.copyBingo();
      },
    },
});
</script>
<style scoped>

</style>