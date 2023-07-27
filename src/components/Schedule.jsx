import React, { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayjs from "dayjs"
import styled from "styled-components"

const Schedule = ({ id }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const dateString = new dayjs().startOf("day").format("YYYY-MM-DD")
    const reqSite = `https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/spaces/${id}/day/${dateString}`

    fetch(reqSite)
      .then(response => response.json())
      .then(resultData => {
        setEvents(translateIntoEvents(resultData.schedule))
      })
      .catch(null)
  }, [id])

  return (
    <Width>
      <FullCalendar
        initialView="timeGridDay"
        plugins={[timeGridPlugin]}
        headerToolbar={{ start: "title", center: "", end: "" }}
        events={events}
        height={"88vh"}
        nowIndicator
        allDaySlot={false}
        slotMinTime={"08:00:00"}
        slotMaxTime={"20:00:00"}
      />
    </Width>
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

const Width = styled.div`
  width: 17em;
`

export default Schedule
