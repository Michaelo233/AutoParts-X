
import { useState } from "react";
import { useStorage } from "../../context/StorageContext";
import styles from "./StorageConsent.module.css";

export default function StorageConsent() {
  const { consent, allowStorage } = useStorage();
  const [dismissed, setDismissed] = useState(false);

  // Hide the banner after consent is granted.
  if (consent) {
    return null;
  }

  // Hide the banner for this session if declined.
  if (dismissed) {
    return null;
  }

  return (
    <aside
      className={styles.consentBanner}
      aria-label="Local storage consent"
    >
      <h3 className={styles.title}>
        Save Your Preferences?
      </h3>

      <p className={styles.message}>
        AutoParts-X can save your searches on this device
        so they are available when you return.
      </p>

      <div className={styles.actions}>
        <button
          className={styles.allowButton}
          type="button"
          onClick={allowStorage}
        >
          Allow
        </button>

        <button
          className={styles.declineButton}
          type="button"
          onClick={() => setDismissed(true)}
        >
          Not Now
        </button>
      </div>
    </aside>
  );
}
