import type { Auto } from '../types/AutoParts';

const AutoPartsData: Auto[] = [
    {
        imageUrl: "./images/engine_block.jpg",
        partName: "Engine Block",
        price: 1200.00,
        description: "High-performance engine block for your vehicle",
        AutoPart: [
            {
                objectId: 1,
                UserId: "1",
                location: "123 Main St, Winnipeg, Canada",
                contactNumber: "555-1234",
                condition: "New",
                year: 2020,
                isActive: true
            }
        ]
    },

    {
        imageUrl: "./images/transmission.jpg",
        partName: "Transmission",
        price: 800.00,
        description: "Reliable transmission for your car",
        AutoPart: [
            {
                objectId: 2,
                UserId: "3",
                location: "456 Oak Ave, Winnipeg, Canada",
                contactNumber: "555-5678",
                condition: "Used",
                year: 2019,
                isActive: true
            }
        ]
    },
    {
        imageUrl: "./images/brake_pads.jpg",
        partName: "Brake Pads",
        price: 150.00,
        description: "Durable brake pads for safe driving",
        AutoPart: [
            {
                objectId: 3,
                UserId: "1",
                location: "789 Elm St, Winnipeg, Canada",
                contactNumber: "555-9012",
                condition: "New",
                year: 2021,
                isActive: true
            }
        ]
    }

];


export default AutoPartsData;
