import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { ProvidersWrapper } from './contexts/ProvidersWrapper.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TripsList from './components/pages/TripsList';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import StartTrip from './components/pages/StartTrip';
import CurrentTrip from './components/pages/CurrentTrip';
import NotFound from './components/pages/NotFound';
import FullTrip from './components/pages/FullTrip';
import Profile from './components/pages/Profile';

const NavbarWrapper = () => {
    return (
        <>
         <Navbar/ >
        <main className="flex-grow">
            <div className="px-2 mx-auto max-w-screen-xl">
                <Outlet />
            </div>
        </main>
                <Footer />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <NavbarWrapper />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/landing',
                element: <Landing />
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
                path: '/full-trip/:userId',
                element: <FullTrip/>
            },
             {
                path: '/profile',
                element: <Profile />
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
