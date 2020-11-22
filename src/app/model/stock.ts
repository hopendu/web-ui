import {  SelectionOption } from "./selection-option";
export class Stock {
    constructor(public description?: string,
                public discountPerc?: number,
                public images?: string[],
                public mandatorySelection?: SelectionOption[],
                public name?: string,
                public optionalSelection?: SelectionOption[],
                public price?: number,
                public quantity?: number){}
}


