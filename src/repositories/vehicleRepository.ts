import type { VehicleMake, VehicleModel } from '../types/vehicle';

const NHTSA_API_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const API_UNAVAILABLE_MESSAGE = 'Vehicle information is currently unavailable. Please try again later.';

interface NhtsaResponse {
  Results?: Array<{
    Make_ID?: number;
    Make_Name?: string;
    Model_ID?: number;
    Model_Name?: string;
  }>;
}

async function fetchFromNhtsa(url: string): Promise<NhtsaResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(API_UNAVAILABLE_MESSAGE);
  }

  return response.json() as Promise<NhtsaResponse>;
}

export async function fetchVehicleManufacturers(): Promise<VehicleMake[]> {
  const data = await fetchFromNhtsa(`${NHTSA_API_BASE_URL}/getallmakes?format=json`);

  return (data.Results ?? [])
    .filter((make) => typeof make.Make_ID === 'number' && typeof make.Make_Name === 'string')
    .map((make) => ({
      makeId: make.Make_ID as number,
      makeName: make.Make_Name as string,
    }));
}

export async function fetchVehicleModelsByMakeAndYear(
  makeName: string,
  year: number
): Promise<VehicleModel[]> {
  const encodedMake = encodeURIComponent(makeName);
  const data = await fetchFromNhtsa(
    `${NHTSA_API_BASE_URL}/GetModelsForMakeYear/make/${encodedMake}/modelyear/${year}?format=json`
  );

  return (data.Results ?? [])
    .filter((model) => typeof model.Model_ID === 'number' && typeof model.Model_Name === 'string')
    .map((model) => ({
      modelId: model.Model_ID as number,
      modelName: model.Model_Name as string,
    }));
}
