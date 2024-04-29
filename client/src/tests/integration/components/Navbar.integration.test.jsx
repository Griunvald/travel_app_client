import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from '@/components/layout/Navbar';
import Join from '@/components/pages/Join';
import Login from '@/components/pages/Login';
import NotFound from '@/components/pages/NotFound';
import Landing from '@/components/pages/Landing';
import TripsList from '@/components/pages/TripsList';
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import App from '@/App';
import { makeTestStore } from '@/store';


describe('Navbar with Logo component', () => {

  beforeEach(() => {
    global.window.innerWidth = 768;
    global.window.dispatchEvent(new Event('resize'));
  });

  it('shows correct link in Logo for non logged in user', () => {
    const initialState = {
      user: { userId: null, username: null },
      trip: { currentTripId: null }
    };
    const store = makeTestStore(initialState);

    const router = createMemoryRouter([
      { path: "/", element: <Navbar /> },
      { path: "/landing", element: <div></div> },
      { path: "*", element: <div>404 Not Found</div> }
    ]);

    render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <Navbar />
        </RouterProvider>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /Road Cronicles/i });
    expect(logoLink).toHaveAttribute('href', '/landing');
  });

  it('shows correct link in Logo for logged in user', () => {
    const initialState = {
      user: { userId: 1, username: "Blue" },
      trip: { currentTripId: 1 }
    };
    const store = makeTestStore(initialState);

    const router = createMemoryRouter([
      { path: "/", element: <Navbar /> },
      { path: "/landing", element: <div>Landing Page</div> },
      { path: "/trips-list", element: <div>Trips list</div> },
      { path: "*", element: <div>404 Not Found</div> }
    ]);

    render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <Navbar />
        </RouterProvider>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /Road Cronicles/i });
    expect(logoLink).toHaveAttribute('href', '/trips-list');
  });

  it('open "Join" form on "Join" button click', async () => {

    const initialState = {
      user: { userId: null, username: null },
      trip: { currentTripId: null }
    };

    const store = makeTestStore(initialState);

    const NavbarWrapper = () => {
      return (
        <>
          <Navbar />
          <Sidebar />
          <main>
            <div>
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      )
    }

    const router = createMemoryRouter([
      {
        element: <NavbarWrapper />,
        children: [
          {
            path: '/',
            element: <div>Landing</div>
          },
          {
            path: '/landing',
            element: <div>Landing</div>
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
            path: '*',
            element: <NotFound />
          },
        ]
      }
    ])

    render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <Navbar />
          <App />
        </RouterProvider>
      </Provider>
    );

    const link = screen.getByRole('link', { name: /Join/i });
    fireEvent.click(link);
    const joinText = await screen.findByText('Join Road Cronicles', {}, { timeout: 5000 });
    expect(joinText).toBeInTheDocument();
  })
});


