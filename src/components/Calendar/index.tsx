import '@fullcalendar/react/dist/vdom';
import FullCalendar, {
    DayHeaderContentArg,
    EventContentArg,
    EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './index.css';
import { LegacyRef, useContext, useState } from 'react';
import { UserContext } from '@/context/UserContextProvider';
import { useQuery } from '@tanstack/react-query';
import { getIssueWorkItemsByUser, IssueWorkItem } from '@/services/api/issue';
import { TimeBox } from '../TimeBox';
import React from 'react';
import moment, { Moment } from 'moment';

const initialEvents: EventInput[] = [];

function getTotalByDate(date: Date) {
    let dateString = date.toISOString().replace(/T.*$/, '');
    let data = initialEvents.filter((x) => {
        if (dateString === x.start) return true;

        return false;
    });

    return data.length;
}

const Calendar = () => {
    const [events, setEvent] = useState<EventInput[]>(initialEvents);
    const { user } = useContext(UserContext);
    const calendarRef: LegacyRef<FullCalendar> = React.createRef();

    const {} = useQuery(
        ['issues'],
        async () => {
            const startDate = moment(
                calendarRef.current?.getApi().view.currentStart
            ).format('YYYY-MM-DD');
            const endDate = moment(
                calendarRef.current?.getApi().view.currentEnd
            )
                .subtract(1, 'days')
                .format('YYYY-MM-DD');
            return getIssueWorkItemsByUser(user!.id, startDate, endDate);
        },
        {
            enabled: !!user,
            retry: 3,
            onSuccess: (workItems: IssueWorkItem[]) => {
                const items: EventInput[] = workItems.map((workItem) => {
                    return {
                        id: workItem.id,
                        title: workItem.issue.summary,
                        start: new Date(workItem.date)
                            .toISOString()
                            .replace(/T.*$/, ''),
                        editable: true,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        extendedProps: {
                            workItem,
                        },
                    };
                });
                setEvent(items);
            },
        }
    );

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            initialEvents={events}
            events={events}
            eventContent={renderEventContent}
            dayHeaderContent={renderDateContent}
            datesSet={(dateInfo: any) => {
                console.log(dateInfo);
            }}
        />
    );

    function renderEventContent(eventInfo: EventContentArg) {
        return <TimeBox workItem={eventInfo.event.extendedProps.workItem} />;
    }

    function renderDateContent(eventInfo: DayHeaderContentArg) {
        return (
            <div>
                {eventInfo.text} - {getTotalByDate(eventInfo.date)}
            </div>
        );
    }
};

export { Calendar };
