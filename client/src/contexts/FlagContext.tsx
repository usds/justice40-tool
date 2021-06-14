import * as React from 'react';
import * as queryString from 'query-string';

/**
 * FlagContext stores feature flags and passes them to consumers
 */
 interface IFlagContext {
  /**
   * Contains a list of all currently-active flags
   */
  flags: string[];
}

const FlagContext = React.createContext<IFlagContext>({flags: []});

/**
 * `useFlags` returns all feature flags.
 *
 * @return {Flags[]} flags All project feature flags
 */
const useFlags = () : string[] => {
  const {flags} = React.useContext(FlagContext);
  return flags;
};

interface IURLFlagProviderProps {
  children: React.ReactNode,
  location: Location
}

/**
 * `URLFlagProvider` is a provider for FlagContext.
 *   It is passed the current URL and parses the
 *   "flags" parameter, assumed to be a comma-separated
 *   list of currently-active flags.
 * @param {URL} location : the current URL object
 * @param {ReactNode} children : the children components
 * @return {ReactNode} URLFlagProvider component
 **/
const URLFlagProvider = ({children, location}: IURLFlagProviderProps) => {
  const flagString = queryString.parse(location.search).flags;
  let flags: string[] = [];
  if (flagString && typeof flagString === 'string') {
    flags = (flagString as string).split(',');
  }
  console.log(JSON.stringify(location), JSON.stringify(flags));

  return (
    <FlagContext.Provider
      value={{flags}}>
      {children}
    </FlagContext.Provider>
  );
};

export {FlagContext, URLFlagProvider, useFlags};
