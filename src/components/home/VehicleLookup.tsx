import { type FormEvent, useMemo, useState } from 'react';
import { useVehicleLookup } from '../../hooks/useVehicleLookup';
import styles from './VehicleLookup.module.css';

function currentYear(): number {
  return new Date().getFullYear();
}

export default function VehicleLookup() {
  const {
    manufacturers,
    models,
    isLoadingManufacturers,
    isLoadingModels,
    error,
    loadModels,
  } = useVehicleLookup();

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState(currentYear().toString());

  const sortedManufacturers = useMemo(
    () => [...manufacturers].sort((a, b) => a.makeName.localeCompare(b.makeName)),
    [manufacturers]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedYear = Number(selectedYear);
    await loadModels(selectedMake, parsedYear);
  };

  return (
    <section className={styles.lookupSection} aria-labelledby="vehicle-lookup-title">
      <h2 id="vehicle-lookup-title" className={styles.heading}>
        Vehicle Model Lookup
      </h2>
      <p className={styles.description}>
        Search manufacturers and models from NHTSA without affecting marketplace inventory data.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Manufacturer
          <select
            value={selectedMake}
            onChange={(event) => setSelectedMake(event.target.value)}
            disabled={isLoadingManufacturers}
          >
            <option value="">Select a manufacturer</option>
            {sortedManufacturers.map((manufacturer) => (
              <option key={manufacturer.makeId} value={manufacturer.makeName}>
                {manufacturer.makeName}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          Year
          <input
            type="number"
            min="1900"
            max={(currentYear() + 1).toString()}
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
          />
        </label>

        <button type="submit" disabled={isLoadingModels || isLoadingManufacturers}>
          {isLoadingModels ? 'Loading models...' : 'Find models'}
        </button>
      </form>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      {models.length > 0 ? (
        <section className={styles.results}>
          <h3>Matching Models</h3>
          <ul className={styles.resultList}>
            {models.map((model) => (
              <li key={model.modelId}>{model.modelName}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
