import React, { useState } from 'react';
import './Balance.css';

const CheckBalance = () => {
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleCheckBalance = (e) => {
    e.preventDefault();

    // Simulate PIN verification and balance retrieval
    if (pin === '1234') {
      // Replace with fetch/axios if connecting to backend
      setBalance('₹75,500.00');
      setError('');
    } else {
      setError('❌ Invalid PIN. Please try again.');
      setBalance(null);
    }
    setPin('');
  };

  return (
    <div className="balance-container">
      <h1>Check Account Balance</h1>
      <form className="balance-form" onSubmit={handleCheckBalance}>
        <label>Enter PIN</label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <button type="submit">Check Balance</button>
      </form>

      {error && <p className="error">{error}</p>}
      {balance && (
        <div className="balance-display">
          <p>Your Current Balance:</p>
          <h2>{balance}</h2>
        </div>
      )}
    </div>
  );
};

export default CheckBalance;
