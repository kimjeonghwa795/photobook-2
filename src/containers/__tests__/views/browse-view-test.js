/**
 * Test to check if the component renders correctly
 */
/* global it expect */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BrowseView from '@containers/photobook/Browse/BrowseView';

it('BrowseView renders correctly', () => {
  // getTabs prop expects a promise
  const mockPromise = new Promise((resolve) => {
    resolve();
  });

  const tree = renderer.create(
    <BrowseView getTabs={() => mockPromise} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
