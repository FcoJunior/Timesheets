import { IssueTag, IssueTagImpl } from 'youtrack-rest-client';
import { PaginationOptions } from 'youtrack-rest-client/dist/options/pagination_options';
import { BaseEndpoint } from './base';

export const TagPaths = {
    issueTags: '/issueTags',
    issueTag: '/issueTags/{tagId}',
};

export class TagEndpoint extends BaseEndpoint {
    public all(paginationOptions: PaginationOptions = {}): Promise<IssueTag[]> {
        return this.getResourceWithFields<IssueTag[]>(
            TagPaths.issueTags,
            IssueTagImpl,
            { qs: paginationOptions }
        );
    }

    public byId(tagId: string): Promise<IssueTag> {
        return this.getResourceWithFields<IssueTag>(
            this.format(TagPaths.issueTag, { tagId }),
            IssueTagImpl
        );
    }
}
