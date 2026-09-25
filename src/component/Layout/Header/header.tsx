import styles from './Header.module.css';


function Header() {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerText}>Auto parts X</h1>
    </header>
  );
}

export default Header;