export class ScanHistoryDto {
    id: string = '';
    scanType: ScanType = ScanType.Object;
    result: string = '';
    createdDateUtc: Date = new Date();
}

export enum ScanType {
    Object,
    QRCode,
    Barcode
}
