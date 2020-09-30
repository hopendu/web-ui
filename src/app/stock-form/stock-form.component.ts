import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Bank } from '../model/bank';
import { SelectionOption } from '../model/selection-option';
import { UploadService } from '../service/upload.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  submitted = false;
  stockForm: FormGroup;
  selectedFile: any;
  stocks = new Array<Stock>();
  imageUrls = new Array<string>();

  constructor(private sharedData: SharedService,
              private fb: FormBuilder,
              private uploadService: UploadService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stockForm =  this.fb.group({
      stocks: this.fb.array([ this.stock()])
    });
  }

  values(): FormGroup {
    return this.fb.group({
      value: new FormControl('', Validators.required)
    });
  }
  selection(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      selected: new FormControl('', Validators.required),
      values: this.fb.array([this.values()])
    });
  }

  stock(): FormGroup {
    return this.fb.group({
      discountPerc: new FormControl(Number, Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, Validators.required),
      mandatorySelection: this.fb.array([ this.selection() ]),
      optionalSelection: this.fb.array([ this.selection()])
    });
  }

  get getStocks(): FormArray{
    return (this.stockForm.get('stocks') as FormArray);
  }

  addValue(selectionOption): void{
    selectionOption.get('values').push(this.values());
  }
  addMandatory(stock): void{
    stock.get('mandatorySelection').push(this.selection());
  }

  addOptional(stock): void{
    stock.get('optionalSelection').push(this.selection());
  }

  addStock(): void{/*
    const fg = this.fb.group({
      discountPerc: 0,
      name: '',
      price: 0,
      quantity: 0,
      mandatorySelection: null,
      optionalSelection: null
    });*/
    (this.stockForm.get('stocks') as FormArray).push(this.stock());
  }

  deleteValue(selectionOption, index): void{
    selectionOption.get('values').removeAt(index);
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
  btnClick = function () {

    if(this.stockForm.invalid) return;
    this.sharedData.setStocks(this.stockForm.value);

    this.router.navigateByUrl('/form');
  };
  onSubmit(): void{
/*
    this.stockForm.get('stocks').forEach(element => {
      let mandatorySelection = new Array<SelectionOption>();
      let optionalSelection = new Array<SelectionOption>();
      element.get('mandatorySelation').array.forEach(element => {
        let values =  new Array<string>();
        element.get('values').array.forEach(element => {
          values.push(element)
        });
        mandatorySelection.push( new SelectionOption(
                element.name, element.price, element.selected, values
        ))
      });
      element.get('optionalSelection').array.forEach(element => {
        let values =  new Array<string>();
        element.get('values').array.forEach(element => {
          values.push(element)
        });
        optionalSelection.push( new SelectionOption(
          element.name, element.price, element.selected, values
        ))
      });
      this.stocks.push( new Stock( element.discountPerc,
        this.imageUrls,
        mandatorySelection,
        element.name,
        optionalSelection,
        element.price,
        element.quantity
        ));
    });*/
    if(this.stockForm.invalid) return;
    this.sharedData.setStocks(this.stockForm.value);
  }

  onReset(): void {
  }

}

