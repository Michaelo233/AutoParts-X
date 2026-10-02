import type { Auto } from '../types/autoParts';

const AutoPartsData: Auto[] = [
    {
        Category: "Engine",
        AutoPart: [
            {
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
