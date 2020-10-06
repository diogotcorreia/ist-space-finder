import React from "react"
import styled from "styled-components"
import Link from "./Link"

const Footer = () => {
  return (
    <FooterStyle>
      <p>
        Designed with{" "}
        <span role="img" aria-label="heart">
          &#x1F499;
        </span>{" "}
        by{" "}
        <Link href="https://diogotc.com" target="_blank" rel="noopener">
          Diogo Correia
        </Link>{" "}
        | Source code on{" "}
        <Link
          href="https://github.com/diogotcorreia/ist-space-finder"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Link>
      </p>
    </FooterStyle>
  )
}

const FooterStyle = styled.div`
  color: #aaa;
  text-align: center;
`

export default Footer
