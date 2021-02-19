<template>
    <div @click='select' :style="main_style">
     <img v-if="content" :class="{unabled: !enable}" :src="this.content.img_src" :height="img_size">
    </div>
</template>
<script lang="ts">
import Vue, { PropType }  from "vue"

import {Content} from "@lib/bingo/content"

export type DataType ={
    
}

export default Vue.extend({

    data:function():DataType {
        return {
        };
    },

    computed:{
        main_style:function():object{
            return {
                padding: `${this.padding}px`
            }
        },
        img_size:function():number{
            return this.size-this.padding*2;
        }
    },

    props: {
        size: {
            type: Number,
            required: true
        },
        padding: {
            type: Number,
            default: 5
        },
        enable: {
            type: Boolean,
            default: true,
            required: false
        },
        content: {
            type: Object as PropType<Content>,
            required: true
        },
    },

    created(){

    },

    mounted(){
    },

    methods: {
        select:function(){
            // speech test
            if(this.$store.state.user_setting.speech_mode) this.speech();

            if(!this.enable) return;
            this.$emit('onClick',{content:this.content});
        },
        speech:function(){
            let u = new SpeechSynthesisUtterance();
            u.lang = 'en-US';
            u.text = this.content.title;
            speechSynthesis.speak(u);
        }
  },
});
</script>
<style scoped>
img {
  pointer-events: none;
}
    .unabled{
        opacity: 0.3;
    }
</style>