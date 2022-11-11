import {
    ReducedSprint,
    ReducedSprintImpl,
    Sprint,
    SprintImpl,
    NewSprint,
    UpdateSprint,
} from 'youtrack-rest-client';
import { PaginationOptions } from 'youtrack-rest-client/dist/options/pagination_options';
import { BaseEndpoint } from './base';

export const SprintPaths = {
    sprints: '/agiles/{agileId}/sprints',
    sprint: '/agiles/{agileId}/sprints/{sprintId}',
};

export class SprintEndpoint extends BaseEndpoint {
    public all(
        agileId: string,
        paginationOptions: PaginationOptions = {}
    ): Promise<ReducedSprint[]> {
        return this.getResourceWithFields<ReducedSprint[]>(
            this.format(SprintPaths.sprints, { agileId }),
            ReducedSprintImpl,
            { qs: paginationOptions }
        );
    }

    public byId(agileId: string, sprintId: string): Promise<Sprint> {
        return this.getResourceWithFields<Sprint>(
            this.format(SprintPaths.sprint, { agileId, sprintId }),
            SprintImpl
        );
    }

    public delete(agileId: string, sprintId: string): Promise<any> {
        return this.toPromise(
            this.client.delete(
                this.format(SprintPaths.sprint, { agileId, sprintId })
            )
        );
    }

    public create(agileId: string, sprint: NewSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(
            this.format(SprintPaths.sprints, { agileId }),
            SprintImpl,
            {
                body: sprint,
            }
        );
    }

    public update(agileId: string, sprint: UpdateSprint): Promise<Sprint> {
        return this.postResourceWithFields<Sprint>(
            this.format(SprintPaths.sprint, {
                agileId,
                sprintId: sprint.id,
            }),
            SprintImpl,
            {
                body: sprint,
            }
        );
    }
}
