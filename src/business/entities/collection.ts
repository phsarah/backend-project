export class Collection {
    constructor(
       public readonly id: string,
       public readonly collectionName: string,
       public readonly userId: string,
    ) { }
}


export interface collectionInputDTO{
    id: string
}