export class Tag{
    constructor(public id:number,public title:string){
    }
    static tags:Array<Tag> = [
        new Tag(1,"こども"),
        new Tag(2,"きんじょ"),
        new Tag(3,"いきもの"),
        new Tag(4,"ひと"),
    ]
}

export class Content{

    constructor(public id:number,public title:string,public caption:string){
    }
    static IMG_HOST:string = 'https://img.bin5.xyz/public/img/'
    public get img_src(){
        return  `${Content.IMG_HOST}contents/${('00'+this.id).slice(-3)}.png`
    }
    static contents:Array<Content> = [
            new Content(1,      
            'ねこ','いつものばしょにいるかも'),
            new Content(2,
            'ポスト','ゆうびんきょくのまえにはある'),
            new Content(3,
            'とけい','こうえんにあるかな'),
            new Content(4,
            'あかいはな','きれい'),
            new Content(5,
            'からす','そらをとんでるかも'),
            new Content(6,
            'きいろいはな','きれい'),
            new Content(7,
            'つき','おそらのどこかにみえるかな'),
            new Content(8,
            'パイロン','どうろにおいてあるかも'),
            new Content(9,
            'いぬ','さんぽしていないかな'),
            new Content(10,
            'ちょうちょ','はなのちかくにいるよ'),
            new Content(11,
            'あり','じめんをよくみてね'),
            new Content(12,
            'あおいくるま','きをつけてみつけよう'),
            new Content(13,
            '７のもじ','どこにあるかな'),
            new Content(14,
            'あかいくるま','めだつ'),
            new Content(15,
            'だんごむし','いしのしたにいるかも'),
            new Content(16,
            'しんごう','どうろをさがそう'),
            new Content(17,
            'じはんき','じどうはんばいき'),
            new Content(18,
            'はと','ふんにちゅうい'),
            new Content(19,
            'むしくいば','あながあいているよ'),
            new Content(20,
            'ぼうし','おしゃれなひとをさがそう'),
            new Content(21,
            'じてんしゃ','かっこいい'),
            new Content(22,
            'けいトラ','トラック'),
            new Content(23,
            'ふたり','ふたりであるいているひとをさがそう'),
            new Content(24,'きのみ','こうえんにあるかな'),
            new Content(25,'ベンチ','こうえんにあるかな'),
            new Content(26,'マンホール','したをむいてさがそう'),
            new Content(27,'あおいやね','どんないえがあるかな'),
            new Content(28,'あかいやね','めだついえがあるかな'),
            new Content(29,'あおいふく','きているひといるかな'),
            new Content(30,'あかいふく','ちゅういしてさがしてみよう'),
            new Content(31,'みどりふく','おしゃれなひといるかな'),
            new Content(32,'くものす','よくみないと、みつからないかも'),
            new Content(33,'どうぞう','えきまえや、こうえんにあるかな'),
            new Content(34,'ひこうき','そらをさがしてみよう'),
            new Content(35,'あかちゃん','だっこしていたり、ベビーカーにのっているかも'),

    ];

    static get blank():Content{
        return new Content(0,
            'blank','caption'
        );
    }
    
    static random_arr(n:number):Array<Content>{
        let contents:Array<Content> = Content.contents.concat()
        for(let i=contents.length-1;i>0;i--){
            let id = Math.floor( Math.random() * (i+1) );
            let tmp = contents[i];
            contents[i] = contents[id];
            contents[id] = tmp;
            if(contents.length-i >= n) break;
        }
        return contents.reverse().slice(0,n);
    }

    static get random():Content{
        let id = Math.floor( Math.random() * (Content.contents.length-1) );
        return this.contents[id];
    }
    static createById(id:number):Content{
        return Content.contents[id-1];
        // return new Content(obj.id,obj.title,obj.caption);
    }
}