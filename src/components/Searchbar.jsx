import React from "react"

const Searchbar = ({ setSearch }) => {
  const handleChange = evt => setSearch(evt.target.value)
  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Searchbar
