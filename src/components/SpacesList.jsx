import React from "react"
import { FixedSizeList } from "react-window"
import SpaceItem from "./SpaceItem"
import AutoSizer from "react-virtualized-auto-sizer"

const getItemKey = (index, data) => data[index].node.id

const SpacesList = ({ spaces }) => {
  return (
    <AutoSizer defaultHeight={500} defaultWidth={200}>
      {({ width, height }) => (
        <FixedSizeList
          itemCount={spaces.length}
          itemData={spaces}
          itemKey={getItemKey}
          itemSize={100}
          width={width}
          height={height}
        >
          {SpacesListItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}

const SpacesListItem = ({ style, data, index }) => (
  <div style={style}>
    <SpaceItem node={data[index].node} />
  </div>
)

export default SpacesList
