export interface CarPart {
  partName: string
  partNumber: string
  price: number
  description: string
}

export interface CarListing {
  name: string
  carName: string
  year: number
  carParts: CarPart[]
}