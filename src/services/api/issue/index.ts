import api from '..';

const defaultIssueFields: string[] = ['id', 'idReadable'];
const defaultIssueWorkItemFields: string[] = ['id', 'name'];

export interface Issue {
    $type: string;
    id: string;
    idReadable: string;
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
    };
    type?: {
        id: string;
    };
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
): Promise<Issue[]> =>
    api
        .get('workItems', {
            params: {
                fields: defaultIssueWorkItemFields.join(),
                author: authorId,
                startDate: startDate,
                endDate: endDate,
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
