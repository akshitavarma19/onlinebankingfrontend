import React, { useState ,  useEffect } from 'react';
import './Transfer.css';
import { callapi } from './api';

const Transfer = () => {
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    note: '',
  });

  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransfer = {
      ...transferData,
      status: 'Success',
      date: new Date().toLocaleString(),
    };

    setHistory([newTransfer, ...history]);
    setMessage('✅ Transfer completed successfully!');
    setTransferData({ fromAccount: '', toAccount: '', amount: '', note: '' });

    // Optional: Integrate with backend API using fetch/axios
    
    fetch('http://localhost:2006/transfer/tarnsferMoney', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transferData),
    })
      .then((res) => res.text())
      .then((data) => {
        setMessage(data)
        fetch('http://localhost:2006/transfer/getTransfers')
        .then((res) => res.json())
        .then((data) => setHistory(data))
        .catch((err) => console.error('❌ Failed to fetch transactions:', err));
      })
      .catch((err) => setMessage('❌ Transfer failed!'));
      setTransferData({ fromAccount: '', toAccount: '', amount: '', note: '' });
  };
  useEffect(() => {
  fetch('http://localhost:2006/transfer/getTransfers')
    .then((res) => res.json())
    .then((data) => setHistory(data))
    .catch((err) => console.error('❌ Failed to fetch transactions:', err));
}, []);

  // transfer(){
  //   callapi("POST","http://localhost:2006/transfer/tarnsferMoney",data,)
  // }

  return (
    <div className="transfer-container">
      <h1>Transfer Funds</h1>
      {message && <p className="transfer-message">{message}</p>}

      <form className="transfer-form" onSubmit={handleSubmit}>
        <label>From Account</label>
        <input
          type="text"
          name="fromAccount"
          value={transferData.fromAccount}
          onChange={handleChange}
          required
        />

        <label>To Account</label>
        <input
          type="text"
          name="toAccount"
          value={transferData.toAccount}
          onChange={handleChange}
          required
        />

        <label>Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={transferData.amount}
          onChange={handleChange}
          required
        />

        

        <button type="submit">Send Money</button>
      </form>

      <div className="transfer-history">
        <h2>Transfer History</h2>
        {history.length === 0 ? (
          <p>No transfers yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((t, idx) => (
                <tr key={idx}>
                  <td>{t.fromAccount}</td>
                  <td>{t.toAccount}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.note}</td>
                  <td>{t.status}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transfer;
