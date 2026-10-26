import { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import AutoPartPage from "./AutoPartPage";
import style from "./stylesPages/Home.module.css";

/**
 * Home coordinates the search input and product catalogue.
 * It passes the submitted search term to AutoPartPage.
 */
function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className={style.homeContainer}>
      <HeroSection onSearch={setSearchTerm} />

      <AutoPartPage searchTerm={searchTerm} />
    </section>
  );
}

export default Home;