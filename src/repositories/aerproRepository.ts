
import type { AerproVehicle } from "../types/AerproVehicle";
import type { AerproPart } from "../types/AerproParts";

const BASE_URL = "https://aerpro.com/api";

/**
 * Shared helper for all Aerpro API requests.
 * Only the repository layer performs HTTP requests.
 */
async function getJson(url: string): Promise<unknown> {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error(
                "Too many API requests. Please try again later."
            );
        }

        throw new Error(
            `Aerpro API request failed (${response.status}).`
        );
    }

    return (await response.json()) as unknown;
}

function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

/**
 * Search vehicles by manufacturer and model.
 *
 * Example: "Ford Ranger", "Toyota 86"
 */
export async function searchAerproVehicles(
    searchTerm: string
): Promise<AerproVehicle[]> {
    const url =
        `${BASE_URL}/search/vehicles?search_term=` +
        encodeURIComponent(searchTerm);

    const data = await getJson(url);

    if (!Array.isArray(data)) {
        throw new Error("Invalid Aerpro vehicle response.");
    }

    return data
        .filter(isRecord)
        .filter(vehicle =>
            (typeof vehicle.id === "string" ||
                typeof vehicle.id === "number") &&
            typeof vehicle.title === "string"
        )
        .map(vehicle => ({
            id: String(vehicle.id),
            title: vehicle.title as string,
            image:
                typeof vehicle.image === "string"
                    ? vehicle.image
                    : "",
            url:
                typeof vehicle.url === "string"
                    ? vehicle.url
                    : "",
        }));
}

/**
 * Retrieve compatible product SKUs for a vehicle.
 *
 * Example vehicle ID: "32091"
 */
export async function fetchCompatiblePartSkus(
    vehicleId: string
): Promise<string[]> {
    const url =
        `${BASE_URL}/v2/linked/vehicle/` +
        encodeURIComponent(vehicleId);

    const data = await getJson(url);

    if (!isRecord(data)) {
        throw new Error("Invalid compatible parts response.");
    }

    // A valid vehicle can have no linked products.
    if (typeof data.error === "string") {
        return [];
    }

    if (!Array.isArray(data.products)) {
        throw new Error("Invalid compatible parts response.");
    }

    return data.products.filter(
        (sku): sku is string => typeof sku === "string"
    );
}

/**
 * Retrieve one automotive product's information.
 *
 * Example: FP9016
 * Returns title, description, photo and categories.
 */
export async function fetchAerproPart(
    sku: string
): Promise<AerproPart> {
    const url =
        `${BASE_URL}/v2/product/` +
        encodeURIComponent(sku);

    const data = await getJson(url);

    if (!isRecord(data)) {
        throw new Error("Invalid Aerpro product response.");
    }

    if (
        typeof data.sku !== "string" ||
        typeof data.title !== "string"
    ) {
        throw new Error("Missing required product fields.");
    }

    return {
        sku: data.sku,
        title: data.title,
        description:
            typeof data.description === "string"
                ? data.description
                : "",
        photo:
            typeof data.photo === "string"
                ? data.photo
                : typeof data.thumbnail === "string"
                    ? data.thumbnail
                    : "",
        categories:
            Array.isArray(data.categories)
                ? data.categories.filter(
                    (item): item is string =>
                        typeof item === "string"
                )
                : [],
        available: data.available === true,
        url:
            typeof data.url === "string"
                ? data.url
                : "",
    };
}
