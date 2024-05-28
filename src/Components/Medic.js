import React, { useEffect, useState } from 'react';
import './Medic.css';
import doctorImage from '../assets/doctor.png';

const Medic = () => {
    const [patients, setPatients] = useState([]);
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        // Setează numele medicului
        const doctorNameFromStorage = localStorage.getItem('username');
        setDoctorName(doctorNameFromStorage);

        // Preia lista utilizatorilor din baza de date
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                // Filtrează utilizatorii pentru a afișa doar pacienții
                const filteredPatients = data.filter(user => user.UserType === 'Pacienti');
                setPatients(filteredPatients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div className="container">
            <h1>Bun venit, {doctorName}!</h1>
            <img src={doctorImage} alt="Medic" className="image" />
            <p>Aceasta este pagina pentru medici. Aici vei găsi informații despre pacienții tăi.</p>
            <div className="patient-list">
                {patients.map(patient => (
                    <div key={patient.UserID} className="patient-card">
                        <h2>{patient.Username}</h2>
                        <p>ID: {patient.UserID}</p>
                        <p>Tip utilizator: {patient.UserType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Medic;
