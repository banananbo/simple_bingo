<template>
<section>
      <Header></Header>
      <div class="container-fluid text-center">
            <h2>ぷらっとビンゴ</h2>
            <section v-if="!this.$store.state.bingo">
            <button type="button" class="btn btn-primary" @click="$router.push('/game')">ビンゴを始める</button>
            </section>
      </div>
      <section class='info_box' v-if="this.$store.state.bingo" >
            <h5>プレイ中のビンゴ</h5>
                  <ResultCard :bingo="this.$store.state.bingo" :size="resultcardSize"></ResultCard>
            <section class="text-center">
                  <button type="button" class="btn btn-primary" @click="$router.push('/game')">続きをプレイ</button>
                  <button type="button" class="btn btn-primary" @click="view_discardPop = true">破棄して新規作成</button>
            </section>    
      </section>
      <section class='info_box'>
            <h5>あそびかた</h5>
            <ul>
                  <li>ビンゴを持って出かけよう！ </li>
                  <li>見つけたら、ビンゴ！ </li>
                  <li>子どもの、発見の喜び　</li>
                  <li>いつもの風景に、新たな発見を　</li>
            </ul>
      </section>
       
      <Footer></Footer>
      <DiscardGamePop v-if="view_discardPop" @discard="discardGame" @cancel="view_discardPop = false"></DiscardGamePop>
</section>
</template>

<script lang="ts">

import Vue from "vue" 
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import ResultCard from "@organisms/ResultCard.vue";
import DiscardGamePop from "@organisms/DiscardGamePop.vue";

export type DataType ={
      view_discardPop:Boolean,
      resultcardSize:number
}

export default Vue.extend({
      data():DataType{
      return {
            view_discardPop: false,
            resultcardSize: screen.width - 100
        };
      },
      methods:{
            discardGame: function(){
                  this.view_discardPop = false;
                  this.$router.push('game');
            }
      },
      components:{
        Header,
        Footer,
        ResultCard,
        DiscardGamePop
      }
})
</script>
<style>
.info_box {
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    color: #6091d3;/*文字色*/
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/
}
.info_box li {
    margin: 0; 
    padding: 0;
}
</style>