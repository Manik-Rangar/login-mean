import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  error: any = null;
  constructor(private authService: AuthService,private readonly fb:FormBuilder) { }

  userDetails = this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.minLength(6),Validators.required]],
    name:["",Validators.minLength(3)]
  });

  ngOnInit(): void {
    this.error = null
    this.authService.err.subscribe(err => {
      this.error = err
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if(!this.isLoginMode){
      this.userDetails.controls["name"].setValidators([Validators.minLength(3),Validators.required])
      this.userDetails.controls["name"].updateValueAndValidity()
      // return 
    }
    else{
      this.userDetails.controls["name"].setValidators([Validators.minLength(3)])
      this.userDetails.controls["name"].updateValueAndValidity()
    }
  }

  onSubmit() {
    console.log(this.userDetails.valid)
    if (!this.userDetails.valid) {
      return;
    }

    const email = this.userDetails.controls["email"].value;
    const password = this.userDetails.controls["password"].value;
    const name = this.userDetails.controls["name"].value

    if (this.isLoginMode) {
      this.authService.signIn(email, password)
      this.userDetails.reset()
    }
    else {
      this.authService.createUser(email, password,name)
      this.userDetails.reset()
      this.onSwitchMode()
    }
  }

}
