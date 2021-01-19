import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "../Bingo.ts";

Vue.use(Vuex);

interface State {
  bingo: Bingo
}

export default new Vuex.Store({
state: {
    bingo: null
} as State,
mutations: {
    setBingoData (state:State,bingo:Bingo) {
        state.bingo = bingo;
        localStorage.setItem('mainBingo', JSON.stringify(bingo));
    },
    saveBingoData (state:State) {
      console.log('save');
      console.log( JSON.stringify(state.bingo) )
      localStorage.setItem('mainBingo', JSON.stringify(state.bingo));
    }
},
actions: {
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    if(strage_bingo){
      let bingo = Bingo.createByJson(strage_bingo);
      bingo.checkBingo();
      context.commit('setBingoData',bingo);
    }else{
      console.log('sinki');
      context.commit('setBingoData',Bingo.createNew(3,true));
    }
  },
  // saveBingo (context) {
  //   localStorage.setItem('mainBingo', bingo);
  // },
},
})