/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-source-ist-spaces`,
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
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
  ],
}
