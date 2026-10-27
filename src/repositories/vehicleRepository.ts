
import type { VehicleModel } from "../types/vehice";

interface NhtsaModel {
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

function isNhtsaModel(value: unknown): value is NhtsaModel {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const model = value as Partial<NhtsaModel>;

    return (
        typeof model.Make_Name === "string" &&
        typeof model.Model_ID === "number" &&
        typeof model.Model_Name === "string"
    );
}

export async function fetchVehicleModels(
    make: string,
    year: number
): Promise<VehicleModel[]> {
    const url =
        `https://vpic.nhtsa.dot.gov/api/vehicles/` +
        `GetModelsForMakeYear/make/${encodeURIComponent(make)}` +
        `/modelyear/${year}?format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Vehicle API request failed (${response.status}).`
        );
    }

    const data: unknown = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !("Results" in data) ||
        !Array.isArray(data.Results)
    ) {
        throw new Error("Invalid vehicle API response.");
    }

    return data.Results
        .filter(isNhtsaModel)
        .map(model => ({
            id: model.Model_ID,
            name: model.Model_Name,
            make: model.Make_Name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}
