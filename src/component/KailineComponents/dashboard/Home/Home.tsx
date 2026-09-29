import HeroSection from '../Hero/HeroSection';
import style from'./home.module.css';


function Home() {
  return (
    <section className={style.homeContainer}>
      {/* Hero section is top of the page the user sees first */}
      <HeroSection />
      
      {/* Main content area for the dashboard, can include featured items, etc. */}
      <main className={style.homeMain}>
        <h2 className={style.homeTitle}>Featured Auto Parts</h2>
        <p className={style.homeDescription}>
          Your list of items or other feature page components can go here.
          </p>
      </main>
    </section>
  );
}
export default Home;