
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { carPartList } from "../data/carPartList";

import { generateAutoPartId } from
  "../components/common/utils/generateID";

import type {
  CatalogGroup,
  CatalogPart,
  NewCatalogPart,
} from "../types/catalog";

/**
 * RawPart
 *
 * Represents an auto part from the TypeScript storage array.
 */
interface RawPart {
  id?: string | number;
  partId?: string | number;
  categoryId?: string;
  partName?: string;
  Description?: string;
  partDescription?: string;
  Price?: number;
  partPrice?: number;
  partImage?: string;
  isFavorite?: boolean;
}

/**
 * RawOwner
 *
 * Represents a user and their parts.
 */
interface RawOwner {
  userId: string;
  userName: string;
  partsOwned: RawPart[];
}

/**
 * CatalogContextValue
 *
 * Defines the shared catalogue data and actions.
 */
interface CatalogContextValue {
  catalog: CatalogGroup[];
  categories: string[];

  addPart: (
    part: NewCatalogPart,
    category: string
  ) => void;

  removePart: (partId: string) => void;

  toggleFavourite: (partId: string) => void;
}

/**
 * Create the catalogue Context.
 */
const CatalogContext =
  createContext<CatalogContextValue | null>(null);

/**
 * loadInitialCatalog
 *
 * Loads auto parts from JSON.
 * Converts JSON properties into CatalogPart objects.
 *
 * The Category field currently stores the seller name
 * to preserve existing search functionality.
 */
function loadInitialCatalog(): CatalogGroup[] {
  const owners: RawOwner[] = carPartList;

  const usedIds = new Set<string>();

  return owners.map(owner => ({
    Category: owner.userName,

    AutoPart: owner.partsOwned.map(
      (part, index): CatalogPart => {

        // Get the original part ID.
        const originalId = String(
          part.partId ??
          part.id ??
          `${owner.userId}-${index}`
        );

        let uniqueId = originalId;
        let duplicateNumber = 1;

        // Prevent duplicate IDs.
        while (usedIds.has(uniqueId)) {
          uniqueId =
            `${owner.userId}-${originalId}-${duplicateNumber}`;

          duplicateNumber++;
        }

        usedIds.add(uniqueId);

        // Convert JSON fields to CatalogPart.
        return {
          partId: uniqueId,

          categoryId: part.categoryId ?? "",

          partName: part.partName ?? "",

          description:
            part.partDescription ??
            part.Description ??
            "",

          price:
            part.partPrice ??
            part.Price ??
            0,

          imageUrl: part.partImage ?? "",

          isFavourite: part.isFavorite ?? false,
        };
      }
    ),
  }));
}

/**
 * AutoPartCatalogProvider
 *
 * Manages shared React catalogue state.
 *
 * Responsibilities:
 * - Load catalogue data
 * - Add auto parts
 * - Remove auto parts
 * - Toggle favourites
 */
export function AutoPartCatalogProvider({
  children,
}: {
  children: ReactNode;
}) {

  // Initialize catalogue state.
  const [catalog, setCatalog] =
    useState<CatalogGroup[]>(loadInitialCatalog);

  /**
   * Get group names.
   *
   * Currently, these groups are sellers,
   * such as Sarah and Michael.
   */
  const categories = Array.from(
    new Set(
      catalog.map(group => group.Category)
    )
  );

  /**
   * Add a new auto part.
   *
   * Generates PART001-style IDs using
   * generateAutoPartId from generateID.ts.
   */
  const addPart = (
    newPart: NewCatalogPart,
    category: string
  ): void => {

    const selectedCategory = category.trim();

    if (!selectedCategory) {
      return;
    }

    setCatalog(prev => {

      // Retrieve every existing catalogue part.
      const allParts: CatalogPart[] = prev.flatMap(
        group => group.AutoPart
      );

      // Generate the next auto part ID.
      const nextPartId = generateAutoPartId(allParts);

      // Create the complete part.
      const completedPart: CatalogPart = {
        ...newPart,
        partId: nextPartId,
      };

      // Check whether the group already exists.
      const groupExists = prev.some(
        group =>
          group.Category.trim().toLowerCase() ===
          selectedCategory.toLowerCase()
      );

      if (groupExists) {

        // Add part to an existing group.
        return prev.map(group =>
          group.Category.trim().toLowerCase() ===
          selectedCategory.toLowerCase()
            ? {
                ...group,
                AutoPart: [
                  completedPart,
                  ...group.AutoPart,
                ],
              }
            : group
        );
      }

      // Create a new group.
      return [
        ...prev,
        {
          Category: selectedCategory,
          AutoPart: [completedPart],
        },
      ];
    });
  };

  /**
   * Remove an auto part by its partId.
   */
  const removePart = (partId: string): void => {

    setCatalog(prev =>
      prev.map(group => ({
        ...group,

        AutoPart: group.AutoPart.filter(
          part => part.partId !== partId
        ),
      }))
    );
  };

  /**
   * Toggle favourite status for an auto part.
   */
  const toggleFavourite = (
    partId: string
  ): void => {

    setCatalog(prev =>
      prev.map(group => ({
        ...group,

        AutoPart: group.AutoPart.map(part =>
          part.partId === partId
            ? {
                ...part,
                isFavourite: !part.isFavourite,
              }
            : part
        ),
      }))
    );
  };

  return (
    <CatalogContext.Provider
      value={{
        catalog,
        categories,
        addPart,
        removePart,
        toggleFavourite,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

/**
 * useAutoPartCatalog
 *
 * Custom Hook for accessing shared catalogue data.
 */
export function useAutoPartCatalog() {

  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error(
      "useAutoPartCatalog must be used inside AutoPartCatalogProvider"
    );
  }

  return context;
}
