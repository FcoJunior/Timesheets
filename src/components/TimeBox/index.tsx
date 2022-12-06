import { IssueWorkItem } from '@/services/api/issue';
import { DotsThreeOutline, Timer } from 'phosphor-react';

interface TimeBoxProps {
    workItem: IssueWorkItem;
}

interface TypeWorkPillProps {
    type: string;
}

const TypeWorkPill = ({ type }: TypeWorkPillProps) => {
    function getColor(type: string): string {
        switch (type) {
            case 'Desenvolvimento':
                return 'bg-emerald-200 text-emerald-400';
            case 'Teste':
                return 'bg-sky-200 text-sky-400';
            case 'Documentação':
                return 'bg-indigo-200 text-indigo-400';
            case 'Investigação':
                return 'bg-purple-200 text-purple-400';
            case 'Análise':
                return 'bg-red-200 text-red-400';
            default:
                return '';
        }
    }

    const classes = `rounded-full px-2 font-semibold text-xs ${getColor(type)}`;

    return <span className={classes}>{type}</span>;
};

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
                        <TypeWorkPill type={workItem.type.name} />
                    )}
                </div>
            </header>
            <div className="text-sm">
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
