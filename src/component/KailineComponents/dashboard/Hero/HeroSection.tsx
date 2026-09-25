import styles from './heroSection.module.css';
import Search from '../../../common/search/Search';

function HeroSection() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.subheadingContainer}>
                    <span className={styles.subheading}> Buy Smarter. Sell with Auto Parts X
                    </span>
                </div>
                {/* Main heading and description for the hero section */}
                <h1 className={styles.heroTitle}>
                    The Marketplace built for every part of the drive.
                </h1>
                <p className={styles.heroDescription}>
                    Discover a wide range of auto parts and services to keep your vehicle running smoothly.
                </p>
                
                {/* Search bar for auto parts and services */}
                <div className={styles.heroSearchContainer}>
                    <label htmlFor="search" className={styles.searchLabel}>
                        Search for auto parts and services:
                    </label>
                    <div className={styles.searchContainer}>
                        <Search searchValue="" handleSearchChange={() => {}} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;