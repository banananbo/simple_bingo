<template>
<div>
    <Header></Header>
    <h5>ビンゴの結果</h5>
    <ResultCard class="container-fluid" v-if="bingo" :size="size" :bingo="bingo" :datail_view="true"></ResultCard>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import ResultCard from "@organisms/ResultCard.vue";
import firebase from "firebase"

export type DataType ={
    size: number,
    bingo: Bingo,
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 40,
            bingo: null,
        };
    },
    computed:{

    },

    props: {

    },
    created(){
        console.log("created!!!");
        console.log(this.$route.params.id);
//     let database = firebase.database();
firebase.database().ref('archives/'+this.$route.params.id)
// firebase.database().ref('archives/'+'-MRmVFloQGP-zqaDG-f1')
.once('value', (snapshot)=>{console.log(snapshot.val());console.log(this.bingo); this.bingo = Bingo.createByObj(snapshot.val());console.log("HOGA");console.log(this.bingo)})
      // let room = "test/-MRhbdOiK1QUEuSAauht";
    },

    components: {
        Header,
        Footer,
        ResultCard,
    },

    methods: {

  },
});
</script>
<style scoped>

</style>