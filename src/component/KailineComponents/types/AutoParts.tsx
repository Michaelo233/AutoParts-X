

export interface Auto {
    imageUrl: string;
    partName: string;
    price: number;
    description: string;
    AutoPart: AutoPart[];
}

export interface AutoPart {
  objectId: number;
  UserId: string;
  location: string;
  contactNumber: string;
  condition: string;
  year: number;
  isActive: boolean;
  className?: string;
};