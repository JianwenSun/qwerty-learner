import { PracticeType } from "../storage/entity/practiceEntity";

export interface Practice {
    id: string;
    sort: number;
    type: PracticeType;
    content: string;
    content_cn: string;
    phonetic_uk: string;
    phonetic_us: string;
    sound_id: string;
}