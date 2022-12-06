import { addItemsAction } from '@/store/calendar/CalendarActions';
import {
    calendarReducer,
    CalendarState,
} from '@/store/calendar/CalendarReducer';
import { EventInput } from '@fullcalendar/react';
import { createContext, ReactNode, useReducer } from 'react';

interface CalendarContextType {
    items: EventInput[];
    addItems: (items: EventInput[]) => void;
}

interface CalendarProviderProps {
    children: ReactNode;
}

const initialState: CalendarState = {
    items: [],
};

export const CalendarContext = createContext({} as CalendarContextType);

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
    const [calendarState, dispatch] = useReducer(calendarReducer, initialState);
    const { items } = calendarState;

    const addItems = (items: EventInput[]) => {
        dispatch(addItemsAction(items));
    };

    return (
        <CalendarContext.Provider
            value={{
                items,
                addItems,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
