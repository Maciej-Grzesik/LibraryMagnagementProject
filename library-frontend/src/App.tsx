import './App.css';
import Login from './components/login-form/login';
import BookTable from './components/book-table/bookTable';
import LoanTable from './components/loan-table/loanTable';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import HomePage from './components/home/homePage';
import ApiProvider from './components/api/ApiProvider';
import AddUser from './components/add-user/AddUser';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/navbar/navbar';

function App() {
  const location = useLocation();

  return (
    <I18nextProvider i18n={i18n}>
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/browse' element={<BookTable />} />
          <Route path='/loans' element={<LoanTable />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/add_user' element={<AddUser />} />
        </Routes>
    </I18nextProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
    <ApiProvider>
      <App />
      </ApiProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
