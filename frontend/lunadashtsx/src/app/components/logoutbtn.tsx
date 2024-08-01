'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        document.cookie = 'refresh=; Max-Age=0; path=/';
        router.push('/');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
