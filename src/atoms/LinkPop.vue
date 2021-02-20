<template>
<div v-if="content" class="pop" :style="pop_style">
<a :href="content.link" target="_blank">amazonで詳細を見る</a>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {AContent} from "@lib/bingo/content.ts";

export type DataType ={
}

export default Vue.extend({
    data(): DataType {
        return {

        };
    },

    computed:{
        pop_style():Object{
            return {
              position: "absolute",
              top: `${this.popy}px`,
              left: `${this.popx}px`,
            }
        }
    },

    props: {
        content: {
            type: Object as Vue.PropType<AContent>,
            default: null
        },
        popx: {
            type: Number,
            default: 10
        },
        popy: {
            type: Number,
            default: 10
        },
    },

    methods: {
        // toggleSetting:function(){
        //     this.$store.state.allow_location = !this.$store.state.allow_location
        // },
    },
});
</script>
<style scoped>
.pop{
  position: relative;
  display: inline-block;
  margin: 1.5em 0;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
}
</style>