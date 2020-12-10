import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {

  @Input() id: string;
  store: Observable<StoreProfile>;

  constructor( private storeService: StoreControllerService) { }

  ngOnInit(): void {
    this.store = this.storeService.getStoreById(this.id);
  }

}
