<template>
    <div :style='overlay_style' :class="[container-fluid,text-center]">
        <p :style="text_style">{{text}}</p>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
    overlay_color:string,
    text:string,
    text_style:Object
}

export default Vue.extend({
    data(): DataType {
        return {
            overlay_color: "#9996",
            text: "READY",
            text_style: {}
        };
    },
    computed:{
        overlay_style():object{
            return {
                "height": this.height+"px",
                "width" : this.width+"px",
                "background-color" : this.overlay_color,
                "position" : "absolute"
            }
        }
    },
    
    methods: {

   },
    watch: {

    },

    props: {
        width: Number,
        height: Number
    },

    created(){
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
    },
    mounted(){

    },


    components: {

    },

});
</script>
<style scoped>
.main_text {
	font-size:5em;
	text-align:center;
	line-height:0.95em;
	font-weight:bold;
	color: transparent;
	background: repeating-linear-gradient(45deg,
		#E60012 0.1em 0.2em,
		#F39800 0.2em 0.3em,
		#FFF100 0.3em 0.4em,
		#009944 0.4em 0.5em,
		#0068B7 0.5em 0.6em,
		#1D2088 0.7em 0.8em,
		#CFA7CD 0.8em 0.9em);
	-webkit-background-clip: text;
}
</style>