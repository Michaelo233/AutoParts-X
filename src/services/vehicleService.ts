import {
  fetchVehicleManufacturers,
  fetchVehicleModelsByMakeAndYear,
} from '../repositories/vehicleRepository';
import type { VehicleMake, VehicleModel } from '../types/vehicle';

const YEAR_MIN = 1900;
const YEAR_MAX_OFFSET = 1;

let manufacturersCache: VehicleMake[] | null = null;
let manufacturersRequest: Promise<VehicleMake[]> | null = null;

const modelsCache = new Map<string, VehicleModel[]>();
const modelsRequests = new Map<string, Promise<VehicleModel[]>>();

function modelsCacheKey(makeName: string, year: number): string {
  return `${makeName.trim().toLowerCase()}-${year}`;
}

function validateLookup(makeName: string, year: number): void {
  if (!makeName.trim()) {
    throw new Error('Please select a manufacturer.');
  }

  const currentYear = new Date().getFullYear() + YEAR_MAX_OFFSET;
  if (!Number.isInteger(year) || year < YEAR_MIN || year > currentYear) {
    throw new Error(`Please enter a valid year between ${YEAR_MIN} and ${currentYear}.`);
  }
}

export async function getVehicleManufacturers(): Promise<VehicleMake[]> {
  if (manufacturersCache) {
    return manufacturersCache;
  }

  if (manufacturersRequest) {
    return manufacturersRequest;
  }

  manufacturersRequest = fetchVehicleManufacturers()
    .then((manufacturers) => {
      manufacturersCache = manufacturers;
      return manufacturers;
    })
    .catch((error: unknown) => {
      throw error instanceof Error
        ? error
        : new Error('Failed to load vehicle manufacturers. Please try again later.');
    })
    .finally(() => {
      manufacturersRequest = null;
    });

  return manufacturersRequest;
}

export async function getVehicleModelsByMakeAndYear(
  makeName: string,
  year: number
): Promise<VehicleModel[]> {
  validateLookup(makeName, year);

  const cacheKey = modelsCacheKey(makeName, year);

  const cachedModels = modelsCache.get(cacheKey);
  if (cachedModels) {
    return cachedModels;
  }

  const pendingRequest = modelsRequests.get(cacheKey);
  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetchVehicleModelsByMakeAndYear(makeName, year)
    .then((models) => {
      modelsCache.set(cacheKey, models);
      return models;
    })
    .catch((error: unknown) => {
      throw error instanceof Error
        ? error
        : new Error('Failed to load vehicle models. Please try again later.');
    })
    .finally(() => {
      modelsRequests.delete(cacheKey);
    });

  modelsRequests.set(cacheKey, request);
  return request;
}
