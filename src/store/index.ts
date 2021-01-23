import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import firebase from "firebase"

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  my_bingo_archives: Array<Bingo>,
  recent_archives: Array<Bingo>
}

export default new Vuex.Store({
state: {
    bingo: null,
    my_bingo_archives: [],
    recent_archives: []
} as State,
mutations: {
    setBingoData (state:State,bingo:Bingo) {
        state.bingo = bingo;
        localStorage.setItem('mainBingo', JSON.stringify(bingo));
    },
    saveBingoData (state:State) {
      console.log('save');
      localStorage.setItem('mainBingo', JSON.stringify(state.bingo));
    },
    addToBingoArchives (state:State) {
      state.my_bingo_archives.unshift(state.bingo);
      localStorage.setItem('my_bingo_archives', JSON.stringify(state.my_bingo_archives));
    },
    addToBingoDBArchives (state:State) {
      console.log("pushing");
      state.my_bingo_archives.unshift(state.bingo);
      console.log("pushed");
      let database = firebase.database();
      database.ref('archives').push(JSON.parse(JSON.stringify(state.bingo)));
      console.log("pushed");
    },
    initBingoArchives (state:State,bingos:Array<Bingo>) {
      state.my_bingo_archives = bingos;
    },
    discardPlayingGame (state:State){
       state.bingo = null;
       localStorage.removeItem('mainBingo');
    },
    loadRecentArchives (state:State){
      var database = firebase.database();
      // let room = "test/-MRhbdOiK1QUEuSAauht";
      let room = "archives";
      let list:any[] = [];
      database.ref(room).orderByChild('_end_time').startAt(1).limitToFirst(2)
      .on("value", (data)=> {
          if (data) {
              const rootList = data.val();
              const key = data.key;
              
              // データオブジェクトを配列に変更する
              if(rootList != null) {
                  Object.keys(rootList).forEach((val, key) => {
                      rootList[val].id = val;
                      list.push(rootList[val]);
                  })
              }
              console.log("db no data");
            console.log(rootList);
            console.log(list);
          }
          state.recent_archives = list.map(o=> Bingo.createByObj(o));
          console.log(state.recent_archives );
      });
    }
    
},
actions: {
  doSave (context:any) {
      console.log("doda");
      context.commit('addToBingoArchives');
      context.commit('addToBingoDBArchives');
  },
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    if(strage_bingo == "null") strage_bingo = null;
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
    context.commit('loadRecentArchives');
  },
  // saveBingo (context) {
  //   localStorage.setItem('mainBingo', bingo);
  // },
},
})