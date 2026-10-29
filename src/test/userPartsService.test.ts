
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyPartsService } from "../services/myPartsService";
import { myPartsRepository } from "../repositories/myPartsRepository";

import type { User, Part } from "../types/userParts";

// Mock the Repository so tests do not depend on JSON data.
vi.mock("../repositories/myPartsRepository", () => ({
    myPartsRepository: {
        getUserById: vi.fn(),
        getPartsByUserId: vi.fn(),
        getAllParts: vi.fn(),
    },
}));

// Test data
const mockPart: Part = {
    id: "P001",
    partId: "EN_001",
    partName: "Engine",
    categoryId: "CT001",
    partDescription: "Used engine in good condition",
    partPrice: 1500,
    partImage: "/images/engine.jpg",
    userId: "U001",
    userName: "Michael",
};

const mockUser: User = {
    userId: "U001",
    userName: "Michael",
    partsOwned: [mockPart],
};

describe("My Parts Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // TEST 1
    it("returns a user by ID", () => {
        vi.mocked(myPartsRepository.getUserById)
            .mockReturnValue(mockUser);

        const result = MyPartsService.getUser("U001");

        expect(result).toEqual(mockUser);
        expect(myPartsRepository.getUserById)
            .toHaveBeenCalledWith("U001");
    });

    // TEST 2
    it("returns undefined when the user does not exist", () => {
        vi.mocked(myPartsRepository.getUserById)
            .mockReturnValue(undefined);

        const result = MyPartsService.getUser("U999");

        expect(result).toBeUndefined();
    });

    // TEST 3
    it("returns all parts belonging to a user", () => {
        vi.mocked(myPartsRepository.getPartsByUserId)
            .mockReturnValue([mockPart]);

        const result = MyPartsService.getUserParts("U001");

        expect(result).toEqual([mockPart]);
        expect(myPartsRepository.getPartsByUserId)
            .toHaveBeenCalledWith("U001");
    });

    // TEST 4
    it("returns all auto parts from the Repository", () => {
        vi.mocked(myPartsRepository.getAllParts)
            .mockReturnValue([mockPart]);

        const result = myPartsRepository.getAllParts();

        expect(result).toEqual([mockPart]);
    });

    // TEST 5
    it("removes the correct part using its listing ID", () => {
        const secondPart: Part = {
            ...mockPart,
            id: "P002",
            partName: "Brake Pads",
        };

        const parts = [mockPart, secondPart];

        const result = MyPartsService.removePart(parts, "P001");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("P002");
    });

    // TEST 6
    it("does not remove parts when the ID does not exist", () => {
        const result = MyPartsService.removePart(
            [mockPart],
            "P999"
        );

        expect(result).toEqual([mockPart]);
    });
});
