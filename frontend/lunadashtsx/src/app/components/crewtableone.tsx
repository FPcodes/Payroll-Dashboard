'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/styles.module.scss'

// Define the structure of the data expected from the API
interface CrewTableOneTS {
  firstname: string;
  lastname: string;
  totalgrosspay: number;
  totaltaxpaidbyempl: number;
  totalnetpay: number;
}

const CrewtableOne = () => {
  const [data, setData] = useState<CrewTableOneTS[]>([]); // Initialize state for the table data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/crewtableone/');
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
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Gross Pay</th>
            <th>Total Tax Paid</th>
            <th>Total Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => ( // Map over the data array to create table rows
            <tr key={index}>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.totalgrosspay}</td>
              <td>{item.totaltaxpaidbyempl}</td>
              <td>{item.totalnetpay}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default CrewtableOne;
