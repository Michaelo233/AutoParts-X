export interface Part {
  id: string;
  partId: string;
  partName: string;
  categoryId: string;
  partDescription: string;
  partPrice: number;
  partImage: string;
  userId?: string | number;
  userName?: string;
  description?: string;
  price?: number;
  isFavorite?: boolean;
  isForSale?: boolean;
}

export interface User {
  userId: string | number;
  userName: string;
  partsOwned: Part[];
}

export type NewPart = Omit<Part, "id">;

export interface AddPartForm {
  userId: string | number;
  userName: string;
  onAddPart: (newPart: Part) => Promise<boolean>;
  onUserChanged?: (userName: string) => void;
  error?: string | null;
}

export interface AddPartFormProps extends AddPartForm {}

export interface SellToggle {
  partId: string;
  userName: string;
  isForSale: boolean;
  onToggleSale: (userName: string, partId: string, isForSale: boolean) => void;
}
