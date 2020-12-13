import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {

  store: Observable<StoreProfile>;

  constructor( private storeService: StoreControllerService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe( param => {
      var id = param['id']
      this.store = this.storeService.getStoreById(id);
    })
    
  }

}
