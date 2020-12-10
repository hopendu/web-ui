import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store-hours',
  templateUrl: './store-hours.component.html',
  styleUrls: ['./store-hours.component.css']
})
export class StoreHoursComponent implements OnInit {

  @Input() id: string;
  store: Observable<StoreProfile>;

  constructor( private storeService: StoreControllerService) { }

  ngOnInit(): void {
    this.store = this.storeService.getStoreById(this.id);
  }

  editAt(index: number): void {
  }

}
