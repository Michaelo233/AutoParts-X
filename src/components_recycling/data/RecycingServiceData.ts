import type { RecyclingService } from '../types/recycing';

export const recyclingServicesData: RecyclingService[] = [
    {
        id: 1,
        title: 'Vehicle Recycling',
        description: 'Recycling of old vehicles and their components.',
        acceptedMaterials: ['Door',
            'Auto Parts',
            'Motor Oil'],


    },
    {
        id: 2,
        title: 'Electronic Waste Recycling',
        description: 'Recycling of electronic devices and components.',
        acceptedMaterials: [
            'Circuit Boards',
            'Batteries',
            'Cables'],

    },
    {
        id: 3,
        title: 'Plastic Recycling',
        description: 'Recycling of plastic materials and products.',
        acceptedMaterials: [
            'Plastic Bottles',
            'Plastic Containers',
            'Plastic Packaging'],
    },
    {
        id: 4,
        title: 'Tire Recycling',
        description: 'Recycling of tire materials and products.',
        acceptedMaterials: [
            'Tires',
            'Tire Parts',
            'Rubber'],
    }

]
