'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/dashboard/styles.module.scss'

// Define the structure of the data expected from the API
interface DashTableTwoTS {
  projectname: string;
  streetaddress: string;
  city: string;
  startdate: string;
  enddate: string;
}

const DashtableTwo = () => {
  const [data, setData] = useState<DashTableTwoTS[]>([]); // Initialize state for the table data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/dashtabletwo/');
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
      <table className={styles.dashTableTwoWrapper}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => ( // Map over the data array to create table rows
            <tr key={index}>
              <td>{item.projectname}</td>
              <td>{item.streetaddress}</td>
              <td>{item.city}</td>
              <td>{item.startdate}</td>
              <td>{item.enddate}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default DashtableTwo;
