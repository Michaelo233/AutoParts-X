
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useVehicleModels } from "../hooks/useVehicleModels";
import styles from "./VehicleModels.module.css";

function PartPhoto({
    src,
    alt,
}: {
    src?: string;
    alt: string;
}) {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    if (!src || failed) {
        return (
            <div className={styles.noImage}>
                <span aria-hidden="true">🔧</span>
                <span>Photo unavailable</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={styles.productImage}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

/**
 * VehicleModels
 *
 * Displays Aerpro vehicles and compatible automotive
 * accessories with images and product details.
 *
 * Component -> Hook -> Service -> Repository
 */
export default function VehicleModels() {
    const [query, setQuery] = useState("Toyota 86");
    const [searched, setSearched] = useState(false);

    const {
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
    } = useVehicleModels();

    const visibleSkus = partSkus.slice(0, visibleCount);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearched(true);
        void loadVehicles(query);
    };

    return (
        <main className={styles.container}>
            {/* Search header */}
            <section className={styles.hero}>
                <span className={styles.eyebrow}>
                    AUTOPARTS-X · VEHICLE FITMENT
                </span>

                <h1>Find Parts That Fit Your Vehicle</h1>

                <p>Search your vehicle and explore compatible automotive accessories powered by Aerpro.
                </p>

                <form
                    className={styles.searchForm}
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="vehicleQuery"
                        className={styles.searchLabel}
                    >
                        Manufacturer and model
                    </label>

                    <div className={styles.searchRow}>
                        <input
                            id="vehicleQuery"
                            type="search"
                            placeholder="e.g. Toyota 86 or Ford Ranger"
                            value={query}
                            minLength={3}
                            required
                            onChange={event =>
                                setQuery(event.target.value)
                            }
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Searching..." : "Search Vehicles"}
                        </button>
                    </div>
                </form>
            </section>

            {loading && (
                <p className={styles.notice} role="status">
                    Searching for matching vehicles...
                </p>
            )}

            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}

            {/* Vehicle results */}
            {searched && !loading && !error && (
                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <span className={styles.kicker}>
                                STEP 01
                            </span>

                            <h2>Select Your Vehicle</h2>

                            <p>
                                Choose the correct model and year range.
                            </p>
                        </div>

                        <span className={styles.countBadge}>
                            {vehicles.length} results
                        </span>
                    </div>

                    {vehicles.length === 0 ? (
                        <p className={styles.notice}>
                            No vehicles found. Try another search.
                        </p>
                    ) : (
                        <div className={styles.vehicleGrid}>
                            {vehicles.map(vehicle => {
                                const isSelected =
                                    selectedVehicle?.id === vehicle.id;

                                return (
                                    <button
                                        type="button"
                                        key={vehicle.id}
                                        className={
                                            isSelected
                                                ? `${styles.vehicleCard} ${styles.selectedCard}`
                                                : styles.vehicleCard
                                        }
                                        aria-pressed={isSelected}
                                        onClick={() =>
                                            void loadCompatibleParts(vehicle)
                                        }
                                    >
                                        <span
                                            className={styles.vehicleIcon}
                                            aria-hidden="true"
                                        >
                                            🚙
                                        </span>

                                        <span className={styles.vehicleTitle}>
                                            {vehicle.title}
                                        </span>

                                        <span className={styles.vehicleAction}>
                                            {isSelected
                                                ? "Selected vehicle ✓"
                                                : "View compatible parts →"}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </section>
            )}

            {/* Product details */}
            {selectedVehicle && (
                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <span className={styles.kicker}>
                                STEP 02
                            </span>

                            <h2>Compatible Auto Parts</h2>

                            <p>
                                Parts listed for{" "}
                                <strong>{selectedVehicle.title}</strong>
                            </p>

                            <span className={styles.vehicleId}>
                                Vehicle ID: {selectedVehicle.id}
                            </span>
                        </div>

                        {!partsLoading && !partsError && (
                            <span className={styles.countBadge}>
                                {partSkus.length} part SKUs
                            </span>
                        )}
                    </div>

                    {partsLoading && (
                        <p className={styles.notice} role="status">
                            Finding compatible products...
                        </p>
                    )}

                    {partsError && (
                        <p className={styles.error} role="alert">
                            {partsError}
                        </p>
                    )}

                    {!partsLoading &&
                        !partsError &&
                        partSkus.length === 0 && (
                            <p className={styles.notice}>
                                No compatible products were found.
                            </p>
                        )}

                    {productLoading && visibleCount === 0 && (
                        <p className={styles.notice} role="status">
                            Loading product images and descriptions...
                        </p>
                    )}

                    <div className={styles.productGrid}>
                        {visibleSkus.map(sku => {
                            const product =
                                productsBySku[sku.toUpperCase()];

                            return (
                                <article
                                    key={sku}
                                    className={styles.productCard}
                                >
                                    <div className={styles.productImageBox}>
                                        <PartPhoto
                                            src={product?.photo}
                                            alt={
                                                product?.title ??
                                                `Automotive part ${sku}`
                                            }
                                        />
                                    </div>

                                    <div className={styles.productContent}>
                                        <span className={styles.sku}>
                                            SKU: {sku}
                                        </span>

                                        <h3>
                                            {product?.title ??
                                                "Automotive Accessory"}
                                        </h3>

                                        {product?.categories[0] && (
                                            <span className={styles.category}>
                                                {product.categories[0]}
                                            </span>
                                        )}

                                        <p className={styles.description}>
                                            {product?.description ??
                                                "Product information is unavailable."}
                                        </p>

                                        {product?.url ? (
                                            <a
                                                href={product.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.productLink}
                                            >
                                                View Product Details ↗
                                            </a>
                                        ) : (
                                            <span className={styles.unavailable}>
                                                Details unavailable
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {productError && (
                        <p className={styles.notice} role="status">
                            {productError} The affected cards
                            display their SKU instead.
                        </p>
                    )}

                    {visibleCount < partSkus.length && (
                        <div className={styles.loadMoreSection}>
                            <p>
                                Showing {visibleCount} of{" "}
                                {partSkus.length} compatible products
                            </p>

                            <button
                                type="button"
                                onClick={loadMoreProducts}
                                disabled={productLoading || partsLoading}
                                className={styles.loadMoreButton}
                            >
                                {productLoading
                                    ? "Loading products..."
                                    : "Load More Parts"}
                            </button>
                        </div>
                    )}
                </section>
            )}

            <footer className={styles.source}>
                Vehicle fitment and accessory information from{" "}
                <a
                    href="https://aerpro.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Aerpro
                </a>.
                Confirm the exact vehicle and dashboard variant before
                purchasing. Product prices are not provided by Aerpro.
            </footer>
        </main>
    );
}
