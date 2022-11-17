import * as format from 'string-template';
import { GenericObject, generateFieldsQuery } from '../entities/fields/utils';
import { YoutrackClient } from '../youtrack';

export class BaseEndpoint {
    public constructor(protected client: YoutrackClient) {}

    protected format(template: string, values: {}): string {
        return format(template, values);
    }

    protected toPromise<T>(request: Promise<any>): Promise<T> {
        return Promise.resolve(
            request
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
        );
    }

    protected getResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.get(url, params));
    }

    protected postResource<T>(url: string, params = {}): Promise<T> {
        return this.toPromise<T>(this.client.post(url, params));
    }

    protected getResourceWithFields<T>(
        url: string,
        implementation: new () => object,
        options: { qs?: GenericObject } = {}
    ): Promise<T> {
        return this.getResource<T>(url, {
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {}),
            },
        });
    }
    
    protected getResourceWithFieldNames<T>(
        url: string,
        fields: Array<string>
    ): Promise<T> {
        return this.getResource<T>(url, {
            params: {
                fields: fields.join(',')
            }
        });
    }

    protected postResourceWithFields<T>(
        url: string,
        implementation: new () => object,
        options: {
            qs?: GenericObject;
            body?: any;
            form?: any;
        } = {}
    ): Promise<T> {
        return this.postResource(url, {
            ...options,
            qs: {
                fields: generateFieldsQuery(new implementation()),
                ...(options.qs || {}),
            },
        });
    }
}
