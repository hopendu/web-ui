export class BusinessHours {
    constructor( public close?: Date,
                 public day?: BusinessHours.DayEnum,
                 public open?: Date){}

    
}
// tslint:disable-next-line: no-namespace
export namespace BusinessHours {
    export type DayEnum = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    export const DayEnum = {
        MONDAY: 'MONDAY' as DayEnum,
        TUESDAY: 'TUESDAY' as DayEnum,
        WEDNESDAY: 'WEDNESDAY' as DayEnum,
        THURSDAY: 'THURSDAY' as DayEnum,
        FRIDAY: 'FRIDAY' as DayEnum,
        SATURDAY: 'SATURDAY' as DayEnum,
        SUNDAY: 'SUNDAY' as DayEnum
    };
}
