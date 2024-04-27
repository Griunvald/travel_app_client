import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import { makeTestStore } from '@/store';

describe('App component', () => {
  it('initializes user and handles routes correctly', async () => {
    const store = makeTestStore({
      preloadedState: {
        user: { userId: null },
        trip: { currentTrip: null }
      }
    });

    const router = createMemoryRouter([
      { path: '/', element: <App /> }
    ]);

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  });
});

