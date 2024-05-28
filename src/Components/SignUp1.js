import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert('Parolele nu se potrivesc');
            return;
        }

        console.log('Sending sign-up request', { username, password });

        try {
            const response = await fetch('http://localhost:5000/signup', {
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
                alert('Success', 'Sign-up successful');
                if (result.userType === 'medic') {
                    navigate('/medic');
                } else {
                    navigate('/pacient');
                }
            } else {
                alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error during sign-up request:', error);
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
                <h1 className="title">Înregistrare</h1>
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
                <input
                    className="input"
                    placeholder="Confirmă Parola"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="button" onClick={handleSignUp}>
                    Înregistrare
                </button>
                <p className="text">
                    Ai deja un cont?{' '}
                    <span className="link" onClick={() => navigate('/login')}>
                        Autentificare
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUp1;
