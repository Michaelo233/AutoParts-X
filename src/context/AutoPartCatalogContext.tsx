
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import carPartList from "../data/carPartList.json";

import type {
  CatalogGroup,
  CatalogPart,
  NewCatalogPart,
} from "../types/catalog";

interface RawPart {
  partId?: string | number;
  id?: string | number;
  categoryId?: string;
  partName?: string;
  Description?: string;
  partDescription?: string;
  Price?: number;
  partPrice?: number;
  partImage?: string;
  isFavorite?: boolean;
}

interface RawOwner {
  userId: string;
  userName: string;
  partsOwned: RawPart[];
}

interface CatalogContextValue {
  catalog: CatalogGroup[];
  categories: string[];
  addPart: (part: NewCatalogPart, category: string) => void;
  removePart: (partId: string) => void;
  toggleFavourite: (partId: string) => void;
}

const CatalogContext =
  createContext<CatalogContextValue | null>(null);

/**
 * Convert JSON records to catalogue data.
 */
function loadInitialCatalog(): CatalogGroup[] {
  const owners: RawOwner[] = carPartList;

  return owners.map(owner => ({
    Category: owner.userName,

    AutoPart: owner.partsOwned.map(
      (part, index): CatalogPart => ({
        partId: String(
          part.partId ?? part.id ?? `${owner.userId}-${index}`
        ),
        categoryId: part.categoryId ?? "",
        partName: part.partName ?? "",
        description:
          part.partDescription ?? part.Description ?? "",
        price: part.partPrice ?? part.Price ?? 0,
        imageUrl: part.partImage ?? "",
        isFavourite: part.isFavorite ?? false,
      })
    ),
  }));
}

/**
 * Generate a new catalogue part ID.
 * Example: PART001, PART002 -> PART003
 */
function generateNextCatalogId(
  catalog: CatalogGroup[]
): string {
  const maxId = catalog
    .flatMap(group => group.AutoPart)
    .reduce((max, part) => {
      const match = /^PART(\d+)$/.exec(part.partId);

      return match
        ? Math.max(max, Number(match[1]))
        : max;
    }, 0);

  return `PART${String(maxId + 1).padStart(3, "0")}`;
}

/**
 * AutoPartCatalogProvider
 *
 * Manages shared catalogue state:
 * - Load initial parts from JSON
 * - Add new parts
 * - Remove parts
 * - Toggle favourites
 */
export function AutoPartCatalogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [catalog, setCatalog] = useState<CatalogGroup[]>(
    loadInitialCatalog
  );

  const categories = catalog.map(group => group.Category);

  const addPart = (
    newPart: NewCatalogPart,
    category: string
  ) => {
    const selectedCategory = category.trim();

    if (!selectedCategory) return;

    setCatalog(prev => {
      const completedPart: CatalogPart = {
        ...newPart,
        partId: generateNextCatalogId(prev),
      };

      const exists = prev.some(
        group =>
          group.Category.toLowerCase() ===
          selectedCategory.toLowerCase()
      );

      if (exists) {
        return prev.map(group =>
          group.Category.toLowerCase() ===
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

      return [
        ...prev,
        {
          Category: selectedCategory,
          AutoPart: [completedPart],
        },
      ];
    });
  };

  const removePart = (partId: string) => {
    setCatalog(prev =>
      prev.map(group => ({
        ...group,
        AutoPart: group.AutoPart.filter(
          part => part.partId !== partId
        ),
      }))
    );
  };

  const toggleFavourite = (partId: string) => {
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

export function useAutoPartCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error(
      "useAutoPartCatalog must be used inside AutoPartCatalogProvider"
    );
  }

  return context;
}
