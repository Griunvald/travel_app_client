import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from '@/components/layout/Navbar';
import { makeTestStore } from '@/store';

describe('Navbar with Logo component', () => {
  it('shows correct link in Logo for non logged in user', () => {
    const initialState = {
      user: { userId: null, username: null },
      trip: { currentTripId: null }
    };
    const store = makeTestStore(initialState);

    const router = createMemoryRouter([
      { path: "/", element: <Navbar /> },
      { path: "/landing", element: <div>Landing Page</div> },
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
});


