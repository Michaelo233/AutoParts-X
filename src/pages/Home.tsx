
import HeroSection from "../components/home/HeroSection";
import AutoPartPage from "./AutoPartPage";
import AllAutoParts from "../components/parts/catalog/AllAutoPartsList";
import VehicleModels from "./VehicleModels";
import { useStorage } from "../context/StorageContext";
import styles from "./stylesPages/Home.module.css";

function Home() {
  const { searchTerm, setSearchTerm } = useStorage();

  return (
    <section className={styles.homeContainer}>
      <HeroSection
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <AllAutoParts />

      <AutoPartPage searchTerm={searchTerm} />

      <VehicleModels />
    </section>
  );
}

export default Home;
