
import { useEffect, useRef, useState } from "react";
import {
    searchVehicles,
    getCompatiblePartSkus,
    getAerproPart,
} from "../services/aerproService";

import type { AerproVehicle } from "../types/AerproVehicle";
import type { AerproPart } from "../types/AerproParts";

const PAGE_SIZE = 6;

export function useVehicleModels() {
    const [vehicles, setVehicles] = useState<AerproVehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] =
        useState<AerproVehicle | null>(null);

    const [partSkus, setPartSkus] = useState<string[]>([]);
    const [productsBySku, setProductsBySku] =
        useState<Record<string, AerproPart>>({});
    const [visibleCount, setVisibleCount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [partsLoading, setPartsLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [partsError, setPartsError] = useState<string | null>(null);
    const [productError, setProductError] = useState<string | null>(null);

    const searchRequestId = useRef(0);
    const partsRequestId = useRef(0);

    useEffect(() => {
        return () => {
            searchRequestId.current++;
            partsRequestId.current++;
        };
    }, []);

    // Load a small batch of product details.
    const loadProductBatch = async (
        skus: string[],
        start: number,
        requestId: number
    ) => {
        const batch = skus.slice(start, start + PAGE_SIZE);

        if (batch.length === 0) return;

        setProductLoading(true);
        setProductError(null);

        const loaded: AerproPart[] = [];
        let failures = 0;

        try {
            // Fetch at most two products at a time.
            for (let index = 0; index < batch.length; index += 2) {
                const results = await Promise.allSettled(
                    batch.slice(index, index + 2).map(getAerproPart)
                );

                if (requestId !== partsRequestId.current) return;

                for (const result of results) {
                    if (result.status === "fulfilled") {
                        loaded.push(result.value);
                    } else {
                        failures++;
                    }
                }
            }

            if (requestId !== partsRequestId.current) return;

            setProductsBySku(previous => {
                const updated = { ...previous };

                for (const product of loaded) {
                    updated[product.sku.toUpperCase()] = product;
                }

                return updated;
            });

            setVisibleCount(start + batch.length);

            if (failures > 0) {
                setProductError(
                    `${failures} product details could not be loaded.`
                );
            }
        } finally {
            if (requestId === partsRequestId.current) {
                setProductLoading(false);
            }
        }
    };

    // Search for vehicles.
    const loadVehicles = async (query: string) => {
        const requestId = ++searchRequestId.current;
        ++partsRequestId.current;

        setLoading(true);
        setError(null);
        setVehicles([]);
        setSelectedVehicle(null);
        setPartSkus([]);
        setProductsBySku({});
        setVisibleCount(0);
        setPartsLoading(false);
        setProductLoading(false);
        setPartsError(null);
        setProductError(null);

        try {
            const results = await searchVehicles(query);

            if (requestId !== searchRequestId.current) return;

            setVehicles(results);
        } catch (err) {
            if (requestId !== searchRequestId.current) return;

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to search vehicles."
            );
        } finally {
            if (requestId === searchRequestId.current) {
                setLoading(false);
            }
        }
    };

    // Find compatible SKUs and load the first six products.
    const loadCompatibleParts = async (
        vehicle: AerproVehicle
    ) => {
        const requestId = ++partsRequestId.current;

        setSelectedVehicle(vehicle);
        setPartsLoading(true);
        setPartsError(null);
        setProductError(null);
        setPartSkus([]);
        setProductsBySku({});
        setVisibleCount(0);
        setProductLoading(false);

        try {
            const skus = await getCompatiblePartSkus(vehicle.id);

            if (requestId !== partsRequestId.current) return;

            setPartSkus(skus);

            if (skus.length > 0) {
                void loadProductBatch(skus, 0, requestId);
            }
        } catch (err) {
            if (requestId !== partsRequestId.current) return;

            setPartsError(
                err instanceof Error
                    ? err.message
                    : "Unable to retrieve compatible parts."
            );
        } finally {
            if (requestId === partsRequestId.current) {
                setPartsLoading(false);
            }
        }
    };

    // Load six additional products when requested.
    const loadMoreProducts = () => {
        if (
            productLoading ||
            partsLoading ||
            visibleCount >= partSkus.length
        ) return;

        void loadProductBatch(
            partSkus,
            visibleCount,
            partsRequestId.current
        );
    };

    return {
        vehicles,
        selectedVehicle,
        partSkus,
        productsBySku,
        visibleCount,
        loading,
        partsLoading,
        productLoading,
        error,
        partsError,
        productError,
        loadVehicles,
        loadCompatibleParts,
        loadMoreProducts,
    };
}
