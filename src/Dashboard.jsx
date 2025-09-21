import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div id="dashboard">
            {/* Top Header with Username */}
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                {username && (
                    <div className="user-info">
                        <span>**{username}</span>
                        <img src="user-icon.png" alt="User" className="user-icon" />
                    </div>
                )}
            </div>

            <div className="container">
                <div className="box" onClick={() => navigate('/Transfer')}>
                    <img src="transfer.png" alt="Transfer" />
                    <p>Transfer</p>
                </div>
                <div className="box" onClick={() => navigate('/Transactions')}>
                    <img src="transactions.webp" alt="Transactions" />
                    <p>Transactions</p>
                </div>
                <div className="box" onClick={() => navigate('/Recharge')}>
                    <img src="recharge.png" alt="Recharge & Bills" />
                    <p>Recharge & Bills</p>
                </div>
                <div className="box" onClick={() => navigate('/Loans')}>
                    <img src="loans.jpg" alt="Loans" />
                    <p>Loans</p>
                </div>
                <div className="box" onClick={() => navigate('/Cards')}>
                    <img src="cards.png" alt="Cards" />
                    <p>Cards</p>
                </div>
                <div className="box" onClick={() => alert('More Clicked!')}>
                    <img src="more.png" alt="More" />
                    <p>More</p>
                </div>
                <div className="box" onClick={() => navigate('/Balance')}>
                    <img src="balance.png" alt="Balance" />
                    <p>Balance</p>
                </div>
                <div className="box" onClick={() => alert('About Clicked!')}>
                    <img src="about.png" alt="About" />
                    <p>About</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
