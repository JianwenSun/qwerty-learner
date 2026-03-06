import { Dictionary } from "./dictionary";

export interface Chapter {
    id: string;
    name: string;
    describe: string;
    dictionary_id: string;
}

export interface ChapterDetail {
    id: string;
    name: string;
    describe: string;
    dictionary: Dictionary;
}