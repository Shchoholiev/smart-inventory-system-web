export class Device {
    public id: string = '';
    public name?: string = '';
    public type: DeviceType = DeviceType.Unknown;
    public guid: string = '';
    public groupId?: string = '';
    public isActive: boolean = false;
}

export enum DeviceType {
    Unknown, // To enforce API users to set type explicitly
    Rack4ShelfController, // Controls a rack of 4 shelves
    AccessPoint
}
