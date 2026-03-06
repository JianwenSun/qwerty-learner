// 定义发音接口
export interface Sound {
    audio_uk_name?: string;
    audio_uk_urls?: string[];
    audio_us_name?: string;
    audio_us_urls?: string[];
    ipa_uk?: string;
    ipa_us?: string;
    audio_def_cn_name?: string;
    audio_def_cn_url?: string;
}

// 定义音频接口
export interface Audio {
    name: string;
    url: string;
    urls: string[];
}

// 定义音频集合接口
export interface Audios {
    uk: Audio;
    uk_female: Audio;
    uk_male: Audio;
    us: Audio;
    us_female: Audio;
    us_male: Audio;
}

// 定义音频包接口
export interface AudioPack {
    audio_uk_female_name: string;
    audio_uk_female_urls: string[];
    audio_uk_male_name: string;
    audio_uk_male_urls: string[];
    audio_us_female_name: string;
    audio_us_female_urls: string[];
    audio_us_male_name: string;
    audio_us_male_urls: string[];
}

// 定义带音频包的示例接口
export interface Example {
    audio_pack: AudioPack;
    audio_uk_name: string;
    audio_uk_urls: string[];
    audio_us_name: string;
    audio_us_urls: string[];
    content_cn: string;
    content_en: string;
    content_en_v2: string;
    created_at: string;
    dictionary_id: string;
    id: string;
    image_urls: string[] | null;
    sense_id: string;
    source_id: string;
    updated_at: string;
    vocabulary_id: string;
}

// 定义示例接口
export interface Example {
    audios: Audios;
    content_cn: string;
    content_en: string;
    dictionary_id: string;
    dictionary_ids: string[];
    id: string;
    pos: string;
    sense_cn: string;
    sense_en: string;
    sense_frequency: number;
    sense_id: string;
    source_name: string;
    star: number;
    vocabulary_id: string;
    year: number;
}

export interface Examples {
    examples: Example[];
    vocab_id: string;
}

// 定义词汇接口
export interface Vocabulary {
    comment: string;
    created_at: string;
    id: string;
    ref_id: string;
    sound: Sound;
    status: number;
    updated_at: string;
    vocab_type: number;
    word: string;
    senses: Sense[];
    vocabulary_id: string;
    unit: string;
    word_count: number;
}

// 定义标签接口
export interface Tag {
    id: string;
    name: string;
}

// 定义书籍分类接口
export interface BookTab {
    id: string;
    name: string;
    tags: Tag[];
}

export interface Sense {
    created_at: string;
    definition_cn: string;
    definition_en: string;
    dictionary_id: string;
    ext_example_ids: string[];
    id: string;
    pos: string;
    sequence: number;
    sound: Sound;
    updated_at: string;
    vocabulary_id: string;
}

export interface Senses {
    comment: string;
    created_at: string;
    id: string;
    labels: number[];
    ref_id: string;
    senses: Sense[];
    sound: Sound;
    status: number;
    updated_at: string;
    vocab_type: number;
    vocabulary_id: string;
    word: string;
}

export interface Ext {
    audios: Audios;
    content_cn: string;
    content_en: string;
    dictionary_id: string;
    dictionary_ids: string[];
    id: string;
    pos: string;
    sense_cn: string;
    sense_en: string;
    sense_frequency: number;
    sense_id: string;
    source_name: string;
    star: number;
    vocabulary_id: string;
    year: number;
}

export interface Exts {
    examples: Ext[];
    vocab_id: string;
}

// 定义音标音频接口
export interface PhoneticAudio {
    ipa: string;
    name: string;
    urls: string[];
}

// 定义音频项接口
export interface AudioItem {
    sense_id: null;
    uk: PhoneticAudio;
    us: PhoneticAudio;
}

// 定义中文定义项接口
export interface ChineseDefinition {
    def: string;
    dict_id: string;
    pos: string;
    sense_id: string;
}

// 定义定义集合接口
export interface Definitions {
    cn: ChineseDefinition[];
    en: any[];
    en_v2: any[];
}

// 定义单词详情接口
export interface WordDetail {
    audios: AudioItem[];
    content: string;
    definitions: Definitions;
    id: string;
    id_int: string;
    ref_id: string;
    vocab_type: string;
}