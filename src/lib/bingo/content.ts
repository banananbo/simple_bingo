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

export interface Content{
    id:string;
    title:string;
    caption:string;
    ctype:string;
    img_src:string;
}

export class ContentBuilder{
    static getContentByObj(obj:any):Content{
        switch(obj.ctype){
            case AContent.content_type:
                return new AContent(obj.content_id);
            case BlankContent.content_type:
                return BlankContent.instance;
            case MitsuketaContent.content_type:
                return MitsuketaContent.getById(obj.content_id)
            default:
                return MitsuketaContent.getById(obj.content_id)
        }
    }
}

export class AContent implements Content{
    static content_type:string = "amazon"
    constructor(public id:string){
    }
    public title="-"
    public caption="-"
    public ctype=AContent.content_type
    public img_src = `https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${this.id}&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=banananbo01-22&language=ja_JP`
}

export class BlankContent implements Content{
    static instance:BlankContent = new BlankContent();
    static content_type:string = "blank"
    public id="0"
    public title="-"
    public caption="-"
    public ctype = "blank"
    public img_src="https://custom-net.co.jp/test2019/wp-content/themes/affinger5/images/no-img.png"
}

export class MitsuketaContent implements Content{
    static content_type:string = "mitsuketa"
    public ctype:string = MitsuketaContent.content_type
    public id:string = "";
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

    constructor(public _id:number,public title_ja:string,public caption_ja:string,public title_en:string, public caption_en:string){
        this.id = _id.toString();
    }
    
    static IMG_HOST:string = 'https://bin5.xyz/img/'
    public get img_src(){
        return  `${MitsuketaContent.IMG_HOST}contents/${('00'+this.id).slice(-3)}.png`
    }

    static BLANK:MitsuketaContent = new MitsuketaContent(0,'なし','','',"");

    static getById(id:string){
        let index:number = Number(id)-1
        return MitsuketaContent.contents[index]
    }

    static contents:Array<Content> = [
            new MitsuketaContent(1,      
            'ねこ','いつものばしょにいるかも','CAT',"Let's find a place where its are always"),
            new MitsuketaContent(2,
            'ポスト','ゆうびんきょくのまえにはある','POST',"Let's look in front of the post office"),
            new MitsuketaContent(3,
            'とけい','こうえんにあるかな','CLOCK','Tend to be in the park'),
            new MitsuketaContent(4,
            'あかいはな','きれい',"RED FLOWER",""),
            new MitsuketaContent(5,
            'からす','そらをとんでるかも',"CROW",""),
            new MitsuketaContent(6,
            'きいろいはな','きれい',"YELLOW FLOWER",""),
            new MitsuketaContent(7,
            'つき','おそらのどこかにみえるかな',"MOON",""),
            new MitsuketaContent(8,
            'パイロン','どうろにおいてあるかも',"PYLON",""),
            new MitsuketaContent(9,
            'いぬ','さんぽしていないかな',"DOG",""),
            new MitsuketaContent(10,
            'ちょうちょ','はなのちかくにいるよ',"BUTTERFLY",""),
            new MitsuketaContent(11,
            'あり','じめんをよくみてね',"ANT",""),
            new MitsuketaContent(12,
            'あおいくるま','きをつけてみつけよう',"BLUE CAR",""),
            new MitsuketaContent(13,
            '７のもじ','どこにあるかな',"LETTER 7","Let`s find letter 7"),
            new MitsuketaContent(14,
            'あかいくるま','めだつ',"RED CAR",""),
            new MitsuketaContent(15,
            'だんごむし','いしのしたにいるかも',"Rory Poly","Let's look under the stone"),
            new MitsuketaContent(16,
            'しんごう','どうろをさがそう',"SIGNAL",""),
            new MitsuketaContent(17,
            'じはんき','じどうはんばいき',"VENDING MACHINE",""),
            new MitsuketaContent(18,
            'はと','ふんにちゅうい',"PIGEON",""),
            new MitsuketaContent(19,
            'むしくいば','あながあいているよ',"Leaf eaten by worm",""),
            new MitsuketaContent(20,
            'ぼうし','おしゃれなひとをさがそう',"hat",""),
            new MitsuketaContent(21,
            'じてんしゃ','かっこいい',"BICYCLE",""),
            new MitsuketaContent(22,
            'けいトラ','トラック',"SMALL TRUCK",""),
            new MitsuketaContent(23,
            'ふたり','ふたりであるいているひとをさがそう',"COUPLE",""),
            new MitsuketaContent(24,'きのみ','こうえんにあるかな',"NUTS",""),
            new MitsuketaContent(25,'ベンチ','こうえんにあるかな',"BENTCH",""),
            new MitsuketaContent(26,'マンホール','したをむいてさがそう',"MANHOLE",""),
            new MitsuketaContent(27,'あおいやね','どんないえがあるかな',"BLUE ROOF",""),
            new MitsuketaContent(28,'あかいやね','めだついえがあるかな',"RED ROOF",""),
            new MitsuketaContent(29,'あおいふく','きているひといるかな',"BLUE CLOTHES",""),
            new MitsuketaContent(30,'あかいふく','ちゅういしてさがしてみよう',"RED CLOTHES",""),
            new MitsuketaContent(31,'みどりふく','おしゃれなひといるかな',"GREEN CLOTHES",""),
            new MitsuketaContent(32,'くものす','よくみないと、みつからないかも',"SPIDERWEB",""),
            new MitsuketaContent(33,'どうぞう','えきまえや、こうえんにあるかな',"BRONZE STATUE",""),
            new MitsuketaContent(34,'ひこうき','そらをさがしてみよう',"AIRPLANE",""),
            new MitsuketaContent(35,'あかちゃん','だっこしていたり、ベビーカーにのっているかも',"BABY","He/She may be kidnapped or in a stroller"),
            new MitsuketaContent(36,'みがなるき','よくみると、みがなっている',"Fruiting tree",""),
            new MitsuketaContent(37,'おまわりさん','',"Policeman",""),
            new MitsuketaContent(38,'コンビニ','',"Convenience store",""),
            new MitsuketaContent(39,'パトカー','',"Police car",""),
            new MitsuketaContent(40,'おうだんほどう','',"Crosswalk",""),
            new MitsuketaContent(41,'はいしゃ','',"Dental clinic",""),
            new MitsuketaContent(42,'みずたまり','',"Puddle",""),
            new MitsuketaContent(43,'とりい','',"torii",""),
            new MitsuketaContent(44,'でんちゅう','',"Utility pole",""),
    ];

    static get blank():Content{
        return new MitsuketaContent(0,
            'blank','caption',"",""
        );
    }
    
    static random_arr(n:number):Array<Content>{
        let contents:Array<Content> = MitsuketaContent.contents.concat()
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
        let id = Math.floor( Math.random() * (MitsuketaContent.contents.length-1) );
        return this.contents[id];
    }
}