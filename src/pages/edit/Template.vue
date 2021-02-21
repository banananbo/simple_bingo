<template>
<div style="position:relative;">
    <div style="position:absolute; 0%; right:10px;">
    <a type="button" class="btn btn-primary" :href="`http://twitter.com/share?url=https://bin5.xyz/%23/result/${$route.params.id}&text=おさんぽビンゴでお散歩しました！&hashtags=osanpo_bingo`" target="_blank">
    <v-fa :icon="['fab', 'twitter']" />シェアする
    </a>
    </div>
    <button @click="makeOgp">test</button>
    <section>
    <BingoView v-if="this.bingo" :bingo="this.bingo" :size="size"></BingoView>
    </section>
    <!-- <ResultCard v-if="bingo" :bingo="bingo" :datail_view="true" :detail_mode="true"></ResultCard> -->
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import BingoView from "@organisms/BingoView.vue";
// import Templates from "@lib/db/templates";
import { DBBingos } from "@src/lib/db/dbbingos";
import html2canvas from 'html2canvas'

export type DataType ={
    bingo: Bingo,
    mypageurl: String,
    size: number
}

export default Vue.extend({
    data:function():DataType {
        return {
            bingo: null,
            mypageurl: encodeURI(window.location.href),
            size: screen.width - 10
        };
    },
    computed:{

    },

    props: {

    },
    created(){
        this.setup();
        this.$store.commit('yome/setTitle',`${this.bingo.title}`)
    },

    components: {
        BingoView,
    },

    methods: {
         setup:async function(){
            let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_TEMPLATE);
            this.bingo =  await db.load(this.$route.params.id);
            console.log(this.bingo);
        },
        makeOgp:function () {
            html2canvas(document.getElementById("ogpprintarea")).then(canvas => {
                let ctx = canvas.getContext("2d");
                let img = new Image();
                // img.src="img.png";
                document.body.appendChild(canvas);
                ctx.drawImage(img, 0, 0);
            }

            )
            // var canvas = document.createElement('canvas')
            // canvas.width = this.size
            // canvas.height = this.size
            // var ctx = canvas.getContext('2d')
            // var image = new Image()
            // image.onload = () => {
            //     ctx.drawImage(image, 0, 0, 1200, 630)
            //     successCallback(canvas.toDataURL())
            // }
            // image.onerror = (e) => {
            //     errorCallback(e)
            // }
            // var svgData = new XMLSerializer().serializeToString(svgElement)
            // image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
        }
    },
});
</script>
<style scoped>

</style>