export class ItemHistory {
    type: ItemHistoryType = ItemHistoryType.Manual;
    isTaken: boolean = false;
    comment?: string;
    createdDateUtc: Date = new Date();
}

export enum ItemHistoryType {
    Manual,
    Scan,
    Shelf
}
