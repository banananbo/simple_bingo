<template>
<section>
      <Header></Header>
      <div class="container-fluid text-center">
            <h2>ぷらっとビンゴ</h2>
      </div>
      <button @click="login">login</button>
      <button @click="twlogin">tw</button>
      <button @click="dbtest">firebase</button>
      <section class='info_box' v-if="this.$store.state.bingo" >
            <h5>プレイ中のビンゴ</h5>
                  <ResultCard :bingo="this.$store.state.bingo" :size="resultcardSize" :location_link="true"></ResultCard>
            <section class="text-center">
                  <button type="button" class="btn btn-primary" @click="$router.push('/game')">続きをプレイ</button>
                  <button type="button" class="btn btn-primary" @click="view_discardPop = true">破棄して新規作成</button>
            </section>    
      </section>
      <!-- <section class="list">
      <ul>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/009.png" style="width:50px;height:50px"></li>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/002.png" style="width:50px;height:50px"></li>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/006.png" style="width:50px;height:50px"></li>
      </ul>
      </section> -->
      <section class='info_box'>
            <h5>あそびかた</h5>
            <ul>
                  <li>ビンゴを持って出かけよう！ </li>
                  <li>見つけたら、ビンゴ！ </li>
                  <li>子どもの、発見の喜び　</li>
                  <li>いつもの風景に、新たな発見を　</li>
            </ul>
      </section>
      <section v-if="!this.$store.state.bingo" class="text-center">
            <button type="button" class="btn btn-primary" @click="$router.push('/game')">ビンゴを始める</button>
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
import firebase from "firebase"

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
            },
            login: function(){
                  this.$store.dispatch('doLogin');
            },
            twlogin: function(){
                  this.$store.dispatch('doLoginTwitter');
            },
            dbtest:  function(){
                  const db = firebase.firestore();
                  db.collection('archibes').add({
                  first: 'Ada',
                  last: 'Lovelace',
                  born: 1815,
                  test: [1,2,[3,4,5]]
      })
      .then(function(docRef:any) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error:any) {
        console.error('Error adding document: ', error);
      });
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
.list ul {
	text-align: center;
	margin-left: -10px;
	font-size: 0; /* タグ改行時の空白防止 */
}
 
.list ul li{
	display: inline-block;
	margin-left: 10px;
	font-size: 14px; /* ulでサイズ0にしたのを戻す */
}

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