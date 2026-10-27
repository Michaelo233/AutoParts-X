export interface Part {
  id?: number;
  partId: string;
  partName: string;
  partDescription: string;
  partPrice: number;
  partImage: string;
  userId?: number;
  userName?: string;
}

export interface User {
  userId: number;
  userName: string;
  partsOwned: Part[];
}

// props interface here
export interface AddPartFormProps {
  userId: number;
  userName: string;
  onAddPart: (newPart: Part) => void;
}
