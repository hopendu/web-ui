import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Stock } from '../../model/stock';
import { ShareDataService } from '../../service/share-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Output() hideDetailEventEmitter = new EventEmitter<Boolean>();
  @Input() stock: Stock;
  imageUrl: string;

  constructor( private share:ShareDataService,
    private router: Router) {
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  hideDetail() {
    this.hideDetailEventEmitter.emit(true);
  }
  
  ngOnInit() {
    this.imageUrl = this.stock.images[0];
    this.share.stock = this.stock;
  }


  edit(event): void {
    event.preventDefault();
    
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //       "name": this.share.stock.name,
    //       "discountPerc": this.stock.discountPerc,
    //       "description": this.
    //   }
    // };
    this.share.stock = this.stock;
    console.log(this.share.stock.name);
    //this.router.navigate(['form/stock'], JSON.);

    this.router.navigateByUrl('/form/stock-list', { skipLocationChange: true }).then(() => {
      this.router.navigate(['form/stock']);
      // this.router.navigateByUrl('/stores', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['form/stock']);
  }); 
  
};

}
