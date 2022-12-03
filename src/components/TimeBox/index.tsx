import { IssueWorkItem } from '@/services/api/issue';
import { DotsThreeOutline, Timer } from 'phosphor-react';

interface TimeBoxProps {
    workItem: IssueWorkItem;
}

export const TimeBox = ({ workItem }: TimeBoxProps) => {
    const description =
        workItem.text && workItem.text.length > 20
            ? workItem.text.substring(0, 20) + '...'
            : workItem.text;

    return (
        <div className="p-4 m-1 flex flex-col gap-2 bg-white hover:bg-gray-50 rounded border-white  text-gray-600 shadow-md whitespace-pre-line">
            <header className="flex justify-between">
                <div>
                    {workItem.type && (
                        <span className="rounded-full bg-red-200 text-red-500 px-2">
                            {workItem.type.name}
                        </span>
                    )}
                </div>
                <div>
                    <DotsThreeOutline className="text-md" />
                </div>
            </header>
            <div>
                {workItem.issue.idReadable} - {workItem.issue.summary}
            </div>
            {description && <div className="text-gray-400">{description}</div>}
            <div>
                <div className="flex gap-1 items-center text-gray-400">
                    <Timer className="text-md" />
                    {workItem.duration.presentation}
                </div>
            </div>
        </div>
    );
};
