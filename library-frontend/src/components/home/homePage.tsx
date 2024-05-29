import React from 'react';
import Navbar from '../navbar/navbar';

function HomePage() {
  return (
    <div className='h-screen flex flex-col bg-gray-light'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center'>
            <div className='border bg-white p-4 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 bg-opacity-100'>
                <h1>Welcome (user)</h1>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
