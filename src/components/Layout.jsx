import React from "react"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #202124;
    color: #fff;
    height: 100%;
    margin: 0;
  }
`

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
  height: 100vh;
  margin: auto;
`

export default Layout
