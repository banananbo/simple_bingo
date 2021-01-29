<template>
    <transition :name="transition_name">
        <div v-if="show" :style='overlay_style' class="container-fluid text-center">
            <p :style="text_style">{{text}}</p>
        </div>
    </transition>
</template>
<script lang="ts">
import Vue from "vue"
import {i18n} from '@src/i18n.ts';

export type DataType ={
    overlay_color:string,
    text:string,
    text_style:Object,
    show:Boolean,
    transition_name:string
}

export default Vue.extend({
    data:function():DataType {
        return {
            overlay_color: "#FFF6",
            text: "よーい",
            text_style: {},
            show:false,
            transition_name:"fade"
        };
    },
    computed:{
        overlay_style():object{
            return {
                "height": this.height+"px",
                "width" : this.width+"px",
                "background-color" : this.overlay_color,
                "position" : "absolute",
                "z-index" : "1000"
            }
        }
    },
    
   methods: {
       ready(){
           this.overlay_color = "#9996";
           this.show = true;
           this.text = i18n.tc("noun.ready");
           this.transition_name = "fade";
           this.text_style = {
            "font-size":"5em",
            "text-align":"center",
            "line-height":"0.95em",
            "font-weight":"bold",
            "color": "#FFF",
            "text-shadow": "0 0 0.10em #2962FF,0 0 0.15em #2962FF,0 0 0.80em #2962FF,0 0 1.00em #2962FF",
            "display": "grid",
            "place-items": "center",
            "width":"100%",
            "height":"100%",
           }
           this.$store.state.bingo.once('start_game',this.start)
       },
       start(){
           this.text = i18n.tc("noun.go");
           this.removeAfterTime(300);
       },
       bingo(event_obj:any){
           this.overlay_color = "#0000";
           this.text = `${i18n.tc("noun.bingo")}!!`;
           this.transition_name = "bottom";
           if(event_obj.num == 2) this.text = `W${i18n.tc("noun.bingo")}!!`;
           if(event_obj.num > 2)  this.text = `${event_obj.num}${i18n.tc("noun.bingo")}!`;
           this.show = true;
           this.text_style = {
            "font-size":"5em",
            "text-align":"center",
            "line-height":"0.95em",
            "font-weight":"bold",
            "color": "#FFF",
            "text-shadow": "0 0 0.10em #2962FF,0 0 0.15em #2962FF,0 0 0.80em #2962FF,0 0 1.00em #2962FF",
            "display": "grid",
            "place-items": "center",
            "width":"100%",
            "height":"100%",
           }
           this.removeAfterTime(1000);
       },
       removeAfterTime(time:number,callback:Function=null){
        setTimeout( ()=>{this.show = false;console.log(callback);if(callback)callback()},time );
       },
       perfect(){
           this.overlay_color = "#0000";
           this.text = "PERFECT!";
           this.transition_name = "bottom";
           this.show = true;
           this.text_style = {
            "font-size":"5em",
            "text-align":"center",
            "line-height":"0.95em",
            "font-weight":"bold",
            "color": "#FFF",
            "text-shadow": "0 0 0.10em #2962FF,0 0 0.15em #2962FF,0 0 0.80em #2962FF,0 0 1.00em #2962FF",
            "display": "grid",
            "place-items": "center",
            "width":"100%",
            "height":"100%",
           }
           this.removeAfterTime(1000,()=>{ console.log('after'), this.$emit('afterPerfectAnime')});
       }
   },
    watch: {

    },

    props: {
        width: Number,
        height: Number,
    },

    created(){

    },

    mounted(){
        if(!this.$store.state.bingo.is_playing) this.ready();
        this.$store.state.bingo.on('bingo',this.bingo);
        this.$store.state.bingo.on( 'all_clear' ,this.perfect)
    },

    components: {

    },

});
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bottom-enter-active, .bottom-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.bottom-enter{
   transform: translateY(100vh) translateY(0px);
}

.bottom-leave-to {
   transform: translateY(-100vh) translateY(0px);
}
</style>