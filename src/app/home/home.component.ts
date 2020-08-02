import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('currentUser')) {
      this.authenticationService.logout = true;
      this.router.navigate(["/landing"]);
    }
  }

  onLogout(){
    
    
    localStorage.removeItem('currentUser');
    this.authenticationService.currentUserSubject.next(null);
    this.router.navigate(['']);
    this.authenticationService.logout = false;

}

onThemeChange($event){
  this.authenticationService.darktheme = !this.authenticationService.darktheme;
}
}
