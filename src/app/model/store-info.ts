import { BusinessHours } from './business-hours';

export class StoreInfo {
    constructor(
        public address?: string,
        public description?: string,
        public emailAddress?: string,
        public userId?: string,
        public mobileNumber?: string,
        public name?: string,
        public regNumber?: string,
        public shortName?: string,
        public storeWebsiteUrl?: string,
        public tags?: Array<string>,
        public imageUrl?: string){}
}
