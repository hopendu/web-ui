import { Bank } from '../model/bank';
import { Stock } from '../model/stock';
import { BusinessHours } from '../model/business-hours';
import { Messenger } from './messenger';
import { StoreType } from './store-type';

export class StoreProfile {
    constructor(
        public address?: string,
        public badges?: number,
        public bank?: Bank,
        public businessHours?: Array<BusinessHours>,
        public date?: Date,
        public description?: string,
        public emailAddress?: string,
        public featured?: boolean,
        public featuredExpiry?: Date,
        public hasVat?: boolean,
        public id?: string,
        public imageUrl?: string,
        public izingaTakesCommission?: Boolean,
        public latitude?: number,
        public likes?: number,
        public longitude?: number,
        public mobileNumber?: string,
        public modifiedDate?: Date,
        public name?: string,
        public ownerId?: string,
        public regNumber?: string,
        public responseTimeMinutes?: number,
        public role?: StoreProfile.RoleEnum,
        public servicesCompleted?: number,
        public shortName?: string,
        public stockList?: Array<Stock>,
        public storeMessenger?: Messenger,
        public storeType?: StoreType.StoreTypeEnum,
        public storeWebsiteUrl?: string,
        public tags?: Array<string>,
        public verificationCode?: string,
        public yearsInService?: number){}
}
// tslint:disable-next-line: no-namespace
export namespace StoreProfile {
    export type RoleEnum = 'CUSTOMER' | 'STORE_ADMIN' | 'STORE' | 'MESSENGER';
    export type StoreTypeEnum = 'FOOD' | 'CLOTHING' | 'SALON' | 'CAR_WASH';
    export const RoleEnum = {
        CUSTOMER: 'CUSTOMER' as RoleEnum,
        STOREADMIN: 'STORE_ADMIN' as RoleEnum,
        STORE: 'STORE' as RoleEnum,
        MESSENGER: 'MESSENGER' as RoleEnum
    };
    
    export const StoreTypeEnum = {
        FOOD: 'FOOD' as StoreTypeEnum,
        CLOTHING: 'CLOTHING' as StoreTypeEnum,
        SALON: 'SALON' as StoreTypeEnum,
        CAR_WASH: 'CAR_WASH' as StoreTypeEnum
    };
}



