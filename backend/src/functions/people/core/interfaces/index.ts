export interface FindList<T> {
    data : Array<T>;
    count : number;
}

export interface dynamoDBOptions {
    endpoint ?: string;
    region ?: string;
    table ?: string;
}