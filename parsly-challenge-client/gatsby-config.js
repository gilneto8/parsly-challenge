const path = require('path');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://localhost:8000',
    title: 'Parsly',
    description: 'Parsly challenge frontend project',
    author: 'Gil Neto',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/internal/layout/index.tsx`),
      },
    },
    // TODO: enable this when the project gets an icon
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: projectName,
    //     start_url: `${pathPrefix}/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#000000`,
    //     display: `browser`,
    //     icon: "src/assets/vendors/this-project/vendor-icon.png",
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        openAnalyzer: false,
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        reportFilename: path.resolve(
            __dirname,
            '.webpack-bundle-analyzer',
            'report.html',
        ),
      },
    },
  ],
}
