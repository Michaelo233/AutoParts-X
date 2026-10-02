import React from "react";
import type { User } from "./types/carListInterface"
import "./MyParts.Module.css";
// import { useNavigate } from "react-router-dom";
import { PartsNav } from "./navButton/NavButton";
import { PartCard } from "./PartCard";

interface MyPartsProps {
  user: User;
  onRemovePart: (partId: string) => void;
}

export const MyParts: React.FC<MyPartsProps> = ({ user, onRemovePart }) => {

  return (
    <section className="container">

      <h1 className="title">My Parts</h1>
      <p className="owner">Owner: {user.userName}</p>

      {/* Navigation Button to Add Parts.*/}

      <PartsNav/>

      {user.partsOwned.length === 0 ? (
        <p className="emptyMessage">No parts available.</p>
      ) : (

        <div className="grid">

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