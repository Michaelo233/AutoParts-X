
export interface CatalogPart {
    partId: string;
    partName: string;
    categoryId: string;
    description: string;
    price: number;
    imageUrl: string;
    isFavourite: boolean;
}

export interface CatalogGroup {
    Category: string;
    AutoPart: CatalogPart[];
}

export type NewCatalogPart = Omit<CatalogPart, "partId">;
