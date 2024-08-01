'use client'

import { useRouter } from 'next/navigation';
import { useEffect} from 'react';
import Projecttableone from '@/app/components/projecttableone';
import withAuth from '../../components/withAuth';
import styles from '../styles.module.scss';

function ProjectsPage() {

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
        fetch('http://localhost:8000/dashboard/projects', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenValue}`,
            },
        })
        .then(response => response.json())
    }, [router]);

  return (
    <div className={styles.pageContainer}>
      <h1>Projects</h1>
      <Projecttableone />
    </div>
  );
}

export default withAuth(ProjectsPage);