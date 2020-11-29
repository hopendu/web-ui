import { Component, OnInit } from '@angular/core';
import { StoreProfile } from '../model/store-profile';
import { ShareDataService } from '../service/share-data.service';
import { StoreControllerService } from '../service/store-controller.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  storeList: StoreProfile[];
  toggle: Boolean = false;

  constructor(private service: StoreControllerService,
    private share: ShareDataService ) { }

  ngOnInit(): void {
    this.setStoreList(this.share.storeInfo.userId);
  }

  setStoreList(ownerId: string): void {
    this.service.getStoreListByOwnerId(ownerId).subscribe( stores => this.storeList = stores);
  }

  get getToggle(): Boolean{
    return this.share.toggle;
  }

}
