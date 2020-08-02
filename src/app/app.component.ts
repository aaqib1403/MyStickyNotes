import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mystickynotes';

  constructor(  private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private http: HttpClient){

  }


 
}
