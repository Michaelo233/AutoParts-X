import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.footerText}>
       <span>Michael Obikwere</span> <br />
       <span>Kailine Lima</span> <br /> 
       <span>Juliet Azagba</span>
       </p>
       <p className={styles.footerYear}>Copyright Pixell River Financial {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;