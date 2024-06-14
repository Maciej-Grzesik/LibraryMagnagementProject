import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const apiClient = useApi();
  const navigate = useNavigate();
  console.log(apiClient.getRole())

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-40 shadow-xl'
    style={{
      animation: 'fade-down 1s'
    }}>
      <nav className="bg-blue-facebook border-gray-2">
        <div className="w-11/12 flex items-center justify-between mx-auto py-5">
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate('/home');
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className='text-white font-bold'>
              {t('project')}
            </h1>
          </a>
          <div
            className="hidden w-full md:block md:w-auto relative"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-facebook md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/home');
                  }}
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  {t('home')}
                </a>
              </li>
              <li>
                {apiClient.getRole() === 'ROLE_ADMIN' && (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/add_user');
                  }}
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  {t('add_user')}
                </a>
                )}
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/browse');
                  }}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  {t('browse_books')}
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/loans');
                  }}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  {t('browse_loans')}
                </a>
              </li>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                >
                  {t('account')}{' '}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownNavbar"
                  className={`absolute right-0 mt-2 z-10 ${isDropdownOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownNavbarLink"
                  >
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/user_profile');
                        }}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {t('user_profile')}
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/sign_out');
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('sign_out')}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;