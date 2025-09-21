import React, { useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [form, setForm] = useState({
    type: 'Credit',
    amount: '',
    description: ''
  });

  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...form,
      id: Date.now(),
      amount: parseFloat(form.amount).toFixed(2),
      date: new Date().toLocaleString(),
    };
    setTransactions([newTransaction, ...transactions]);
    setForm({ type: 'Credit', amount: ''});
  };

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>

        <label>Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />


        <button type="submit">Add Transaction</button>
      </form>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className={tx.type.toLowerCase()}>
                  <td>{tx.date}</td>
                  <td>{tx.type}</td>
                  <td>{tx.description}</td>
                  <td>{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
