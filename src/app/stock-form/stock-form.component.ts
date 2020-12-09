import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
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

  constructor(private fb: FormBuilder,
              private share: ShareDataService,
              private uploadService: UploadService,
              private router: Router,
              private service: StoreControllerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    
    // this.route.queryParams.subscribe(params => {
    //   this.name = params["name"];

    //   if( !!this.share.stock && !!this.share.store.id){
    //     this.stockForm = this.fb.group({
    //       name: new FormControl(this.share.stock.name, Validators.required),
    //       price: new FormControl(this.share.stock.price, Validators.required),
    //       discountPerc: new FormControl(this.share.stock.discountPerc, Validators.required),
    //       quantity: new FormControl(this.share.stock.quantity, [Validators.required, Validators.min(1)]),
    //       description: new FormControl(this.share.stock.description, Validators.required),
    //       //imageUrls: this.fb.array(['']),
    //       mandatorySelection: this.fb.array([ this.selection() ]),
    //       // optionalSelection: this.fb.array([ this.selection()])
    //     });


    //   this.share.stock.mandatorySelection.forEach( selection => {
    //     this.mandatories.push(this.fb.group({
    //       name: new FormControl(selection.name, Validators.required),
    //       price: new FormControl(selection.price, Validators.required),
    //       selected: new FormControl(selection.selected, Validators.required),
    //       values: this.fb.array(selection.values)
    //     }));
    //   });
    //   }
      
    //  });

    if( !!this.share.stock && !!this.share.store.id){
      this.stockForm = this.fb.group({
        name: new FormControl(this.share.stock.name, Validators.required),
        price: new FormControl(this.share.stock.price, Validators.required),
        discountPerc: new FormControl(this.share.stock.discountPerc, Validators.required),
        quantity: new FormControl(this.share.stock.quantity, [Validators.required, Validators.min(1)]),
        description: new FormControl(this.share.stock.description, Validators.required),
        //imageUrls: this.fb.array(['']),
        mandatorySelection: this.fb.array([ this.selection() ]),
        // optionalSelection: this.fb.array([ this.selection()])
      });


      this.share.stock.mandatorySelection.forEach( selection => {
        this.mandatories.push(this.fb.group({
          name: new FormControl(selection.name, Validators.required),
          price: new FormControl(selection.price, Validators.required),
          selected: new FormControl(selection.selected, Validators.required),
          values: this.fb.array(selection.values)
        }));
      });
      return;
    }
    

    this.stockForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl(Number, Validators.required),
      discountPerc: new FormControl(Number, Validators.required),
      quantity: new FormControl(Number, [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      //imageUrls: this.fb.array(['']),
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

  // onFileChanged(event): void {
  //   this.selectedFile = event.target.files[0];
  //   //this.imageUrls.splice(0, this.imageUrls.length);
  //   this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.selectedFile, this.share.storeInfo.name));
  // }
  onChange(event: { target: { files: { item: (arg0: number) => any; }; }; }): void {
    this.toFile = event.target.files;
    if( !!this.share.stock && !!this.share.store.id){
      this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.store.name));  
    }
    else this.imageUrls.push('https://izinga-aws.s3.amazonaws.com/' + this.uploadService.fileUpload(this.toFile.item(0), this.share.storeInfo.name));  

    
  }

  done(): void{

    if( !!this.share.stock && !!this.share.store.id){
      this.share.stock.description = this.stockForm.get('description').value;
      this.share.stock.discountPerc = this.stockForm.get('discountPerc').value;
      this.share.stock.images = this.images;
        //this.images.forEach( image => this.share.stock.images.push(image));
        //this.imageUrls.forEach( image => this.share.stock.images.push(image));
      
      this.share.stock.mandatorySelection = this.stockForm.get('mandatorySelection').value;
      this.share.stock.name = this.stockForm.get('name').value;
      this.share.stock.price = this.stockForm.get('price').value;
      this.share.stock.quantity = this.stockForm.get('quantity').value;

      this.service.patchStockByStoreId( this.share.store.id, this.share.stock).subscribe( data => {
        this.router.navigateByUrl('stores'); 
        this.share.stock = null; 
        this.onReset();});

        
      return;
    }
    this.share.addStock( new Stock(this.stockForm.get('description').value,
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
    if( !!this.share.stock && !!this.share.store.id){
      return;
    }
    this.share.addStock( new Stock(this.stockForm.get('description').value,
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

  skip = function(){
    if( !!this.share.stock && !!this.share.store.id){
      this.router.navigateByUrl('stores');
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
    //this.imageUrls = []
  }
//4e9d20a0-20b5-4169-913f-b908c1cf4fe4
}

