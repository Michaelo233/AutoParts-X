import styles from './heroSection.module.css';
import Search from '../../../common/search/Search';

function HeroSection() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.subheading_container}>
                    <span className={styles.subheading}> Buy Smarter. Sell with Auto Parts X</span>
                    <div className={styles.subheading_line}></div>
                </div>
                <h1 className={styles.heroTitle}>Your One-Stop Shop for Auto Parts and Services</h1>
                <p className={styles.heroDescription}>Discover a wide range of auto parts and services to keep your vehicle running smoothly.</p>
                <div className={styles.heroSearchContainer}>
                    <label htmlFor="search" className={styles.searchLabel}>
                        Search for auto parts and services:
                    </label>
                    <div className={styles.searchBar}>
                        <span className="search-icon">🔍</span>
                        <Search searchValue="" handleSearchChange={() => {}} />
                        <button className={styles.searchButton}>Search</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;