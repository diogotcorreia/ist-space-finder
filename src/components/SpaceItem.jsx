import React, { useState } from "react"
import styled from "styled-components"
import ImagePopup from "./ImagePopup"
import LocationIcon from "./LocationIcon"

const SpaceItem = ({ node, style }) => {
  const [open, setOpen] = useState(false)
  const { istId, name, type, path } = node

  const openImage = () => setOpen(true)
  const closeImage = () => setOpen(false)

  const handleKeyDown = evt => evt.keyCode === 13 && openImage() // KeyCode 13 = ENTER

  return (
    <StyledRoot style={style}>
      <div
        style={{ height: "100%" }}
        onClick={openImage}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <p>
          <SpaceTypeBadge>{formatType(type)}</SpaceTypeBadge>
          {` ${name} `}
        </p>
        <LocationIcon />
        <SpacePath path={path} />
      </div>
      <ImagePopup id={istId} open={open} onClose={closeImage} />
    </StyledRoot>
  )
}

const SpacePath = ({ path = [] }) => {
  if (path.length === 0) return <i>None</i>
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
  cursor: pointer;
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

export default SpaceItem
