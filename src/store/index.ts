import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import firebase from "firebase"
import {user_setting} from './modules/user_setting.ts'
import {user,UserState} from './modules/user.ts'
import {archives , ArchivesState} from './modules/archives.ts'
import {User} from "@lib/bingo/user.ts";

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  // modules
  user: UserState,
  archives: ArchivesState
}

export default new Vuex.Store({
state: {
    bingo: null,
    
} as State,
modules: {
  user_setting,
  user,
  archives
},
mutations: {
    setBingoData (state:State,bingo:Bingo) {
        state.bingo = bingo;
        localStorage.setItem('mainBingo', JSON.stringify(bingo));
    },
    setBingoId (state:State,id:string) {
      state.bingo.id = id;
　　},
    updatePlayer (state:State,user:User){
      console.log("update player");
      if(state.bingo){
        console.log("update player2");
        state.bingo.setPlayer(user);
      }
    },
    saveBingoData (state:State) {
      console.log('save');
      localStorage.setItem('mainBingo', JSON.stringify(state.bingo));
    },

    discardPlayingGame (state:State){
       state.bingo = null;
       localStorage.removeItem('mainBingo');
    },

},
actions: {
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    if(strage_bingo == "null") strage_bingo = null;
    if(strage_bingo){
      let bingo = Bingo.createByJson(strage_bingo);
      bingo.checkBingo();
      context.commit('setBingoData',bingo);
    }

    let my_bingo_archives_local = localStorage.my_bingo_archives_local;
    if(my_bingo_archives_local){
      let my_bingo_archives_obj:Array<any> = JSON.parse(my_bingo_archives_local);
      let arr:Array<Bingo> = [];
      my_bingo_archives_obj.forEach( o => arr.push( Bingo.createByObj(o) ) )
      context.commit('archives/initBingoArchives_local',arr);
    }

    context.commit("user/loadLoginUser");
    context.commit('archives/loadRecentArchives');
    context.commit('archives/loadMyArchives');
    context.commit("user_setting/doLoad");
  },

}
})