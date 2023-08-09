import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { UntypedFormArray, UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';
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
  stockForm: UntypedFormGroup;
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
  skipIndexZero: boolean = false;
  constructor(private fb: UntypedFormBuilder,
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
            name: new UntypedFormControl('', Validators.required),
            price: new UntypedFormControl(Number, Validators.required),
            discountPerc: new UntypedFormControl(Number, Validators.required),
            quantity: new UntypedFormControl(Number, [Validators.required, Validators.min(1)]),
            description: new UntypedFormControl('', Validators.required),
            detailedDescription:  new UntypedFormControl(''),
            mandatorySelection: this.fb.array([ this.selection() ])
          });
        } else{
            this.stock = data.stockList.find( value => value.name.match(this.stockName));
            if(!!this.stock){
              this.imageUrls = this.stock.images; 
              this.stockForm = this.fb.group({
                name: new UntypedFormControl(this.stock.name, Validators.required),
                price: new UntypedFormControl(this.stock.storePrice, Validators.required),
                discountPerc: new UntypedFormControl(this.stock.discountPerc, Validators.required),
                quantity: new UntypedFormControl(this.stock.quantity, [Validators.required, Validators.min(1)]),
                description: new UntypedFormControl(this.stock.description, Validators.required),
                detailedDescription: new UntypedFormControl(this.stock.detailedDescription),
                mandatorySelection: this.fb.array([ this.selection() ])
              });      
              this.stock.mandatorySelection.forEach( selection => {
                this.mandatories.push(this.fb.group({
                  name: new UntypedFormControl(selection.name, Validators.required),
                  price: new UntypedFormControl(selection.price, Validators.required),
                  values: this.fb.array(selection.values)}));});
              this.stockForm.controls['name'].disable();
              }}})
            });







    this.stockForm = this.fb.group({
      name: new UntypedFormControl('', Validators.required),
      price: new UntypedFormControl(Number, Validators.required),
      discountPerc: new UntypedFormControl(Number, Validators.required),
      quantity: new UntypedFormControl(Number, [Validators.required, Validators.min(1)]),
      description: new UntypedFormControl('', Validators.required),
      detailedDescription:  new UntypedFormControl(''),
      mandatorySelection: this.fb.array([ this.selection() ])
    });
  this.ownerId = this.activeRoute.snapshot.params['oi'];
  

} //EOgOnIt
  selection(): UntypedFormGroup {
    return this.fb.group({
      name: new UntypedFormControl('', Validators.required),
      price: new UntypedFormControl(Number, Validators.required),
      values: this.fb.array([])
    });
  }
  get f() { return this.stockForm.controls; }
  get mandatories(): UntypedFormArray {
    return this.stockForm.get('mandatorySelection') as UntypedFormArray;
  }
  get options(): UntypedFormArray {
    return this.stockForm.get('optionalSelection') as UntypedFormArray;
  }
  addValue(selectionOption): void{
    selectionOption.get('values').push(new UntypedFormControl(''));
  }
  get imagies(): UntypedFormArray {
    return this.stockForm.get('imageUrls') as UntypedFormArray;
  }
  addImage(): void {
    this.imagies.push(new UntypedFormControl(''));
  }
  deleteImage( index: number): void{
    ( this.stockForm.get('imageUrls') as UntypedFormArray).removeAt(index);
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
    if(this.storeName){
      this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.storeName));  
    }
    else this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.store.name));      
  }

  // onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
  //   this.toFile = event.target.files;
  //   this.stock.images = !!this.stock.images ? this.stock.images : [];
  //   this.subscription[2] = this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => this.stock.images.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), data.name)));
  //   }

  done(): void{
    let newStock = new Stock(null,this.stockForm.get('description').value,
      this.stockForm.get('detailedDescription').value,
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
          newStock.mandatorySelection = newStock.mandatorySelection.filter( selection => selection.name.length > 0 );
          this.subscription[3] = this.storeService.patchStockByStoreId(this.storeId, newStock).subscribe( data => {
            this.alertService.success(`Succesful ${ (this.stockName.match('create')) ? 'added' : 'edited' } stock.`, true); 
            },
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
    this.stockForm.get('detailedDescription').value,
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

