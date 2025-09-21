import React, { useState, useEffect } from 'react';
import './Recharge.css';

const Recharge = () => {
  const [form, setForm] = useState({
    service: 'Mobile',
    number: '',
    amount: '',
    provider: '',
  });

  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:2006/recharge/addrecharge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
        // Refresh list after successful submission
        fetch('http://localhost:2006/recharge/getRecharges')
          .then((res) => res.json())
          .then((data) => setHistory(data))
          .catch((err) => console.error('❌ Failed to fetch recharge history:', err));
      })
      .catch(() => setMessage('❌ Recharge failed!'));

    setForm({ service: 'Mobile', number: '', amount: '', provider: '' });
  };

  useEffect(() => {
    fetch('http://localhost:2006/recharge/getRecharges')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('❌ Failed to fetch recharge history:', err));
  }, []);

  return (
    <div className="recharge-container">
      <h1>Recharge & Bill Payment</h1>
      {message && <p className="recharge-message">{message}</p>}
      <form className="recharge-form" onSubmit={handleSubmit}>
        <label>Service Type</label>
        <select name="service" value={form.service} onChange={handleChange} required>
          <option value="Mobile">Mobile Recharge</option>
          <option value="Electricity">Electricity Bill</option>
          <option value="DTH">DTH Recharge</option>
          <option value="Water">Water Bill</option>
        </select>

        <label>{form.service === 'Electricity' || form.service === 'Water' ? 'Customer Number' : 'Mobile/DTH Number'}</label>
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          required
        />

        <label>Service Provider</label>
        <input
          type="text"
          name="provider"
          value={form.provider}
          onChange={handleChange}
          required
        />

        <label>Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <button type="submit">Pay Now</button>
      </form>

      <div className="recharge-history">
        <h2>Transaction History</h2>
        {history.length === 0 ? (
          <p>No recharge or bill payments yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Number</th>
                <th>Provider</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.service}</td>
                  <td>{item.number}</td>
                  <td>{item.provider}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Recharge;
