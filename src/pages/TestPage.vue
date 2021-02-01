<template>
<div>
    <Header></Header>
        <FreeContents :size="120"></FreeContents>
        <button @click="show_modal=!show_modal">OPEN</button>
        <TestModal v-if="show_modal" @close="show_modal=false"></TestModal>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import TestModal from "@organisms/TestModal.vue";
import FreeContents from "@atoms/FreeContents.vue";

export type DataType ={
    show_modal: boolean
}

export default Vue.extend({
    data: function(){
        return {
            show_modal: false,
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    created(){
    },

    components: {
        Header,
        Footer,
        FreeContents,
        TestModal
    },

    methods: {

  },
});
</script>
<style scoped>

</style>