export interface ItemModel {
    id: string;
    title: string;
    weight: string;
    category: string;
    description: string;
}

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
}
