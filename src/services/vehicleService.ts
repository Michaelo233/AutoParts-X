
import { fetchVehicleModels } from "../repositories/vehicleRepository";
import type { VehicleModel } from "../types/vehice";

const CACHE_DURATION = 10 * 60 * 1000;

interface CacheEntry {
    models: VehicleModel[];
    expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<VehicleModel[]>>();

export async function getVehicleModels(
    make: string,
    year: number
): Promise<VehicleModel[]> {
    const normalizedMake = make.trim().toLowerCase();

    if (!normalizedMake) {
        throw new Error("Please select a vehicle manufacturer.");
    }

    if (
        !Number.isInteger(year) ||
        year < 1996 ||
        year > new Date().getFullYear() + 1
    ) {
        throw new Error("Please enter a valid vehicle year.");
    }

    const cacheKey = `${normalizedMake}:${year}`;
    const cached = cache.get(cacheKey);

    // Return cached data if it is still valid.
    if (cached && Date.now() < cached.expiresAt) {
        return cached.models;
    }

    // Reuse an existing request for the same vehicle.
    const pending = inFlight.get(cacheKey);

    if (pending) {
        return pending;
    }

    const request = fetchVehicleModels(normalizedMake, year)
        .then(models => {
            cache.set(cacheKey, {
                models,
                expiresAt: Date.now() + CACHE_DURATION,
            });

            return models;
        })
        .finally(() => {
            inFlight.delete(cacheKey);
        });

    inFlight.set(cacheKey, request);

    return request;
}
