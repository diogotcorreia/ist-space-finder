import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <CenteredDiv>
        <h2>404 Not found</h2>
        <StyledLink to="/">Go Home &#8594;</StyledLink>
      </CenteredDiv>
    </Layout>
  )
}

export { Head } from "../components/Head"

const CenteredDiv = styled.div`
  text-align: center;
  flex: 1 1 auto;
`

const StyledLink = styled(Link)`
  color: #009de0;
  text-decoration: none;
`

export default NotFoundPage
