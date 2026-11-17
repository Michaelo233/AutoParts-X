import type { Part } from "../types/userParts.js";
import { carPartSearchService } from "../services/carPartSearchService.js";

export interface SearchRequest {
  query?: unknown;
}

export interface SearchResponse {
  status: number;
  body: {
    results: Part[];
    error?: string;
  };
}

export const carPartSearchController = {
  async search(request: SearchRequest): Promise<SearchResponse> {
    if (request.query !== undefined && typeof request.query !== "string") {
      return {
        status: 400,
        body: { results: [], error: "Search query must be a string." },
      };
    }

    const results = await carPartSearchService.searchParts(
      typeof request.query === "string" ? request.query : ""
    );

    return { status: 200, body: { results } };
  },
};
