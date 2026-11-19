
import {
    searchAerproVehicles,
    fetchCompatiblePartSkus,
    fetchAerproPart,
} from "../repositories/aerproRepository";

import type { AerproVehicle } from "../types/AerproVehicle";
import type { AerproPart } from "../types/AerproParts";

const CACHE_DURATION = 10 * 60 * 1000;

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

// Vehicle search cache
const vehicleCache =
    new Map<string, CacheEntry<AerproVehicle[]>>();

const vehicleInFlight =
    new Map<string, Promise<AerproVehicle[]>>();

// Compatible part SKU cache
const partsCache =
    new Map<string, CacheEntry<string[]>>();

const partsInFlight =
    new Map<string, Promise<string[]>>();

// Product details cache
const productCache =
    new Map<string, CacheEntry<AerproPart>>();

const productInFlight =
    new Map<string, Promise<AerproPart>>();

/**
 * Reusable caching function.
 *
 * - Stores successful responses for 10 minutes.
 * - Prevents duplicate simultaneous requests.
 * - Does not cache failed requests.
 */
function getCached<T>(
    key: string,
    cache: Map<string, CacheEntry<T>>,
    inFlight: Map<string, Promise<T>>,
    fetcher: () => Promise<T>
): Promise<T> {
    const cached = cache.get(key);

    if (cached && Date.now() < cached.expiresAt) {
        return Promise.resolve(cached.data);
    }

    const pending = inFlight.get(key);

    if (pending) {
        return pending;
    }

    const request = fetcher()
        .then(data => {
            cache.set(key, {
                data,
                expiresAt: Date.now() + CACHE_DURATION,
            });

            return data;
        })
        .finally(() => {
            inFlight.delete(key);
        });

    inFlight.set(key, request);

    return request;
}

/**
 * Search vehicles by manufacturer and model.
 *
 * Example: "Toyota 86"
 */
export function searchVehicles(
    searchTerm: string
): Promise<AerproVehicle[]> {
    const normalizedSearch = searchTerm
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

    if (normalizedSearch.length < 3) {
        return Promise.reject(
            new Error("Enter at least 3 characters.")
        );
    }

    return getCached(
        `vehicle:${normalizedSearch}`,
        vehicleCache,
        vehicleInFlight,
        () => searchAerproVehicles(normalizedSearch)
    );
}

/**
 * Find compatible part SKUs using an Aerpro vehicle ID.
 */
export function getCompatiblePartSkus(
    vehicleId: string
): Promise<string[]> {
    const normalizedId = vehicleId.trim();

    if (!normalizedId) {
        return Promise.reject(
            new Error("Please select a vehicle.")
        );
    }

    return getCached(
        `parts:${normalizedId}`,
        partsCache,
        partsInFlight,
        () => fetchCompatiblePartSkus(normalizedId)
    );
}

/**
 * Retrieve full product information including images.
 */
export function getAerproPart(
    sku: string
): Promise<AerproPart> {
    const normalizedSku = sku.trim().toUpperCase();

    if (!normalizedSku) {
        return Promise.reject(
            new Error("A product SKU is required.")
        );
    }

    return getCached(
        `product:${normalizedSku}`,
        productCache,
        productInFlight,
        () => fetchAerproPart(normalizedSku)
    );
}
