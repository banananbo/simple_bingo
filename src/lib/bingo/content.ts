import store from '@src/store/index';

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

    public get title():string{
        if(store.state.user_setting.lang_contents =='ja') return this.title_ja;
        if(store.state.user_setting.lang_contents =='en') return this.title_en;
        return "";
    }
    public get caption():string{
        if(store.state.user_setting.lang_contents =='ja') return this.caption_ja;
        if(store.state.user_setting.lang_contents =='en') return this.caption_en;
        return "";
    }

    constructor(public id:number,public title_ja:string,public caption_ja:string,public title_en:string, public caption_en:string){
    }
    static IMG_HOST:string = '/img/'
    public get img_src(){
        return  `${Content.IMG_HOST}contents/${('00'+this.id).slice(-3)}.png`
    }
    static getById(id:number){
        return Content.contents[id-1]
    }
    static contents:Array<Content> = [
            new Content(1,      
            'ねこ','いつものばしょにいるかも','CAT',"Let's find a place where its are always"),
            new Content(2,
            'ポスト','ゆうびんきょくのまえにはある','POST',"Let's look in front of the post office"),
            new Content(3,
            'とけい','こうえんにあるかな','CLOCK','Tend to be in the park'),
            new Content(4,
            'あかいはな','きれい',"RED FLOWER",""),
            new Content(5,
            'からす','そらをとんでるかも',"CROW",""),
            new Content(6,
            'きいろいはな','きれい',"YELLOW FLOWER",""),
            new Content(7,
            'つき','おそらのどこかにみえるかな',"MOON",""),
            new Content(8,
            'パイロン','どうろにおいてあるかも',"PYLON",""),
            new Content(9,
            'いぬ','さんぽしていないかな',"DOG",""),
            new Content(10,
            'ちょうちょ','はなのちかくにいるよ',"BUTTERFLY",""),
            new Content(11,
            'あり','じめんをよくみてね',"ANT",""),
            new Content(12,
            'あおいくるま','きをつけてみつけよう',"BLUE CAR",""),
            new Content(13,
            '７のもじ','どこにあるかな',"LETTER 7","Let`s find letter 7"),
            new Content(14,
            'あかいくるま','めだつ',"RED CAR",""),
            new Content(15,
            'だんごむし','いしのしたにいるかも',"Rory Poly","Let's look under the stone"),
            new Content(16,
            'しんごう','どうろをさがそう',"SIGNAL",""),
            new Content(17,
            'じはんき','じどうはんばいき',"VENDING MACHINE",""),
            new Content(18,
            'はと','ふんにちゅうい',"PIGEON",""),
            new Content(19,
            'むしくいば','あながあいているよ',"Leaf eaten by worm",""),
            new Content(20,
            'ぼうし','おしゃれなひとをさがそう',"hat",""),
            new Content(21,
            'じてんしゃ','かっこいい',"BICYCLE",""),
            new Content(22,
            'けいトラ','トラック',"SMALL TRUCK",""),
            new Content(23,
            'ふたり','ふたりであるいているひとをさがそう',"COUPLE",""),
            new Content(24,'きのみ','こうえんにあるかな',"NUTS",""),
            new Content(25,'ベンチ','こうえんにあるかな',"BENTCH",""),
            new Content(26,'マンホール','したをむいてさがそう',"MANHOLE",""),
            new Content(27,'あおいやね','どんないえがあるかな',"BLUE ROOF",""),
            new Content(28,'あかいやね','めだついえがあるかな',"RED ROOF",""),
            new Content(29,'あおいふく','きているひといるかな',"BLUE CLOTHES",""),
            new Content(30,'あかいふく','ちゅういしてさがしてみよう',"RED CLOTHES",""),
            new Content(31,'みどりふく','おしゃれなひといるかな',"GREEN CLOTHES",""),
            new Content(32,'くものす','よくみないと、みつからないかも',"SPIDERWEB",""),
            new Content(33,'どうぞう','えきまえや、こうえんにあるかな',"BRONZE STATUE",""),
            new Content(34,'ひこうき','そらをさがしてみよう',"AIRPLANE",""),
            new Content(35,'あかちゃん','だっこしていたり、ベビーカーにのっているかも',"BABY","He/She may be kidnapped or in a stroller"),
            new Content(36,'みがなるき','よくみると、みがなっている',"Fruiting tree",""),
            new Content(37,'おまわりさん','',"Policeman",""),
            new Content(38,'コンビニ','',"Convenience store",""),
            new Content(39,'パトカー','',"Police car",""),
            new Content(40,'おうだんほどう','',"Crosswalk",""),
            new Content(41,'はいしゃ','',"Dental clinic",""),
            new Content(42,'みずたまり','',"Puddle",""),
            new Content(43,'とりい','',"torii",""),
            new Content(44,'でんちゅう','',"Utility pole",""),
    ];

    static get blank():Content{
        return new Content(0,
            'blank','caption',"",""
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
}