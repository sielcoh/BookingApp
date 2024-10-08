import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import AccountPage from './pages/AccountPage';
import AddNewPlace from './pages/AddNewPlace';
import PlacesPage from './pages/PlacesPage';
import BookingPage from './pages/BookingPage';
import SinglePlace from './pages/SinglePlace';
import BookingsPage from './pages/BookingsPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/account/placepage' element={<PlacesPage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage/>} />
          <Route path='/account/addnewplace' element={<AddNewPlace />} />
          <Route path='/account/addnewplace/:id' element={<AddNewPlace />} />
          <Route path='/place/:id' element={<SinglePlace />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
