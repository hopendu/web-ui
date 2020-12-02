import { Bank } from './bank';

export class UserProfile {

    constructor(
        public address ?: string,
        public badges	?: number,
        public bank	?: Bank,
        public date ?: Date,
        public description	?: string,
        public emailAddress ?: string,
        public id	?: string,
        public idNumber ?: string,
        public imageUrl ?: string,
        public latitude ?: number, 
        public likes ?: number,
        public longitude ?: number,
        public mobileNumber ?:	string,
        public modifiedDate ?: Date,
        public name	?: string,
        public responseTimeMinutes ?:number,
        public role	?: UserProfile.RoleEnum,
        public servicesCompleted ?:	number,
        public signUpReason	?: UserProfile.SignUpReason, 
        public surname ?:	string,
        public verificationCode	?:string,
        public yearsInService?: number){}
}

export namespace UserProfile {
    export type RoleEnum = 'CUSTOMER' | 'STORE_ADMIN' | 'STORE' | 'MESSENGER';
    export type SignUpReason = 'DELIVERY_DRIVER' | 'SELL' |'BUY';
    export const RoleEnum = {
        CUSTOMER: 'CUSTOMER' as RoleEnum,
        STOREADMIN: 'STORE_ADMIN' as RoleEnum,
        STORE: 'STORE' as RoleEnum,
        MESSENGER: 'MESSENGER' as RoleEnum
    };
    export const SignUpReason = {
        DELIVERY_DRIVER: 'DELIVERY_DRIVER' as SignUpReason,
        SELL: 'SELL' as SignUpReason,
        BUY: 'BUY' as SignUpReason
    };
}
