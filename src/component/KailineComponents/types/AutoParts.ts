

export interface Auto {
    Category: string;
    AutoPart: AutoPart[];
}

export interface AutoPart {
    UserId?: number;
    partId: number;
    imageUrl: string;
    partName: string;
    price: number;
    description: string;
    isFavourite: boolean;
};

export interface AutoPartSearchResult {
    partId: number;
    imageUrl: string;
    partName: string;
    price: number;
};