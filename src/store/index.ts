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
},
actions: {
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    console.log(99);
    console.log(strage_bingo);
    let bingo = Bingo.createByJson(strage_bingo);
    console.log(bingo);
    console.log(100);
    if(strage_bingo) context.commit('setBingoData',bingo);
  },
  // saveBingo (context) {
  //   localStorage.setItem('mainBingo', bingo);
  // },
},
})