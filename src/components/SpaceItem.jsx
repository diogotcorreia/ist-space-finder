import React from "react"
import styled from "styled-components"
import Link from "./Link"

const SpaceItem = ({ node, style }) => {
  const { istId, name, type, path } = node

  return (
    <StyledRoot style={style}>
      <p>
        <SpaceTypeBadge>{formatType(type)}</SpaceTypeBadge>
        {` ${name} `}
        <SpaceIstID id={istId} />
      </p>
      <SpacePath path={path} />
    </StyledRoot>
  )
}

const SpacePath = ({ path = [] }) => {
  if (path.length === 0) return null
  return path
    .map((pathItem, i) => (
      <span key={i}>
        <SpaceTypeBadge>{pathItem.split(" ")[0]}</SpaceTypeBadge>
        {` ${pathItem.split(" ").slice(1).join(" ")}`}
      </span>
    ))
    .reduce((prev, curr) => [prev, ` ➧ `, curr])
}

const formatType = str =>
  `${str.charAt(0).toUpperCase()}${str
    .slice(1)
    .toLowerCase()
    .replace("_", " ")}`

const StyledRoot = styled.div`
  height: 100px;
  box-sizing: content-box;
  &:not(:first-child) {
    border-top: solid 1px #454545;
  }
`

const colorMap = {
  Campus: "#F39A27",
  Building: "#579ABE",
  Floor: "#03C03C",
  Room: "#C23B23",
  "Room subdivision": "#976ED7",
}

const SpaceTypeBadge = styled.span`
  background-color: ${props => colorMap[props.children]};
  border-radius: 10px;
  padding: 0 5px;
`
const SpaceIstID = ({ id }) => {
  return (
    <Link
      href={`https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${id}/blueprint`}
      target="_blank"
      rel="noopener"
    >
      <SpaceIstIDStyle>({id})</SpaceIstIDStyle>
    </Link>
  )
}

const SpaceIstIDStyle = styled.span`
  color: #9b9b9b;
`

export default SpaceItem
