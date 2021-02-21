import { BusinessHours } from './business-hours';
import { StoreProfile } from './store-profile';

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
        public imageUrl?: string,
        public longitude?: number,
        public latitude?: number,
        public storeType?: StoreProfile.StoreTypeEnum,
        public brandPrimaryColor?: string,
        public brandSecondaryColor?: string,
        public collectAllowed?: string,
        public freeDeliveryMinAmount?: number,
        public izingaTakesCommission?: Boolean){}
}
