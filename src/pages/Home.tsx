

import HeroSection from "../components/home/HeroSection";
import AutoPartPage from "./AutoPartPage";
import styles from "./stylesPages/Home.module.css";
import { useStorage } from "../context/StorageContext";

function Home() {
  const { searchTerm, setSearchTerm } = useStorage();

  return (
    <section className={styles.homeContainer}>
      <HeroSection
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <AutoPartPage searchTerm={searchTerm} />
    </section>
  );
}

export default Home;
