export interface Part {
  id: string;
  partId: string;
  partName: string;
  categoryId: string;
  partDescription: string;
  partPrice: number;
  partImage: string;
  userId?: string;
  userName?: string;
  isFavorite?: boolean;
}

export interface User {
  userId: string;
  userName: string;
  partsOwned: Part[];
}

export type NewPart = Omit<Part, "id">;

// props interface here
export interface AddPartFormProps {
  userId: string;
  userName: string;
  onAddPart: (newPart: Part) => void;
}
