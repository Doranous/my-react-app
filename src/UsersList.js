import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                console.log('Data fetched:', response.data);  // Logare a datelor
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: '20px 0',
            fontSize: '18px',
            textAlign: 'left'
        },
        th: {
            padding: '12px 15px',
            border: '1px solid #ddd',
            backgroundColor: '#f4f4f4'
        },
        td: {
            padding: '12px 15px',
            border: '1px solid #ddd'
        },
        trEven: {
            backgroundColor: '#f9f9f9'
        }
    };

    return (
        <div>
            <h1>Users List</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>UserID</th>
                        <th style={styles.th}>Username</th>
                        <th style={styles.th}>Password</th>
                        <th style={styles.th}>UserType</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.UserID} style={index % 2 === 0 ? styles.trEven : null}>
                            <td style={styles.td}>{user.UserID}</td>
                            <td style={styles.td}>{user.Username}</td>
                            <td style={styles.td}>{user.Password}</td>
                            <td style={styles.td}>{user.UserType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;