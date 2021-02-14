<template>
<div>
    <Header></Header>
        <FreeContents :size="120"></FreeContents>
        <button @click="test">test</button>
        <button @click="show_modal=!show_modal">OPEN</button>
        <button @click="test2">test2</button>
        <BingoView :bingo="$store.state.bingo" :size="200"></BingoView>
        <!-- <BingoView :bingo="localbingo" :size="200"></BingoView> -->
        <ResultCard :bingo="$store.state.bingo" :size="200"></ResultCard>
        <BingoView :bingo="localbingo" :size="200"></BingoView>
        <ResultCard :bingo="localbingo" :size="200" :datail_view="true"></ResultCard>
        <CellEdit2 v-if="show_modal" @close="show_modal=false" :bingo="this.localbingo"></CellEdit2>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import TestModal from "@organisms/TestModal.vue";
import TestPop from "@organisms/TestPop.vue";
import CellEdit2 from "@organisms/CellEdit2.vue";
import BingoView from "@organisms/BingoView.vue";
import ResultCard from "@organisms/ResultCard.vue";
import FreeContents from "@atoms/FreeContents.vue";
import {Bingo} from "@lib/bingo/Bingo";
// import {QueryDocumentSnapshot} from "firebase/firestore"
import {User} from "@lib/bingo/user";
import Archives from "@lib/db/archives";

export type DataType ={
    show_modal: boolean,
    localbingo: Bingo
}

export default Vue.extend({
    data: function(){
        return {
            show_modal: false,
            localbingo: null
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    created(){
      this.localbingo = Bingo.createNew(3,true);
    },

    components: {
        Header,
        Footer,
        FreeContents,
        TestModal,
        BingoView,
        ResultCard,
        TestPop,
        CellEdit2
    },

    methods: {
        test2:async function(){
            let a = new Archives();
            let list =await a.fetchRecentArchives();
            console.log(4)
            console.log(list);
        },
        // test3: async function(){
        //     const db = firebase.firestore();
        //     let datas = await db.collection("archives").orderBy("_end_time","desc").limit(3).get();
            
        //      datas.docs.map(
        //         await this.createBingoData
        //     );

        //     for(let i=0;i<datas.docs.length;i++){
        //         await this.createBingoData(datas.docs[i]);
        //     }

        //     console.log(3);

        // },
        // createBingoData: async function(doc:any){
        //     let data = doc.data();

        //     if(data.user_id == 0){
        //         data.player = User.GUEST_USER;
        //         console.log(data.player);
        //     }else{
        //         let player = await data.user_ref.get();
        //         data.player = player.data();
        //         console.log(data.player);
        //     }
        // },
        test:function(){
            console.log(
                // JSON.parse(JSON.stringify(this.$store.state.bingo))
                this.$store.state.bingo.serialized
            );
            this.localbingo = Bingo.createByObj(this.$store.state.bingo.serialized);
        }
  },
});
</script>
<style scoped>

</style>