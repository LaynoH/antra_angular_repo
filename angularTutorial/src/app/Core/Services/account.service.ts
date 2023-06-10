import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from 'src/app/Shared/Models/Login';
import { Register } from 'src/app/Shared/Models/Register';
import { User, UserWAdmin } from 'src/app/Shared/Models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // UserWAdmin: for admin guard;
  // User: for user login guard
  private currentUserSubject = new BehaviorSubject<UserWAdmin>({} as UserWAdmin);
  public currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  Register(registerData:Register):Observable<boolean>{
    return this.http.post<boolean>("https://hrm2023apigateway.azure-api.net/recruiting/api/Account/Register",registerData,{
      headers: {'Ocp-Apim-Subscription-Key':'ea23037be2ba416a9c9c368c243d2f0a'}
    });
  }

  Login(loginData:Login):Observable<boolean>{
    return this.http.post<boolean>("https://hrm2023apigateway.azure-api.net/recruiting/api/Account/Login",loginData,{
      headers: {'Ocp-Apim-Subscription-Key':'ea23037be2ba416a9c9c368c243d2f0a'}
    }).pipe(map((response: any) =>{ 
      if(response){
        localStorage.setItem('token', response.token);
        return true;
      }else{
        return false;
      }
    }));
  }

  Logout(){
    localStorage.removeItem('token');
    this.currentUserSubject.next({} as UserWAdmin);
    this.isLoggedInSubject.next(false);
  }

  populateUserInfoFromToken(){
    var tokenValue = localStorage.getItem('token');

    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.isLoggedInSubject.next(true);
      const newUser:UserWAdmin = {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        password: decodedToken.password,
        isAdmin:true,
      };
      this.currentUserSubject.next(newUser);
    }
  }

  ValidJWTToken(){
    var tokenValue = localStorage.getItem('token');
    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.populateUserInfoFromToken();
    };

  }
}
