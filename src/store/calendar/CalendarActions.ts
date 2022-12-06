import { EventInput } from '@fullcalendar/react';

export enum CalendarActionTyes {
    ADD_ITEMS = 'ADD_ITEMS',
}

export const addItemsAction = (items: EventInput[]) => {
    return {
        type: CalendarActionTyes.ADD_ITEMS,
        payload: items,
    };
};
