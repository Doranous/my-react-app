import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chart, registerables } from 'chart.js';
import pacientImage from '../assets/pacient.png';
import roomImage from '../assets/house.png';
import './Pacient.css';

Chart.register(...registerables);

const Pacient = () => {
    const [patientInfo, setPatientInfo] = useState({});
    const [patientName, setPatientName] = useState('');
    const [sensorData, setSensorData] = useState([]);
    const [pulse, setPulse] = useState(72); // Example value, you should replace it with real data
    const [temperature, setTemperature] = useState('36.6°C'); // Example value
    const [humidity, setHumidity] = useState('45%'); // Example value
    const ecgData = [72, 75, 78, 74, 73, 76]; // Example data

    useEffect(() => {
        const patientNameFromStorage = localStorage.getItem('username');
        setPatientName(patientNameFromStorage);

        const fetchPatientInfo = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://localhost:5000/api/patient/${userId}`);
                const data = await response.json();
                setPatientInfo(data);
            } catch (error) {
                console.error('Error fetching patient info:', error);
            }
        };

        const fetchSensorData = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://localhost:5000/api/patient/${userId}/sensors`);
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchPatientInfo();
        fetchSensorData();
    }, []);

    return (
        <div className="container">
             <h1>Bun venit, {patientName}!</h1>
            <div className="image-container">
                <img src={pacientImage} alt="Pacient" className="image" />
            </div>
            <div className="patient-info">
                <p><strong>ID:</strong> {patientInfo.UserID}</p>
                <p><strong>Nume:</strong> {patientInfo.Nume}</p>
                <p><strong>Prenume:</strong> {patientInfo.Prenume}</p>
                <p><strong>Vârstă:</strong> {patientInfo.Varsta}</p>
                <p><strong>CNP:</strong> {patientInfo.CNP}</p>
                <p><strong>Adresă:</strong> {patientInfo.Adresa}</p>
                <p><strong>Număr Telefon:</strong> {patientInfo.NumarTelefon}</p>
                <p><strong>Email:</strong> {patientInfo.Email}</p>
                <p><strong>Profesie:</strong> {patientInfo.Profesie}</p>
                <p><strong>Loc Muncă:</strong> {patientInfo.LocMunca}</p>
            </div>

            <div className="card">
                <h2>Date în timp real</h2>
                <div className="body-container">
                    <img src={pacientImage} alt="Body" className="body-image" />
                    <div className="stats-container">
                        <p className="label">Puls</p>
                        <CircularProgressbar
                            value={pulse}
                            maxValue={100}
                            text={`${pulse} bpm`}
                            styles={buildStyles({
                                pathColor: `rgba(226, 63, 68, ${pulse / 100})`,
                                textColor: '#E23F44',
                            })}
                            className="progress-circle"
                        />
                    </div>
                </div>
                </div>
                
                <div>
                    <p className="label">ECG</p>
                    <Line
                        data={{
                            labels: ['1', '2', '3', '4', '5', '6'],
                            datasets: [
                                {
                                    label: 'ECG',
                                    data: ecgData,
                                    borderColor: 'rgba(13, 71, 161, 1)',
                                    backgroundColor: 'rgba(13, 71, 161, 0.2)',
                                    fill: true,
                                },
                            ],
                        }}
                        width={400}
                        height={220}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                x: {
                                    beginAtZero: true,
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                        className="line-chart"
                    />
                </div>
            

            <div className="card">
                <h2>Date încăpere</h2>
                <div className="body-container">
                    <img src={roomImage} alt="Room" className="body-image" />
                    <div className="stats-container">
                        <p className="label">Temperatură</p>
                        <p className="value">{temperature}</p>
                        <p className="label">Umiditate</p>
                        <p className="value">{humidity}</p>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Pacient;
