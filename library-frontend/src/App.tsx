import './App.css';
import Login from './components/login-form/login';
import BookTable from './components/book-table/bookTable';
import LoanTable from './components/loan-table/loanTable';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './components/home/homePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/browse' element={<BookTable/>}/>
        <Route path='/loans' element={<LoanTable/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
