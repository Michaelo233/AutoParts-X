

export interface Auto {
    Name : string;
    AutoPart: AutoPart[];
}

export interface AutoPart {
    partId: number;
    imageUrl: string;
    partName: string;
    price: number;
    description: string;
    location: string;
    contactNumber: string;
    condition: string;
    year: number;
    isActive: boolean;
    className?: string;
};