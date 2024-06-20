import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

function HomePage() {
  const apiClient = useApi();
  const {t, i18n} = useTranslation();
  const [username, setUsername] = useState<string>('user');
  const [userRole, setUserRole] = useState<string>('userRole')

  useEffect(() => {
    const username = apiClient.getUsername();
    const role = apiClient.getRole();

    if (username && role) {
        setUsername(username);
        setUserRole(role);
    }
  }, []);

  return (
    <>
    <div className='h-screen flex flex-col bg-gray-light'
    style={{
      animation: 'fade-in 2s',
      }}>
        <div className='flex-grow flex justify-center items-center'>
            <div className='border bg-white p-4 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100 flex flex-col items-center text-2xl font-semibold'>
                <h1>{t('welcome')} {username}</h1>
                <p>{t('logged_as')} {userRole.substring(5,6) + userRole.substring(6).toLowerCase()}</p>
            </div>
        </div>
    </div>
    </>
  );
}

export default HomePage;
