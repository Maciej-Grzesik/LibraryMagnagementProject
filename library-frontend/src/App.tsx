import './App.css';
import Login from './components/login-form/login';
import BookTable from './components/book-table/bookTable';
import LoanTable from './components/loan-table/loanTable';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import HomePage from './components/home/homePage';
import ApiProvider, { useApi } from './components/api/ApiProvider';
import AddUser from './components/user/AddUser';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/navbar/navbar';
import EditUser from './components/user/EditUser';

function App() {
  const location = useLocation();
  const apiClient = useApi();
  const userRole = apiClient.getRole();


  return (
    <I18nextProvider i18n={i18n}>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={userRole !== null ? <BookTable /> : <Navigate to="/" />} />
        <Route path="/loans" element={userRole !== null ? <LoanTable /> : <Navigate to="/" />} />
        <Route path="/home" element={userRole !== null ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/add_user" element={userRole === 'ROLE_ADMIN' ? <AddUser /> : <Navigate to="/" />} />
        <Route path="/user_profile" element={userRole !== null ? <EditUser/> : <Navigate to="/" />}/>
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
