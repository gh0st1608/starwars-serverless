import { Json } from "aws-sdk/clients/robomaker";

export interface FindList<T> {
    data : Array<T>;
    count : number;
}

export interface DynamoDBOptions {
    endpoint ?: string;
    region ?: string;
    table ?: string;
}


export interface ResponseHttp {
    statusCode : number;
    body : Json;
}