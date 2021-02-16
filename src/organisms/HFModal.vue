<template>
<div class="wrapper" @click.self="$emit('outclick')">
<div class="contents1" @click.self="$emit('outclick')">
<div class="contents2">
    <slot name="header"></slot>
    <div class="scroll">
        <slot></slot>
    </div><!-- /scroll -->
    <div class="fixed">
        <slot name="footer"></slot>
    </div>
</div>

</div></div>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({

});
</script>
<style lang="css" scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500000;
    width: 100%;
    height: 100vh;
    background: rgba(51, 51, 51, 0.8);
    display: table;
}
.contents1{
    display: table-cell;
    /* position: absolute; */
    vertical-align: middle;
    /* left: 50%; */
    
    /* -webkit-transform: translateX(-50%);
    transform: translateX(-50%); */
}
.contents2{
    width: 88%;
    height: 80vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    overflow: hidden;
    margin: 0px auto;
    /* padding: 20px 30px; */
}
.title{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding: 8px 16px;
    border-bottom: 1px solid #ccc;
    background: white;
    font-weight: bold;
    line-height: 1.2;
}
.scroll{
    max-height: 70vh;
    padding: 16px;
    overflow-y: auto;
}
.fixed{
    /* max-height: 10vh; */
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 5px;
    border-top: 1px solid #ccc;
    background: white;
}
</style>