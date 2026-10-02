import HeroSection from '../components/home/HeroSection';
import AutoPartPage from './AutoPartPage';
import style from './stylesPages/Home.module.css';


function Home() {
  return (
    <section className={style.homeContainer}>
      {/* Hero section is top of the page the user sees first */}
      <HeroSection />
      
      {/* Main content area for the dashboard, can include featured items, etc. */}
      <AutoPartPage />
    </section>
  );
}
export default Home;