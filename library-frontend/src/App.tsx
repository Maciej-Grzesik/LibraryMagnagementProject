import './App.css';
import Login from './components/login-form/login';
import BookTable from './components/book-table/bookTable';
import LoanTable from './components/loan-table/loanTable';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './components/home/homePage';
import ApiProvider from './components/api/ApiProvider';
import AddUser from './components/add-user/AddUser';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/browse' element={<BookTable/>}/>
          <Route path='/loans' element={<LoanTable/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/add_user' element={<AddUser/>}/>
        </Routes>
      </ApiProvider>
    </BrowserRouter>
    
  )
}

export default App;
