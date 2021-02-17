import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo} from "@lib/bingo/Bingo";
import {user_setting,UserSettingState} from './modules/user_setting'
import {user,UserState} from './modules/user'
import {archives , ArchivesState} from './modules/archives'
import {yome , YomeState} from './modules/yome'
import {User} from "@lib/bingo/user";
import Templates from "@lib/db/templates";

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  templates: Bingo[]
  // modules
  user: UserState,
  archives: ArchivesState,
  user_setting: UserSettingState,
  yome: YomeState
}

export default new Vuex.Store({
state: {
    bingo: null
} as State,
modules: {
  user_setting,
  user,
  archives,
  yome
},
mutations: {
    setBingoData (state:State,bingo:Bingo) {
      state.bingo = bingo;
      localStorage.setItem('mainBingo', JSON.stringify(bingo.serialized));
    },
    removeBingoData (state:State){
      state.bingo = null;
      localStorage.setItem('mainBingo', null);
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
      localStorage.setItem('mainBingo', JSON.stringify(state.bingo.serialized));
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
    context.commit("user_setting/loadFromStrage");
    context.commit("yome/loadFromStrage");
  },

}
})