import Fuse from "fuse.js"
import React, { useEffect, useRef, useState } from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import styled from "styled-components"
import searchWorker from "../workers/searchWorker"
import SpaceItem from "./SpaceItem"

const getItemKey = (index, data) => data[index].node.id

const SpacesList = ({ spaces, setLoading, search }) => {
  const fuseRef = useRef(null)
  const listRef = useRef(null)
  const abortRef = useRef(null)
  const [filteredSpaces, setFilteredSpaces] = useState(spaces)

  useEffect(() => {
    fuseRef.current = new Fuse(spaces, {
      keys: [{ name: "node.name", weight: 5 }, "node.path"],
    })

    searchWorker.createIndex(spaces)
  }, [spaces])

  useEffect(() => {
    ;(async () => {
      if (abortRef.current) abortRef.current.abort()
      if (search) {
        setLoading(true)

        const abortController = new AbortController()
        abortRef.current = abortController

        const searchResults = await searchWorker.search(search)

        if (!abortController.signal.aborted) {
          setFilteredSpaces(searchResults)
          setLoading(false)
        }
      } else {
        setFilteredSpaces(spaces)
      }
      listRef.current.scrollTo(0)
    })()
  }, [search, setFilteredSpaces, spaces, setLoading])

  return (
    <ListContainer>
      <AutoSizer defaultHeight={500} defaultWidth={200}>
        {({ width, height }) =>
          filteredSpaces.length === 0 ? (
            <NoItems style={{ width, height, textAlign: "center" }} />
          ) : (
            <FixedSizeList
              itemCount={filteredSpaces.length}
              itemData={filteredSpaces}
              itemKey={getItemKey}
              itemSize={100}
              width={width}
              height={height}
              ref={listRef}
            >
              {SpacesListItem}
            </FixedSizeList>
          )
        }
      </AutoSizer>
    </ListContainer>
  )
}

const ListContainer = styled.div`
  flex: 1 1 auto;
`

const SpacesListItem = ({ style, data, index }) => (
  <SpaceItem node={data[index].node} style={style} />
)

const NoItems = ({ ...props }) => (
  <div {...props}>
    <h3>No spaces found</h3>
  </div>
)

export default SpacesList
