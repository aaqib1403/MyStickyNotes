import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm
  errorflag = false;
  errormessage = "incorrect credentials"
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: []
    });

  }
  onLogin() {
    this.http.post<any>(`/mystickynotes/login`, this.loginForm.value)
      .subscribe(
        (data: any) => {
          if (data) {
            if (data.validation) {
              if (this.loginForm.controls['rememberme'].value) {
                localStorage.setItem('currentUser', JSON.stringify(data));

              }
              this.authenticationService.currentUserSubject.next(data);
              this.authenticationService.logout = true;
              this.router.navigate(["/landing"]);
            }
            else {
              this.errorflag = true;

            }
          }

        })
  }

  onLogout() {


    localStorage.removeItem('currentUser');
    this.authenticationService.currentUserSubject.next(null);
    this.router.navigate(['']);
    this.authenticationService.logout = false;

  }

  Delete() {
    this.http.get('/mystickynotes/deletecookie').subscribe(res => {
      console.log("deleted");
    })
  }
}
