<template>
<div class="wrapper">
<div class="contents1">
<div class="contents2">
    <div class="title">ウォッチリストの条件設定（新規登録時）</div>
    <div class="scroll">
                    <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
                        <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃMOU</p>
            <p>どういうこっちゃ</p>
            <p>どういうこっちゃEND</p>
    </div><!-- /scroll -->
    <div class="fixed">
        <button class="button">OK</button>
        <button class="button">NG</button>
    </div>
</div>

</div></div>
</template>
<script lang="ts">
export default {
    
}
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
    height: 90vh;
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
    max-height: 80vh;
    padding: 16px;
    overflow-y: auto;
}
.fixed{
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
    padding: 16px;
    border-top: 1px solid #ccc;
    background: white;
}
</style>