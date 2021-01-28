<template>
      <transition name="modal">
        <div class="modal-mask" @click="cancel">
          <div class="modal-wrapper" >
            <div class="modal-container" @click="(event)=>{ event.stopPropagation(); }">  
              <div class="modal-body rounded">
                <div v-if="user.is_guest">
                  <h5>ログインしていません</h5>
                  <p style='font-size: 0.8em'>
                    ログインなしでも、ビンゴを楽しむことができます。
                  </p>
                  <button class='btn' @click="login"><v-fa :icon="['fab', 'google']" /> Googleでログイン</button>
                  <button class='btn' @click="twlogin"><v-fa :icon="['fab', 'twitter']" /> Twitterでログイン</button>
                </div>
                <div v-else>
                        <h6>ログイン中</h6>
                        <img :src="user.image" height="30">
                        <span>{{ user.name}}</span>
                        <div>
                          <button class='btn' @click="logout"><v-fa icon="sign-out-alt" /> ログアウト</button>
                        </div>
      　        </div>
                <div class='info_box'>
                  <label>みつけた位置情報を記録するとさらに楽しめます。</label>
                  <input type="checkbox" v-model="allow_location">
                  　位置情報を取得する
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import {User} from "@lib/bingo/user.ts";
import firebase from "firebase"

export type DataType ={
    
}

export default Vue.extend({
    data:function():DataType {
        return {
        };
    },

    props: {
      user: User,
    },
    mounted(){
    },
    computed: {
      allow_location: {
        get():boolean{
          return this.$store.state.user_setting.allow_location
        },
        set(value:boolean ){
          this.$store.commit('user_setting/setAllowLocation',value);
        }
      }
    },

    components: {
    },

    methods: {
      cancel(){
        this.$emit('close')
      },
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
.btn{
  padding: 5px;
  border-width: 1em;
}
.inline-block {
    /* display: inline-block; */
    float: left;
}
.title {
  font-weight: bold;
  font-size: 0.8em;
  background: #a22a40;
  color:#fff;
  line-height: 1.4;
  margin-bottom: 2px;
  padding: 1px 2px;
  border-radius: 5px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.info_box {
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    color: #6091d3;/*文字色*/
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/
}
</style>