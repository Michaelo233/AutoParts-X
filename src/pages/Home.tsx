

import HeroSection from "../components/home/HeroSection";
import AutoPartPage from "./AutoPartPage";
import styles from "./stylesPages/Home.module.css";
import { useStorage } from "../context/StorageContext";
import VehicleModels from "./VehicleModels";

function Home() {
  const { searchTerm, setSearchTerm } = useStorage();

  return (
    <section className={styles.homeContainer}>
      <HeroSection
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <AutoPartPage searchTerm={searchTerm} />
      <VehicleModels />
    </section>
  );
}

export default Home;
