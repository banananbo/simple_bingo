<template>
    <div :style='overlay_style' class="container-fluid text-center"></div>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
    overlay_color:string
}

export default Vue.extend({
    data(): DataType {
        return {
            overlay_color: "#9996"
        };
    },
    computed:{
        overlay_style():object{
            return {
                "height": this.width+"px",
                "width" : this.height+"px",
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

    },
    mounted(){
        // this.$store.state.bingo.checkBingo();
        // this.timerObj = setInterval(() => {
        //     if (this.$store.state.bingo.time==0) return;
        //     this.timer = (this as any).format_to_time(this.$store.state.bingo.current_time)
        //  }, 1000);
        //  this.$store.state.bingo.on( 'all_clear' ,()=>{ this.onClearBingo() } )

        //  console.log((this.$refs.bingoview as Element).clientWidth)
        //  console.log((this.$refs.bingoview as Element).clientHeight)
        //  console.log((this.$refs.bingoview as Element).clientTop)
        //  console.log((this.$refs.bingoview as Element).clientLeft)
        //  this.bingo_w = (this.$refs.bingoview as Element).clientWidth;
        //  this.bingo_h = (this.$refs.bingoview as Element).clientHeight;
    },


    components: {

    },

});
</script>
<style scoped>
</style>