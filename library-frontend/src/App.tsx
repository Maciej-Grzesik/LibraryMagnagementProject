import './App.css';
import Login from './components/login-form/login';
import BookTable from './components/book-table/bookTable';
import LoanTable from './components/loan-table/loanTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/browse' element={<BookTable/>}/>
        <Route path='/loans' element={<LoanTable/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
