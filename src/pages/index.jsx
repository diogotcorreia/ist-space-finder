import { graphql } from "gatsby"
import React, { useState } from "react"
import Layout from "../components/Layout"
import Searchbar from "../components/Searchbar"
import SpacesList from "../components/SpacesList"

export default function Home({ data }) {
  const [search, setSearch] = useState("")
  return (
    <Layout>
      <Searchbar setSearch={setSearch} />
      <SpacesList search={search} spaces={data.allSpace.edges} />
    </Layout>
  )
}

export const query = graphql`
  query homePageQuery {
    allSpace(filter: { name: { ne: "" } }) {
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
