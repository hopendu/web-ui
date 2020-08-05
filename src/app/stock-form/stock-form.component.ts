import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Bank } from '../model/bank';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  submitted = false;
  stockForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      stocks: this.fb.array([
        this.fb.group({
          discountPerc: new FormControl(Number, Validators.required),
          name: new FormControl('', Validators.required),
          price: new FormControl(Number, Validators.required),
          quantity: new FormControl(Number, Validators.required)
        }),
      ])
    });
  }

  ngOnInit(): void {


  }
  get getStocks(): FormArray {
    return this.stockForm.get('stocks') as FormArray;
  }
  addStock(): void {
    const fg = this.fb.group({
      discountPerc: [Number],
      name: [''],
      price: [Number],
      quantity: [Number]
    });
    if (this.stockForm.invalid){  return; }
    ( this.stockForm.get('stocks') as FormArray).push(fg);
  }

  deleteStock( index: number): void{
    ( this.stockForm.get('stocks') as FormArray).removeAt(index);
  }
  onSubmit(): void {

    this.submitted = true;

    if (this.stockForm.get('stocks').invalid){  return; }
    this.send(this.stockForm.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.stockForm.value, null, 4));
  }
  send(stocks: Stock[]): void {

  }

  onReset(): void {
    this.submitted = false;
    this.stockForm.reset();
  }

}

