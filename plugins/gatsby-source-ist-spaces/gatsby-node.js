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
  cache,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode, touchNode } = actions

  const lastUpdated = await cache.get("lastUpdated")
  // 30 days cache
  if (lastUpdated > Date.now() - 1000 * 60 * 60 * 24 * 30) {
    getNodesByType("Space").forEach(node => touchNode(node))
    return
  }

  await cache.set("lastUpdated", Date.now())

  const crawlSpace = async (id, path = []) => {
    const { data: space } = await axios.get(
      `https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${id}`,
    ).catch(function(error) {
      console.log(error.toJSON());
      throw error;
    });

    const content = {
      istId: space.id,
      name: (space.name || "").trim(),
      type: space.type,
      path,
    }

    const parent = space.parentSpace
      ? createNodeId(
        `${capitalize(space.parentSpace.type)}-${space.parentSpace.id}`,
      )
      : null
    const children = (space.containedSpaces || []).map(childSpace =>
      createNodeId(`${capitalize(childSpace.type)}-${childSpace.id}`),
    )

    createNode({
      ...content,
      id: createNodeId(`${capitalize(space.type)}-${space.id}`),
      parent,
      children,
      internal: {
        type: "Space",
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    })

    await Promise.all(
      (space.containedSpaces || []).map(childSpace =>
        crawlSpace(childSpace.id, [
          ...path,
          `${capitalize(space.type)} ${space.name}`,
        ]),
      ),
    )
  }

  const { data: topLevelSpaces } = await axios.get(
    `https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/`,
  ).catch(function(error) {
    console.log(error.toJSON());
    throw error;
  });

  await Promise.all(topLevelSpaces.map(space => crawlSpace(space.id)))

  return
}
