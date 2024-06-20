import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

function HomePage() {
  const apiClient = useApi();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState<string>('user');
  const [userRole, setUserRole] = useState<string>('userRole');

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
      
      <div
        className="flex h-screen flex-col bg-st-tropaz-100"
        style={{
          animation: 'fade-in 2s',
        }}
      >
        <div className="flex flex-grow items-center justify-center">
          <div className="mb-4 flex flex-col items-center rounded-lg border bg-st-tropaz-50 bg-opacity-100 p-4 px-8 pb-8 pt-6 text-2xl font-semibold shadow-xl">
            <h1>
              {t('welcome')} {username}!
            </h1>
            <p>
              {t('logged_as')}{' '}
              {userRole.substring(5, 6) + userRole.substring(6).toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
