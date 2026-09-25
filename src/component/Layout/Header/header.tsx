import styles from './Header.module.css';


function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="./Logo.jpg" alt="Auto Parts X Logo" className={styles.logo} />
      <h1 className={styles.headerText}>Auto parts X</h1>
    </header>
  );
}

export default Header;