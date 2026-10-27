export interface Part {
  id?: number;
  partId: string;
  partName: string;
  partDescription: string;
  partPrice: number;
  partImage: string;
  userId?: number;
  userName?: string;
  description?: string;
  price?: number;
  isFavorite?: boolean;
  isForSale?: boolean;
}

export interface User {
  userId: number;
  userName: string;
  partsOwned: Part[];
}

export interface AddPartForm {
  userId: number;
  userName: string;
  onAddPart: (newPart: Part) => Promise<boolean>;
  onUserChanged?: (userName: string) => void;
  error?: string | null;
}

export interface SellToggle {
  partId: string;
  userName: string;
  isForSale: boolean;
  onToggleSale: (userName: string, partId: string, isForSale: boolean) => void;
}
