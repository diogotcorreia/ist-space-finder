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

const buildPath = (spaces, id) => {
  let parentId = spaces[id].containedIn?.id;
  const path = [];

  while (parentId != null) {
    let parent = spaces[parentId];
    path.unshift(`${capitalize(parent.type)} ${parent.name}`);
    parentId = parent.containedIn?.id;
  }

  return path;
}

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

  const { data: campi } = await axios.get(
    `https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/spaces/campi`,
  ).catch(function(error) {
    console.log(error.toJSON());
    throw error;
  });

  const queue = [];
  const spaces = {};

  for (const campus of campi) {
    spaces[campus.id] = campus;
    queue.push(...campus.contains.map(space => space.id));
  }

  while (queue.length > 0) {
    const spaceId = queue.pop();
    const { data: space } = await axios.get(
      `https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/spaces/${spaceId}`,
    ).catch(function(error) {
      console.log(error.toJSON());
      throw error;
    });

    spaces[spaceId] = space;
    queue.push(...(space.contains || []).map(space => space.id));
  }

  for (const space of Object.values(spaces)) {
    const path = buildPath(spaces, space.id);

    let type = space.type;
    // ROOM and ROOM_SUBDIVISION are swapped upstream: https://github.com/ist-dsi/tecnico-api/pull/1
    if (type === "ROOM") {
      type = "ROOM_SUBDIVISION";
    } else if (type === "ROOM_SUBDIVISION") {
      type = "ROOM";
    }

    const content = {
      istId: space.id,
      name: (space.name || "").trim(),
      type,
      path,
    }

    const parent = space.containedIn
      ? createNodeId(
        `${capitalize(space.containedIn.type)}-${space.containedIn.id}`,
      )
      : null
    const children = (space.contains || []).map(childSpace =>
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
  }

}
