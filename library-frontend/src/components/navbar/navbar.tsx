import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../api/ApiProvider'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const { t, i18n } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const apiClient = useApi()
  const navigate = useNavigate()
  console.log(apiClient.getRole())

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
    <div className="fixed left-0 right-0 top-0">
      <nav className="border-gray-2 bg-blue-facebook">
        <div className="mx-auto flex w-11/12 items-center justify-between py-5">
          <a
            onClick={(e) => {
              e.preventDefault()
              navigate('/home')
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="font-bold text-white">{t('project')}</h1>
          </a>
          <div
            className="relative hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-blue-facebook px-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/home')
                  }}
                  className="block rounded px-3 py-2 text-white md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  {t('home')}
                </a>
              </li>
              <li>
                {apiClient.getRole() === 'ROLE_ADMIN' && (
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/add_user')
                    }}
                    className="block rounded px-3 py-2 text-white md:bg-transparent md:p-0"
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
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent"
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
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  {t('browse_loans')}
                </a>
              </li>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex w-full items-center justify-between px-3 py-2 text-white hover:bg-gray-100 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  {t('account')}{' '}
                  <svg
                    className="ms-2.5 h-2.5 w-2.5"
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
                  className={`absolute right-0 z-10 mt-2 ${isDropdownOpen ? 'block' : 'hidden'} w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownNavbarLink"
                  >
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/user_profile')
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
                        e.preventDefault()
                        navigate('/sign_out')
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
  )
}

export default Navbar
