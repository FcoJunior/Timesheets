import api from '..';
import { WorkItemType } from '../admin';

const defaultIssueFields: string[] = ['id', 'idReadable'];
const defaultIssueWorkItemFields: string[] = [
    'id',
    'text',
    'date',
    'duration(presentation,minutes)',
    'issue(idReadable,summary,description)',
    'type(id,name)',
];

export interface Issue {
    $type: string;
    id: string;
    idReadable: string;
    summary: string;
    description: string;
}

export interface IssueWorkItem {
    usesMarkdown: boolean;
    id?: string;
    text: string;
    date: number;
    author: {
        id: string;
    };
    duration: {
        minutes: number;
        presentation: string;
    };
    issue: Issue;
    type?: WorkItemType;
}

export const getIssues = async (issuesId: string[]): Promise<Issue[]> =>
    api
        .get('issues', {
            params: {
                fields: defaultIssueFields.join(),
                query: `issue Id:${issuesId.join()}`,
            },
        })
        .then((response) => {
            return response.data;
        });

export const getIssueWorkItemsByUser = async (
    authorId: string,
    startDate: string,
    endDate: string
): Promise<IssueWorkItem[]> =>
    api
        .get('workItems', {
            params: {
                startDate: startDate,
                endDate: endDate,
                author: authorId,
                fields: defaultIssueWorkItemFields.join(),
            },
        })
        .then((response) => {
            return response.data;
        });

export const createIssueWorkItem = async (
    issueId: string,
    issue: IssueWorkItem
): Promise<IssueWorkItem> =>
    api
        .post(`issues/${issueId}/timeTracking/workItems`, issue, {
            params: { fields: defaultIssueWorkItemFields.join() },
        })
        .then((response) => {
            return response.data;
        });
