import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import SpacesList from "../components/SpacesList"

export default function Home({ data }) {
  return (
    <Layout>
      <SpacesList spaces={data.allSpace.edges} />
    </Layout>
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
