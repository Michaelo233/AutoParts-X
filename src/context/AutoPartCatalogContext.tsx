
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { carPartList } from "../data/carPartList";
import { userPartRepository } from "../repositories/userPartRepository";

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
  userId: string | number;
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
function mapOwnersToCatalog(owners: RawOwner[]): CatalogGroup[] {
  const usedIds = new Set<string>();

  return owners.map(owner => ({
    Category: owner.userName,

    AutoPart: owner.partsOwned.map(
      (part, index): CatalogPart => {
        const originalId = String(
          part.partId ??
          part.id ??
          `${owner.userId}-${index}`
        );

        let uniqueId = originalId;
        let duplicateNumber = 1;

        while (usedIds.has(uniqueId)) {
          uniqueId = `${owner.userId}-${originalId}-${duplicateNumber}`;
          duplicateNumber++;
        }

        usedIds.add(uniqueId);

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

function loadInitialCatalog(): CatalogGroup[] {
  return mapOwnersToCatalog(carPartList);
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

  useEffect(() => {
    const unsubscribe = userPartRepository.subscribe(() => {
      setCatalog(mapOwnersToCatalog(userPartRepository.getUsers()));
    });

    return unsubscribe;
  }, []);

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

    const allParts = userPartRepository
      .getUsers()
      .flatMap(user =>
        user.partsOwned.map(part => ({
          partId: String(part.partId),
        }))
      ) as Array<{ partId: string }>;

    const nextPartId = generateAutoPartId(allParts);

    userPartRepository.addPartToUser(selectedCategory, {
      id: nextPartId,
      partId: nextPartId,
      partName: newPart.partName,
      categoryId: newPart.categoryId,
      partDescription: newPart.description,
      partPrice: newPart.price,
      partImage: newPart.imageUrl,
      userName: selectedCategory,
      isForSale: true,
      isFavorite: newPart.isFavourite,
    });

    setCatalog(mapOwnersToCatalog(userPartRepository.getUsers()));
  };

  /**
   * Remove an auto part by its partId.
   */
  const removePart = (partId: string): void => {
    userPartRepository.removePartById(partId);
    setCatalog(mapOwnersToCatalog(userPartRepository.getUsers()));
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
