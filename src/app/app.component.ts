import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { delay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mystickynotes';
  loading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private http: HttpClient) {

  }

  ngOnInit() {
    /* this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
         console.log(event.url)
         this.routerChangeMethod(event.url);
      }
   }) */


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.routerChangeMethod(event.url);
    });
    this.listenToLoading();
  }

  routerChangeMethod(url) {
    if (this.router.url == "/" || this.router.url.includes("login") || this.router.url.includes("register")) {
      this.authenticationService.hideloginregister = true

    }
    else {
      this.authenticationService.hideloginregister = false
    }
  }

  listenToLoading(): void {
    this.authenticationService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
