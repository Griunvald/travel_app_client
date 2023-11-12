import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { ProvidersWrapper } from './contexts/ProvidersWrapper.jsx';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import TripsList from './components/pages/TripsList';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import StartTrip from './components/pages/StartTrip';
import CurrentTrip from './components/pages/CurrentTrip';
import NotFound from './components/pages/NotFound';
import FullTrip from './components/pages/FullTrip';
import Profile from './components/pages/Profile';
import Logout from './components/features/Logout';

const NavbarWrapper = () => {
    return (
        <>
         <Navbar/ >
        <main className="flex-grow">
            <div className="px-2 mx-auto max-w-screen-xl">
                <Outlet />
            </div>
        </main>
                <Sidebar />
                <Footer />
        </>
    )
}

const ProfileLayout = () => {
  return (
    <>
      <Profile>
          <Outlet />
      </Profile>
    </>
  );
}

const router = createBrowserRouter([
    {
        element: <NavbarWrapper />,
        children: [
            {
                path: '/',
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
                path: '/full-trip/:userId',
                element: <FullTrip/>
            },
             {
                path: 'profile',
                element: <ProfileLayout />,
                children: [
                  { index: true, element: <div>Profile Overview Content</div> }, 
                  { path: 'manage-trip', element: <div>Manage Trip Content</div> },
                  { path: 'logout', element: <Logout/> },
                ]
          },
            {
                path: '*',
                element: <NotFound/>
            },
        ]
    }
])

function App() {
  return (
    <>
        <div className="flex flex-col min-h-screen">
                <ProvidersWrapper>
                <RouterProvider router={router} />
                </ProvidersWrapper>
            </div>
        </>
      )
    }

export default App
