import HeroSection from '../Hero/HeroSection';
import style from'./home.module.css';


function Home() {
  return (
    <section className={style.dashboardContainer}>
      {/* Hero section is top of the page the user sees first */}
      <HeroSection />
      
      {/* Main content area for the dashboard, can include featured items, etc. */}
      <main className={style.dashboardMain}>
        <h2 className={style.dashboardTitle}>Featured Auto Parts</h2>
        <p className={style.dashboardDescription}>
          Your list of items or other feature page components can go here.
          </p>
      </main>
    </section>
  );
}
export default Home;