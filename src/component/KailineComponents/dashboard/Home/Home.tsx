
import Search from '../../../common/search/Search';
import style from'./home.module.css';


function Home() {
  return (
    <section className={style.dashboardContainer}>
      <h1 className={style.dashboardTitle}>Welcome to Auto parts X</h1>
      <Search searchValue="" handleSearchChange={() => {}} />
    </section>
  );
}

export default Home;