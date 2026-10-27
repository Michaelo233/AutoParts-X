import { useEffect, useState } from 'react';
import {
  getVehicleManufacturers,
  getVehicleModelsByMakeAndYear,
} from '../services/vehicleService';
import type { VehicleMake, VehicleModel } from '../types/vehicle';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export function useVehicleLookup() {
  const [manufacturers, setManufacturers] = useState<VehicleMake[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [isLoadingManufacturers, setIsLoadingManufacturers] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadManufacturers = async () => {
      try {
        setIsLoadingManufacturers(true);
        setError(null);
        const makes = await getVehicleManufacturers();

        if (isMounted) {
          setManufacturers(makes);
        }
      } catch (loadError: unknown) {
        if (isMounted) {
          setError(getErrorMessage(loadError));
          setManufacturers([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingManufacturers(false);
        }
      }
    };

    void loadManufacturers();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadModels = async (makeName: string, year: number) => {
    try {
      setIsLoadingModels(true);
      setError(null);
      const fetchedModels = await getVehicleModelsByMakeAndYear(makeName, year);
      setModels(fetchedModels);
    } catch (loadError: unknown) {
      setError(getErrorMessage(loadError));
      setModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  return {
    manufacturers,
    models,
    isLoadingManufacturers,
    isLoadingModels,
    error,
    loadModels,
  };
}
