import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import App from '@/App';
import { makeTestStore } from '@/store';

describe('App component', () => {
  it('renders correctly with initial null user and trip data', async () => {
    const initialState = {
      user: { userId: null, username: null },
      trip: { currentTrip: null },
    };

    const store = makeTestStore(initialState);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Road Cronicles')).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

