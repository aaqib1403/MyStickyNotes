import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm
  errormessage
  errorflag = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,

    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onRegister() {
    console.log(this.registerForm.value);

    this.http.post<any>("/mystickynotes/register", this.registerForm.value).subscribe((res: any) => {

     if(res.validation){

      console.log(res);
      alert("registration successful")
      this.router.navigate(['/login'])
     }
     else{
       this.errorflag = true
      this.errormessage = res.message
     }

  })
  }


}
