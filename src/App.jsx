import './index.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavMenu from './Components/NavMenu';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import RentalVehicles from './Pages/RentalVehicles';
import RentalVehicleDesc from './Pages/RentalVehicleDesc';
import BuyVehicles from './Pages/BuyVehicles';
import VehicleListing from './Pages/VehicleListing';
import UserSalesList from './Pages/UserSalesList';
import LostAndFound from './Pages/LostAndFound';
import YourList from './Pages/YourList';
import BuyVehiclesDesc from './Pages/BuyVehiclesDesc';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import FAQ from './Pages/FAQ';
import RentalGallery from './Pages/RentalGallery';
import Dashboard from './Admin/Dashboard/Dashboard';
import Sidebar from './Admin/Sidebar';
import Vehicles from './Admin/Vehicle Management/Vehicles';
import AddNewVehicle from './Admin/Vehicle Management/AddNewVehicle';
import Transactions from './Admin/Sales/Transactions';
import ActiveRentals from './Admin/Rentals/ActiveRentals';
import RentalHistory from './Admin/Rentals/RentalHistory';
import Users from './Admin/User/Users';
import AdminLostAndFound from './Admin/LostAndFound/LostAndFound';
import Wishlist from './Admin/Wishlist/Wishlist';
import Profile from './Pages/Profile';
import UserBookings from './Pages/UserBookings';
import ReportedItems from './Pages/ReportedItems';
import History from './Pages/History'; 

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/Login' || location.pathname === '/Register';

  const handleLogin = async (credentials) => {
    // Perform login logic here
    const isAdmin = credentials.username === 'admin' && credentials.password === 'admin'; // Example check
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/RentalVehicles');
    }
  };

  return (
    <>
      {!isAdminRoute && <NavMenu />} {/* Navigation Menu */}
      {isAdminRoute && <Sidebar />} {/* Sidebar for admin routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RentalVehicles" element={<RentalVehicles />} />
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RentalVehicleDesc" element={<RentalVehicleDesc />} />
        <Route path="/BuyVehicles" element={<BuyVehicles />} />
        <Route path="/VehicleListing" element={<VehicleListing />} />
        <Route path="/UserSalesList" element={<UserSalesList />} />
        <Route path="/LostAndFound" element={<LostAndFound />} />
        <Route path="/YourList" element={<YourList />} />
        <Route path="/BuyVehiclesDesc" element={<BuyVehiclesDesc />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/RentalGallery" element={<RentalGallery />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/UserBookings" element={<UserBookings />} />
        <Route path="/ReportedItems" element={<ReportedItems />} />
        <Route path="/History" element={<History />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/vehicles" element={<Vehicles />} />
        <Route path="/admin/addnewvehicles" element={<AddNewVehicle />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="/admin/activerentals" element={<ActiveRentals />} />
        <Route path="/admin/rentalhistory" element={<RentalHistory />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/lostandfound" element={<AdminLostAndFound />} />
        <Route path="/admin/wishlist" element={<Wishlist />} />
      </Routes>
      {!isAuthRoute && !isAdminRoute && <Footer />} {/* Footer for non-auth and non-admin routes */}
    </>
  );
}

export default App;