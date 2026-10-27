
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import type { AerproVehicle } from "../types/AerproVehicle";

// Mock Aerpro repository to prevent real API requests.
vi.mock("../repositories/aerproRepository", () => ({
    searchAerproVehicles: vi.fn(),
    fetchCompatiblePartSkus: vi.fn(),
}));

let service: typeof import("../services/aerproService");
let repository: typeof import("../repositories/aerproRepository");

// Sample vehicles returned by Aerpro.
const mockVehicles: AerproVehicle[] = [
    {
        id: "18501",
        title: "Ford Ranger 2012-2015",
        image: "",
        url: "",
    },
    {
        id: "18502",
        title: "Ford Ranger 2016-2018",
        image: "",
        url: "",
    },
];

// Sample compatible automotive part SKUs.
const mockParts = ["FP7500", "APP072", "CHFO3C"];

describe("Aerpro Service", () => {

    beforeEach(async () => {
        // Reset the service's module-level caches.
        vi.resetModules();
        vi.resetAllMocks();

        repository = await import(
            "../repositories/aerproRepository"
        );

        service = await import(
            "../services/aerproService"
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1 - Search vehicles
    it("should return vehicles for a valid search", async () => {
        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        const result = await service.searchVehicles(
            "Ford Ranger"
        );

        expect(result).toEqual(mockVehicles);

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledWith("ford ranger");
    });

    // TEST 2 - Validate empty search
    it("should reject an empty search term", async () => {
        await expect(
            service.searchVehicles("")
        ).rejects.toThrow(
            "Enter at least 3 characters."
        );

        expect(repository.searchAerproVehicles)
            .not.toHaveBeenCalled();
    });

    // TEST 3 - Validate short search
    it("should reject a search shorter than 3 characters", async () => {
        await expect(
            service.searchVehicles("Fo")
        ).rejects.toThrow(
            "Enter at least 3 characters."
        );

        expect(repository.searchAerproVehicles)
            .not.toHaveBeenCalled();
    });

    // TEST 4 - Normalize search input
    it("should trim spaces and normalize search terms", async () => {
        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        await service.searchVehicles("  FORD   Ranger  ");

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledWith("ford ranger");
    });

    // TEST 5 - Vehicle caching
    it("should cache repeated vehicle searches", async () => {
        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        const first = await service.searchVehicles(
            "Ford Ranger"
        );

        const second = await service.searchVehicles(
            "ford ranger"
        );

        expect(first).toEqual(second);

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledTimes(1);
    });

    // TEST 6 - Cache expiration
    it("should fetch new vehicles after cache expiration", async () => {
        const now = 1000;

        const clock = vi.spyOn(Date, "now")
            .mockReturnValue(now);

        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        await service.searchVehicles("Ford Ranger");

        // Move forward more than 10 minutes.
        clock.mockReturnValue(
            now + 10 * 60 * 1000 + 1
        );

        await service.searchVehicles("Ford Ranger");

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledTimes(2);
    });

    // TEST 7 - API failure and retry
    it("should retry after a failed vehicle request", async () => {
        const mockFetch = vi.mocked(
            repository.searchAerproVehicles
        );

        mockFetch.mockRejectedValueOnce(
            new Error("Aerpro API unavailable")
        );

        await expect(
            service.searchVehicles("Ford Ranger")
        ).rejects.toThrow("Aerpro API unavailable");

        mockFetch.mockResolvedValueOnce(mockVehicles);

        const result = await service.searchVehicles(
            "Ford Ranger"
        );

        expect(result).toEqual(mockVehicles);
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    // TEST 8 - Separate search caches
    it("should cache different vehicle searches separately", async () => {
        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        await service.searchVehicles("Ford Ranger");
        await service.searchVehicles("Honda Civic");

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledTimes(2);
    });

    // TEST 9 - Simultaneous vehicle requests
    it("should reuse a vehicle request already running", async () => {
        vi.mocked(repository.searchAerproVehicles)
            .mockResolvedValue(mockVehicles);

        const first = service.searchVehicles("Ford Ranger");
        const second = service.searchVehicles("Ford Ranger");

        const results = await Promise.all([first, second]);

        expect(results[0]).toEqual(mockVehicles);
        expect(results[1]).toEqual(mockVehicles);

        expect(repository.searchAerproVehicles)
            .toHaveBeenCalledTimes(1);
    });

    // TEST 10 - Compatible parts
    it("should return compatible part SKUs", async () => {
        vi.mocked(repository.fetchCompatiblePartSkus)
            .mockResolvedValue(mockParts);

        const result = await service.getCompatiblePartSkus(
            "18501"
        );

        expect(result).toEqual(mockParts);

        expect(repository.fetchCompatiblePartSkus)
            .toHaveBeenCalledWith("18501");
    });

    // TEST 11 - Validate vehicle ID
    it("should reject an empty vehicle ID", async () => {
        await expect(
            service.getCompatiblePartSkus("  ")
        ).rejects.toThrow(
            "Please select a vehicle."
        );

        expect(repository.fetchCompatiblePartSkus)
            .not.toHaveBeenCalled();
    });

    // TEST 12 - Compatible parts caching
    it("should cache compatible parts for the same vehicle", async () => {
        vi.mocked(repository.fetchCompatiblePartSkus)
            .mockResolvedValue(mockParts);

        const first = await service.getCompatiblePartSkus(
            "18501"
        );

        const second = await service.getCompatiblePartSkus(
            "18501"
        );

        expect(first).toEqual(second);

        expect(repository.fetchCompatiblePartSkus)
            .toHaveBeenCalledTimes(1);
    });

    // TEST 13 - Cache different vehicles independently
    it("should fetch parts separately for different vehicle IDs", async () => {
        vi.mocked(repository.fetchCompatiblePartSkus)
            .mockResolvedValue(mockParts);

        await service.getCompatiblePartSkus("18501");
        await service.getCompatiblePartSkus("18502");

        expect(repository.fetchCompatiblePartSkus)
            .toHaveBeenCalledTimes(2);
    });

    // TEST 14 - Compatible parts API failure
    it("should allow retrying after a compatible parts request fails", async () => {
        const mockFetch = vi.mocked(
            repository.fetchCompatiblePartSkus
        );

        mockFetch.mockRejectedValueOnce(
            new Error("Unable to retrieve compatible parts")
        );

        await expect(
            service.getCompatiblePartSkus("18501")
        ).rejects.toThrow(
            "Unable to retrieve compatible parts"
        );

        mockFetch.mockResolvedValueOnce(mockParts);

        const result = await service.getCompatiblePartSkus(
            "18501"
        );

        expect(result).toEqual(mockParts);
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    // TEST 15 - Simultaneous compatible parts requests
    it("should reuse a pending compatible parts request", async () => {
        vi.mocked(repository.fetchCompatiblePartSkus)
            .mockResolvedValue(mockParts);

        const first =
            service.getCompatiblePartSkus("18501");

        const second =
            service.getCompatiblePartSkus("18501");

        const results = await Promise.all([first, second]);

        expect(results[0]).toEqual(mockParts);
        expect(results[1]).toEqual(mockParts);

        expect(repository.fetchCompatiblePartSkus)
            .toHaveBeenCalledTimes(1);
    });

    // TEST 16 - Compatible parts cache expiration
    it("should refresh compatible parts after 10 minutes", async () => {
        const now = 1000;

        const clock = vi.spyOn(Date, "now")
            .mockReturnValue(now);

        vi.mocked(repository.fetchCompatiblePartSkus)
            .mockResolvedValue(mockParts);

        await service.getCompatiblePartSkus("18501");

        clock.mockReturnValue(
            now + 10 * 60 * 1000 + 1
        );

        await service.getCompatiblePartSkus("18501");

        expect(repository.fetchCompatiblePartSkus)
            .toHaveBeenCalledTimes(2);
    });
});
