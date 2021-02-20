<template>
<section>
      <div class="container-fluid text-center">
            <TitleLogo :subtitle="`みんなで！`" :title="`よむよむビンゴ！`"></TitleLogo>
      </div>
      <section class='info_box'>
            <p class='title'>読破したいビンゴを作ろう！</p>
            <ul>
                  今年こそ、読もうと思っている本を登録して、ビンゴを目指そう！
            </ul>
      </section>
    　<section class='info_box'>
            <p class='title'>皆がどんな本をチェックしているか見てみよう！</p>
            
      </section>
    <section class='info_box'>
      よむよむビンゴは、amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイト宣伝プログラムである、 Amazonアソシエイト・プログラムの参加者です。
    </section>
</section>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import TemplateCard from "@organisms/yome/TemplateCard.vue";
import ResultCard from "@organisms/ResultCard.vue";
import BingoView from "@organisms/BingoView.vue";
import TitleLogo from "@atoms/TitleLogo.vue";

export type DataType = {
    bingo: Bingo,
    size: number
}

export default Vue.extend({
    data: function(){
        return {
            bingo: null,
            size: screen.width - 20,
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    created(){
        this.$store.commit('yome/setTitle',`${this.$store.state.user.user.name}さんのビンゴ`)
    },
    mounted(){
        this.$store.commit('yome/setTitle',`よめよめビンゴ`);
    },

    components: {
        TemplateCard,
        ResultCard,
        BingoView,
        TitleLogo
    },

    methods: {
        goToBingoPage: function(bingo:Bingo):void{
            this.$router.push(`/yome/game/${bingo.id}`);
        }
  },
});
</script>
<style scoped>

</style>