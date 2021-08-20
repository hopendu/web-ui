import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userId: string

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe( params  => {
      this.userId = params['id'];
    })
  }


  goToOrders() {
      this.router.navigate(['orders'], {
            queryParams: {
              "id" : this.userId
            }
          })
        
  }

  goToStores() {
    this.router.navigate(['stores'], {
          queryParams: {
            "id" : this.userId
          }
        })     
}

}
