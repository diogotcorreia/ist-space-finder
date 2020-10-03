/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const axios = require("axios")

const capitalize = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const crawlSpace = async id => {
    const { data: space } = await axios.get(
      `https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${id}`
    )

    const content = { name: space.name, type: space.type }

    const parent = space.parentSpace
      ? createNodeId(
          `${capitalize(space.parentSpace.type)}-${space.parentSpace.id}`
        )
      : null
    const children = (space.containedSpaces || []).map(childSpace =>
      createNodeId(`${capitalize(childSpace.type)}-${childSpace.id}`)
    )

    createNode({
      ...content,
      id: createNodeId(`${capitalize(space.type)}-${space.id}`),
      parent,
      children,
      internal: {
        //type: capitalize(space.type),
        type: "Space",
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    })

    await Promise.all(
      (space.containedSpaces || []).map(childSpace => crawlSpace(childSpace.id))
    )
  }

  const { data: topLevelSpaces } = await axios.get(
    `https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/`
  )

  await Promise.all(topLevelSpaces.map(space => crawlSpace(space.id)))

  return
}
