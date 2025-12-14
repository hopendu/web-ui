import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService, Theme } from '../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userId!: string
  isDarkTheme = false;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe( params  => {
      this.userId = params['id'];
    });

    // Subscribe to theme changes
    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === Theme.Dark;
    });
  }


  goToOrders() {
      this.router.navigate(['orders'], {
            queryParams: {
              "id" : this.userId
            }
          })
        
  }

  goToRecon() {
    this.router.navigate(['recon'], {
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

  logout() {
    // Clear any stored user data and navigate to login or home
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
