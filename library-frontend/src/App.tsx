import './App.css';
import Login from './components/login-form/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='browse' element={</>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
