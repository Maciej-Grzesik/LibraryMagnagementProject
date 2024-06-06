import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';

function HomePage() {
  const [username, setUsername] = useState<string>('user');
  const [userRole, setUserRole] = useState<string>('userRole')

  useEffect(() =>{
    const storedUsername = sessionStorage.getItem('username');
    const storedUserRole = sessionStorage.getItem('userRole');

    if (storedUsername && storedUserRole) {
      setUsername(storedUsername);
      setUserRole(storedUserRole);
    }
  }, []);

  return (
    <div className='h-screen flex flex-col bg-gray-light'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center'>
            <div className='border bg-white p-4 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100'>
                <h1>Welcome {username}</h1>
                <p>You are logged as {userRole.substring(5,6) + userRole.substring(6).toLowerCase()}</p>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
