import type { RecyclingService } from '../types/recycing';

export const recyclingServicesData: RecyclingService[] = [
    {
        id: 1,
        name: 'Vehicle Recycling',
        description: 'Recycling of old vehicles and their components.',
        acceptedMaterials: ['Door',
            'Auto Parts',
            'Motor Oil'],


    },
    {
        id: 2,
        name: 'Electronic Waste Recycling',
        description: 'Recycling of electronic devices and components.',
        acceptedMaterials: [
            'Circuit Boards',
            'Batteries',
            'Cables'],

    },
    {
        id: 3,
        name: 'Automotive Battery Recycling',
        description: 'Recycling of automotive batteries and their components.',
        acceptedMaterials: [
            'Car Batteries',
            'Truck Batteries',
            'Marine Batteries'],
    },
    {
        id: 4,
        name: 'Tire Recycling',
        description: 'Recycling of tire materials and products.',
        acceptedMaterials: [
            'Tires',
            'Tire Parts',
            'Rubber'],
    }

]
