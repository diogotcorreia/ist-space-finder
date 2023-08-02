import React, { useState } from "react"
import styled from "styled-components"
import ClockIcon from "./ClockIcon"
import Dialog from "./Dialog"
import ImagePopup from "./ImagePopup"
import LocationIcon from "./LocationIcon"
import Schedule from "./Schedule"

const SpaceItem = ({ node, style }) => {
  const [openImg, setOpenImg] = useState(false)
  const [openSched, setOpenSched] = useState(false)
  const { istId, name, type, path } = node

  const openImage = () => setOpenImg(true)
  const closeImage = () => setOpenImg(false)

  const openSchedule = () => setOpenSched(true)
  const closeSchedule = () => setOpenSched(false)

  const handleImageKeyDown = evt => evt.code === "Enter" && openImage()
  const handleScheduleKeyDown = evt => evt.code === "Enter" && openSchedule()

  const formattedType = formatType(type)
  const isRoom = formattedType === "Room"

  return (
    <StyledRoot style={style}>
      <div style={{ height: "100%" }}>
        <DivisionGrid isRoom={isRoom}>
          <div
            onClick={openImage}
            onKeyDown={handleImageKeyDown}
            role="button"
            tabIndex={0}
          >
            <p>
              <SpaceTypeBadge>{formattedType}</SpaceTypeBadge>
              {` ${name} `}
            </p>
            <LocationIcon />
            <SpacePath path={path} />
          </div>

          {isRoom && (
            <ClockDiv
              onClick={openSchedule}
              onKeyDown={handleScheduleKeyDown}
              role="button"
              tabIndex={0}
            >
              <ClockIcon />
            </ClockDiv>
          )}
        </DivisionGrid>
      </div>
      <Dialog open={openSched} onClose={closeSchedule}>
        <Schedule id={istId} />
      </Dialog>
      <ImagePopup id={istId} open={openImg} onClose={closeImage} />
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

const DivisionGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props["isRoom"] ? "80% 20%" : "100%")};
  height: 100%;
`

const ClockDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
