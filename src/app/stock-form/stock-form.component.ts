import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Bank } from '../model/bank';
import { UploadService } from '../service/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  submitted = false;
  stockForm: FormGroup;
  selectedFile: any;

  constructor(private fb: FormBuilder,
              private uploadService: UploadService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stockForm =  this.fb.group({
      stocks: this.fb.array([ this.stock])
    });
  }

  get values(): FormGroup {
    return this.fb.group({
      value: new FormControl('', Validators.required)
    });
  }
  get selection(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      selected: new FormControl('', Validators.required),
      values: this.fb.array([this.values])
    });
  }

  get stock(): FormGroup {
    return this.fb.group({
      discountPerc: new FormControl(Number, Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, Validators.required),
      mandatorySelection: this.fb.array([ this.selection ]),
      optionalSelection: this.fb.array([ this.selection ])
    });
  }

  getStocks(): FormArray{
    return (this.stockForm.get('stocks') as FormArray);
  }

  addValue(mandatory): void{
    mandatory.get('values').push(this.values);
  }
  addMandatory(stock): void{
    stock.get('mandatorySelection').push(this.selection);
  }

  addOptional(stock): void{
    stock.get('optionalSelection').push(this.selection);
  }

  addStock(): void{
    const fg = this.fb.group({
      discountPerc: 0,
      name: '',
      price: 0,
      quantity: 0,
      mandatorySelection: null,
      optionalSelection: null
    });
    (this.stockForm.get('stocks') as FormArray).push(fg);
  }

  deleteValue(mandatory, index): void{
    mandatory.get('values').removeAt(index);
  }
  deleteMandatory(stock, index): void{
    stock.get('mandatorySelection').removeAt(index);
  }

  deleteOptional(stock, index): void{
    stock.get('optionalSelection').removeAt(index);
  }

  deleteStock(index): void {
    (this.stockForm.get('stocks') as FormArray).removeAt(index);
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    this.uploadService.fileUpload(this.selectedFile);
  }

  onSubmit(): void{
  }

  onReset(): void {
  }

}

