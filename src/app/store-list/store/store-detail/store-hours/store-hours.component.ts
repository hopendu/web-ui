import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-hours',
  templateUrl: './store-hours.component.html',
  styleUrls: ['./store-hours.component.css']
})
export class StoreHoursComponent implements OnInit {

  store: Observable<StoreProfile>;

  constructor( private storeService: StoreControllerService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.parent.params.subscribe( param => {
      var id = param['id']
      this.store = this.storeService.getStoreById(id)
    })

    
    // this.activeRoute.queryParams.subscribe( param => {
    //   var id = param['id']
    //   this.store = this.storeService.getStoreById(id)
    // })
  }
}
