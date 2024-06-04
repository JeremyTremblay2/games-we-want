import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameCard from '../components/GameCard';

test('renders game name', () => {
  const game = {
    id: 1,
    name: 'Sample Game',
    image: 'sample-image.jpg',
    firstReleaseDate: '2022-01-01',
  };

  render(
    <BrowserRouter>
      <GameCard game={game} />
    </BrowserRouter>
  );

  const gameNameElement = screen.getByText('Sample Game');
  expect(gameNameElement).toBeInTheDocument();
});

test('renders game release date', () => {
  const game = {
    id: 1,
    name: 'Sample Game',
    image: 'sample-image.jpg',
    firstReleaseDate: '2022-01-01',
  };

  render(
    <BrowserRouter>
      <GameCard game={game} />
    </BrowserRouter>
  );

  const releaseDateElement = screen.getByText('Released on 2022-01-01');
  expect(releaseDateElement).toBeInTheDocument();
});

test('renders default game when no game prop is provided', () => {
  render(
    <BrowserRouter>
      <GameCard />
    </BrowserRouter>
  );

  const defaultGameNameElement = screen.getByText('Default Game');
  expect(defaultGameNameElement).toBeInTheDocument();
});