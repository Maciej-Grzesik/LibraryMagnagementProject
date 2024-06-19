import React from 'react';
import Navbar from '../navbar/navbar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function Error401() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useApi();

  console.log(api.getRole());
  return (
    <>
      <Navbar />
      <div
        className="flex h-screen flex-col bg-st-tropaz-100"
        style={{
          animation: 'fade-in 2s',
        }}
      >
        <div className="flex flex-grow items-center justify-center">
          <div className="mb-4 flex flex-col items-center rounded-lg border bg-st-tropaz-50 bg-opacity-100 p-4 px-8 pb-8 pt-6 text-2xl font-semibold shadow-xl">
            <h1>{t('error_401_title')}</h1>
            <p>{t('error_401_message')}</p>
            <a onClick={() => navigate('/home')} className="mt-4 text-blue-500 underline">
              {t('go_back_home')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error401;
