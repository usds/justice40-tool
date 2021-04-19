module.exports = {
  siteMetadata: {
    author: 'Shelby Switzer',
    title: `Justice40 Climate and Environment Justice Screening Tool`,
    description: `Front end for Justice40 mappping tool project`,
    navigation: [
      {
        items: [{ text: 'Leaflet', link: '/' }],
      },
      {
        items: [{ text: 'OpenLayers', link: '/openlayers' }],
      },
    ],
    secondaryLinks: [
      { text: 'Secondary link', link: '/' },
      { text: 'Another secondary link', link: '/' },
    ],

    /**
     * Search.gov configuration
     * 
     * 1. Create an account with Search.gov https://search.usa.gov/signup
     * 2. Add a new site.
     * 3. Add your site/affiliate name here.
     */
    searchgov: {
      
      // You should not change this.
      endpoint: 'https://search.usa.gov',
      
      // replace this with your search.gov account
      affiliate: 'federalist-uswds-example',
      
      // replace with your access key
      access_key: 'xX1gtb2RcnLbIYkHAcB6IaTRr4ZfN-p16ofcyUebeko=',
      
      // this renders the results within the page instead of sending to user to search.gov
      inline: true, 
    },
  },
  pathPrefix: process.env.BASEURL || '/',
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-leaflet`
  ],
};
