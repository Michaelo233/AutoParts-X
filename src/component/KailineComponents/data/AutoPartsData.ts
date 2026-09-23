import type { AutoPart } from '../types/AutoParts';

function AutoPartsData(): AutoPart[] {
    const autoParts = [
        {
            id: 1,
            name: "Engine Block",
            description: "High-performance engine block for your vehicle",
            location: "123 Main St, Winnipeg, Canada",
            contactNumber: "555-1234",
            year: 2020,
            imageUrl: "./images/engine_block.jpg",
            isActive: true
        },
        {
            id: 2,
            name: "Transmission",
            description: "Reliable transmission for your car",
            location: "456 Oak Ave, Winnipeg, Canada",
            contactNumber: "555-5678",
            year: 2019,
            imageUrl: "./images/Transmission.jpg",
            isActive: true
        },
        {
            id: 3,
            name: "Brake Pads",
            description: "Durable brake pads for safe driving",
            location: "789 Elm St, Winnipeg, Canada",
            contactNumber: "555-9012",
            year: 2021,
            imageUrl: "./images/brake_pads.jpg",
            isActive: true
        }
    ];
    return autoParts;
}

export default AutoPartsData;