export class Content{
    constructor(public img_src:string, public title:string){
    }
    static contents:Array<Content> = [
            new Content("https://1.bp.blogspot.com/-tVeC6En4e_E/X96mhDTzJNI/AAAAAAABdBo/jlD_jvZvMuk3qUcNjA_XORrA4w3lhPkdQCNcBGAsYHQ/s1048/onepiece01_luffy.png",'るふぃ'),
            new Content("https://1.bp.blogspot.com/-bNh-4a2vMgQ/X-pbWfo-WAI/AAAAAAABdJg/_0JEspd7OQYZ8uigJTkvIbaFYSCwpUFtACNcBGAsYHQ/s1041/onepiece02_zoro_bandana.png",'ゾロ'),
            new Content("https://1.bp.blogspot.com/-2ut_UQv3iss/X-Fcs_0oAII/AAAAAAABdD8/jrCZTd_xK-Y6CP1KwOtT_LpEpjp-1nvxgCNcBGAsYHQ/s1055/onepiece03_nami.png",'ナミ'),
            new Content("https://1.bp.blogspot.com/-KMz-sPtLOvY/X-Fcs3XzIqI/AAAAAAABdEA/5UtiBymBA2YDEIGaaw8TB-IZzciE2KZ7wCNcBGAsYHQ/s1025/onepiece04_usopp_sogeking.png",'ウソップ'),
            new Content("https://1.bp.blogspot.com/-HPG_x7XPky8/X-FctLTLkKI/AAAAAAABdEE/xs4T8m0FiBAFptXHGQhQ2c9ZmVWtaeQSgCNcBGAsYHQ/s1028/onepiece05_sanji.png",'サンジ'),
            new Content("https://1.bp.blogspot.com/--9Rl2O4BBN0/X-Fct8K5mqI/AAAAAAABdEI/yLOziAqJO34fwn73AolVP0e42A2h-ql1QCNcBGAsYHQ/s992/onepiece06_chopper.png",'チョッパー'),
            new Content("https://1.bp.blogspot.com/-JiNpsjnPn7g/X-FcuWcU37I/AAAAAAABdEQ/P5r3wBMTRegjl7njCk4zWBkdoay44-T2gCNcBGAsYHQ/s1151/onepiece07_robin.png",'ロビン'),
            new Content("https://1.bp.blogspot.com/-H8YBA_SpxGs/X-Fcu75hh_I/AAAAAAABdEU/WRKUa03ypYor3TwvhziHAnSEcTN4Noq0gCNcBGAsYHQ/s1148/onepiece08_franky.png",'フランキー'),
            new Content("https://1.bp.blogspot.com/-KZ0MJgiPJHo/X__CLeY-zVI/AAAAAAABdNM/HnFYqUe0VQEzCWCqyMggibpk4kBRtFCpQCNcBGAsYHQ/s1102/onepiece09_brook.png",'がいこつ'),
            new Content("https://1.bp.blogspot.com/-vIXZ3_KMn9g/X-FcvVKPQSI/AAAAAAABdEc/i8oJKU0UDMM2uQfzemn6oOmJLICo4VcVgCNcBGAsYHQ/s1185/onepiece10_jinbe.png",'ジンベエ'),
        ];
    
    static get random():Content{
        let id = Math.floor( Math.random() * (10 - 1) );
        return this.contents[id];
    }
}