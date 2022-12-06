import { EventInput } from '@fullcalendar/react';
import { CalendarActionTyes } from './CalendarActions';

export interface CalendarState {
    items: EventInput[];
}

export const calendarReducer = (state: CalendarState, action: any) => {
    switch (action.type) {
        case CalendarActionTyes.ADD_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};
