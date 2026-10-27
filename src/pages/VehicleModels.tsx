
import { useState } from "react";
import { useVehicleModels } from "../hooks/useVehicleModels";
import styles from "./VehicleModels.module.css";

export default function VehicleModels() {
  const [make, setMake] = useState("honda");
  const [year, setYear] = useState(2016);
  const [searched, setSearched] = useState(false);

  const {
    models,
    loading,
    error,
    loadModels,
  } = useVehicleModels();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSearched(true);
    void loadModels(make, year);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Vehicle Model</h1>

      <p>
        Find vehicle models by manufacturer and year.
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label htmlFor="make">Manufacturer</label>

        <select
          id="make"
          value={make}
          onChange={event => setMake(event.target.value)}
        >
          <option value="honda">Honda</option>
          <option value="toyota">Toyota</option>
          <option value="ford">Ford</option>
          <option value="chevrolet">Chevrolet</option>
        </select>

        <label htmlFor="year">Model Year</label>

        <input
          id="year"
          type="number"
          min={1996}
          max={new Date().getFullYear() + 1}
          value={year}
          onChange={event => setYear(Number(event.target.value))}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Find Models"}
        </button>
      </form>

      {loading && (
        <p role="status">
          Loading vehicle information...
        </p>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && searched && (
        <section aria-live="polite">
          <h2>Available Models</h2>

          {models.length === 0 ? (
            <p>No models found for this selection.</p>
          ) : (
            <ul className={styles.results}>
              {models.map(model => (
                <li key={model.id}>
                  {model.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <p className={styles.source}>
        Data provided by NHTSA vPIC.
        Vehicle listings do not confirm parts compatibility.
      </p>
    </main>
  );
}
