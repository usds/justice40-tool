// Helper functions that need to be shared between both the src codebase
// and the cypress tests

/**
 * This function will take a string and hyphenize it.
 * For example:
 * Whitehouse.gov => whitehouse-gov
 * Privacy Policy => privacy-policy
 *
 * @param {string} string
 * @return {string}
 */
export const hyphenizeString = (string) => {
  return string.split(/\.| /).join('-').toLowerCase();
};
