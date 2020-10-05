import Fuse from "fuse.js"
import React, { useEffect, useRef } from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import styled from "styled-components"
import SpaceItem from "./SpaceItem"

const getItemKey = (index, data) => data[index].node.id

const SpacesList = ({ spaces, search }) => {
  const fuseRef = useRef(null)
  const listRef = useRef()

  useEffect(() => {
    fuseRef.current = new Fuse(spaces, {
      keys: [{ name: "node.name", weight: 5 }, "node.path"],
    })
  }, [spaces])

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTo(0)
  }, [search])

  let itemData = spaces
  if (fuseRef.current != null && search) {
    itemData = fuseRef.current.search(search).map(v => v.item)
  }

  return (
    <ListContainer>
      <AutoSizer defaultHeight={500} defaultWidth={200}>
        {({ width, height }) => (
          <FixedSizeList
            itemCount={spaces.length}
            itemData={itemData}
            itemKey={getItemKey}
            itemSize={100}
            width={width}
            height={height}
            ref={listRef}
          >
            {SpacesListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </ListContainer>
  )
}

const ListContainer = styled.div`
  flex: 1 1 auto;
`

const SpacesListItem = ({ style, data, index }) => (
  <div style={style}>
    <SpaceItem node={data[index].node} />
  </div>
)

export default SpacesList
