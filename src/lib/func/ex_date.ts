export class ExDate{
    static format_to_time(time:number):string{
        if(!time) return "-";
        return ("00"+Math.floor(time/3600000)).slice(-2)+":"+
        ("00"+Math.floor(time/60000)%60).slice(-2) +":"+
        ("00"+Math.floor(time/1000)%60).slice(-2);
    }
    static format_to_date(time:number):string{
        if(!time) return "-";
        const now = new Date(time);
        const year = now.getFullYear();
        const mon = now.getMonth()+1; //１を足すこと
        const day = now.getDate();
        const hour = now.getHours();
        const min = now.getMinutes();
    
        //出力用
        const s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分"; 
        return s; 
    }
}