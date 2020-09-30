import {  SelectionOption } from "./selection-option";
export class Stock {
    constructor( public discountPerc?: number,
                 public imageUrls?: string[],
                 public mandatorySelection?: SelectionOption[],
                 public name?: string,
                 public optionalSelection?: SelectionOption[],
                 public price?: number,
                 public quantity?: number){}
}


