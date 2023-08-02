import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import LoadingBar from "./LoadingBar"

const Schedule = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const dateString = new dayjs().startOf("day").format("YYYY-MM-DD")
    const reqSite = `https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/spaces/${id}/day/${dateString}`

    setLoading(true)

    fetch(reqSite)
      .then(response => response.json())
      .then(resultData => {
        setEvents(translateIntoEvents(resultData.schedule))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [id])

  if (error) {
    return <ErrorContainer>Failed to fetch schedule</ErrorContainer>
  }

  return (
    <Container>
      <LoadingBar loading={loading} />
      <FullCalendar
        initialView="timeGridDay"
        plugins={[timeGridPlugin]}
        headerToolbar={{ start: "", center: "title", end: "" }}
        events={events}
        height="88vh"
        nowIndicator
        allDaySlot={false}
        scrollTime="08:00:00"
      />
    </Container>
  )
}

function translateIntoEvent(event) {
  return {
    title: event.name,
    start: event.start,
    end: event.end,
  }
}

function translateIntoEvents(events) {
  return events.map(translateIntoEvent)
}

const Container = styled.div`
  width: clamp(1em, 90vw, 17em);
  padding: 1em;
`

const ErrorContainer = styled.div`
  background: #ff6961;
  color: #121212;
  padding: 1em 1.2em;
  border-radius: 15px;
  font-weight: bold;
`

export default Schedule
