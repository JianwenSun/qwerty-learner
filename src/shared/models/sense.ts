import { PosType } from "./pos";
import { Sound } from "./sound";

export interface Sense {
    id: string;
    word_id: string;
    pos: PosType;
    //中文翻译
    content_cn: string;
    //英文
    content: string;
    sound: Sound;
    updated_at: string;
    created_at: string;
}