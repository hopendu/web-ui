import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';

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
  storeName: string;
  storeId: string;
  ownerId: string;
  stockName: string;
  stockList: Stock[];

  subscription: Subscription[];

  constructor(private fb: FormBuilder,
              private share: ShareDataService,
              private uploadService: UploadService,
              private router: Router,
              private storeService: StoreControllerService,
              private activeRoute: ActivatedRoute,
              private alertService: AlertService) {
  }

  ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe);
  }

  ngOnInit(): void {
    
    this.subscription[0] =  this.activeRoute.queryParams.subscribe( params => {
      
      var stockId = params['id']
      this.storeId = params['storeId']
      
      this.subscription[1] = this.storeService.fetchStoreById(this.storeId).subscribe( data =>{
        this.storeName = data.name;
        this.ownerId = data.ownerId;

        this.subscription[2] = this.storeService.fetchStockByStoreId(data.id).subscribe( data => {
            this.stockList = data;
            this.stockName = this.stock.name;
            this.stock = data.find( value => value.id == stockId);

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
                values: this.fb.array(selection.values)
                  })
               );
              }
            );
            });
          })
    })

    this.stockForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      discountPerc: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      mandatorySelection: this.fb.array([ this.selection() ])
    });
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
    if( !!this.stock && !!this.storeName){
      this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.storeName));  
    }
    else this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.storeInfo.name));      
  }

  done(): void{

    if( !!this.stock && !!this.storeId){
      this.stock.description = this.stockForm.get('description').value;
      this.stock.discountPerc = this.stockForm.get('discountPerc').value;
      this.stock.images = this.images;
      this.stock.mandatorySelection = this.stockForm.get('mandatorySelection').value;
      this.stock.name = this.stockForm.get('name').value;
      this.stock.price = this.stockForm.get('price').value;
      this.stock.quantity = this.stockForm.get('quantity').value;
      
      if( this.stock.name.match(this.stockName)){
        this.subscription[3] = this.storeService.patchStockByStoreId( this.storeId, this.stock).subscribe( data => {
          window.history.back();
        }); 
      } else {
        window.history.back();}
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
    this.router.navigateByUrl('/form');
    this.onReset();
  };
  
  add (): void{
    if( !!this.stock && !!this.storeId){
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
    this.router.navigateByUrl('/form/stock');
  };

  skip (): void{
    if( !!this.stock && !!this.storeId){
      window.history.back();
      return;
    }
    this.onReset();
    this.router.navigateByUrl('/form');
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

