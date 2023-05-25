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
    header = header.set('key','key_value');
    return this.http.get<Job[]>("url_from_postman",{
      headers: {'key':'key_value'}
    });
  }
}
