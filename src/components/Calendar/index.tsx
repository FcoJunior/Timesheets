import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './index.css';

const Calendar = () => {
    return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridWeek" />;
};

export { Calendar };
