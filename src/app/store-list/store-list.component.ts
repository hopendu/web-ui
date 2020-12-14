import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    private share: ShareDataService ) { }

  ngOnInit(): void {
    this.getStoreList;
  }

  setStoreList(ownerId: string): void {
    // this.service.getStoreListByOwnerId(ownerId).subscribe( stores => this.storeList = stores);
    this.storeList = this.service.getStoreListByOwnerId(ownerId);
  }

  get getStoreList(): Observable<StoreProfile[]> {
    this.setStoreList('this.share.storeInfo.userId');
    return this.storeList;
  }

  showDetail(event: string): void {
    this.id  = event;
    this.status = !this.status;
  }

  isClicked(event: string): void {
    this.status = !this.status;
    this.id = event;
  }

}
