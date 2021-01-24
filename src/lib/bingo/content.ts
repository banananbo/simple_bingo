export class Content{
    constructor(public id:number,public img_src:string, public title:string,public caption:string){
    }
    static contents:Array<Content> = [
            new Content(1,
                "https://banananbo.github.io/simple_bingo/public/img/contents/001.png",
            'ねこ','いつものばしょにいるかも'),
            new Content(2,
                "https://banananbo.github.io/simple_bingo/public/img/contents/002.png",
            'ポスト','ゆうびんきょくのまえにはある'),
            new Content(3,
                "https://banananbo.github.io/simple_bingo/public/img/contents/003.png",
            'とけい','こうえんにあるかな'),
            new Content(4,
                "https://banananbo.github.io/simple_bingo/public/img/contents/004.png",
            'あかいはな','きれい'),
            new Content(5,
                "https://banananbo.github.io/simple_bingo/public/img/contents/005.png",
            'からす','そらをとんでるかも'),
            new Content(6,
                "https://banananbo.github.io/simple_bingo/public/img/contents/006.png",
            'きいろいはな','きれい'),
            new Content(7,
                "https://banananbo.github.io/simple_bingo/public/img/contents/007.png",
            'つき','おそらのどこかにみえるかな'),
            new Content(8,
                "https://banananbo.github.io/simple_bingo/public/img/contents/008.png",
            'パイロン','どうろにおいてあるかも'),
            new Content(9,
                "https://banananbo.github.io/simple_bingo/public/img/contents/009.png",
            'いぬ','さんぽしていないかな'),
            new Content(10,
                "https://banananbo.github.io/simple_bingo/public/img/contents/010.png",
            'ちょうちょ','はなのちかくにいるよ'),
            new Content(11,
                "https://banananbo.github.io/simple_bingo/public/img/contents/011.png",
            'あり','じめんをよくみてね'),
            new Content(12,
                "https://banananbo.github.io/simple_bingo/public/img/contents/012.png",
            'あおいくるま','きをつけてみつけよう'),
            new Content(13,
                "https://banananbo.github.io/simple_bingo/public/img/contents/013.png",
            '７のもじ','どこにあるかな'),
            new Content(14,
                "https://banananbo.github.io/simple_bingo/public/img/contents/014.png",
            'あかいくるま','めだつ'),
            new Content(15,
                "https://banananbo.github.io/simple_bingo/public/img/contents/015.png",
            'だんごむし','いしのしたにいるかも'),
    ];

    static get blank():Content{
        return new Content(0,
            'https://h238net.com/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg',
            'blank','caption'
        );
    }
    
    static get random():Content{
        let id = Math.floor( Math.random() * (Content.contents.length-1) );
        return this.contents[id];
    }
    static createByObj(obj:any):Content{
        return new Content(obj.id,obj.img_src,obj.title,obj.caption);
    }
}