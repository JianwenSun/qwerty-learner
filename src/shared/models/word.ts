import { Sense } from "./sense";

export declare enum WordType {
    Word = "word",
    CompoundWord = "compound_word"
}

//最小单元 如: mother, mother's face-to-face
export interface Word {
    id: string;
    type: WordType;
    content: string;
    sense: string[];
}

export interface WordDetail {
    id: string;
    type: WordType;
    content: string;
    sense: Sense[];
}

export interface CompoundWord extends Word {
    members: string[];
}

export interface CompoundWordDetail extends WordDetail {
    members: Word[];
}