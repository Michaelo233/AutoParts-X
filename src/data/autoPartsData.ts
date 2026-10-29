type AutoPartItem = {
  partId: number;
  imageUrl: string;
  partName: string;
  price: number;
  description: string;
};

type Auto = {
  Category: string;
  AutoPart: AutoPartItem[];
};

const autoPartsData: Auto[] = [
  {
    Category: 'Engine',
    AutoPart: [
      {
        partId: 1,
        imageUrl: '',
        partName: 'Engine Block',
        price: 2500,
        description: 'Sample engine part for previewing the catalog page.',
      },
    ],
  },
  {
    Category: 'Brakes',
    AutoPart: [
      {
        partId: 2,
        imageUrl: '',
        partName: 'Brake Pads',
        price: 150,
        description: 'Sample brake part for previewing the catalog page.',
      },
    ],
  },
];

export default autoPartsData;
