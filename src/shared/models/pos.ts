/**
 * 词性枚举（PosType = Part of Speech Type）
 * 对齐 NLP/语言学通用词性标注体系，与 Python Enum 完全一致
 */
export enum PosType {
    /** 形容词（Adjective） */
    ADJ = "adj.",

    /** 介词（Adposition） */
    ADP = "prep.",

    /** 副词（Adverb） */
    ADV = "adv.",

    /** 助动词（Auxiliary Verb） */
    AUX = "aux.v.",

    /** 连词（Conjunction）- 通用 */
    CONJ = "conj.",

    /** 并列连词（Coordinating Conjunction） */
    CCONJ = "cc.",

    /** 冠词（Determiner） */
    DET = "det.",

    /** 感叹词（Interjection） */
    INTJ = "int.",

    /** 名词（Noun） */
    NOUN = "n.",

    /** 数词（Numeral） */
    NUM = "num.",

    /** 助词（Particle） */
    PART = "part.",

    /** 代词（Pronoun） */
    PRON = "pron.",

    /** 专有名词（Proper Noun） */
    PROPN = "prop.n.",

    /** 标点（Punctuation） */
    PUNCT = "punct.",

    /** 从属连词（Subordinating Conjunction） */
    SCONJ = "sc.",

    /** 符号（Symbol） */
    SYM = "sym.",

    /** 动词（Verb） */
    VERB = "v.",

    // 以下为新补充的细分类型
    /** 及物动词 (Verb, transitive) */
    VT = "vt.",

    /** 不及物动词 (Verb, intransitive) */
    VI = "vi.",

    /** 情态动词 (Modal Verb) */
    MODAL = "modal.v.",

    /** 限定词 (Determiner) - 对应 art. */
    ART = "art.",

    /** 短语 (Phrase) */
    PHRASE = "phrase.",

    /** 缩写 (Abbreviation) */
    ABBR = "abbr.",

    /** 其他（Other）- 兜底类型 */
    X = "x."
}


export const PosTypeMap: { [key: string]: string } = {
    'adj.': '形容词',
    'prep.': '介词',
    'adv.': '副词',
    'aux.v.': '助动词',
    'conj.': '连词',
    'cc.': '并列连词',
    'det.': '冠词',
    'int.': '感叹词',
    'n.': '名词',
    'num.': '数词',
    'part.': '助词',
    'pron.': '代词',
    'prop.n.': '专有名词',
    'punct.': '标点',
    'sc.': '从属连词',
    'sym.': '符号',
    'v.': '动词',
    'vt.': '及物动词',
    'vi.': '不及物动词',
    'modal.v.': '情态动词',
    'art.': '限定词',
    'phrase.': '短语',
    'abbr.': '缩写',
    'x.': '其他'
}