import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const Dialog = ({ open, onClose, children }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  return (
    <StyledDiv ref={ref} onCancel={onClose} onClick={onClose}>
      {open && children}
    </StyledDiv>
  )
}

const StyledDiv = styled.dialog`
  max-width: 95%;
  max-height: 95%;
  vertical-align: middle;
  background: #131416;
  color: #fff;

  border: none;
  border-radius: 15px;
  padding: 0;

  &::backdrop {
    background: #00000077;
    backdrop-filter: blur(3px);
  }
`

export default Dialog
