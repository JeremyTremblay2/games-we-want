import { render, screen } from '@testing-library/react'
import * as constants from '../utils/constants';

test('API_BASE_URL should be defined', () => {
  expect(constants.API_BASE_URL).toBeDefined();
});