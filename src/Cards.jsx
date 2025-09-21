import React, { useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [cards, setCards] = useState([
    {
      cardNumber: '**** **** **** 1234',
      holderName: 'John Doe',
      expiry: '12/26',
      type: 'Debit',
      status: 'Active',
    },
    {
      cardNumber: '**** **** **** 5678',
      holderName: 'John Doe',
      expiry: '08/25',
      type: 'Credit',
      status: 'Blocked',
    },
  ]);

  const toggleCardStatus = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].status =
      updatedCards[index].status === 'Active' ? 'Blocked' : 'Active';
    setCards(updatedCards);
  };

  return (
    <div className="cards-container">
      <h1>My Cards</h1>
      {cards.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        <div className="card-list">
          {cards.map((card, index) => (
            <div className={`card ${card.type.toLowerCase()}`} key={index}>
              <h2>{card.type} Card</h2>
              <p><strong>Card Number:</strong> {card.cardNumber}</p>
              <p><strong>Card Holder:</strong> {card.holderName}</p>
              <p><strong>Expiry:</strong> {card.expiry}</p>
              <p><strong>Status:</strong> {card.status}</p>
              <button
                className={card.status === 'Active' ? 'block-btn' : 'unblock-btn'}
                onClick={() => toggleCardStatus(index)}
              >
                {card.status === 'Active' ? 'Block Card' : 'Unblock Card'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
