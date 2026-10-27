
import { useEffect, useRef, useState } from "react";
import { getVehicleModels } from "../services/vehicleService";
import type { VehicleModel } from "../types/vehice";

export function useVehicleModels() {
    const [models, setModels] = useState<VehicleModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const requestId = useRef(0);

    useEffect(() => {
        return () => {
            requestId.current += 1;
        };
    }, []);

    const loadModels = async (make: string, year: number) => {
        const currentRequest = ++requestId.current;

        setLoading(true);
        setError(null);
        setModels([]);

        try {
            const results = await getVehicleModels(make, year);

            if (currentRequest !== requestId.current) return;

            setModels(results);
        } catch {
            if (currentRequest !== requestId.current) return;

            setError(
                "Unable to load vehicle models. Please try again later."
            );
        } finally {
            if (currentRequest === requestId.current) {
                setLoading(false);
            }
        }
    };

    return {
        models,
        loading,
        error,
        loadModels,
    };
}
