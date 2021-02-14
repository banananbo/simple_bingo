<template>
<div style="position:relative;">
    <div style="position:absolute; 0%; right:10px;">
    <a type="button" class="btn btn-primary" :href="`http://twitter.com/share?url=https://bin5.xyz/%23/result/${$route.params.id}&text=おさんぽビンゴでお散歩しました！&hashtags=osanpo_bingo`" target="_blank">
    <v-fa :icon="['fab', 'twitter']" />シェアする
    </a>
    </div>
    <h5 style="padding-bottom:20px">ビンゴけっか</h5>
    <ResultCard v-if="bingo" :bingo="bingo" :datail_view="true" :detail_mode="true"></ResultCard>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import ResultCard from "@organisms/ResultCard.vue";
import firebase from "firebase/app"

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
        ResultCard,
    },

    methods: {

  },
});
</script>
<style scoped>

</style>