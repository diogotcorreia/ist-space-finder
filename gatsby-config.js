/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-source-ist-spaces`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-head`,
    `gatsby-plugin-workerize-loader`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Open Sans"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-load-script`,
      options: {
        src: "https://analytics.diogotc.com/umami.js",
        async: true,
        defer: true,
        "data-website-id": "764d372a-8a7b-4d6f-9541-eaa3df6a2c32",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "IST Space Finder",
        short_name: "Space Finder",
        start_url: "/",
        background_color: "#202124",
        theme_color: "#009de0",
        display: "standalone",
        icon: "src/images/ist_logo.png",
        icons: [
          {
            src: `/favicons/maskable_icon.png`,
            sizes: `769x769`,
            type: `image/png`,
            purpose: `maskable`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/index`],
      },
    },
  ],
}
