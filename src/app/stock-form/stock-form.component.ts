import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';

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
  vallueArray: any;
  name: any;
  discountPerc: any;
  quantity: any;
  price: any;

  constructor(private fb: FormBuilder,
              private share: ShareDataService,
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
  getStocListFromFormGroup(group: FormGroup | FormArray): void {
    
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if( abstractControl instanceof FormGroup){
        this.getStocListFromFormGroup(abstractControl);
      } if( abstractControl instanceof FormArray){
      }
      if( abstractControl instanceof FormControl){
         if( key.match("value"))  this.vallueArray.push(abstractControl.value);
         if( key.match("name"))  this.name = abstractControl.value;
         if( key.match("discountPerc"))  this.discountPerc = abstractControl.value;
         if( key.match("quantity"))  this.quantity = abstractControl.value;
         if( key.match("price"))  this.price = abstractControl.value;
         
      }
    })
    
    
  
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

  addStock(): void{
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
    this.shared.stockList = null;
    this.router.navigateByUrl('/form');
  };
  backClick = function (){
    this.router.navigateByUrl('/form/business-hours');
  };
  onSubmit(): void{
    if(this.stockForm.invalid) return;
  }

  onReset(): void {
  }

}

