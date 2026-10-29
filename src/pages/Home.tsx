
import HeroSection from '../components/home/HeroSection';
import AutoPartPage from './AutoPartPage';
import AllAutoParts from '../components/parts/catalog/AllAutoPartsList';
import style from './stylesPages/Home.module.css';

function Home() {
  return (
    <section className={style.homeContainer}>
      {/* Hero section is top of the page the user sees first */}
      <HeroSection />

      {/* Search for available auto parts */}
      <AllAutoParts />

      {/* Main content area for the dashboard */}
      <AutoPartPage />
    </section>
  );
}

export default Home;
