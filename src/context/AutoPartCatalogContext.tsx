
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
  id?: number;
  partName?: string;
  Description?: string;
  partDescription?: string;
  Price?: number;
  partPrice?: number;
  partImage?: string;
  isFavorite?: boolean;
}

interface RawOwner {
  userId: number;
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

const CatalogContext = createContext<CatalogContextValue | null>(null);

function loadInitialCatalog(): CatalogGroup[] {
  const owners = carPartList as RawOwner[];

  return owners.map((owner) => ({
    Category: owner.userName,

    AutoPart: owner.partsOwned.map((part, index): CatalogPart => ({
      partId: `${owner.userId}-${part.partId ?? part.id ?? index}`,

      partName: part.partName ?? "Unnamed part",

      description:
        part.partDescription ?? part.Description ?? "",

      price: Number(
        part.partPrice ?? part.Price ?? 0
      ),

      imageUrl: part.partImage ?? "",

      isFavourite: part.isFavorite ?? false,
    })),
  }));
}

/**
 * Provides shared catalogue state to all pages.
 *
 * Keeps add, delete and favourite actions centralized,
 * so components do not maintain separate copies of data.
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
    const completedPart: CatalogPart = {
      ...newPart,
      partId: crypto.randomUUID(),
    };

    const selectedCategory = category.trim();

    if (!selectedCategory) {
      return;
    }

    setCatalog(prev => {
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
                AutoPart: [completedPart, ...group.AutoPart],
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
            ? { ...part, isFavourite: !part.isFavourite }
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
