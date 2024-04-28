import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { makeTestStore } from '@/store.js';

describe('Navbar Component', () => {
  it('renders logo, discover journeys link, and login/join buttons for non-logged-in users', () => {
    const initialState = {
      user: { userId: null, username: null },
      trip: { currentTripId: null }
    };
    const store = makeTestStore(initialState);

    const router = createMemoryRouter([
      { path: "/", element: <Navbar /> },
      { path: "/trips-list", element: <div>Trips List Page</div> },
      { path: "/login", element: <div>Login Page</div> },
      { path: "/join", element: <div>Join Page</div> },
    ]);

    render(
      <Provider store={store}>
        <RouterProvider router={router}>
          <Navbar />
        </RouterProvider>
      </Provider>
    );

    expect(screen.getByText('Road Cronicles')).toBeInTheDocument();
    expect(screen.getByText('Discover Journeys')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Join' })).toBeInTheDocument();
  });
});

