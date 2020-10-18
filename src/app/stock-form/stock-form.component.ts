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
  vallueArray = new Array<string>();
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
    this.stockForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      discountPerc: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, Validators.required),
      mandatorySelection: this.fb.array([ this.selection() ]),
      // optionalSelection: this.fb.array([ this.selection()])
    });
  }

  // values(): FormGroup {
  //   return this.fb.group({
  //     value: new FormControl('', Validators.required)
  //   });
  // }
  selection(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      selected: new FormControl('', Validators.required),
      values: this.fb.array([])
    });
  }

  get mandatories(): FormArray {
    return this.stockForm.get('mandatorySelection') as FormArray;
  }

  get options(): FormArray {
    return this.stockForm.get('optionalSelection') as FormArray;
  }

  addValue(selectionOption): void{
    selectionOption.get('values').push(new FormControl(''));
  }

  addMandatory(): void{
    this.mandatories.push(this.selection());
  }

  addOptional(): void{
    this.options.push(this.selection());
  }

  deleteValue(selectionOption, index): void{
    selectionOption.get('values').removeAt(index);
  }
  deleteMandatory( index): void{
    this.mandatories.removeAt(index);
  }

  deleteOptional(index): void{
    this.options.removeAt(index);
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    this.uploadService.fileUpload(this.selectedFile, this.share.storeInfo.name);
  }
  done = function (){
    this.share.addStock( new Stock(this.stockForm.get('discountPerc').value, new Array<string>(),
    this.stockForm.get('mandatorySelection').value,
    this.stockForm.get('name').value,
    null,
    this.stockForm.get('price').value,
    this.stockForm.get('quantity').value));
    this.router.navigateByUrl('/form');
  };
  add = function (){
    this.share.addStock( new Stock(this.stockForm.get('discountPerc').value, new Array<string>(),
    this.stockForm.get('mandatorySelection').value,
    this.stockForm.get('name').value,
    null,
    this.stockForm.get('price').value,
    this.stockForm.get('quantity').value))
    this.onReset();
    this.router.navigateByUrl('/form/stock');
  };

  skip = function(){
    this.onReset();
    this.router.navigateByUrl('/form/stock');
  }
  onSubmit(): void{
    if(this.stockForm.invalid) return;
  }

  onReset(): void {
    this.stockForm.reset();
    this.mandatories.clear();
    this.options.clear()
  }

}

