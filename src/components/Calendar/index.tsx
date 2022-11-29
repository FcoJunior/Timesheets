import '@fullcalendar/react/dist/vdom';
import FullCalendar, { createPlugin, DateProfile, DayHeaderContentArg, Duration, EventContentArg, EventInput, EventSourceInput, Fragment, sliceEvents, ViewProps } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './index.css';

const initialEvents: EventInput[] = [
    {
        id: '1',
        title: 'Task 01',
        start: new Date().toISOString().replace(/T.*$/, ''),
        editable: true,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        extendedProps: {
            Description: 'This is a text!',
        },
    },
    {
        id: '2',
        title: 'Task 01',
        start: new Date().toISOString().replace(/T.*$/, ''),
        editable: true,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        extendedProps: {
            Description: 'This is a text!',
        },
    },
    {
        id: '3',
        title: 'Task 01',
        start: new Date('2022-11-24').toISOString().replace(/T.*$/, ''),
        editable: true,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        extendedProps: {
            Description: 'This is a text!',
        },
    },
];

function getTotalByDate(date: Date) {
    let dateString = date.toISOString().replace(/T.*$/, '');
    let data = initialEvents.filter(x => {
        if (dateString === x.start)
            return true;

        return false;
    });

    return data.length;
}

const Calendar = () => {

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            initialEvents={initialEvents}
            eventContent={renderEventContent}
            dayHeaderContent={renderDateContent}
        />
    );

    function renderEventContent(eventInfo: EventContentArg) {
        return (
            <div className='p-4 bg-white rounded border-white text-gray-600 shadow-md m-1'>
                {eventInfo.event.title}
            </div>
        );
    };

    function renderDateContent(eventInfo: DayHeaderContentArg) {
        return (
            <div>
                {eventInfo.text} - { getTotalByDate(eventInfo.date) }
            </div>
        );
    };
};

export { Calendar };
