import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreProfile } from 'src/app/model/store-profile';
import { ShareDataService } from 'src/app/service/share-data.service';
import { StoreControllerService } from 'src/app/service/store-controller.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  @Input() id: string;
  store: Observable<StoreProfile>;
  @Output() clickedEventEmitter = new EventEmitter<string>();
  
  constructor( private router: Router,
    private storeService: StoreControllerService) { }

  ngOnInit(): void {
   this.store = this.storeService.fetchStoreById(this.id);
  }

  isClicked() {
    this.clickedEventEmitter.emit(this.id);
  }

}
