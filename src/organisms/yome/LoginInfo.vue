<template>
<div>
    <div v-if="user.is_guest">
        <h5>{{$t("message.not_logged_in")}}</h5>
        <p style='font-size: 0.8em'>
        {{$t("message.about_login")}}
        </p>
        <button class='btn' @click="login"><v-fa :icon="['fab', 'google']" /> Googleでログイン</button>
        <button class='btn' @click="twlogin"><v-fa :icon="['fab', 'twitter']" /> Twitterでログイン</button>
    </div>
    <div v-else>
            <h6>{{$t("message.logged_in")}}</h6>
            <img :src="user.image" height="30">
            <span>{{ user.name}}</span>
            <div>
                <button class='btn' @click="logout"><v-fa icon="sign-out-alt" /> {{$t("function.logout")}}</button>
            </div>
　  </div>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {User} from "@lib/bingo/user";
import firebase from "firebase/app"

export type DataType = {
}

export default Vue.extend({
    data: function(){
        return {
        } as DataType;
    },
    computed:{

    },

    props: {
        user: User,
    },
    created(){
    },

    components: {
    },

    methods: {
      login: function(){
            this.$store.dispatch('user/doLogin', new firebase.auth.GoogleAuthProvider());
      },
      logout: function(){
            this.$store.dispatch('user/doLogout');
      },
      twlogin: function(){
            this.$store.dispatch('user/doLogin',new firebase.auth.TwitterAuthProvider());
      },
  },
});
</script>
<style scoped>

</style>