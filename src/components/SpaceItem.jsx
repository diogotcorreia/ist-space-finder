import React, {useState} from "react"
import styled from "styled-components"
import ImagePopup from "./ImagePopup"
import LocationIcon from "./LocationIcon"
import SchedulePopup from "./SchedulePopup";
import ClockIcon from "./ClockIcon";

const SpaceItem = ({node, style}) => {
	const [openImg, setOpenImg] = useState(false)
	const [openSched, setOpenSched] = useState(false)
	const {istId, name, type, path} = node

	const openImage = () => setOpenImg(true)
	const closeImage = () => setOpenImg(false)
	const openSchedule = () => setOpenSched(true)
	const closeSchedule = () => setOpenSched(false)

	const handleKeyDown = evt => evt.keyCode === 13 && openImage() // KeyCode 13 = ENTER

	return (
		<StyledRoot style={style}>
			<div
				style={{height: "100%"}}
				onKeyDown={handleKeyDown}
				role="button"
				tabIndex={0}
			>
				<DivisionGrid>
					<div onClick={openImage}>
						<p>
							<SpaceTypeBadge>{formatType(type)}</SpaceTypeBadge>
							{` ${name} `}

						</p>
						<LocationIcon/>
						<SpacePath path={path}/>
					</div>

					<ClockDiv onClick={openSchedule}>
						<ClockIcon/>
					</ClockDiv>
				</DivisionGrid>
			</div>
			<SchedulePopup open={openSched} id={istId} onClose={closeSchedule}/>
			<ImagePopup id={istId} open={openImg} onClose={closeImage}/>
		</StyledRoot>
	)
}

const SpacePath = ({path = []}) => {
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
  grid-template-columns: 80% 20%;
`

const ClockDiv = styled.div`
  float: right;
  margin-left: 50%;
  margin-top: 45px;
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
