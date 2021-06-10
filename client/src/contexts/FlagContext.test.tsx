import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {URLFlagProvider, useFlags} from './FlagContext';

describe('URL params are parsed and passed to children', () => {
  describe('when the URL has a "flags" parameter set', () => {
    // We artificially set the URL to localhost?flags=1,2,3
    beforeEach(() => {
      window.history.pushState({}, 'Test Title', '/?flags=1,2,3');
    });
    describe('when using useFlags', () => {
      beforeEach(() => {
        const FlagConsumer = () => {
          const flags = useFlags();
          return (
            <>
              <div>{flags.includes('1') ? 'yes1' : 'no1'}</div>
              <div>{flags.includes('2') ? 'yes2' : 'no2'}</div>
              <div>{flags.includes('3') ? 'yes3' : 'no3'}</div>
              <div>{flags.includes('4') ? 'yes4' : 'no4'}</div>
            </>
          );
        };
        render(
            <URLFlagProvider location={location}>
              <FlagConsumer />
            </URLFlagProvider>,
        );
      });

      it('gives child components the flag values', async () => {
        expect(screen.queryByText('yes1')).toBeInTheDocument();
        expect(screen.queryByText('yes2')).toBeInTheDocument();
        expect(screen.queryByText('yes3')).toBeInTheDocument();
        expect(screen.queryByText('yes4')).not.toBeInTheDocument();
      });
    });
  });
});
