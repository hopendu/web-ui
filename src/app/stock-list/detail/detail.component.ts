import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { Stock } from '../../model/stock';
import { ShareDataService } from '../../service/share-data.service';
import { AlertService } from '../../_services/alert.service';

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
    private storeService: StoreControllerService,
    private alertService: AlertService,
    private router: Router, 
    private activeRoute: ActivatedRoute) {
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  hideDetail() {
    this.hideDetailEventEmitter.emit(true);
  }
  
  ngOnInit() {
    this.imageUrl = this.stock.images[0];
    this.share.stock = this.stock;
  }

  deleteStock(): void {
      this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => {
        data.stockList =  data.stockList.filter( value => !(value.name.match(this.stock.name)));
        this.storeService.patch(this.activeRoute.snapshot.params['id'], data).subscribe( data2 => {
          this.alertService.success(`Succesful deleted ${this.stock.name}.`, true)
          window.history.go();
        })
      })
    }

  edit(event): void {
    event.preventDefault();
    this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => {
      console.log(`store id is ${this.activeRoute.snapshot.params['id']} and stock name is ${this.stock.name}`)
        this.router.navigateByUrl('/form/stock-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['form/stock'], {queryParams:{ id: this.activeRoute.parent.snapshot.params.id, item: this.stock.name }});})
    })};
}
