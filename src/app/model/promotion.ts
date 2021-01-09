import { StoreType } from "./store-type";
export class Promotion {
    constructor(
        public id?:string,
        public imageUrl?:string,
        public actionUrl?: string,
        public title?: string,
        public message?:string,
        public shopId?:string,
        public stockId?: string,
        public shopType?: StoreType.StoreTypeEnum,
        public expiryDate?: Date){
        }
}