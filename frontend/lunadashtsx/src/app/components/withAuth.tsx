'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';

const withAuth = (WrappedComponent: NextPage) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (!token) {
                router.push('/');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
