/**
 * 词性枚举（PosType = Part of Speech Type）
 * 对齐 NLP/语言学通用词性标注体系，与 Python Enum 完全一致
 */
export enum PosType {
    /** 形容词（Adjective） */
    ADJ = "形容词",
    /** 介词（Adposition） */
    ADP = "介词",
    /** 副词（Adverb） */
    ADV = "副词",
    /** 助动词（Auxiliary Verb） */
    AUX = "助动词",
    /** 连词（Conjunction）- 通用 */
    CONJ = "连词",
    /** 并列连词（Coordinating Conjunction） */
    CCONJ = "并列连词",
    /** 冠词（Determiner） */
    DET = "冠词",
    /** 感叹词（Interjection） */
    INTJ = "感叹词",
    /** 名词（Noun） */
    NOUN = "名词",
    /** 数词（Numeral） */
    NUM = "数词",
    /** 助词（Particle） */
    PART = "助词",
    /** 代词（Pronoun） */
    PRON = "代词",
    /** 专有名词（Proper Noun） */
    PROPN = "专有名词",
    /** 标点（Punctuation） */
    PUNCT = "标点",
    /** 从属连词（Subordinating Conjunction） */
    SCONJ = "从属连词",
    /** 符号（Symbol） */
    SYM = "符号",
    /** 动词（Verb） */
    VERB = "动词",
    /** 其他（Other）- 兜底类型 */
    X = "其他"
}