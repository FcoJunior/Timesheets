import '@fullcalendar/react/dist/vdom';
import FullCalendar, {
    DatesSetArg,
    DayHeaderContentArg,
    EventContentArg,
    EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './index.css';
import { LegacyRef, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '@/context/UserContextProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getIssueWorkItemsByUser, IssueWorkItem } from '@/services/api/issue';
import { TimeBox } from '../TimeBox';
import React from 'react';
import moment, { Moment } from 'moment';
import { CalendarContext } from '@/context/CalendarContextProvider';
import { useUpdateEffect } from 'usehooks-ts';

const initialEvents: EventInput[] = [];

function getTotalByDate(date: Date) {
    let dateString = date.toISOString().replace(/T.*$/, '');
    let data = initialEvents.filter((x) => {
        if (dateString === x.start) return true;

        return false;
    });

    return data.length;
}

function getPeriodWeek(date: Date): { stardDate: Date; endDate: Date } {
    return {
        stardDate: moment(date).startOf('week').toDate(),
        endDate: moment(date).endOf('week').toDate(),
    };
}

const Calendar = () => {
    // const { items, addItems } = useContext(CalendarContext);
    const [events, setEvent] = useState<EventInput[]>(initialEvents);
    const [action, setAction] = useState<string | null>();
    const { user } = useContext(UserContext);
    const calendarRef: LegacyRef<FullCalendar> = React.createRef();

    useEffect(() => {
        loadWorkItemsMutation.mutate(null);
    }, []);

    useUpdateEffect(() => {
        switch (action) {
            case 'next':
                calendarRef.current?.getApi().next();
                break;
            case 'prev':
                calendarRef.current?.getApi().prev();
                break;
            default:
                break;
        }
        setAction(null);
    }, [events]);

    const fetchEvents = async (date: Date | null) => {
        if (!date) {
            date = new Date();
        }

        const { stardDate, endDate } = getPeriodWeek(date);
        return getIssueWorkItemsByUser(
            user!.id,
            moment(stardDate).format('YYYY-MM-DD'),
            moment(endDate).format('YYYY-MM-DD')
        );
    };

    const loadWorkItemsMutation = useMutation({
        mutationFn: async (date: Date | null) => {
            return fetchEvents(date);
        },
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
    });

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

    function loadDatesSet(dateInfo: DatesSetArg) {
        // loadWorkItemsMutation.mutate(null);
    }

    const handlerNext = async () => {
        const date = calendarRef.current?.getApi().view.activeStart;
        await loadWorkItemsMutation.mutateAsync(
            moment(date).add(1, 'week').toDate()
        );
        setAction('next');
    };

    const handlerPrev = async () => {
        const date = calendarRef.current?.getApi().view.activeStart;
        await loadWorkItemsMutation.mutateAsync(
            moment(date).subtract(1, 'week').toDate()
        );
        setAction('prev');
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="font-heading font-bold text-3xl">
                    Activities
                </div>
                <div className="flex gap-2">
                    <button>today</button>
                    <button onClick={handlerPrev}>prev</button>
                    <span>range</span>
                    <button onClick={handlerNext}>next</button>
                </div>
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                initialEvents={events}
                events={events}
                eventContent={renderEventContent}
                dayHeaderContent={renderDateContent}
                datesSet={loadDatesSet}
                headerToolbar={false}
            />
        </div>
    );
};

export { Calendar };
