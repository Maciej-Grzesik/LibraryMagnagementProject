import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../api/ApiProvider'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const apiClient = useApi();
  const role = apiClient.getRole();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className="fixed left-0 right-0 top-0 z-40 shadow-xl"
      style={{
        animation: 'fade-down 1s',
      }}
    >
      <nav className="border-gray-2 bg-st-tropaz-600">
        <div className="mx-auto flex w-11/12 items-center justify-between">
          <a
            onClick={(e) => {
              e.preventDefault()
              navigate('/home')
            }}
            className="flex items-center space-x-3 hover:cursor-pointer rtl:space-x-reverse"
          >
            <h1 className="font-bold text-white">{t('project')}</h1>
          </a>
          <div
            className="relative w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-row space-x-8 rounded-lg px-4 py-2 font-medium rtl:space-x-reverse">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/home')
                  }}
                  className="block rounded-2xl px-4 py-2 text-white duration-700 hover:cursor-pointer hover:bg-st-tropaz-900 hover:shadow-md"
                  aria-current="page"
                >
                  {t('home')}
                </a>
              </li>
              <li>
                {role === 'ROLE_ADMIN' && (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/add_user');
                    }}
                    className="block rounded-2xl px-4 py-2 text-white duration-700 hover:cursor-pointer hover:bg-st-tropaz-900 hover:shadow-md"
                    aria-current="page"
                  >
                    {t('add_user')}
                  </a>
                )}
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/browse')
                  }}
                  className="block rounded-2xl px-4 py-2 text-white duration-700 hover:cursor-pointer hover:bg-st-tropaz-900 hover:shadow-md"
                >
                  {t('browse_books')}
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/loans')
                  }}
                  className="block rounded-2xl px-4 py-2 text-white duration-700 hover:cursor-pointer hover:bg-st-tropaz-900 hover:shadow-md"
                >
                  {role === 'ROLE_ADMIN' ? t('browse_loans') : t('your_loans')}
                </a>
              </li>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className={`${isDropdownOpen ? 'rounded-b-none bg-white pl-24 text-st-tropaz-800 hover:bg-st-tropaz-100' : 'bg-st-tropaz-900 text-white hover:bg-st-tropaz-800'} flex h-full w-full items-center justify-between rounded-lg px-4 py-2 shadow-md duration-500 hover:shadow-2xl`}
                >
                  {t('account')}{' '}
                  <svg
                    className={`ms-2.5 h-2.5 w-2.5 ${isDropdownOpen ? 'rotate-180 text-st-tropaz-800 duration-200' : 'rotate-0 duration-200'}`}
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
                  className={`absolute right-0 z-10 mt-0 ${isDropdownOpen ? 'block animate-slideDown' : 'hidden'} w-32 rounded-b-lg bg-st-tropaz-50 font-semibold shadow-2xl`}
                >
                  <div className="flex flex-col">
                    <ul
                      className="text-st-tropaz-900 "
                      aria-labelledby="dropdownNavbarLink"
                    >
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/user_profile');
                          }}
                          className="justify-left flex  bg-white px-4 py-2 text-st-tropaz-800 duration-500 hover:cursor-pointer hover:bg-st-tropaz-100"
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            className="mr-2 mt-1"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                              clipRule="evenodd"
                            />
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {t('user_profile')}
                        </a>
                      </li>
                    </ul>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                      }}
                      className="justify-left flex  rounded-b-lg bg-white px-4 pb-2 pt-2 text-st-tropaz-800 duration-500 hover:cursor-pointer hover:bg-st-tropaz-100"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className="mr-2 mt-1"
                      >
                        <path d="M2 12l5 4v-3h9v-2H7V8z" />
                        <path d="M13.001 2.999a8.938 8.938 0 00-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 00-6.364-2.637z" />
                      </svg>
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
  )
}

export default Navbar;
