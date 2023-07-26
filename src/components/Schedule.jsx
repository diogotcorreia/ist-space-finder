import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from "dayjs";


const Schedule = ({id}) => {
	const [events, setEvents] = useState([])

	const translateIntoEvent = (event) => {
		return {
			title: event.name,
			start: event.start,
			end: event.end,
		}
	}

	const translateIntoEvents = (events) => {
		return events.map(translateIntoEvent)
	}

	useEffect(() => {
		const dateString = new dayjs().startOf('day').format('YYYY-MM-DD');
		const reqSite = `https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/spaces/${id}/day/${dateString}`;

		fetch(reqSite)
			.then(response => response.json())
			.then(resultData => {
				setEvents(translateIntoEvents(resultData.schedule));
			}).catch(null)
	}, [])


	return (
		<div style={{width: "17em"}}>
			<FullCalendar
				initialView="timeGridDay"
				plugins={[timeGridPlugin]}
				headerToolbar={{start: 'title', center: '', end: ''}}
				events={events}
				height={'88vh'}
				nowIndicator
				allDaySlot={false}
				slotMinTime={'08:00:00'}
				slotMaxTime={'20:00:00'}
			/>
		</div>
	)
}

export default Schedule
