import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/Shared/Models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  getAllJobs():Observable<Job[]>{
    let header = new HttpHeaders();
    header = header.set('Ocp-Apim-Subscription-Key','b7e325cf50db42b0b60a5d112390a6c3');
    return this.http.get<Job[]>("https://recruitingapi.azure-api.net/recruiting/api/Jobs",{
      headers: {'Ocp-Apim-Subscription-Key':'b7e325cf50db42b0b60a5d112390a6c3'}
    });
  }
}
