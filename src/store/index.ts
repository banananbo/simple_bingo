import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import {User} from "@lib/bingo/user.ts";
import firebase from "firebase"

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  user: User,
  my_bingo_archives: Array<Bingo>,
  recent_archives: Array<Bingo>,
}

export default new Vuex.Store({
state: {
    bingo: null,
    user: new User(),
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
      let database = firebase.database();
      let newPostRef  = database.ref('archives').push(JSON.parse(JSON.stringify(state.bingo)));
      let newid = newPostRef.key;
      state.bingo.id = newid;
      console.log("pushed"+newid);
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
      database.ref(room).orderByChild('_end_time').startAt(1).limitToLast(5)
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

          }
          state.recent_archives = list.reverse().map(o=> Bingo.createByObj(o));
          console.log(state.recent_archives );
      });
    }
    
},
actions: {
  doSaveFinished (context:any) {
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