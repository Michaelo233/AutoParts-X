export interface AutoPart {
  id: number;
  name: string;
  category: string;
  price: number;
}

export const partsData: AutoPart[] = [
  {
    id: 1,
    name: "Brake Pads",
    category: "Brakes",
    price: 49.99,
  },
  {
    id: 2,
    name: "Oil Filter",
    category: "Engine",
    price: 14.99,
  },
  {
    id: 3,
    name: "Car Battery",
    category: "Electrical",
    price: 129.99,
  },
  {
    id: 4,
    name: "Windshield Wipers",
    category: "Exterior",
    price: 24.99,
  },
];