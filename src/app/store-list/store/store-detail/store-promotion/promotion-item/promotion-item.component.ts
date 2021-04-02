import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/model/promotion';
import { PromotionControllerService } from '../../../../../service/promotion-controller.service';
import { AlertService } from '../../../../../_services/alert.service';

@Component({
  selector: 'app-promotion-item',
  templateUrl: './promotion-item.component.html',
  styleUrls: ['./promotion-item.component.css']
})
export class PromotionItemComponent implements OnInit {

  @Input() promotion: Promotion;
  
  constructor( private router: Router, 
               private promotionService: PromotionControllerService,
               private activeRoute: ActivatedRoute,
               private alertService: AlertService ) { }

  ngOnInit(): void {
  }

  deletePromotion(id: string): void {
    this.promotionService.delete(id).subscribe( data => this.alertService.success('Successful deleted a promo'), 
    error => this.alertService.error('Failure to delete a promo.'))
    window.history.back();
  }
}
