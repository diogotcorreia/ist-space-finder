import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const ImagePopup = ({ id, onClose }) => {
  return (
    <PopupBackground onClick={onClose}>
      <AlignHelper />
      <StyledImg
        src={`https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${id}/blueprint`}
        alt="Space Blueprint"
      />
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
`

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
`

const AlignHelper = styled.span`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`

const ImagePopupPortal = ({ open, ...props }) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <ImagePopup {...props} />,
    document.querySelector("#modal-portal"),
  )
}

export default ImagePopupPortal
