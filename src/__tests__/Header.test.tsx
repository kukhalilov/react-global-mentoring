import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import Header from '../components/header/Header';

const mockResponse = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

describe('Header component', () => {
  it('displays the correct header text "Find your movie"', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const headerText = getByText('Find your movie');
    expect(headerText).toBeInTheDocument();
  });

  it('displays an input field with the correct placeholder text "What do you want to watch?"', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const input = getByPlaceholderText('What do you want to watch?');
    expect(input).toBeInTheDocument();
  });

  it('displays a button with the text "Search"', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const button = getByText('Search');
    expect(button).toBeInTheDocument();
  });

  it('displays a button with the text "+ Add Movie"', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const button = getByText('+ Add Movie');
    expect(button).toBeInTheDocument();
  });

  it('navigates to the correct URL when clicking the "Search" button', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const input = getByPlaceholderText('What do you want to watch?');
    await userEvent.type(input, 'Avengers');
    const button = getByText('Search');
    await userEvent.click(button);
    expect(window.location.href).toContain('search/Avengers');
  });

  it('navigates to the correct URL when pressing the "Enter" after typing in the input field', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const input = getByPlaceholderText('What do you want to watch?');
    await userEvent.type(input, 'Avengers');
    await userEvent.type(input, '{enter}');
    expect(window.location.href).toContain('search/Avengers');
  });
});
