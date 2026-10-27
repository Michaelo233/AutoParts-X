

import { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import AutoPartPage from "./AutoPartPage";
import styles from "./stylesPages/Home.module.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className={styles.homeContainer}>
      <HeroSection onSearch={setSearchTerm} />

      <AutoPartPage searchTerm={searchTerm} />
    </section>
  );
}

export default Home;
