import '@fullcalendar/react/dist/vdom';
import FullCalendar, { EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './index.css';

const initialEvents: EventSourceInput = [
    {
        id: '1',
        title: 'Task 01',
        start: new Date().toISOString().replace(/T.*$/, ''),
        editable: true,
    },
];

const Calendar = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            initialEvents={initialEvents}
        />
    );
};

export { Calendar };
