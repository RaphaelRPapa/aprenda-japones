import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Trophy, BarChart3, Home, Play, CheckCircle, XCircle, Star, Volume2, Shuffle } from 'lucide-react';

// ============= DADOS =============

// Banco de palavras em Hiragana
const hiraganaWords = [
  { word: 'あい', romaji: 'ai', meaning: 'amor' },
  { word: 'あさ', romaji: 'asa', meaning: 'manhã' },
  { word: 'あき', romaji: 'aki', meaning: 'outono' },
  { word: 'あめ', romaji: 'ame', meaning: 'chuva/doce' },
  { word: 'いえ', romaji: 'ie', meaning: 'casa' },
  { word: 'いぬ', romaji: 'inu', meaning: 'cachorro' },
  { word: 'いし', romaji: 'ishi', meaning: 'pedra' },
  { word: 'うみ', romaji: 'umi', meaning: 'mar' },
  { word: 'うし', romaji: 'ushi', meaning: 'vaca' },
  { word: 'えき', romaji: 'eki', meaning: 'estação' },
  { word: 'おと', romaji: 'oto', meaning: 'som' },
  { word: 'かお', romaji: 'kao', meaning: 'rosto' },
  { word: 'かぎ', romaji: 'kagi', meaning: 'chave' },
  { word: 'きく', romaji: 'kiku', meaning: 'ouvir' },
  { word: 'くち', romaji: 'kuchi', meaning: 'boca' },
  { word: 'くつ', romaji: 'kutsu', meaning: 'sapato' },
  { word: 'ここ', romaji: 'koko', meaning: 'aqui' },
  { word: 'こえ', romaji: 'koe', meaning: 'voz' },
  { word: 'さけ', romaji: 'sake', meaning: 'saquê' },
  { word: 'さくら', romaji: 'sakura', meaning: 'cerejeira' },
  { word: 'した', romaji: 'shita', meaning: 'embaixo' },
  { word: 'しお', romaji: 'shio', meaning: 'sal' },
  { word: 'すし', romaji: 'sushi', meaning: 'sushi' },
  { word: 'そら', romaji: 'sora', meaning: 'céu' },
  { word: 'たべる', romaji: 'taberu', meaning: 'comer' },
  { word: 'ちず', romaji: 'chizu', meaning: 'mapa' },
  { word: 'つき', romaji: 'tsuki', meaning: 'lua' },
  { word: 'て', romaji: 'te', meaning: 'mão' },
  { word: 'とり', romaji: 'tori', meaning: 'pássaro' },
  { word: 'なまえ', romaji: 'namae', meaning: 'nome' },
  { word: 'なつ', romaji: 'natsu', meaning: 'verão' },
  { word: 'にく', romaji: 'niku', meaning: 'carne' },
  { word: 'ねこ', romaji: 'neko', meaning: 'gato' },
  { word: 'はな', romaji: 'hana', meaning: 'flor' },
  { word: 'ひと', romaji: 'hito', meaning: 'pessoa' },
  { word: 'ふゆ', romaji: 'fuyu', meaning: 'inverno' },
  { word: 'ほん', romaji: 'hon', meaning: 'livro' },
  { word: 'まち', romaji: 'machi', meaning: 'cidade' },
  { word: 'みず', romaji: 'mizu', meaning: 'água' },
  { word: 'やま', romaji: 'yama', meaning: 'montanha' }
];

// Banco de palavras em Katakana
const katakanaWords = [
  { word: 'アメリカ', romaji: 'amerika', meaning: 'América' },
  { word: 'イギリス', romaji: 'igirisu', meaning: 'Inglaterra' },
  { word: 'オレンジ', romaji: 'orenji', meaning: 'laranja' },
  { word: 'カメラ', romaji: 'kamera', meaning: 'câmera' },
  { word: 'カレー', romaji: 'karee', meaning: 'curry' },
  { word: 'ケーキ', romaji: 'keeki', meaning: 'bolo' },
  { word: 'コーヒー', romaji: 'koohii', meaning: 'café' },
  { word: 'ゲーム', romaji: 'geemu', meaning: 'jogo' },
  { word: 'ギター', romaji: 'gitaa', meaning: 'guitarra' },
  { word: 'サラダ', romaji: 'sarada', meaning: 'salada' },
  { word: 'シャツ', romaji: 'shatsu', meaning: 'camisa' },
  { word: 'スポーツ', romaji: 'supootsu', meaning: 'esporte' },
  { word: 'セーター', romaji: 'seetaa', meaning: 'suéter' },
  { word: 'ジュース', romaji: 'juusu', meaning: 'suco' },
  { word: 'タクシー', romaji: 'takushii', meaning: 'táxi' },
  { word: 'チーズ', romaji: 'chiizu', meaning: 'queijo' },
  { word: 'テレビ', romaji: 'terebi', meaning: 'televisão' },
  { word: 'トイレ', romaji: 'toire', meaning: 'banheiro' },
  { word: 'デパート', romaji: 'depaato', meaning: 'loja de departamentos' },
  { word: 'ドア', romaji: 'doa', meaning: 'porta' },
  { word: 'ナイフ', romaji: 'naifu', meaning: 'faca' },
  { word: 'ニュース', romaji: 'nyuusu', meaning: 'notícias' },
  { word: 'ノート', romaji: 'nooto', meaning: 'caderno' },
  { word: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'hambúrguer' },
  { word: 'フォーク', romaji: 'fooku', meaning: 'garfo' },
  { word: 'ホテル', romaji: 'hoteru', meaning: 'hotel' },
  { word: 'バス', romaji: 'basu', meaning: 'ônibus' },
  { word: 'ビール', romaji: 'biiru', meaning: 'cerveja' },
  { word: 'ベッド', romaji: 'beddo', meaning: 'cama' },
  { word: 'ボール', romaji: 'booru', meaning: 'bola' },
  { word: 'パン', romaji: 'pan', meaning: 'pão' },
  { word: 'ピアノ', romaji: 'piano', meaning: 'piano' },
  { word: 'プール', romaji: 'puuru', meaning: 'piscina' },
  { word: 'ペン', romaji: 'pen', meaning: 'caneta' },
  { word: 'ミルク', romaji: 'miruku', meaning: 'leite' },
  { word: 'メール', romaji: 'meeru', meaning: 'e-mail' },
  { word: 'ラジオ', romaji: 'rajio', meaning: 'rádio' },
  { word: 'レストラン', romaji: 'resutoran', meaning: 'restaurante' },
  { word: 'ワイン', romaji: 'wain', meaning: 'vinho' },
  { word: 'エアコン', romaji: 'eakon', meaning: 'ar condicionado' }
];

const hiraganaData = [
  { char: 'あ', romaji: 'a', group: 'vowels', examples: [
    { word: 'あい', romaji: 'ai', meaning: 'amor' },
    { word: 'あさ', romaji: 'asa', meaning: 'manhã' }
  ]},
  { char: 'い', romaji: 'i', group: 'vowels', examples: [
    { word: 'いえ', romaji: 'ie', meaning: 'casa' },
    { word: 'いぬ', romaji: 'inu', meaning: 'cachorro' }
  ]},
  { char: 'う', romaji: 'u', group: 'vowels', examples: [
    { word: 'うみ', romaji: 'umi', meaning: 'mar' },
    { word: 'うし', romaji: 'ushi', meaning: 'vaca' }
  ]},
  { char: 'え', romaji: 'e', group: 'vowels', examples: [
    { word: 'えき', romaji: 'eki', meaning: 'estação' },
    { word: 'えん', romaji: 'en', meaning: 'iene' }
  ]},
  { char: 'お', romaji: 'o', group: 'vowels', examples: [
    { word: 'おと', romaji: 'oto', meaning: 'som' },
    { word: 'おや', romaji: 'oya', meaning: 'pai' }
  ]},
  { char: 'か', romaji: 'ka', group: 'k', examples: [
    { word: 'かお', romaji: 'kao', meaning: 'rosto' },
    { word: 'かぎ', romaji: 'kagi', meaning: 'chave' }
  ]},
  { char: 'き', romaji: 'ki', group: 'k', examples: [
    { word: 'きく', romaji: 'kiku', meaning: 'ouvir' },
    { word: 'きた', romaji: 'kita', meaning: 'norte' }
  ]},
  { char: 'く', romaji: 'ku', group: 'k', examples: [
    { word: 'くち', romaji: 'kuchi', meaning: 'boca' },
    { word: 'くつ', romaji: 'kutsu', meaning: 'sapato' }
  ]},
  { char: 'け', romaji: 'ke', group: 'k', examples: [
    { word: 'けむり', romaji: 'kemuri', meaning: 'fumaça' },
    { word: 'けさ', romaji: 'kesa', meaning: 'esta manhã' }
  ]},
  { char: 'こ', romaji: 'ko', group: 'k', examples: [
    { word: 'ここ', romaji: 'koko', meaning: 'aqui' },
    { word: 'こえ', romaji: 'koe', meaning: 'voz' }
  ]},
  { char: 'が', romaji: 'ga', group: 'k', dakuten: true, examples: [
    { word: 'がっこう', romaji: 'gakkou', meaning: 'escola' }
  ]},
  { char: 'ぎ', romaji: 'gi', group: 'k', dakuten: true, examples: [
    { word: 'ぎんこう', romaji: 'ginkou', meaning: 'banco' }
  ]},
  { char: 'ぐ', romaji: 'gu', group: 'k', dakuten: true, examples: [
    { word: 'ぐあい', romaji: 'guai', meaning: 'condição' }
  ]},
  { char: 'げ', romaji: 'ge', group: 'k', dakuten: true, examples: [
    { word: 'げんき', romaji: 'genki', meaning: 'energia' }
  ]},
  { char: 'ご', romaji: 'go', group: 'k', dakuten: true, examples: [
    { word: 'ごはん', romaji: 'gohan', meaning: 'arroz/refeição' }
  ]},
  { char: 'さ', romaji: 'sa', group: 's', examples: [
    { word: 'さけ', romaji: 'sake', meaning: 'saquê' },
    { word: 'さくら', romaji: 'sakura', meaning: 'cerejeira' }
  ]},
  { char: 'し', romaji: 'shi', group: 's', examples: [
    { word: 'した', romaji: 'shita', meaning: 'embaixo' },
    { word: 'しお', romaji: 'shio', meaning: 'sal' }
  ]},
  { char: 'す', romaji: 'su', group: 's', examples: [
    { word: 'すし', romaji: 'sushi', meaning: 'sushi' },
    { word: 'すき', romaji: 'suki', meaning: 'gostar' }
  ]},
  { char: 'せ', romaji: 'se', group: 's', examples: [
    { word: 'せかい', romaji: 'sekai', meaning: 'mundo' },
    { word: 'せなか', romaji: 'senaka', meaning: 'costas' }
  ]},
  { char: 'そ', romaji: 'so', group: 's', examples: [
    { word: 'そら', romaji: 'sora', meaning: 'céu' },
    { word: 'そと', romaji: 'soto', meaning: 'fora' }
  ]},
  { char: 'ざ', romaji: 'za', group: 's', dakuten: true, examples: [
    { word: 'ざっし', romaji: 'zasshi', meaning: 'revista' }
  ]},
  { char: 'じ', romaji: 'ji', group: 's', dakuten: true, examples: [
    { word: 'じかん', romaji: 'jikan', meaning: 'tempo' }
  ]},
  { char: 'ず', romaji: 'zu', group: 's', dakuten: true, examples: [
    { word: 'ずっと', romaji: 'zutto', meaning: 'sempre' }
  ]},
  { char: 'ぜ', romaji: 'ze', group: 's', dakuten: true, examples: [
    { word: 'ぜんぶ', romaji: 'zenbu', meaning: 'tudo' }
  ]},
  { char: 'ぞ', romaji: 'zo', group: 's', dakuten: true, examples: [
    { word: 'ぞう', romaji: 'zou', meaning: 'elefante' }
  ]},
  { char: 'た', romaji: 'ta', group: 't', examples: [
    { word: 'たべる', romaji: 'taberu', meaning: 'comer' },
    { word: 'たかい', romaji: 'takai', meaning: 'alto/caro' }
  ]},
  { char: 'ち', romaji: 'chi', group: 't', examples: [
    { word: 'ちず', romaji: 'chizu', meaning: 'mapa' },
    { word: 'ちいさい', romaji: 'chiisai', meaning: 'pequeno' }
  ]},
  { char: 'つ', romaji: 'tsu', group: 't', examples: [
    { word: 'つき', romaji: 'tsuki', meaning: 'lua' },
    { word: 'つくえ', romaji: 'tsukue', meaning: 'mesa' }
  ]},
  { char: 'て', romaji: 'te', group: 't', examples: [
    { word: 'て', romaji: 'te', meaning: 'mão' },
    { word: 'てがみ', romaji: 'tegami', meaning: 'carta' }
  ]},
  { char: 'と', romaji: 'to', group: 't', examples: [
    { word: 'とり', romaji: 'tori', meaning: 'pássaro' },
    { word: 'ととけい', romaji: 'tokei', meaning: 'relógio' }
  ]},
  { char: 'だ', romaji: 'da', group: 't', dakuten: true, examples: [
    { word: 'だれ', romaji: 'dare', meaning: 'quem' }
  ]},
  { char: 'ぢ', romaji: 'ji', group: 't', dakuten: true },
  { char: 'づ', romaji: 'zu', group: 't', dakuten: true },
  { char: 'で', romaji: 'de', group: 't', dakuten: true, examples: [
    { word: 'でんわ', romaji: 'denwa', meaning: 'telefone' }
  ]},
  { char: 'ど', romaji: 'do', group: 't', dakuten: true, examples: [
    { word: 'どこ', romaji: 'doko', meaning: 'onde' }
  ]},
  { char: 'な', romaji: 'na', group: 'n', examples: [
    { word: 'なまえ', romaji: 'namae', meaning: 'nome' },
    { word: 'なつ', romaji: 'natsu', meaning: 'verão' }
  ]},
  { char: 'に', romaji: 'ni', group: 'n', examples: [
    { word: 'にく', romaji: 'niku', meaning: 'carne' },
    { word: 'にわ', romaji: 'niwa', meaning: 'jardim' }
  ]},
  { char: 'ぬ', romaji: 'nu', group: 'n', examples: [
    { word: 'ぬの', romaji: 'nuno', meaning: 'tecido' }
  ]},
  { char: 'ね', romaji: 'ne', group: 'n', examples: [
    { word: 'ねこ', romaji: 'neko', meaning: 'gato' },
    { word: 'ねる', romaji: 'neru', meaning: 'dormir' }
  ]},
  { char: 'の', romaji: 'no', group: 'n', examples: [
    { word: 'のむ', romaji: 'nomu', meaning: 'beber' }
  ]},
  { char: 'は', romaji: 'ha', group: 'h', examples: [
    { word: 'はな', romaji: 'hana', meaning: 'flor/nariz' },
    { word: 'はし', romaji: 'hashi', meaning: 'ponte/hashi' }
  ]},
  { char: 'ひ', romaji: 'hi', group: 'h', examples: [
    { word: 'ひと', romaji: 'hito', meaning: 'pessoa' },
    { word: 'ひ', romaji: 'hi', meaning: 'sol/dia' }
  ]},
  { char: 'ふ', romaji: 'fu', group: 'h', examples: [
    { word: 'ふゆ', romaji: 'fuyu', meaning: 'inverno' },
    { word: 'ふね', romaji: 'fune', meaning: 'barco' }
  ]},
  { char: 'へ', romaji: 'he', group: 'h', examples: [
    { word: 'へや', romaji: 'heya', meaning: 'quarto' }
  ]},
  { char: 'ほ', romaji: 'ho', group: 'h', examples: [
    { word: 'ほん', romaji: 'hon', meaning: 'livro' },
    { word: 'ほし', romaji: 'hoshi', meaning: 'estrela' }
  ]},
  { char: 'ば', romaji: 'ba', group: 'h', dakuten: true, examples: [
    { word: 'ばん', romaji: 'ban', meaning: 'noite' }
  ]},
  { char: 'び', romaji: 'bi', group: 'h', dakuten: true, examples: [
    { word: 'びじん', romaji: 'bijin', meaning: 'pessoa bonita' }
  ]},
  { char: 'ぶ', romaji: 'bu', group: 'h', dakuten: true, examples: [
    { word: 'ぶた', romaji: 'buta', meaning: 'porco' }
  ]},
  { char: 'べ', romaji: 'be', group: 'h', dakuten: true, examples: [
    { word: 'べんきょう', romaji: 'benkyou', meaning: 'estudo' }
  ]},
  { char: 'ぼ', romaji: 'bo', group: 'h', dakuten: true, examples: [
    { word: 'ぼく', romaji: 'boku', meaning: 'eu (masculino)' }
  ]},
  { char: 'ぱ', romaji: 'pa', group: 'h', handakuten: true, examples: [
    { word: 'ぱん', romaji: 'pan', meaning: 'pão' }
  ]},
  { char: 'ぴ', romaji: 'pi', group: 'h', handakuten: true },
  { char: 'ぷ', romaji: 'pu', group: 'h', handakuten: true },
  { char: 'ぺ', romaji: 'pe', group: 'h', handakuten: true },
  { char: 'ぽ', romaji: 'po', group: 'h', handakuten: true },
  { char: 'ま', romaji: 'ma', group: 'm', examples: [
    { word: 'まち', romaji: 'machi', meaning: 'cidade' },
    { word: 'まど', romaji: 'mado', meaning: 'janela' }
  ]},
  { char: 'み', romaji: 'mi', group: 'm', examples: [
    { word: 'みず', romaji: 'mizu', meaning: 'água' },
    { word: 'みち', romaji: 'michi', meaning: 'caminho' }
  ]},
  { char: 'む', romaji: 'mu', group: 'm', examples: [
    { word: 'むし', romaji: 'mushi', meaning: 'inseto' }
  ]},
  { char: 'め', romaji: 'me', group: 'm', examples: [
    { word: 'め', romaji: 'me', meaning: 'olho' }
  ]},
  { char: 'も', romaji: 'mo', group: 'm', examples: [
    { word: 'もの', romaji: 'mono', meaning: 'coisa' }
  ]},
  { char: 'や', romaji: 'ya', group: 'y', examples: [
    { word: 'やま', romaji: 'yama', meaning: 'montanha' },
    { word: 'やすい', romaji: 'yasui', meaning: 'barato' }
  ]},
  { char: 'ゆ', romaji: 'yu', group: 'y', examples: [
    { word: 'ゆき', romaji: 'yuki', meaning: 'neve' },
    { word: 'ゆめ', romaji: 'yume', meaning: 'sonho' }
  ]},
  { char: 'よ', romaji: 'yo', group: 'y', examples: [
    { word: 'よる', romaji: 'yoru', meaning: 'noite' }
  ]},
  { char: 'ら', romaji: 'ra', group: 'r', examples: [
    { word: 'らいねん', romaji: 'rainen', meaning: 'ano que vem' }
  ]},
  { char: 'り', romaji: 'ri', group: 'r', examples: [
    { word: 'りんご', romaji: 'ringo', meaning: 'maçã' }
  ]},
  { char: 'る', romaji: 'ru', group: 'r', examples: [
    { word: 'るす', romaji: 'rusu', meaning: 'ausente' }
  ]},
  { char: 'れ', romaji: 're', group: 'r', examples: [
    { word: 'れいぞうこ', romaji: 'reizouko', meaning: 'geladeira' }
  ]},
  { char: 'ろ', romaji: 'ro', group: 'r', examples: [
    { word: 'ろく', romaji: 'roku', meaning: 'seis' }
  ]},
  { char: 'わ', romaji: 'wa', group: 'w', examples: [
    { word: 'わたし', romaji: 'watashi', meaning: 'eu' }
  ]},
  { char: 'を', romaji: 'wo', group: 'w', examples: [
    { word: 'ほんを', romaji: 'hon wo', meaning: 'o livro (partícula)' }
  ]},
  { char: 'ん', romaji: 'n', group: 'n', examples: [
    { word: 'ほん', romaji: 'hon', meaning: 'livro' }
  ]}
];

const katakanaData = [
  { char: 'ア', romaji: 'a', group: 'vowels', examples: [
    { word: 'アメリカ', romaji: 'amerika', meaning: 'América' }
  ]},
  { char: 'イ', romaji: 'i', group: 'vowels', examples: [
    { word: 'イギリス', romaji: 'igirisu', meaning: 'Inglaterra' }
  ]},
  { char: 'ウ', romaji: 'u', group: 'vowels', examples: [
    { word: 'ウイスキー', romaji: 'uisukii', meaning: 'whisky' }
  ]},
  { char: 'エ', romaji: 'e', group: 'vowels', examples: [
    { word: 'エアコン', romaji: 'eakon', meaning: 'ar condicionado' }
  ]},
  { char: 'オ', romaji: 'o', group: 'vowels', examples: [
    { word: 'オレンジ', romaji: 'orenji', meaning: 'laranja' }
  ]},
  { char: 'カ', romaji: 'ka', group: 'k', examples: [
    { word: 'カメラ', romaji: 'kamera', meaning: 'câmera' },
    { word: 'カレー', romaji: 'karee', meaning: 'curry' }
  ]},
  { char: 'キ', romaji: 'ki', group: 'k', examples: [
    { word: 'キー', romaji: 'kii', meaning: 'chave' }
  ]},
  { char: 'ク', romaji: 'ku', group: 'k', examples: [
    { word: 'クラス', romaji: 'kurasu', meaning: 'classe' }
  ]},
  { char: 'ケ', romaji: 'ke', group: 'k', examples: [
    { word: 'ケーキ', romaji: 'keeki', meaning: 'bolo' }
  ]},
  { char: 'コ', romaji: 'ko', group: 'k', examples: [
    { word: 'コーヒー', romaji: 'koohii', meaning: 'café' }
  ]},
  { char: 'ガ', romaji: 'ga', group: 'k', dakuten: true, examples: [
    { word: 'ガソリン', romaji: 'gasorin', meaning: 'gasolina' }
  ]},
  { char: 'ギ', romaji: 'gi', group: 'k', dakuten: true, examples: [
    { word: 'ギター', romaji: 'gitaa', meaning: 'guitarra' }
  ]},
  { char: 'グ', romaji: 'gu', group: 'k', dakuten: true, examples: [
    { word: 'グループ', romaji: 'guruupu', meaning: 'grupo' }
  ]},
  { char: 'ゲ', romaji: 'ge', group: 'k', dakuten: true, examples: [
    { word: 'ゲーム', romaji: 'geemu', meaning: 'jogo' }
  ]},
  { char: 'ゴ', romaji: 'go', group: 'k', dakuten: true, examples: [
    { word: 'ゴール', romaji: 'gooru', meaning: 'gol' }
  ]},
  { char: 'サ', romaji: 'sa', group: 's', examples: [
    { word: 'サラダ', romaji: 'sarada', meaning: 'salada' }
  ]},
  { char: 'シ', romaji: 'shi', group: 's', examples: [
    { word: 'シャツ', romaji: 'shatsu', meaning: 'camisa' }
  ]},
  { char: 'ス', romaji: 'su', group: 's', examples: [
    { word: 'スポーツ', romaji: 'supootsu', meaning: 'esporte' }
  ]},
  { char: 'セ', romaji: 'se', group: 's', examples: [
    { word: 'セーター', romaji: 'seetaa', meaning: 'suéter' }
  ]},
  { char: 'ソ', romaji: 'so', group: 's', examples: [
    { word: 'ソース', romaji: 'soosu', meaning: 'molho' }
  ]},
  { char: 'ザ', romaji: 'za', group: 's', dakuten: true },
  { char: 'ジ', romaji: 'ji', group: 's', dakuten: true, examples: [
    { word: 'ジュース', romaji: 'juusu', meaning: 'suco' }
  ]},
  { char: 'ズ', romaji: 'zu', group: 's', dakuten: true },
  { char: 'ゼ', romaji: 'ze', group: 's', dakuten: true },
  { char: 'ゾ', romaji: 'zo', group: 's', dakuten: true },
  { char: 'タ', romaji: 'ta', group: 't', examples: [
    { word: 'タクシー', romaji: 'takushii', meaning: 'táxi' }
  ]},
  { char: 'チ', romaji: 'chi', group: 't', examples: [
    { word: 'チーズ', romaji: 'chiizu', meaning: 'queijo' }
  ]},
  { char: 'ツ', romaji: 'tsu', group: 't', examples: [
    { word: 'ツアー', romaji: 'tsuaa', meaning: 'tour' }
  ]},
  { char: 'テ', romaji: 'te', group: 't', examples: [
    { word: 'テレビ', romaji: 'terebi', meaning: 'televisão' }
  ]},
  { char: 'ト', romaji: 'to', group: 't', examples: [
    { word: 'トイレ', romaji: 'toire', meaning: 'banheiro' }
  ]},
  { char: 'ダ', romaji: 'da', group: 't', dakuten: true },
  { char: 'ヂ', romaji: 'ji', group: 't', dakuten: true },
  { char: 'ヅ', romaji: 'zu', group: 't', dakuten: true },
  { char: 'デ', romaji: 'de', group: 't', dakuten: true, examples: [
    { word: 'デパート', romaji: 'depaato', meaning: 'loja de departamentos' }
  ]},
  { char: 'ド', romaji: 'do', group: 't', dakuten: true, examples: [
    { word: 'ドア', romaji: 'doa', meaning: 'porta' }
  ]},
  { char: 'ナ', romaji: 'na', group: 'n', examples: [
    { word: 'ナイフ', romaji: 'naifu', meaning: 'faca' }
  ]},
  { char: 'ニ', romaji: 'ni', group: 'n', examples: [
    { word: 'ニュース', romaji: 'nyuusu', meaning: 'notícias' }
  ]},
  { char: 'ヌ', romaji: 'nu', group: 'n' },
  { char: 'ネ', romaji: 'ne', group: 'n', examples: [
    { word: 'ネクタイ', romaji: 'nekutai', meaning: 'gravata' }
  ]},
  { char: 'ノ', romaji: 'no', group: 'n', examples: [
    { word: 'ノート', romaji: 'nooto', meaning: 'caderno' }
  ]},
  { char: 'ハ', romaji: 'ha', group: 'h', examples: [
    { word: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'hambúrguer' }
  ]},
  { char: 'ヒ', romaji: 'hi', group: 'h', examples: [
    { word: 'ヒーター', romaji: 'hiitaa', meaning: 'aquecedor' }
  ]},
  { char: 'フ', romaji: 'fu', group: 'h', examples: [
    { word: 'フォーク', romaji: 'fooku', meaning: 'garfo' }
  ]},
  { char: 'ヘ', romaji: 'he', group: 'h' },
  { char: 'ホ', romaji: 'ho', group: 'h', examples: [
    { word: 'ホテル', romaji: 'hoteru', meaning: 'hotel' }
  ]},
  { char: 'バ', romaji: 'ba', group: 'h', dakuten: true, examples: [
    { word: 'バス', romaji: 'basu', meaning: 'ônibus' }
  ]},
  { char: 'ビ', romaji: 'bi', group: 'h', dakuten: true, examples: [
    { word: 'ビール', romaji: 'biiru', meaning: 'cerveja' }
  ]},
  { char: 'ブ', romaji: 'bu', group: 'h', dakuten: true, examples: [
    { word: 'ブーツ', romaji: 'buutsu', meaning: 'botas' }
  ]},
  { char: 'ベ', romaji: 'be', group: 'h', dakuten: true, examples: [
    { word: 'ベッド', romaji: 'beddo', meaning: 'cama' }
  ]},
  { char: 'ボ', romaji: 'bo', group: 'h', dakuten: true, examples: [
    { word: 'ボール', romaji: 'booru', meaning: 'bola' }
  ]},
  { char: 'パ', romaji: 'pa', group: 'h', handakuten: true, examples: [
    { word: 'パン', romaji: 'pan', meaning: 'pão' }
  ]},
  { char: 'ピ', romaji: 'pi', group: 'h', handakuten: true, examples: [
    { word: 'ピアノ', romaji: 'piano', meaning: 'piano' }
  ]},
  { char: 'プ', romaji: 'pu', group: 'h', handakuten: true, examples: [
    { word: 'プール', romaji: 'puuru', meaning: 'piscina' }
  ]},
  { char: 'ペ', romaji: 'pe', group: 'h', handakuten: true, examples: [
    { word: 'ペン', romaji: 'pen', meaning: 'caneta' }
  ]},
  { char: 'ポ', romaji: 'po', group: 'h', handakuten: true, examples: [
    { word: 'ポスト', romaji: 'posuto', meaning: 'caixa de correio' }
  ]},
  { char: 'マ', romaji: 'ma', group: 'm', examples: [
    { word: 'マンション', romaji: 'manshon', meaning: 'apartamento' }
  ]},
  { char: 'ミ', romaji: 'mi', group: 'm', examples: [
    { word: 'ミルク', romaji: 'miruku', meaning: 'leite' }
  ]},
  { char: 'ム', romaji: 'mu', group: 'm' },
  { char: 'メ', romaji: 'me', group: 'm', examples: [
    { word: 'メール', romaji: 'meeru', meaning: 'e-mail' }
  ]},
  { char: 'モ', romaji: 'mo', group: 'm' },
  { char: 'ヤ', romaji: 'ya', group: 'y' },
  { char: 'ユ', romaji: 'yu', group: 'y' },
  { char: 'ヨ', romaji: 'yo', group: 'y', examples: [
    { word: 'ヨーロッパ', romaji: 'yooroppa', meaning: 'Europa' }
  ]},
  { char: 'ラ', romaji: 'ra', group: 'r', examples: [
    { word: 'ラジオ', romaji: 'rajio', meaning: 'rádio' }
  ]},
  { char: 'リ', romaji: 'ri', group: 'r', examples: [
    { word: 'リンゴ', romaji: 'ringo', meaning: 'maçã' }
  ]},
  { char: 'ル', romaji: 'ru', group: 'r' },
  { char: 'レ', romaji: 're', group: 'r', examples: [
    { word: 'レストラン', romaji: 'resutoran', meaning: 'restaurante' }
  ]},
  { char: 'ロ', romaji: 'ro', group: 'r' },
  { char: 'ワ', romaji: 'wa', group: 'w', examples: [
    { word: 'ワイン', romaji: 'wain', meaning: 'vinho' }
  ]},
  { char: 'ヲ', romaji: 'wo', group: 'w' },
  { char: 'ン', romaji: 'n', group: 'n', examples: [
    { word: 'レモン', romaji: 'remon', meaning: 'limão' }
  ]}
];

const kanjiData = [
  { char: '一', romaji: 'ichi', meaning: 'um', reading: 'いち', examples: [
    { word: '一つ', romaji: 'hitotsu', meaning: 'um (contador)' }
  ]},
  { char: '二', romaji: 'ni', meaning: 'dois', reading: 'に', examples: [
    { word: '二つ', romaji: 'futatsu', meaning: 'dois (contador)' }
  ]},
  { char: '三', romaji: 'san', meaning: 'três', reading: 'さん', examples: [
    { word: '三つ', romaji: 'mittsu', meaning: 'três (contador)' }
  ]},
  { char: '四', romaji: 'shi/yon', meaning: 'quatro', reading: 'し/よん', examples: [
    { word: '四つ', romaji: 'yottsu', meaning: 'quatro (contador)' }
  ]},
  { char: '五', romaji: 'go', meaning: 'cinco', reading: 'ご', examples: [
    { word: '五つ', romaji: 'itsutsu', meaning: 'cinco (contador)' }
  ]},
  { char: '六', romaji: 'roku', meaning: 'seis', reading: 'ろく' },
  { char: '七', romaji: 'shichi/nana', meaning: 'sete', reading: 'しち/なな' },
  { char: '八', romaji: 'hachi', meaning: 'oito', reading: 'はち' },
  { char: '九', romaji: 'kyuu/ku', meaning: 'nove', reading: 'きゅう/く' },
  { char: '十', romaji: 'juu', meaning: 'dez', reading: 'じゅう' },
  { char: '日', romaji: 'nichi/hi', meaning: 'dia/sol', reading: 'にち/ひ', examples: [
    { word: '今日', romaji: 'kyou', meaning: 'hoje' }
  ]},
  { char: '月', romaji: 'getsu/tsuki', meaning: 'mês/lua', reading: 'げつ/つき', examples: [
    { word: '一月', romaji: 'ichigatsu', meaning: 'janeiro' }
  ]},
  { char: '火', romaji: 'ka/hi', meaning: 'fogo', reading: 'か/ひ', examples: [
    { word: '火曜日', romaji: 'kayoubi', meaning: 'terça-feira' }
  ]},
  { char: '水', romaji: 'sui/mizu', meaning: 'água', reading: 'すい/みず', examples: [
    { word: '水曜日', romaji: 'suiyoubi', meaning: 'quarta-feira' }
  ]},
  { char: '木', romaji: 'moku/ki', meaning: 'árvore', reading: 'もく/き', examples: [
    { word: '木曜日', romaji: 'mokuyoubi', meaning: 'quinta-feira' }
  ]},
  { char: '金', romaji: 'kin/kane', meaning: 'ouro/dinheiro', reading: 'きん/かね', examples: [
    { word: '金曜日', romaji: 'kinyoubi', meaning: 'sexta-feira' }
  ]},
  { char: '土', romaji: 'do/tsuchi', meaning: 'terra', reading: 'ど/つち', examples: [
    { word: '土曜日', romaji: 'doyoubi', meaning: 'sábado' }
  ]},
  { char: '人', romaji: 'jin/hito', meaning: 'pessoa', reading: 'じん/ひと', examples: [
    { word: '日本人', romaji: 'nihonjin', meaning: 'japonês (pessoa)' }
  ]},
  { char: '本', romaji: 'hon', meaning: 'livro/origem', reading: 'ほん', examples: [
    { word: '日本', romaji: 'nihon', meaning: 'Japão' }
  ]},
  { char: '大', romaji: 'dai/oo', meaning: 'grande', reading: 'だい/おお', examples: [
    { word: '大学', romaji: 'daigaku', meaning: 'universidade' }
  ]}
];

// Componente de Card de Palavra
const WordCard = ({ word, romaji, meaning, type, progress }) => {
  const wordKey = `word-${type}-${word}`;
  const wordProgress = progress[wordKey];
  const accuracy = wordProgress ? Math.round((wordProgress.correct / wordProgress.attempts) * 100) : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
      <div className="text-center">
        <div className="text-4xl font-bold mb-3 text-indigo-600">{word}</div>
        <div className="text-lg font-semibold text-gray-700 mb-1">{romaji}</div>
        <div className="text-sm text-gray-600">{meaning}</div>
        
        {wordProgress && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{wordProgress.attempts}×</span>
              <span>{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Card de Caractere
const CharacterCard = ({ char, romaji, meaning, reading, examples, type, progress }) => {
  const [showExamples, setShowExamples] = useState(false);
  const charKey = `${type}-${char}`;
  const charProgress = progress[charKey];
  const accuracy = charProgress ? Math.round((charProgress.correct / charProgress.attempts) * 100) : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
      <div className="text-center">
        <div className="text-5xl font-bold mb-3 text-indigo-600">{char}</div>
        <div className="text-xl font-semibold text-gray-700 mb-1">{romaji}</div>
        {meaning && <div className="text-sm text-gray-600 mb-2">{meaning}</div>}
        {reading && <div className="text-xs text-gray-500 mb-2">{reading}</div>}
        
        {charProgress && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{charProgress.attempts}×</span>
              <span>{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        )}

        {examples && examples.length > 0 && (
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            {showExamples ? '▲ Ocultar' : '▼ Ver exemplos'}
          </button>
        )}
      </div>

      {showExamples && examples && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
          {examples.map((ex, idx) => (
            <div key={idx} className="bg-indigo-50 p-2 rounded text-left">
              <div className="font-bold text-indigo-900">{ex.word}</div>
              <div className="text-xs text-gray-600">{ex.romaji}</div>
              <div className="text-xs text-gray-700">{ex.meaning}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente de Quiz
const QuizComponent = ({ selectedType, onExit, userProgress, saveProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizDirection, setQuizDirection] = useState('char-to-romaji');

  useEffect(() => {
    generateQuestion();
  }, [selectedType, quizDirection]);

  const getCurrentData = () => {
    switch (selectedType) {
      case 'hiragana': return hiraganaData;
      case 'katakana': return katakanaData;
      case 'kanji': return kanjiData;
      case 'hiragana-words': return hiraganaWords;
      case 'katakana-words': return katakanaWords;
      default: return hiraganaData;
    }
  };

  const isWordQuiz = selectedType.includes('words');

  const generateQuestion = () => {
    const data = getCurrentData();
    const randomItem = data[Math.floor(Math.random() * data.length)];
    
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrongItem = data[Math.floor(Math.random() * data.length)];
      let answer;
      
      if (isWordQuiz) {
        if (quizDirection === 'char-to-romaji') {
          answer = wrongItem.meaning;
        } else {
          answer = wrongItem.word;
        }
      } else {
        if (quizDirection === 'char-to-romaji') {
          answer = selectedType === 'kanji' ? wrongItem.meaning : wrongItem.romaji;
        } else {
          answer = wrongItem.char;
        }
      }
      
      const itemIdentifier = isWordQuiz ? wrongItem.word : wrongItem.char;
      const randomIdentifier = isWordQuiz ? randomItem.word : randomItem.char;
      
      if (itemIdentifier !== randomIdentifier && !wrongOptions.includes(answer)) {
        wrongOptions.push(answer);
      }
    }
    
    let correctAnswer, questionDisplay;
    if (isWordQuiz) {
      if (quizDirection === 'char-to-romaji') {
        questionDisplay = randomItem.word;
        correctAnswer = randomItem.meaning;
      } else {
        questionDisplay = randomItem.meaning;
        correctAnswer = randomItem.word;
      }
    } else {
      if (quizDirection === 'char-to-romaji') {
        questionDisplay = randomItem.char;
        correctAnswer = selectedType === 'kanji' ? randomItem.meaning : randomItem.romaji;
      } else {
        questionDisplay = selectedType === 'kanji' ? randomItem.meaning : randomItem.romaji;
        correctAnswer = randomItem.char;
      }
    }
    
    const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      item: randomItem,
      options,
      correctAnswer,
      questionDisplay
    });
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!userAnswer) return;
    
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    setFeedback({ correct: isCorrect, answer: currentQuestion.correctAnswer });
    
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);

    const itemKey = isWordQuiz 
      ? `word-${selectedType}-${currentQuestion.item.word}`
      : `${selectedType}-${currentQuestion.item.char}`;
    
    const newProgress = { ...userProgress };
    if (!newProgress[itemKey]) {
      newProgress[itemKey] = { attempts: 0, correct: 0, lastReview: Date.now() };
    }
    newProgress[itemKey].attempts += 1;
    if (isCorrect) newProgress[itemKey].correct += 1;
    newProgress[itemKey].lastReview = Date.now();
    
    saveProgress(newProgress);

    setTimeout(() => {
      generateQuestion();
    }, 2000);
  };

  const toggleDirection = () => {
    setQuizDirection(prev => 
      prev === 'char-to-romaji' ? 'romaji-to-char' : 'char-to-romaji'
    );
    setScore({ correct: 0, total: 0 });
  };

  const getQuizTitle = () => {
    switch(selectedType) {
      case 'hiragana': return 'Hiragana';
      case 'katakana': return 'Katakana';
      case 'kanji': return 'Kanji';
      case 'hiragana-words': return 'Palavras em Hiragana';
      case 'katakana-words': return 'Palavras em Katakana';
      default: return selectedType;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quiz de {getQuizTitle()}</h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">
              {score.correct}/{score.total}
            </div>
            <div className="text-sm text-gray-600">
              {score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : '0%'}
            </div>
          </div>
        </div>

        <button
          onClick={toggleDirection}
          className="w-full mb-6 bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Shuffle className="w-5 h-5" />
          Modo: {quizDirection === 'char-to-romaji' 
            ? (isWordQuiz ? 'Palavra → Significado' : 'Símbolo → Leitura')
            : (isWordQuiz ? 'Significado → Palavra' : 'Leitura → Símbolo')
          }
        </button>

        {currentQuestion && (
          <div>
            <div className="text-center mb-8">
              <div className={`font-bold mb-6 ${
                quizDirection === 'char-to-romaji' 
                  ? 'text-6xl text-indigo-600 animate-pulse' 
                  : 'text-3xl text-gray-700'
              }`}>
                {currentQuestion.questionDisplay}
              </div>
              <p className="text-xl text-gray-700">
                {quizDirection === 'char-to-romaji' 
                  ? (isWordQuiz ? 'Qual é o significado?' : selectedType === 'kanji' ? 'Qual é o significado?' : 'Como se lê?')
                  : (isWordQuiz ? 'Qual é a palavra?' : 'Qual é o símbolo?')
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-lg font-semibold transition-all ${
                    quizDirection === 'romaji-to-char' && !isWordQuiz ? 'text-4xl' : 'text-lg'
                  } ${
                    quizDirection === 'romaji-to-char' && isWordQuiz ? 'text-2xl' : ''
                  } ${
                    userAnswer === option
                      ? feedback
                        ? feedback.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-indigo-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${feedback && option === currentQuestion.correctAnswer ? 'ring-4 ring-green-400' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {!feedback && (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Verificar Resposta
              </button>
            )}

            {feedback && (
              <div className={`p-6 rounded-lg flex items-center gap-4 ${
                feedback.correct ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
              }`}>
                {feedback.correct ? (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold text-lg ${feedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {feedback.correct ? 'Correto!' : 'Incorreto!'}
                  </p>
                  {!feedback.correct && (
                    <p className="text-gray-700">
                      A resposta correta é: <span className={`font-bold ${
                        quizDirection === 'romaji-to-char' ? 'text-2xl' : ''
                      }`}>{feedback.answer}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={onExit}
              className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Voltar ao Estudo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Estatísticas
const StatsComponent = ({ userProgress, onStartQuiz }) => {
  const stats = Object.entries(userProgress).reduce((acc, [key, data]) => {
    const type = key.split('-')[0];
    if (!acc[type]) {
      acc[type] = { attempts: 0, correct: 0, total: 0 };
    }
    acc[type].attempts += data.attempts;
    acc[type].correct += data.correct;
    acc[type].total += 1;
    return acc;
  }, {});

  const getWeakCharacters = () => {
    return Object.entries(userProgress)
      .filter(([_, data]) => {
        const accuracy = data.attempts > 0 ? (data.correct / data.attempts) * 100 : 0;
        return accuracy < 60 && data.attempts >= 3;
      })
      .sort((a, b) => {
        const accA = a[1].correct / a[1].attempts;
        const accB = b[1].correct / b[1].attempts;
        return accA - accB;
      })
      .slice(0, 18);
  };

  const weakCharacters = getWeakCharacters();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Suas Estatísticas</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {['hiragana', 'katakana', 'kanji'].map(type => {
          const stat = stats[type] || { attempts: 0, correct: 0, total: 0 };
          const accuracy = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
          
          return (
            <div key={type} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{type}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Caracteres:</span>
                  <span className="font-bold text-indigo-600">{stat.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tentativas:</span>
                  <span className="font-bold text-indigo-600">{stat.attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Acertos:</span>
                  <span className="font-bold text-green-600">{accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Items que Precisam de Revisão</h3>
          <p className="text-sm text-gray-600 mb-4">Itens com menos de 60% de acertos</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {weakCharacters.map(([key, data]) => {
              const isWord = key.startsWith('word-');
              let displayData;
              
              if (isWord) {
                const parts = key.split('-');
                const wordType = parts[1] + '-' + parts[2];
                const wordText = parts.slice(3).join('-');
                displayData = wordType === 'hiragana-words' 
                  ? hiraganaWords.find(w => w.word === wordText)
                  : katakanaWords.find(w => w.word === wordText);
              } else {
                const [type, char] = key.split('-');
                displayData = type === 'hiragana' ? hiraganaData.find(c => c.char === char) :
                              type === 'katakana' ? katakanaData.find(c => c.char === char) :
                              kanjiData.find(c => c.char === char);
              }
              
              const accuracy = Math.round((data.correct / data.attempts) * 100);
              
              return displayData ? (
                <div key={key} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 text-center">
                  <div className={`font-bold text-gray-800 mb-1 ${isWord ? 'text-2xl' : 'text-4xl'}`}>
                    {isWord ? displayData.word : displayData.char}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {isWord ? displayData.meaning : displayData.romaji}
                  </div>
                  <div className="text-xs text-red-600 font-semibold">{accuracy}%</div>
                </div>
              ) : null;
            })}
          </div>
          {weakCharacters.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Excelente! Você não tem itens que precisam de revisão urgente.
            </p>
          )}
        </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 mt-8 text-white text-center">
        <Star className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Continue Praticando!</h3>
        <p className="text-indigo-100 mb-4">
          Você já praticou {Object.keys(userProgress).length} caracteres diferentes
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Fazer um Quiz Agora
        </button>
      </div>
    </div>
  );
};

// ============= COMPONENTE PRINCIPAL =============
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedType, setSelectedType] = useState('hiragana');
  const [quizMode, setQuizMode] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const result = await window.storage.get('user-progress');
      if (result) {
        setUserProgress(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('Primeiro acesso');
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress) => {
    try {
      await window.storage.set('user-progress', JSON.stringify(newProgress));
      setUserProgress(newProgress);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const getCurrentData = () => {
    switch (selectedType) {
      case 'hiragana': return hiraganaData;
      case 'katakana': return katakanaData;
      case 'kanji': return kanjiData;
      case 'hiragana-words': return hiraganaWords;
      case 'katakana-words': return katakanaWords;
      default: return hiraganaData;
    }
  };

  const isWordMode = selectedType.includes('words');

  const startQuiz = () => {
    setQuizMode(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              日本語を学ぼう
            </h1>
            <nav className="flex gap-4">
              <button
                onClick={() => { setCurrentPage('home'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'home' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Home className="w-5 h-5" />
                Início
              </button>
              <button
                onClick={() => { setCurrentPage('learn'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'learn' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Estudar
              </button>
              <button
                onClick={() => { setCurrentPage('stats'); setQuizMode(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === 'stats' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Estatísticas
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {quizMode ? (
          <QuizComponent 
            selectedType={selectedType}
            onExit={() => { setQuizMode(false); setCurrentPage('learn'); }}
            userProgress={userProgress}
            saveProgress={saveProgress}
          />
        ) : currentPage === 'home' ? (
          <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-indigo-600 mb-6">
              Aprenda Japonês
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Domine Hiragana, Katakana e Kanji com quizzes interativos bidirecionais
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('hiragana'); }}
                className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Hiragana</h2>
                <p className="text-pink-100">71 caracteres + exemplos</p>
              </button>
              
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('katakana'); }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Katakana</h2>
                <p className="text-blue-100">71 caracteres + exemplos</p>
              </button>
              
              <button
                onClick={() => { setCurrentPage('learn'); setSelectedType('kanji'); }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Kanji</h2>
                <p className="text-purple-100">20 kanjis básicos</p>
              </button>
            </div>

            <div className="mt-12 p-6 bg-indigo-50 rounded-2xl max-w-2xl mx-auto">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Seu Progresso</h3>
              <p className="text-indigo-700">
                {Object.keys(userProgress).length} caracteres praticados
              </p>
            </div>
          </div>
        ) : currentPage === 'learn' ? (
          <div>
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedType('hiragana')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'hiragana'
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Hiragana
                </button>
                <button
                  onClick={() => setSelectedType('hiragana-words')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'hiragana-words'
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Palavras ひらがな
                </button>
                <button
                  onClick={() => setSelectedType('katakana')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'katakana'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Katakana
                </button>
                <button
                  onClick={() => setSelectedType('katakana-words')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'katakana-words'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Palavras カタカナ
                </button>
                <button
                  onClick={() => setSelectedType('kanji')}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedType === 'kanji'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Kanji
                </button>
              </div>
              
              <button
                onClick={startQuiz}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Iniciar Quiz
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {isWordMode ? (
                getCurrentData().map((item, index) => (
                  <WordCard
                    key={index}
                    word={item.word}
                    romaji={item.romaji}
                    meaning={item.meaning}
                    type={selectedType}
                    progress={userProgress}
                  />
                ))
              ) : (
                getCurrentData().map((item, index) => (
                  <CharacterCard
                    key={index}
                    char={item.char}
                    romaji={item.romaji}
                    meaning={item.meaning}
                    reading={item.reading}
                    examples={item.examples}
                    type={selectedType}
                    progress={userProgress}
                  />
                ))
              )}
            </div>
          </div>
        ) : currentPage === 'stats' ? (
          <StatsComponent 
            userProgress={userProgress}
            onStartQuiz={() => { setCurrentPage('learn'); startQuiz(); }}
          />
        ) : null}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="mb-2">Sistema de Aprendizado de Japonês com Repetição Espaçada</p>
          <p className="text-sm">
            <span className="font-bold">頑張って!</span> (Ganbare! - Boa sorte!)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;