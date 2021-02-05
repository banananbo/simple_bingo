<template>
      <transition name="modal">
        <div class="modal-mask" @click="cancel">
          <div class="modal-wrapper" >
            <div class="modal-container" @click="(event)=>{ event.stopPropagation(); }">  
              <div class="modal-body rounded">
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

                <div class='info_box'>
                  <h6>{{$t("lead.language_setting")}}</h6>

                  <label>{{$t("lead.game_lang")}}</label>
                  <ul>
                    <li>
                      <input type="radio" name="lang_contents" id="con_ja" value="ja" v-model="lang_contents">
                      <label for="con_ja">{{$t("noun.japanese")}}</label>
                    </li>
                    <li>
                    <input type="radio" name="lang_contents" id="con_en" value="en" v-model="lang_contents">
                      <label for="con_en">{{$t("noun.english")}}</label>
                    </li>
                  </ul>
                  <label>{{$t("lead.site_lang")}}</label>
                  <ul>
                    <li>
                    <input type="radio" name="lang_site" id="site_ja" value="ja" v-model="lang_site">
                      <label for="site_ja">{{$t("noun.japanese")}}</label>
                  </li>
                    <li>
                    <input type="radio" name="lang_site" id="site_en" value="en" v-model="lang_site">
                      <label for="site_en">{{$t("noun.english")}}</label>
                    </li>
                  </ul>
                </div>

                <div class='info_box'>
                  <!-- <label>{{$t("message.speech_mode")}}</label> -->
                  <input id="speech_mode" type="checkbox" v-model="speech_mode">
                  　<label for="speech_mode">{{$t("function.enable_speech_mode")}}</label>
                  </label>
                </div>

                <div class='info_box'>
                  <label>{{$t("message.about_location")}}</label>
                  <input id="allow_location" type="checkbox" v-model="allow_location">
                  　<label for="allow_location">{{$t("function.enable_locale")}}</label>
                  </label>
                </div>

                <button class="btn btn-primary" @click="cancel">{{$t("function.close")}}</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import {User} from "@lib/bingo/user";
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
      },
      speech_mode: {
        get():boolean{
          return this.$store.state.user_setting.speech_mode
        },
        set(value:boolean ){
          this.$store.commit('user_setting/setSpeechMode',value);
        }
      },
      lang_site: {
        get():boolean{
          return this.$store.state.user_setting.lang_site
        },
        set(value:boolean ){
          this.$store.commit('user_setting/setLangSite',value);
        }
      },
      lang_contents: {
        get():boolean{
          return this.$store.state.user_setting.lang_contents
        },
        set(value:boolean ){
          this.$store.commit('user_setting/setLangContents',value);
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
  margin: 5px;
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
  width: 100%;
  height: 100%;
}

.modal-container {
  width: 80%;
  height: 80%;
  margin: 0px auto;
  padding: 5px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  overflow: auto;
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