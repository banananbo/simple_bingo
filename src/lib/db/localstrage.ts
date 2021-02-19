import {Bingo} from "@lib/bingo/Bingo";
import { YomeState} from '@src/store/modules/yome';

export class Strage{
    static saveYomeRecords(state:YomeState){
        let obj:object = {
            my_bingo_archives: state.my_bingo_archives.map((b:Bingo)=>b.serialized),
            my_bingo_templates: state.my_bingo_templates.map((b:Bingo)=>b.serialized)
          }
          localStorage.setItem('yome', JSON.stringify(obj));
    }

}