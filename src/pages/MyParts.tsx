import React, { useMemo, useState } from 'react';
import type { User } from '../types/userParts';
import styles from '../components/parts/my-parts/MyParts.module.css';
import { PartsNav } from '../components/parts/my-parts/PartsNav';
import { PartCard } from '../components/parts/my-parts/PartCard';

interface MyPartsProps {
  user: User;
  users: User[];
  onRemovePart: (userName: string, partId: string) => Promise<boolean>;
  onToggleSale: (userName: string, partId: string, isForSale: boolean) => Promise<boolean>;
  error: string | null;
}

export const MyParts: React.FC<MyPartsProps> = ({
  user,
  users,
  onRemovePart,
  onToggleSale,
  error,
}) => {
  const [searchName, setSearchName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const displayedUser = useMemo(() => {
    if (!submittedName.trim()) {
      return user;
    }

    return users.find(
      (item) => item.userName.trim().toLowerCase() === submittedName.trim().toLowerCase()
    ) ?? null;
  }, [submittedName, user, users]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedName(searchName.trim());
  };

  return (
    <section className={styles.container}>
      <div className={styles.navPosition}>
        <PartsNav />
      </div>

      <form className={styles.filterBlock} onSubmit={handleSearch}>
        <label htmlFor="userNameSearch">Enter your user name:</label>
        <input
          id="userNameSearch"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter your user name"
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>

      {error && <p className={styles.emptyMessage} role="alert">{error}</p>}

      {displayedUser ? (
        <>
          <p className={styles.owner}>Owner: {displayedUser.userName}</p>

          <h1 className={styles.title}>My Parts</h1>

          {displayedUser.partsOwned.length === 0 ? (
            <p className={styles.emptyMessage}>No parts available.</p>
          ) : (
            <div className={styles.grid}>
              {displayedUser.partsOwned.map((part) => (
                <PartCard
                  key={part.partId}
                  part={part}
                  userName={displayedUser.userName}
                  onRemoveClick={onRemovePart}
                  onToggleSale={onToggleSale}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className={styles.emptyMessage}>No user found with that name.</p>
      )}
    </section>
  );
};