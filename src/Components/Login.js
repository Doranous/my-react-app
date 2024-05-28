import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Sending login request', { username, password });

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log('Response received:', response);
            const result = await response.json();
            console.log('Result:', result);

            if (response.ok) {
                alert('Success', 'Login successful');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('userType', result.userType);
                localStorage.setItem('username', username); // Stocăm numele utilizatorului

                if (result.userType === 'Doctori') {
                    navigate('/medic');
                } else {
                    navigate('/pacient');
                }
            } else {
                alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error during login request:', error);
            alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="header">
                <img
                    src={require('../assets/logo.png')}
                    alt="logo"
                    className="image"
                />
            </div>
            <div className="content">
                <h1 className="title">Autentificare</h1>
                <input
                    className="input"
                    placeholder="Nume"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    placeholder="Parolă"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button" onClick={handleLogin}>
                    Autentificare
                </button>
                <p className="text">
                    Nu ai cont?{' '}
                    <span className="link" onClick={() => navigate('/signup')}>
                        Înregistrează-te
                    </span>
                </p>
            </div>
            <div className="footer">
                <p>
                    <a href="#">Termeni și condiții</a> | <a href="#">Politica de confidențialitate</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
