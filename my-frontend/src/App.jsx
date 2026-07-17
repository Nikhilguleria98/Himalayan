import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../src/Layout';

// Load page code only after its route is requested. This keeps the initial
// homepage bundle small, especially for the dashboard and editor routes.
const Home = lazy(() => import('./app/page'));
const About = lazy(() => import('./app/about/page'));
const Login = lazy(() => import('./app/Login/page'));
const AdminLogin = lazy(() => import('./app/AdminLogin/page'));
const SignUp = lazy(() => import('./app/Signup/page'));
const VerifyEmailPage = lazy(() => import('./app/verify-email/page'));
const Blog = lazy(() => import('./app/Blog/page'));
const BlogDetails = lazy(() => import('./app/Blog/BlogDetails'));
const Contact = lazy(() => import('./app/Contact/page'));
const CorporateTour = lazy(() => import('./app/corporateTour/page'));
const Cycling = lazy(() => import('./app/Cycling/page'));
const Package = lazy(() => import('./app/Package/page'));
const PackageDetail = lazy(() => import('./app/Carddetail/page'));
const Trekking = lazy(() => import('./app/trekking/page'));
const Trippage = lazy(() => import('./app/Trippage/page'));
const Transport = lazy(() => import('./app/Transport/page'));
const StudentTour = lazy(() => import('./app/StudentTours/page'));
const Spirtiualtours = lazy(() => import('./app/spiritualTours/page'));
const Destinations = lazy(() => import('./app/destinations/page'));
const BikeTour = lazy(() => import('./app/biketour/page'));
const DiscoverTrips = lazy(() => import('./app/discoverTrips/page'));
const DashboardLayout = lazy(() => import('./app/Dashboard/layout'));
const DashboardPage = lazy(() => import('./app/Dashboard/page'));
const BlogEditor = lazy(() => import('./app/Dashboard/blogs/page'));
const NewListingPage = lazy(() => import('./app/Dashboard/new/page'));
const EditListingPage = lazy(() => import('./app/Dashboard/edit/[id]/page'));
const AdminUsersPage = lazy(() => import('./app/Dashboard/users/page'));
const AdminUserDetailPage = lazy(() => import('./app/Dashboard/users/[userId]/page'));
const UserDashboardPage = lazy(() => import('./app/user-dashboard/page'));
const UserProfilePage = lazy(() => import('./app/profile/page'));



export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
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
        <Route path="/discoverTrips" element={<DiscoverTrips />} />
        <Route path="/user-dashboard" element={<UserDashboardPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="new" element={<NewListingPage />} />
          <Route path="edit/:id" element={<EditListingPage />} />
          <Route path="blogs/new" element={<BlogEditor />} />
          <Route path="blogs/edit/:id" element={<BlogEditor />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:userId" element={<AdminUserDetailPage />} />
        </Route>
        <Route path="/admin/blog/create" element={<DashboardLayout />}>
          <Route index element={<BlogEditor />} />
        </Route>
      </Route>

    </Routes>
    </Suspense>
  );
}

// Client application router setup


