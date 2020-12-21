import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';
const { uuid } = require('uuidv4');
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../service/navigation.service';
@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit, OnDestroy {
  toFile: { item: (arg0: number) => any; };
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
  imageUrl: string;
  stock: Stock;
  stockId: string;
  storeName: string;
  storeId: string;
  ownerId: string;
  stockName: string;
  stockList: Stock[];
  subscription: Subscription[] = [];
  constructor(private fb: FormBuilder,
              private share: ShareDataService,
              private uploadService: UploadService,
              private router: Router,
              private storeService: StoreControllerService,
              private activeRoute: ActivatedRoute,
              private alertService: AlertService,
              private navigateService: NavigationService) {
  }
  ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe);
  }
  ngOnInit(): void {
    this.subscription[0] =  this.activeRoute.queryParams.subscribe( params => {
      this.stockName =  params['item']
      this.storeId = params['id']
      this.subscription[1] = this.storeService.fetchStoreById(this.storeId).subscribe( data =>{
        this.storeName = data.name;
        this.ownerId = data.ownerId;
        if(!!this.stockName && this.stockName.match('create')){
          this.stockForm = this.fb.group({
            name: new FormControl('', Validators.required),
            price: new FormControl(Number, Validators.required),
            discountPerc: new FormControl(Number, Validators.required),
            quantity: new FormControl(Number, [Validators.required, Validators.min(1)]),
            description: new FormControl('', Validators.required),
            mandatorySelection: this.fb.array([ this.selection() ])
          });
        } else{
            this.stock = data.stockList.find( value => value.name.match(this.stockName));
            if(!!this.stock){ 
              this.stockForm = this.fb.group({
                name: new FormControl(this.stock.name, Validators.required),
                price: new FormControl(this.stock.price, Validators.required),
                discountPerc: new FormControl(this.stock.discountPerc, Validators.required),
                quantity: new FormControl(this.stock.quantity, [Validators.required, Validators.min(1)]),
                description: new FormControl(this.stock.description, Validators.required),
                mandatorySelection: this.fb.array([ this.selection() ])
              });      
              this.stock.mandatorySelection.forEach( selection => {
                this.mandatories.push(this.fb.group({
                  name: new FormControl(selection.name, Validators.required),
                  price: new FormControl(selection.price, Validators.required),
                  selected: new FormControl(selection.selected, Validators.required),
                  values: this.fb.array(selection.values)}));});
              this.stockForm.controls['name'].disable();
              }}})
            });
    this.stockForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      discountPerc: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      mandatorySelection: this.fb.array([ this.selection() ])
    });
  this.ownerId = this.activeRoute.snapshot.params['oi'];
  }
  selection(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      selected: new FormControl('', Validators.required),
      values: this.fb.array([])
    });
  }
  get f() { return this.stockForm.controls; }
  get mandatories(): FormArray {
    return this.stockForm.get('mandatorySelection') as FormArray;
  }
  get options(): FormArray {
    return this.stockForm.get('optionalSelection') as FormArray;
  }
  addValue(selectionOption): void{
    selectionOption.get('values').push(new FormControl(''));
  }
  get imagies(): FormArray {
    return this.stockForm.get('imageUrls') as FormArray;
  }
  addImage(): void {
    this.imagies.push(new FormControl(''));
  }
  deleteImage( index: number): void{
    ( this.stockForm.get('imageUrls') as FormArray).removeAt(index);
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
  get images(): string[]{
    let images = new Array<string>();
    this.imageUrls.forEach( i => images.push(i));
    this.imageUrls.splice(0, this.imageUrls.length);
    return images;
  }

  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
    if(!!this.storeName){
      this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.storeName));  
    }
    else this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.storeInfo.name));      
  }

  done(): void{
    let newStock = new Stock(null,this.stockForm.get('description').value,
      this.stockForm.get('discountPerc').value,
      this.images,
      this.stockForm.get('mandatorySelection').value,
      this.stockForm.get('name').value,
      null,
      this.stockForm.get('price').value,
      this.stockForm.get('quantity').value);
    if( (!!this.stock && !!this.storeId) || ( !!this.stockName && this.stockName.match('create'))){
      if( (newStock.name.match(this.stockName)) || ( !!this.stockName  && this.stockName.match('create'))){  
          newStock.id = (newStock.name.match(this.stockName) && !!this.stock) ? this.stock.id : newStock.id; 
          this.subscription[2] = this.storeService.patchStockByStoreId(this.storeId, newStock).subscribe( data =>
            this.alertService.success(`Succesful ${ (this.stockName.match('create')) ? 'added' : 'edited' } stock.`, true),
            err => this.alertService.error(`Failed to ${ (!newStock.name.match(this.stockName) && !!this.stock) ? 'update' : 'add'} a stock.`, true)
        )
      }
      window.history.back();
      return;
    } 
    this.share.addStock( newStock );
    this.router.navigateByUrl('/form');
    this.onReset();
  };
  
  add (): void{
    if(( !!this.stock && !!this.storeId) || ( !!this.stockName && this.stockName.match('create'))){
      window.history.back();
      return;
    }
    this.share.addStock( new Stock(null,this.stockForm.get('description').value,
    this.stockForm.get('discountPerc').value,
    this.images, 
    this.stockForm.get('mandatorySelection').value,
    this.stockForm.get('name').value,
    null,
    this.stockForm.get('price').value,
    this.stockForm.get('quantity').value));
    this.onReset();
    this.router.navigateByUrl(`/form/stock?oi=${this.ownerId}`);
  };

  skip (event): void{
    if(( !!this.stock && !!this.storeId) || ( !!this.stockName && this.stockName.match('create'))){
      window.history.back();
      return;
    }
    event.preventDefault();
    this.router.navigateByUrl('form', { skipLocationChange: true }).then(() => {
      this.router.navigate(['form'], {queryParams:{ oi: this.ownerId}});}); 
    this.onReset();
  };

  onSubmit(): void{
    if(this.stockForm.invalid) return;
  }
  onReset(): void {
    this.stockForm.reset();
    this.mandatories.clear();
    this.options.clear()
  }
}

