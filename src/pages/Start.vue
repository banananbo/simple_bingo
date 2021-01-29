<template>
<section>
      <Header></Header>
      <div class="container-fluid text-center">
            <h2 style="padding:30px">{{ $t("title") }}</h2>
      </div>
      
      <section class='info_box_playing' v-if="this.$store.state.bingo" >
            <h5>{{ $t("lead.in_progress") }}</h5>
                  <ResultCard :bingo="this.$store.state.bingo" :size="resultcardSize" :location_link="true"></ResultCard>
            <section class="text-center">
                  <button type="button" class="btn btn-primary" @click="$router.push('/game')">{{$t("function.continue") }}</button>
                  <button type="button" class="btn btn-primary" @click="view_discardPop = true">{{$t("function.scratch") }}</button>
            </section>    
      </section>

      <!-- <section class="list">
      <ul>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/009.png" style="width:50px;height:50px"></li>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/002.png" style="width:50px;height:50px"></li>
            <li><img src="https://banananbo.github.io/simple_bingo/public/img/contents/006.png" style="width:50px;height:50px"></li>
      </ul>
      </section> -->
      <!-- <section class='info_box'>
            <h5>あそびかた</h5>
            <ul>
                  <li> </li>
                  <li>見つけたら、ビンゴ！ </li>
                  <li>子どもの、発見の喜び　</li>
                  <li>いつもの風景に、新たな発見を　</li>
            </ul>
      </section> -->

      <section v-if="!this.$store.state.bingo" class="text-center">
            <button type="button" class="btn btn-primary" @click="$router.push('/game')">{{$t("function.start")}}</button>
      </section>

      <section class='info_box'>
            <p class='title'>{{$t("lead.how_to")}}</p>
            <ul>
                  <li>{{$t("message.how_to_1")}}</li>
                  <li>{{$t("message.how_to_2")}}</li>
            </ul>
      </section>

      <section class='info_box'>
            <p class='title'>{{$t("message.strolling")}}</p>
            <section class='info_main'>
                  <img src="https://1.bp.blogspot.com/-_DNRgqNKBDo/Xpa04l-ebHI/AAAAAAABYYc/SfGyu5kNEiAk-A-15wwKDAoq4-DVo9lywCNcBGAsYHQ/s500/mask_family_smile.png" height="150">
                  <p>{{$t("message.strolling_detail")}}</p>
            </section>
      </section>

      <section class='info_box'>
            <p class='title'>{{$t("message.naturebingo")}}</p>
            <section class='info_main'>
                  <p>{{$t("message.naturebingo_detail")}}</p>
                  <img src="https://1.bp.blogspot.com/-59_nvImHVnM/XkZdUFSPVeI/AAAAAAABXWQ/Vbu2acjd6dwZjOoQIhRGeYjKPY2EtUCewCNcBGAsYHQ/s400/yagai_kyoushitsu_casual_walk.png" height="150"> 
            </section>
      </section>

      <section v-if="!this.$store.state.bingo" class="text-center">
            <button type="button" class="btn btn-primary" @click="$router.push('/game')">{{$t("function.start")}}</button>
      </section>

      <DiscardGamePop v-if="view_discardPop" @discard="discardGame" @cancel="view_discardPop = false"></DiscardGamePop>
      <Footer></Footer>
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
      data: function():DataType{
      return {
            view_discardPop: false,
            resultcardSize: screen.width - 120
        };
      },
      methods:{
            discardGame: function(){
                  this.view_discardPop = false;
                  this.$router.push('game');
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

.info_box_playing{
    padding: 0.5em 1em;
    margin: 2em 0;
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/  
}

.info_box {
    padding: 0.5em 1em;
    margin: 2em 0;
    /* font-weight: bold;
    color: #6091d3;文字色 */
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/  
}

.info_main{
display:flex;
align-items: flex-start;
}

.info_box .title{
    font-size: 1.2em;
    font-weight: bold;
    color: #6091d3;/*文字色*/
}

.info_box img{
  display:flex;/* flexbox */
  justify-content:center; /* 水平方向 */
  align-items: center; /* 垂直方向 */
  margin: 5px 20px 5px 5px;
}

.info_box li {
    margin: 0; 
    padding: 0;
}
</style>