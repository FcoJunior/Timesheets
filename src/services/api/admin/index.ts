import api from '..';

const defaultWorkItemTypesFields: string[] = ['id', 'name'];

export interface WorkItemType {
    $type: string;
    id: string;
    name: string;
}

export const getWorkItemTypes = async (): Promise<WorkItemType[]> =>
    api
        .get('admin/timeTrackingSettings/workItemTypes', {
            params: { fields: defaultWorkItemTypesFields.join() },
        })
        .then((response) => {
            return response.data;
        });
