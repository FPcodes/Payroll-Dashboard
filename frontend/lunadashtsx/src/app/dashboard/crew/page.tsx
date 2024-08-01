'use client'

import styles from '../styles.module.scss';
import CrewtableOne from '@/app/components/crewtableone';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';

const CrewPage = () => {
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Extract the token from the cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        
        // If the token is not found, redirect to the login page
        if (!token) {
            router.push('/');
            return;
        }

        const tokenValue = token.split('=')[1];

        // Fetch the protected data from the backend
        fetch('http://localhost:8000/dashboard/crew/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenValue}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend
            if (data.message) {
                setMessage(data.message);
            } else {
                router.push('/');
            }
        });
    }, [router]);

    return (
    <div className={styles.pageContainer}>
        <p>{message}</p>
        <h1>Luna NYC Electric Crew</h1>
        <CrewtableOne />
    </div>
    );
};

export default withAuth(CrewPage);