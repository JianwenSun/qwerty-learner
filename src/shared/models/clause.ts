
export enum ClauseType {
    Simple = 'simple',
    Complex = 'complex',
}

export interface Clause {
    index: number;
    type: ClauseType;
    explanation: string;
    chunkIndexes: number[];
}
