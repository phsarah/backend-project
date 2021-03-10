export class Image {
    constructor(
       public readonly id: string,
       public readonly subtitle: string,
       public readonly author: string,
       public readonly date: Date,
       public readonly file: string,
       public readonly collection: string
    ) { }
}
export interface imageInputDTO{
    subtitle: string,
    file: string,
    tagsId: Array<string>,
    collectionId: string,
}

