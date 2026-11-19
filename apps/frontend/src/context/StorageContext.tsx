
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";


const CONSENT_KEY = import.meta.env.VITE_CONSENT_KEY;
const SEARCH_KEY = import.meta.env.VITE_SEARCH_KEY;

interface StorageContextType {
  consent: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  allowStorage: () => void;
  clearSavedData: () => void;
}

const StorageContext =
  createContext<StorageContextType | undefined>(undefined);

// Check whether user previously gave consent.
function getConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "yes";
  } catch {
    return false;
  }
}

// Load a previous search only with consent.
function getSavedSearch(): string {
  if (!getConsent()) return "";

  try {
    return localStorage.getItem(SEARCH_KEY) ?? "";
  } catch {
    return "";
  }
}

export function StorageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [consent, setConsent] = useState(getConsent);
  const [searchTerm, setSearchTerm] =
    useState(getSavedSearch);

  // Save search whenever it changes,
  // but only after the user gives consent.
  useEffect(() => {
    if (!consent) return;

    try {
      localStorage.setItem(SEARCH_KEY, searchTerm);
    } catch {
      console.error("Unable to save search.");
    }
  }, [consent, searchTerm]);

  const allowStorage = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "yes");
      setConsent(true);
    } catch {
      console.error("Browser storage is unavailable.");
    }
  };

  const clearSavedData = () => {
    try {
      // Delete only AutoParts-X keys.
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);

        if (key?.startsWith("autopartsx:")) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      console.error("Unable to clear saved data.");
    }

    setConsent(false);
    setSearchTerm("");
  };

  return (
    <StorageContext.Provider
      value={{
        consent,
        searchTerm,
        setSearchTerm,
        allowStorage,
        clearSavedData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error(
      "useStorage must be used inside StorageProvider"
    );
  }

  return context;
}
