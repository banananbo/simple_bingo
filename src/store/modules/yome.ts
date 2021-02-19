import {Bingo} from "@lib/bingo/Bingo";
import {Strage} from "@lib/db/localstrage.ts";
import firebase from "firebase/app"
import rootStore from '../index';

export const yome = {
    namespaced: true,
    state: {
      tool_title: "よめよめビンゴ！",
      my_bingo_archives: [],
      my_bingo_templates: [],
    } as YomeState,

    mutations: {
      setTitle(state:YomeState, title:String){
        state.tool_title = title;
      },
      addToMyTemplate (state:YomeState, bingo:Bingo){
        state.my_bingo_templates.push(bingo);

        if(rootStore.state.user.user.is_guest){
          Strage.saveYomeRecords(state);
        }
      },

      addToMyArchives (state:YomeState, bingo:Bingo){
        state.my_bingo_archives.push(bingo);

        if(rootStore.state.user.user.is_guest){
          Strage.saveYomeRecords(state);
        }
      },

      saveRecords(state:YomeState){
        if(rootStore.state.user.user.is_guest){
          Strage.saveYomeRecords(state);
        }
      },

      loadFromStrage(state:YomeState){
        let json:string =localStorage.yome;
        if(json){
          let obj:any = JSON.parse(json);
          if(obj.my_bingo_archives) state.my_bingo_archives = obj.my_bingo_archives.map((b:object)=>Bingo.createByObj(b));
          if(obj.my_bingo_templates) state.my_bingo_templates = obj.my_bingo_templates.map((b:object)=>Bingo.createByObj(b));
        }
      }
    },
    actions: {

    }
}

export interface YomeState {
  tool_title:String,
  my_bingo_archives: Array<Bingo>,
  my_bingo_templates: Array<Bingo>,
}