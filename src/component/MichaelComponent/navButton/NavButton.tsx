import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavButton.module.css'
export const PartsNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navContainer}>
      <button 
        type="button" 
        className={styles.navButton} 
        onClick={() => navigate('/myParts')}
      >
        My Parts
      </button>
      <span className={styles.separator}>|</span>
      <button 
        type="button" 
        className={styles.navButton} 
        onClick={() => navigate('/myParts/addPart')}
      >
        + Add New Part
      </button>
    </nav>
  );
};