export interface Auto {
  Category: string;
  AutoPart: AutoPart[];
}

export interface AutoPart {
  partId: number;
  imageUrl: string;
  partName: string;
  price: number;
  description: string;
  isFavourite?: boolean;
  location?: string;
  contactNumber?: string;
  condition?: string;
  year?: number;
  isActive?: boolean;
  className?: string;
}

export interface AutoPartSearchResult {
  partId: number;
  imageUrl: string;
  partName: string;
  price: number;
}