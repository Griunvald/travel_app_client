import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from './features/user/userThunks';
import { getCurrentTripId } from './features/trip/tripThunks';
import { getProfileAndSaveToLocalStorage, getProfileFromLocalStorage } from './features/profile/profileThunks';

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import TripsList from './components/pages/TripsList';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import StartTrip from './components/pages/StartTrip';
import CurrentTrip from './components/pages/CurrentTrip';
import NotFound from './components/pages/NotFound';
import FullTrip from './components/pages/FullTrip';
import Profile from './components/pages/Profile';
import PublicProfile from './components/pages/PublicProfile';
import AboutMe from './components/pages/AboutMe';
import Tutorial from './components/pages/Tutorial';
import TermsAndConditions from './components/pages/TermsAndConditions.jsx';
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import Toast from './components/common/Toast';
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);

const NavbarWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="flex-grow">
        <div className="px-2 mx-auto max-w-screen-xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <TripsList />
      },
      {
        path: '/trips-list',
        element: <TripsList />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/join',
        element: <Join />
      },
      {
        path: '/start-trip',
        element: <StartTrip />
      },
      {
        path: '/current-trip',
        element: <CurrentTrip />
      },
      {
        path: '/full-trip/:userId/:tripId',
        element: <FullTrip />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/public-profile/:userId',
        element: <PublicProfile />
      },
      {
        path: '/aboutme',
        element: <AboutMe />
      },
      {
        path: '/tutorial',
        element: <Tutorial />
      },
      {
        path: '/terms',
        element: <TermsAndConditions />
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);

  useEffect(() => {
    dispatch(initializeUser());
    if (userId) {
      dispatch(getCurrentTripId(userId));
      dispatch(getProfileAndSaveToLocalStorage());
    }
  }, [dispatch, userId]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Toast />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

