import React from "react";
import type { User } from "./types/carListInterface"
import "./MyParts.css";
// import { useNavigate } from "react-router-dom";
import { PartsNav } from "./navButton/NavButton";

interface MyPartsProps {
  user: User;
}

export const MyParts: React.FC<MyPartsProps> = ({ user }) => {
  // const navigate = useNavigate()

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

            <div key={part.partId} className="card">
              <img
                src={part.partImage}
                alt={part.partName}
                className="partImage"
              />

              <h3 className="partName">{part.partName}</h3>

              <p className="partDescription">{part.partDescription}</p>

              <p className="partPrice">
                Price: ${part.partPrice.toFixed(2)}
              </p>

              <small className="partId">Part ID: {part.partId}</small>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};