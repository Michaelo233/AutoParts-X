import type { Auto } from '../types/AutoParts';

const AutoPartsData: Auto[] = [
    {
        Category: "Engine",
        AutoPart: [
            {
                UserId: 3,
                imageUrl: "/images/engine_block.jpg",
                partId: 1,
                partName: "Engine Block",
                price: 1200.00,
                description: "High-performance engine block for your vehicle",
                isFavourite: false,
            }
        ]
    },

    {
        Category: "Transmission",
        AutoPart: [
            {
                UserId: 2,
                imageUrl: "/images/Transmission.jpg",
                partId: 2,
                partName: "Transmission",
                price: 800.00,
                description: "Reliable transmission for your car",
                isFavourite: false
            }
        ]
    },
    {
        Category: "Brake Pads",
        AutoPart: [
            {
                UserId: 1,
                imageUrl: "/images/brake_pads.jpg",
                partId: 3,
                partName: "Brake Pads",
                price: 150.00,
                description: "Durable brake pads for safe driving",
                isFavourite: false
            }
        ]
    }

];


export default AutoPartsData;
