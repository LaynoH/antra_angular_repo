import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/Shared/Models/Register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  Register(registerData:Register):Observable<boolean>{
    return this.http.post<boolean>("https://hrm2023apigateway.azure-api.net/recruiting/api/Account/Login",registerData,{
      headers: {'Ocp-Apim-Subscription-Key':'ea23037be2ba416a9c9c368c243d2f0a'}
    });
  }
}
