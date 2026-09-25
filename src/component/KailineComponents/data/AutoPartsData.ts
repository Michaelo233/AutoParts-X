import type { AutoPart } from '../types/AutoParts';

function AutoPartsData(): AutoPart[] {
    const autoParts = [
        {
            objectId: 1,
            UserId: "1",
            PartName: "Engine Block",
            description: "High-performance engine block for your vehicle",
            location: "123 Main St, Winnipeg, Canada",
            contactNumber: "555-1234",
            condition: "New",
            year: 2020,
            price: 1200.00,
            imageUrl: "./images/engine_block.jpg",
            isActive: true
        },
        {
            objectId: 2,
            UserId: "3",
            PartName: "Transmission",
            description: "Reliable transmission for your car",
            location: "456 Oak Ave, Winnipeg, Canada",
            contactNumber: "555-5678",
            condition: "Used",
            year: 2019,
            price: 800.00,
            imageUrl: "./images/Transmission.jpg",
            isActive: true
        },
        {
            objectId: 3,
            UserId: "1",
            PartName: "Brake Pads",
            description: "Durable brake pads for safe driving",
            location: "789 Elm St, Winnipeg, Canada",
            contactNumber: "555-9012",
            condition: "New",
            year: 2021,
            price: 150.00,
            imageUrl: "./images/brake_pads.jpg",
            isActive: true
        }
    ];
    return autoParts;
}

export default AutoPartsData;