import React from "react";
import type { User } from "../types/userParts"
import styles from "../components/parts/my-parts/MyParts.module.css";
import { PartsNav } from "../components/parts/my-parts/PartsNav";
import { PartCard } from "../components/parts/my-parts/PartCard";

interface MyPartsProps {
  user: User;
  onRemovePart: (partId: string) => void;
}

export const MyParts: React.FC<MyPartsProps> = ({ user, onRemovePart }) => {

  return (
    <section className={styles.container}>

      <h1 className={styles.title}>My Parts</h1>
      <p className={styles.owner}>Owner: {user.userName}</p>

      {/* Navigation Button to Add Parts.*/}

      <PartsNav/>

      {user.partsOwned.length === 0 ? (
        <p className={styles.emptyMessage}>No parts available.</p>
      ) : (

        <div className={styles.grid}>

          {user.partsOwned.map((part) => (
            <PartCard
              key={part.partId}
              part={part}
              onRemoveClick={onRemovePart}
            />
          ))}
        </div>
      )}
    </section>
  );
};