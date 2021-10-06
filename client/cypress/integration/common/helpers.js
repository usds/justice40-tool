// Helper functions that need to be shared between both the src codebase
// and the cypress tests

export const hyphenizeString = (string) => {
  return string.split(' ').join('-').toLowerCase();
};

