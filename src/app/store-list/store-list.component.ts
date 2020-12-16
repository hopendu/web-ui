import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StoreProfile } from '../model/store-profile';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  storeList: Observable<StoreProfile[]>;
  id: string;
  status: Boolean =false;

  constructor(private service: StoreControllerService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe( params  => {
      var id = params['id']
      this.storeList = this.service.getStoreListByOwnerId(id).pipe(first());
    })
    //this.getStoreList;
  }
/*
  setStoreList(ownerId: string): void {
    // this.service.getStoreListByOwnerId(ownerId).subscribe( stores => this.storeList = stores);
    this.storeList = this.service.getStoreListByOwnerId(ownerId).pipe(first());
  }

  get getStoreList(): Observable<StoreProfile[]> {
    this.setStoreList('this.share.storeInfo.userId');
    return this.storeList;
  }
*/
  showDetail(event: string): void {
    this.id  = event;
    this.status = !this.status;
  }

  isClicked(event: string): void {
    this.status = !this.status;
    this.id = event;
  }

}
