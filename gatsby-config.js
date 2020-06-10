require('dotenv').config({path: `.env`})

module.exports = {
  siteMetadata: {
    title: `What Happened on May 30?`,
    description: `A document of escalating conflict in downtown Chicago`,
    twitterUsername: `@southsideweekly`,
    url: "https://ssw-protest-timeline.netlify.app/", // No trailing slash allowed!
    image: "/card.jpg"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `${process.env.GATSBY_AIRTABLE_KEY}`,
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `${process.env.GATSBY_BASE_ID}`,
            tableName: 'Trump Tower website backend',
            mapping: {'image':'fileNode'}
          }
        ]
      }
    },
    `gatsby-plugin-styled-components`
  ],
}
