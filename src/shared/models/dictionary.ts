import { Category } from "./category";

export interface Dictionary {
    id: string;
    name: string;
    describe: string;
    image: string;
    category_id: string;
    status: number;
    created_at: number;
    chapter_num: number;
}

export interface DictionaryDetail {
    id: string;
    name: string;
    describe: string;
    image: string;
    category: Category;
    status: number;
    created_at: number;
    chapter_num: number;
}