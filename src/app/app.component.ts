import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';
import { AlertService } from './_services/alert.service';

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
document.body.classList.toggle('dark-theme', prefersDarkScheme.matches);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'izinga-food-market-client';
  errorMessage: string | undefined;
  infoMessage: string | undefined;

  constructor(private router: Router, private themeService: ThemeService, private alertService: AlertService) { }

  ngOnInit(): void {
    // Scroll to top on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        window.scrollTo(0, 0); 
        this.errorMessage = undefined;
        this.infoMessage = undefined;
      }, 1) // Scroll to top
    });

    // Subscribe to alert messages
    this.alertService.getMessage().subscribe(message => {
      if (message) {
        if (message.type === 'error') {
          this.errorMessage = message.text;
          this.infoMessage = undefined;
        } else if (message.type === 'success') {
          this.infoMessage = message.text;
          this.errorMessage = undefined;
        }
      } else {
        this.errorMessage = undefined;
        this.infoMessage = undefined;
      }
    });
  }
}
