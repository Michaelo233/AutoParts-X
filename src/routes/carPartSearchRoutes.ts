import {
  carPartSearchController,
  type SearchRequest,
  type SearchResponse,
} from "../controllers/carPartSearchController.js";

export interface SearchRoute {
  method: "GET";
  path: string;
  handler: (request: SearchRequest) => Promise<SearchResponse>;
}

export function createRoutes(
  controller = carPartSearchController
): SearchRoute[] {
  return [
    {
      method: "GET",
      path: "/api/parts/search",
      handler: (request) => controller.search(request),
    },
  ];
}

export const carPartSearchRoutes = createRoutes();
