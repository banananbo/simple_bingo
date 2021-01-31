<template>
    <MyModal @close="close">
        <template v-slot:body>
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
        </template>
    </MyModal>
</template>
<script lang="ts">
    import Vue from 'vue'
    import MyModal from "@organisms/MyModal.vue";

    export default Vue.extend({
    methods: {
      close(){
        console.log("lets close 2");
        this.$emit('close')
      }
    },
    components: {
        MyModal
    },
    })
</script>
<style scoped>
</style>