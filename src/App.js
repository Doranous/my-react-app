import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Main from './Components/Main';
import SignUp1 from '../src/Components/SignUp1'; // Asigură-te că denumirea este corectă, inclusiv majusculele
import Medic from './Components/Medic';
import Pacient from './Components/Pacient';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp1 />} />
                <Route path="/main" element={<Main />} />
                <Route path="/medic" element={<Medic />} />
                <Route path="/pacient" element={<Pacient />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
