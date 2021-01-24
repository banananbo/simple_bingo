export class Content{
    constructor(public id:number,public img_src:string, public title:string,public caption:string){
    }
    static contents:Array<Content> = [
            new Content(1,"https://banananbo.github.io/simple_bingo/public/img/contents/001.png",
            'ねこ','いつもの場所にいるかも'),
            new Content(2,"https://1.bp.blogspot.com/-bNh-4a2vMgQ/X-pbWfo-WAI/AAAAAAABdJg/_0JEspd7OQYZ8uigJTkvIbaFYSCwpUFtACNcBGAsYHQ/s1041/onepiece02_zoro_bandana.png",
            'ゾロ','caption'),
            new Content(3,"https://1.bp.blogspot.com/-2ut_UQv3iss/X-Fcs_0oAII/AAAAAAABdD8/jrCZTd_xK-Y6CP1KwOtT_LpEpjp-1nvxgCNcBGAsYHQ/s1055/onepiece03_nami.png",
            'ナミ','caption'),
            new Content(4,"https://1.bp.blogspot.com/-KMz-sPtLOvY/X-Fcs3XzIqI/AAAAAAABdEA/5UtiBymBA2YDEIGaaw8TB-IZzciE2KZ7wCNcBGAsYHQ/s1025/onepiece04_usopp_sogeking.png",
            'ウソップ','caption'),
            new Content(5,"https://1.bp.blogspot.com/-HPG_x7XPky8/X-FctLTLkKI/AAAAAAABdEE/xs4T8m0FiBAFptXHGQhQ2c9ZmVWtaeQSgCNcBGAsYHQ/s1028/onepiece05_sanji.png",
            'サンジ','caption'),
            new Content(6,"https://1.bp.blogspot.com/--9Rl2O4BBN0/X-Fct8K5mqI/AAAAAAABdEI/yLOziAqJO34fwn73AolVP0e42A2h-ql1QCNcBGAsYHQ/s992/onepiece06_chopper.png",
            'チョッパー','caption'),
            new Content(7,"https://1.bp.blogspot.com/-JiNpsjnPn7g/X-FcuWcU37I/AAAAAAABdEQ/P5r3wBMTRegjl7njCk4zWBkdoay44-T2gCNcBGAsYHQ/s1151/onepiece07_robin.png",
            'ロビン','caption'),
            new Content(8,"https://1.bp.blogspot.com/-H8YBA_SpxGs/X-Fcu75hh_I/AAAAAAABdEU/WRKUa03ypYor3TwvhziHAnSEcTN4Noq0gCNcBGAsYHQ/s1148/onepiece08_franky.png",
            'フランキー','caption'),
            new Content(9,"https://1.bp.blogspot.com/-KZ0MJgiPJHo/X__CLeY-zVI/AAAAAAABdNM/HnFYqUe0VQEzCWCqyMggibpk4kBRtFCpQCNcBGAsYHQ/s1102/onepiece09_brook.png",
            'がいこつ','caption'),
            new Content(10,"https://1.bp.blogspot.com/-vIXZ3_KMn9g/X-FcvVKPQSI/AAAAAAABdEc/i8oJKU0UDMM2uQfzemn6oOmJLICo4VcVgCNcBGAsYHQ/s1185/onepiece10_jinbe.png",
            'ジンベエ','caption'),
            new Content(11,"https://1.bp.blogspot.com/-XJ4izO61h5g/X-FcwW85RwI/AAAAAAABdEo/1qaHb2pwEvQehHV2ePis0QU8SpiIlqroQCNcBGAsYHQ/s1201/onepiece11_arlong2.png",
            'アーロン','caption'),
            new Content(12,"https://1.bp.blogspot.com/-pGLNjxN42lM/X-FcwLVGLwI/AAAAAAABdEk/_FEy4Cf-ZHElAoQeh8fFGCiMln4FDlF0QCNcBGAsYHQ/s1287/onepiece12_buggy.png",
            'バギー','caption'),
    ];

    static get blank():Content{
        return new Content(0,
            'https://h238net.com/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg',
            'blank','caption'
        );
    }
    
    static get random():Content{
        let id = Math.floor( Math.random() * (13 - 1) );
        return this.contents[id];
    }
    static createByObj(obj:any):Content{
        return new Content(obj.id,obj.img_src,obj.title,obj.caption);
    }
}