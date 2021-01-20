import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "../Bingo.ts";

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  my_bingo_archives: Array<Bingo>
}

export default new Vuex.Store({
state: {
    bingo: null,
    my_bingo_archives: []
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
    },
    addToBingoArchives (state:State,bingo:Bingo) {
      state.my_bingo_archives.unshift(bingo);
      localStorage.setItem('my_bingo_archives', JSON.stringify(state.my_bingo_archives));
    },
    initBingoArchives (state:State,bingos:Array<Bingo>) {
      state.my_bingo_archives = bingos;
    }
},
actions: {
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    if(strage_bingo == "null")  strage_bingo = null;
    if(strage_bingo){
      let bingo = Bingo.createByJson(strage_bingo);
      bingo.checkBingo();
      context.commit('setBingoData',bingo);
    }else{
      context.commit('setBingoData',Bingo.createNew(3,true));
    }

    let my_bingo_archives = localStorage.my_bingo_archives;
    if(my_bingo_archives){
      let my_bingo_archives_obj:Array<any> = JSON.parse(my_bingo_archives);
      let arr:Array<Bingo> = [];
      my_bingo_archives_obj.forEach( o => arr.push( Bingo.createByObj(o) ) )
      context.commit('initBingoArchives',arr);
    }
  },
  // saveBingo (context) {
  //   localStorage.setItem('mainBingo', bingo);
  // },
},
})