import Vue from "vue"
import {ExDate} from "@lib/func/ex_date.ts"

// export type DataType ={

// }

export default Vue.extend({
    name: "DateFunc",
    // data(): DataType {

    // },
    methods: {
        format_to_time:function(time:number){
            return ExDate.format_to_time(time);
        },
        format_to_date:function(time:number){
            return ExDate.format_to_date(time);
        }
  },
});