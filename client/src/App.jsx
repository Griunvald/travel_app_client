import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { ProvidersWrapper } from './contexts/ProvidersWrapper.jsx';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import TripsList from './components/pages/TripsList';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import Trip from './components/pages/Trip';
import NotFound from './components/pages/NotFound';

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
                path: '/trip',
                element: <Trip />
            },
            {
                path: '*',
                element: <NotFound/>
            }
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
