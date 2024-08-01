'use client'

import DashChartOne from '@/app/components/dashchartone';
import DashtableOne from '@/app/components/dashtableone';
import withAuth from '../components/withAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

const DashboardPage = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (!token) {
          router.push('/');
          return;
      }

      const tokenValue = token.split('=')[1];
      fetch('http://localhost:8000/dashboard/', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${tokenValue}`,
          },
      })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
              setMessage(data.message);
          } else {
              router.push('/');
          }
      });
  }, []);

  return (
    <div id={styles.dashContainer}>
      <p>{message}</p>
      <DashtableOne />
      <DashChartOne />
    </div>
  );
};

export default withAuth(DashboardPage);