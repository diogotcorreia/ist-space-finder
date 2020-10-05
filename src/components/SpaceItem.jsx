import React from "react"

const SpaceItem = ({ node }) => {
  const { istId, name, type, path } = node

  return (
    <div>
      <p>{`${type} ${name} (${istId})`}</p>
      <p>{path.join(" > ")}</p>
    </div>
  )
}

export default SpaceItem
