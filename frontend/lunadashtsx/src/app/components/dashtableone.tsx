'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/dashboard/styles.module.scss'

// Define the structure of the data expected from the API
interface DashTableOneTS {
  firstname: string;
  role: string;
  email: string;
}

const DashtableOne = () => {
  const [data, setData] = useState<DashTableOneTS[]>([]); // Initialize state for the table data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/dashtableone/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, handle the error state here
      }
    }
    fetchData();
  }, []); // The empty dependency array means this effect will only run once, similar to componentDidMount

  return (
      <table className={styles.dashTableOneWrapper}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => ( // Map over the data array to create table rows
            <tr key={index}>
              <td>{item.firstname}</td>
              <td>{item.role}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default DashtableOne;
