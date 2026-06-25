import { Routes, Route } from 'react-router-dom';
import Layout from '../src/Layout';
import Home from './app/page';
import About from './app/about/page';
import Login from './app/Login/page';
import AdminLogin from './app/AdminLogin/page';
import SignUp from './app/Signup/page';
import VerifyEmailPage from './app/verify-email/page';
import Blog from './app/Blog/page';
import Contact from './app/Contact/page';
import CorporateTour from './app/corporateTour/page';
import Cycling from './app/Cycling/page';
import Package from './app/Package/page';
import PackageDetail from './app/Carddetail/page';
import Trekking from './app/trekking/page';
import Trippage from './app/Trippage/page';
import Transport from './app/Transport/page';
import StudentTour from './app/StudentTours/page'
import Spirtiualtours from './app/spiritualTours/page'
import Destinations from './app/destinations/page'
// import Carddetail from '../../my-frontend/src/app/Carddetail/page';
import BikeTour from './app/biketour/page';
import DashboardLayout from './app/Dashboard/layout';
import DashboardPage from './app/Dashboard/page';
import NewListingPage from './app/Dashboard/new/page';
import EditListingPage from './app/Dashboard/edit/[id]/page';
import AdminUsersPage from './app/Dashboard/users/page';
import AdminUserDetailPage from './app/Dashboard/users/[userId]/page';
import UserDashboardPage from './app/user-dashboard/page';
import UserProfilePage from './app/profile/page';




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/corporateTour" element={<CorporateTour />} />
        <Route path="/Cycling" element={<Cycling />} />
        <Route path="/package" element={<Package />} />
        <Route path="/package/:id" element={<PackageDetail />} />
        <Route path="/trekking" element={<Trekking />} />
        <Route path="/trippage" element={<Trippage />} /> 
        <Route path="/Transport" element={<Transport/>} />
        <Route path="/StudentTours" element={<StudentTour />} />
        <Route path="/spiritualTours" element={<Spirtiualtours/>} />
        <Route path="/destinations" element={<Destinations />} />
        {/* <Route path="/carddetail" element={<Carddetail />} /> */}
        <Route path="/biketour" element={<BikeTour />} />
        <Route path="/user-dashboard" element={<UserDashboardPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="new" element={<NewListingPage />} />
          <Route path="edit/:id" element={<EditListingPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:userId" element={<AdminUserDetailPage />} />
        </Route>
      </Route>

    </Routes>
  );
}


