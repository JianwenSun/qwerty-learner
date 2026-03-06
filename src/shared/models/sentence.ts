import { Chapter } from "./chapter";
import { Chunk } from "./chunk";
import { Clause } from "./clause";
import { Dictionary } from "./dictionary";
import { Practice } from "./practice";
import { Sound } from "./sound";
import { Word } from "./word";

export interface Sentence {
    id: string;
    dictionary_id: string;
    chapter_id: string;
    content: string;
    content_cn: string;
    explanation: string;
    //句子中所有word的聚合 (复合单词不会拆分)
    words: string[];
    chunks: Chunk[];
    clauses: Clause[];
    sound_id: string;
}

export interface SentenceDetail {
    id: string;
    dictionary: Dictionary;
    chapter: Chapter;
    content: string;
    content_cn: string;
    explanation: string;
    //句子中所有word的聚合 (复合单词不会拆分)
    words: Word[];
    chunks: Chunk[];
    clauses: Clause[];
    practices: Practice[];
    sound: Sound;
}

export interface SentenceClause {
    index: number;
    type: string;
    explanation: string;
    chunkIndexes: number[];
}