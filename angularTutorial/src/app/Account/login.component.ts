import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../Shared/Models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin:boolean = false;
  flag:boolean = false;
  loginData:Login = {
    email:"",
    password:""
  }
  constructor(){}

  Login(form:NgForm){ }
}
