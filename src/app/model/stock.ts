import {  SelectionOption } from "./selection-option";
export class Stock {
    constructor(public id?: string,
                public description?: string,
                public detailedDescription ?: string,
                public discountPerc?: number,
                public images?: string[],
                public mandatorySelection?: SelectionOption[],
                public name?: string,
                public optionalSelection?: SelectionOption[],
                public storePrice?: number,
                public quantity?: number){}
}


