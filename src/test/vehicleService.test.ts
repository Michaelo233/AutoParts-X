
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import type { VehicleModel } from "../types/vehice";

// Mock the Repository to prevent real API requests.
vi.mock("../repositories/vehicleRepository", () => ({
    fetchVehicleModels: vi.fn(),
}));

let service: typeof import("../services/vehicleService");
let repository: typeof import("../repositories/vehicleRepository");

// Sample vehicle models returned by the mocked API.
const mockVehicles: VehicleModel[] = [
    {
        id: 101,
        name: "Civic",
        make: "Honda",
    },
    {
        id: 102,
        name: "Accord",
        make: "Honda",
    },
    {
        id: 103,
        name: "CR-V",
        make: "Honda",
    },
];

describe("Vehicle Service", () => {
    beforeEach(async () => {
        // Reset module-level cache between tests.
        vi.resetModules();
        vi.clearAllMocks();

        repository = await import("../repositories/vehicleRepository");
        service = await import("../services/vehicleService");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1 - Retrieve vehicle models
    it("should return vehicle models for a valid make and year", async () => {
        vi.mocked(repository.fetchVehicleModels)
            .mockResolvedValue(mockVehicles);

        const result = await service.getVehicleModels(
            "Honda",
            2016
        );

        expect(result).toEqual(mockVehicles);

        expect(repository.fetchVehicleModels)
            .toHaveBeenCalledWith("honda", 2016);
    });

    // TEST 2 - Validate manufacturer
    it("should reject an empty manufacturer", async () => {
        await expect(
            service.getVehicleModels("", 2016)
        ).rejects.toThrow(
            "Please select a vehicle manufacturer."
        );

        expect(repository.fetchVehicleModels)
            .not.toHaveBeenCalled();
    });

    // TEST 3 - Validate vehicle year
    it("should reject an invalid vehicle year", async () => {
        await expect(
            service.getVehicleModels("Honda", 1990)
        ).rejects.toThrow(
            "Please enter a valid vehicle year."
        );

        expect(repository.fetchVehicleModels)
            .not.toHaveBeenCalled();
    });

    // TEST 4 - Verify caching
    it("should use cached data for repeated requests", async () => {
        vi.mocked(repository.fetchVehicleModels)
            .mockResolvedValue(mockVehicles);

        const firstResult = await service.getVehicleModels(
            "Honda",
            2016
        );

        const secondResult = await service.getVehicleModels(
            "Honda",
            2016
        );

        expect(firstResult).toEqual(secondResult);

        // Repository should only be called once.
        expect(repository.fetchVehicleModels)
            .toHaveBeenCalledTimes(1);
    });

    // TEST 5 - Cache expiration
    it("should fetch fresh data after the cache expires", async () => {
        const now = 1000;

        const clock = vi.spyOn(Date, "now")
            .mockReturnValue(now);

        vi.mocked(repository.fetchVehicleModels)
            .mockResolvedValue(mockVehicles);

        await service.getVehicleModels("Honda", 2016);

        // Move ahead more than 10 minutes.
        clock.mockReturnValue(now + 10 * 60 * 1000 + 1);

        await service.getVehicleModels("Honda", 2016);

        expect(repository.fetchVehicleModels)
            .toHaveBeenCalledTimes(2);
    });

    // TEST 6 - API failure
    it("should handle repository failures without corrupting cache", async () => {
        const mockFetch = vi.mocked(
            repository.fetchVehicleModels
        );

        mockFetch.mockRejectedValueOnce(
            new Error("API unavailable")
        );

        await expect(
            service.getVehicleModels("Honda", 2016)
        ).rejects.toThrow("API unavailable");

        // Successful retry should still work.
        mockFetch.mockResolvedValueOnce(mockVehicles);

        const result = await service.getVehicleModels(
            "Honda",
            2016
        );

        expect(result).toEqual(mockVehicles);
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    // TEST 7 - Different manufacturers
    it("should cache different manufacturers separately", async () => {
        vi.mocked(repository.fetchVehicleModels)
            .mockResolvedValue(mockVehicles);

        await service.getVehicleModels("Honda", 2016);
        await service.getVehicleModels("Toyota", 2016);

        expect(repository.fetchVehicleModels)
            .toHaveBeenCalledTimes(2);
    });

    // TEST 8 - Simultaneous requests
    it("should reuse a request that is already running", async () => {
        vi.mocked(repository.fetchVehicleModels)
            .mockResolvedValue(mockVehicles);

        const first = service.getVehicleModels("Honda", 2016);
        const second = service.getVehicleModels("Honda", 2016);

        const results = await Promise.all([first, second]);

        expect(results[0]).toEqual(mockVehicles);
        expect(results[1]).toEqual(mockVehicles);

        expect(repository.fetchVehicleModels)
            .toHaveBeenCalledTimes(1);
    });
});
