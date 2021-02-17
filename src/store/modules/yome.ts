import {Bingo} from "@lib/bingo/Bingo";
import firebase from "firebase/app"
import rootStore from '../index';

export const yome = {
    namespaced: true,
    state: {
      my_bingo_archives: [],
      my_bingo_templates: []
    } as YomeState,

    mutations: {
      addToMyTemplate (state:YomeState, bingo:Bingo){
        state.my_bingo_templates.push(bingo);
        console.log(state.my_bingo_templates);

        let a = state.my_bingo_templates.map((b:Bingo)=> b.serialized );
        

        console.log("test");
        console.log(a);



        if(rootStore.state.user.user.is_guest){
          // ゲストの場合ローカルストレージに保存
          let obj:object = {
            my_bingo_archives: state.my_bingo_archives.map((b:Bingo)=>b.serialized),
            my_bingo_templates: state.my_bingo_templates.map((b:Bingo)=>b.serialized)
          }
          localStorage.setItem('yome', JSON.stringify(obj));
        }else{
          // ログインの場合はDB保存

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
  my_bingo_archives: Array<Bingo>,
  my_bingo_templates: Array<Bingo>,
}