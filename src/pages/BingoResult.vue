<template>
<div style="position:relative;">
    <Header></Header>
    <div style="position:absolute; 0%; right:10px;">
    <a type="button" class="btn btn-primary" :href="`http://twitter.com/share?url=https://bin5.xyz/%23/result/${$route.params.id}&text=おさんぽビンゴでお散歩しました！&hashtags=osanpo_bingo`" target="_blank">
    <v-fa :icon="['fab', 'twitter']" />シェアする
    </a>
    </div>
    <h5 style="padding-bottom:20px">ビンゴけっか</h5>
    <ResultCard v-if="bingo" :bingo="bingo" :datail_view="true" :detail_mode="true"></ResultCard>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import ResultCard from "@organisms/ResultCard.vue";
import firebase from "firebase"

export type DataType ={
    bingo: Bingo,
    mypageurl: String
}

export default Vue.extend({
    data:function():DataType {
        return {
            bingo: null,
            mypageurl: encodeURI(window.location.href)
        };
    },
    computed:{

    },

    props: {

    },
    created(){
        console.log(window.location.href);
//         console.log(this.$route.params.id);
// firebase.database().ref('archives/'+this.$route.params.id)
// .once('value', (snapshot)=>{console.log(snapshot.val());console.log(this.bingo); this.bingo = Bingo.createByObj(snapshot.val());console.log("HOGA");console.log(this.bingo)})
const db = firebase.firestore();
db.collection('archives').doc(this.$route.params.id).get().then(
    doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                console.log('Document data:', doc.data());
                this.bingo = Bingo.createByObj(doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
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