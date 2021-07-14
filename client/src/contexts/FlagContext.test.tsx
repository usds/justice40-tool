import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {URLFlagProvider, useFlags} from './FlagContext';

describe('URL params are parsed and passed to children', () => {
  describe('when the URL has a "flags" parameter set', () => {
    // We artificially set the URL to localhost?flags=1,2,3
    beforeEach(() => {
      window.history.pushState({}, 'Test Title', '/?flags=1,2,3,test=4');
    });
    describe('when using useFlags', () => {
      beforeEach(() => {
        const FlagConsumer = () => {
          const flags = useFlags();
          return (
            <>
              <div>{'1' in flags ? 'yes1' : 'no1'}</div>
              <div>{'2' in flags ? 'yes2' : 'no2'}</div>
              <div>{'3' in flags ? 'yes3' : 'no3'}</div>
              <div>{'4' in flags ? 'yes4' : 'no4'}</div>
              <div>{flags['test'] == 4 ? 'yes5' : 'no5'}</div>
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
        expect(screen.queryByText('yes5')).toBeInTheDocument();
      });
    });
  });
});
