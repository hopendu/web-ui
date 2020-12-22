import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { time } from 'console';
import { Subscription, timer } from 'rxjs';
import { delay, delayWhen, subscribeOn } from 'rxjs/operators';
import { StoreControllerService } from 'src/app/service/store-controller.service';
import { Stock } from '../../model/stock';
import { ShareDataService } from '../../service/share-data.service';
import { AlertService } from '../../_services/alert.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('800ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class DetailComponent implements OnInit , OnDestroy {

  @Output() hideDetailEventEmitter = new EventEmitter<Boolean>();
  @Input() stock: Stock;
  imageUrl: string;
  subscription: Subscription[] = [];
  current = 0;

  constructor( private share:ShareDataService,
    private storeService: StoreControllerService,
    private alertService: AlertService,
    private router: Router, 
    public activeRoute: ActivatedRoute) {
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnDestroy(): void {
    this.subscription.forEach( sub => sub.unsubscribe);
  }

  hideDetail() {
    this.hideDetailEventEmitter.emit(true);
  }
  
  ngOnInit() {
    this.imageUrl = this.stock.images[0];
    this.share.stock = this.stock;

    setInterval(() => {
      this.current = ++this.current % this.stock.images.length;
    }, 5000);
  }

  deleteStock(): void {
       this.subscription[0] = this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => {
        data.stockList =  data.stockList.filter( value => !(value.name.match(this.stock.name)));
        this.subscription[1] = this.storeService.patch(this.activeRoute.snapshot.params['id'], data).subscribe( data2 => {
          this.alertService.success(`Succesful deleted ${this.stock.name}.`, true)
          //window.history.go();
        }, 
        err => {
          this.alertService.error(`Faluire to deleted ${this.stock.name}.`, true)
        })
      })
    }

  edit(event): void {
    event.preventDefault();
    this.subscription[2] = this.storeService.fetchStoreById(this.activeRoute.snapshot.params['id']).subscribe( data => {
      console.log(`store id is ${this.activeRoute.snapshot.params['id']} and stock name is ${this.stock.name}`)
        this.router.navigateByUrl('/form/stock-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['form/stock'], {queryParams:{ id: this.activeRoute.parent.snapshot.params.id, item: this.stock.name }});})
    })};
}
