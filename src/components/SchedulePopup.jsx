import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Schedule from "./Schedule"

const SchedulePopup = ({ id, onClose }) => {
  return (
    <PopupBackground onClick={onClose}>
      <StyledDiv>
        <Schedule id={id} />
      </StyledDiv>
    </PopupBackground>
  )
}

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000077;
  padding: 50px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;
`

const StyledDiv = styled.div`
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
  background: black;
`

const SchedulePopupPortal = ({ open, ...props }) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <SchedulePopup {...props} />,
    document.querySelector("#modal-portal")
  )
}

export default SchedulePopupPortal
