module.exports = {
  /* 
  This is to workaround the following error when building locally:
  Warning: React.createElement: type is invalid -- expected a string 
  (for built-in components) or a class/function (for composite components) but got: undefined.
    at IndexPage
  We will need to fix this before running `gatsby build`
  */
  flags: {
      DEV_SSR: false
  },
  siteMetadata: {
    title: "Justice40",
  },
  plugins: ['gatsby-plugin-scss-typescript'],
};
