import { graphql } from "gatsby"
import React from "react"
import SpaceItem from "../components/SpaceItem"

export default function Home({ data }) {
  return (
    <div>
      {data.allSpace.edges.map(({ node }) => (
        <SpaceItem node={node} key={node.id} />
      ))}
    </div>
  )
}

export const query = graphql`
  query homePageQuery {
    allSpace(sort: { fields: name }, filter: { name: { ne: "" } }) {
      edges {
        node {
          id
          istId
          name
          type
          path
        }
      }
    }
  }
`
