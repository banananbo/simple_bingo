<template>
<section>
    <button v-if="!this.$store.state.allow_location" @click="toggleSetting">場所情報OFF</button>
    <button v-if="this.$store.state.allow_location" @click="toggleSetting">場所情報ON</button>
</section>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
}

export default Vue.extend({

    data(): DataType {
        return {
        };
    },

    methods: {
        toggleSetting:function(){
            this.$store.state.allow_location = !this.$store.state.allow_location
        },
  },
});
</script>
<style scoped>

</style>