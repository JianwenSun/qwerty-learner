export interface Chunk {
    index: number;
    content: string;
    content_cn: string;
    function: string;
    wordIndexes: number[];
    grammarType: string;
    explanation: string;
    sound_id: string;
}