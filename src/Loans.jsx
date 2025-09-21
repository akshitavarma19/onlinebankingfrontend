import React, { useState, useEffect } from 'react';
import './Loans.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    term: '',
    type: 'Personal',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanData = {
      ...form,
      amount: parseFloat(form.amount),
      term: parseInt(form.term),
    };

    fetch('http://localhost:2006/loans/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanData),
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        fetchLoans(); // refresh list
        setForm({ amount: '', term: '', type: 'Personal' });
      });
  };

  const fetchLoans = () => {
    fetch('http://localhost:2006/loans/getLoans')
      .then(res => res.json())
      .then(data => setLoans(data));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Loan Application</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Loan Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Loan Term (months)</label>
          <input
            type="number"
            name="term"
            value={form.term}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Loan Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Auto">Auto</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Application
        </button>
      </form>

      <div className="bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-xl font-semibold mb-4">Loan Applications</h2>
        {loans.length === 0 ? (
          <p>No loans submitted yet.</p>
        ) : (
          <table className="w-full border text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Term</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={loan.id}>
                  <td className="border px-4 py-2">₹{loan.amount}</td>
                  <td className="border px-4 py-2">{loan.term} months</td>
                  <td className="border px-4 py-2">{loan.type}</td>
                  <td className="border px-4 py-2">{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Loans;
