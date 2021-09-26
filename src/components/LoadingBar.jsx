import React from "react"
import styled, { keyframes } from "styled-components"

const LoadingBar = ({ loading }) => {
  return (
    <SliderContainer>
      <Slider>
        {loading && (
          <>
            <Line />
            <SublineIncrement />
            <SublineDecrement />
          </>
        )}
      </Slider>
    </SliderContainer>
  )
}

const incrementAnimation = keyframes`
  from { left: -5%; width: 5%; }
  to { left: 130%; width: 100%; }
`

const decrementAnimation = keyframes`
  from { left: -80%; width: 80%; }
  to { left: 110%; width: 10%; }
`

const SublineIncrement = styled.div`
  position: absolute;
  background: #009de0;
  height: 5px;
  animation: ${incrementAnimation} 2s infinite;
`

const SublineDecrement = styled.div`
  position: absolute;
  background: #009de0;
  height: 5px;
  animation: ${decrementAnimation} 2s 0.5s infinite;
`

const Line = styled.div`
  position: absolute;
  opacity: 0.4;
  background: #009de0;
  width: 150%;
  height: 5px;
`

const Slider = styled.div`
  position: absolute;
  width: 100%;
  height: 5px;
  overflow-x: hidden;
`

const SliderContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`

export default LoadingBar
