import { UserEndpoint } from './endpoints/user';
import { TagEndpoint } from './endpoints/tag';
import { IssueEndpoint } from './endpoints/issue';
import { ProjectEndpoint } from './endpoints/project';
import { AgileEndpoint } from './endpoints/agile';
import { SprintEndpoint } from './endpoints/sprint';
import { WorkItemEndpoint } from './endpoints/workitem';
import { CommentEndpoint } from './endpoints/comment';
import axios, { AxiosRequestConfig } from 'axios';
import { YoutrackTokenOptions } from './options/youtrack_options';

export interface YoutrackClient {
    get(url: string, params?: {}, headers?: {}): Promise<any>;

    post(url: string, params?: {}, headers?: {}): Promise<Response>;

    delete(url: string, params?: {}, headers?: {}): Promise<Response>;

    put(url: string, params?: {}, headers?: {}): Promise<Response>;

    readonly users: UserEndpoint;
    readonly tags: TagEndpoint;
    readonly issues: IssueEndpoint;
    readonly projects: ProjectEndpoint;
    readonly agiles: AgileEndpoint;
    readonly sprints: SprintEndpoint;
    readonly workItems: WorkItemEndpoint;
    readonly comments: CommentEndpoint;
}

export class Youtrack implements YoutrackClient {
    private readonly baseUrl: string;
    private defaultRequestOptions: AxiosRequestConfig = {};
    public readonly users: UserEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly agiles: AgileEndpoint;
    public readonly sprints: SprintEndpoint;
    public readonly workItems: WorkItemEndpoint;
    public readonly comments: CommentEndpoint;

    public constructor(options: YoutrackTokenOptions) {
        this.defaultRequestOptions = {
            ...this.defaultRequestOptions,
            headers: {
                Authorization: `Bearer ${options.token}`,
            },
        };
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.users = new UserEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.agiles = new AgileEndpoint(this);
        this.sprints = new SprintEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
        this.comments = new CommentEndpoint(this);
    }

    public post(url: string, params = {}, headers: {} = {}): Promise<any> {
        return axios({
            method: 'post',
            baseURL: this.baseUrl + url,
            ...this.prepareParams(params, headers),
        });
    }

    public get(url: string, params = {}, headers = {}): Promise<any> {
        return axios({
            method: 'get',
            baseURL: this.baseUrl + url,
            ...this.prepareParams(params, headers),
        });
    }

    public delete(url: string, params = {}, headers = {}): Promise<any> {
        return axios({
            method: 'delete',
            baseURL: this.baseUrl + url,
            ...this.prepareParams(params, headers),
        });
    }

    public put(url: string, params = {}, headers = {}): Promise<any> {
        return axios({
            method: 'put',
            baseURL: this.baseUrl + url,
            ...this.prepareParams(params, headers),
        });
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/api$/i)) {
            baseUrl += '/api';
        }
        return baseUrl;
    }

    private prepareParams(params: {}, customHeaders: {}): AxiosRequestConfig {
        if (
            'headers' in this.defaultRequestOptions &&
            Object.keys(customHeaders).length > 0
        ) {
            // merge the header parameters
            const { headers, ...defaultOptions } = this.defaultRequestOptions;
            return {
                ...defaultOptions,
                ...params,
                headers: { ...headers, ...customHeaders },
            };
        }
        if ('headers' in this.defaultRequestOptions) {
            return { ...this.defaultRequestOptions, ...params };
        }
        return {
            ...this.defaultRequestOptions,
            ...params,
            headers: { ...customHeaders },
        };
    }
}
