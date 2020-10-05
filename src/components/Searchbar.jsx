import React from "react"
import styled from "styled-components"

const Searchbar = ({ setSearch }) => {
  const handleChange = evt => setSearch(evt.target.value)
  return (
    <FormGroup>
      <StyledInput
        id="search-input"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <StyledLabel htmlFor="search-input">Search</StyledLabel>
    </FormGroup>
  )
}

const FormGroup = styled.div`
  position: relative;
  padding: 15px 0;
  margin-top: 10px;
`

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
`

const StyledInput = styled.input`
  width: 100%;
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ ${StyledLabel} {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ ${StyledLabel} {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #009de0;
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #009de0, #09668f);
    border-image-slice: 1;
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`

export default Searchbar
